import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const reviews = defineCollection({
	loader: glob({ base: "./src/content/reviews", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishDate: z.coerce.date(),
		category: z.string(),
		heroImage: z.string(),
		primaryProductId: z.string(),
		markets: z.array(z.enum(["us", "in"])).default(["us", "in"]),
		products: z.array(
			z.object({
				id: z.string(),
				name: z.string(),
				slug: z.string(),
				image: z.string(),
				imageAlt: z.string(),
				awardBadge: z.string().optional(),
				awardNote: z.string().optional(),
				brand: z.string(),
				price: z.string(),
				asin: z.string(),
				price_us: z.string().optional(),
				asin_us: z.string().optional(),
				price_in: z.string().optional(),
				asin_in: z.string().optional(),
				markets: z.array(z.enum(["us", "in"])).optional(),
				overallScore: z.number().min(0).max(100),
				starRating: z.number().min(0).max(5),
				bottomLine: z.string(),
				pros: z.array(z.string()),
				cons: z.array(z.string()),
				specs: z.record(z.string(), z.string()),
				metrics: z.array(
					z.object({
						label: z.string(),
						weight: z.string(),
						score: z.number().min(0).max(10),
					}),
				),
			}),
		),
		toc: z.array(z.string()).default([]),
	}),
});

export const collections = { blog, reviews };
