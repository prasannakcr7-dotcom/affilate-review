import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const { title, url, category, imageUrl, rawText } = await request.json();

		if (!title || !rawText) {
			return new Response(
				JSON.stringify({ error: 'Title and Raw Product Text are required.' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Generate a clean slug from the title, limited to 5 words to prevent overly long URLs
		const cleanTitle = title
			.toLowerCase()
			.replaceAll(' & ', '-')
			.replace(/[^a-z0-9\s-]/g, '');
		
		const slug = cleanTitle
			.trim()
			.split(/[\s-]+/)
			.filter(Boolean)
			.slice(0, 5)
			.join('-');

		// Create target directories if they do not exist
		const imagesDir = path.join(process.cwd(), 'public/images/products');
		const pendingDir = path.join(process.cwd(), 'src/data/pending-reviews');
		await fs.mkdir(imagesDir, { recursive: true });
		await fs.mkdir(pendingDir, { recursive: true });

		let localImagePath = '';

		// Download product image if URL is provided
		if (imageUrl) {
			try {
				const response = await fetch(imageUrl);
				if (!response.ok) {
					throw new Error(`Failed to fetch image. Status: ${response.status}`);
				}
				const arrayBuffer = await response.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				
				const relativePath = `/images/products/${slug}.jpg`;
				const fullSavePath = path.join(process.cwd(), 'public', relativePath);
				
				await fs.writeFile(fullSavePath, buffer);
				localImagePath = relativePath;
			} catch (imageError) {
				console.error('Image download failed:', imageError);
				// We don't fail the whole request just because the image failed to download
			}
		}

		// Compile the JSON payload
		const pendingData = {
			title,
			url,
			category,
			imageLocalPath: localImagePath || '/blog-placeholder-1.jpg',
			rawText,
			addedAt: new Date().toISOString(),
		};

		const jsonFilePath = path.join(pendingDir, `${slug}.json`);
		await fs.writeFile(jsonFilePath, JSON.stringify(pendingData, null, 2), 'utf-8');

		return new Response(
			JSON.stringify({ success: true, slug, filePath: jsonFilePath }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error: any) {
		console.error('Error in save-pending endpoint:', error);
		return new Response(
			JSON.stringify({ error: error.message || 'Internal Server Error' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
