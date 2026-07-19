export interface ReviewMetric {
	label: string;
	weight: string;
	score: number;
}

export interface ReviewProduct {
	id: string;
	name: string;
	slug: string;
	image: string;
	imageAlt: string;
	awardBadge?: string;
	awardNote?: string;
	brand: string;
	price: string;
	asin: string;
	price_us?: string;
	asin_us?: string;
	price_in?: string;
	asin_in?: string;
	markets?: ('us' | 'in')[];
	buyUrl?: string;
	overallScore: number;
	starRating: number;
	bottomLine: string;
	pros: string[];
	cons: string[];
	specs: Record<string, string>;
	metrics: ReviewMetric[];
}

export interface ReviewPageData {
	title: string;
	summary: string;
	category: string;
	publishDate: string;
	heroImage: string;
	primaryProductId: string;
	markets?: ('us' | 'in')[];
	products: ReviewProduct[];
	content: {
		verdict: string;
		toc: string[];
	};
}

export const wiredEarbudsReview: ReviewPageData = {
	title: 'The Best Wired Earbuds in India',
	summary:
		'We tested affordable wired earphones for sound quality, call clarity, comfort, cable durability, and real Indian street prices.',
	category: 'Audio',
	publishDate: '17 June 2026',
	heroImage: '/blog-placeholder-1.jpg',
	primaryProductId: 'sony-mdr-ex155ap',
	content: {
		verdict:
			'The Sony MDR-EX155AP is a dependable wired earbud for buyers who want clear calls, balanced music, and a comfortable fit without spending too much. It is not the bassiest pair in this category, but it handles voices, podcasts, and everyday playlists better than most low-cost wired options we evaluated.',
		toc: [
			'Sound Quality',
			'Comfort',
			'Call Quality',
			'Build Quality',
			'Should You Buy It?',
			'What Else Should You Consider?',
		],
	},
	products: [
		{
			id: 'sony-mdr-ex155ap',
			name: 'Sony MDR-EX155AP',
			slug: '/reviews/sony-mdr-ex155ap',
			image: '/blog-placeholder-1.jpg',
			imageAlt: 'Sony MDR-EX155AP wired earphones',
			awardBadge: "Editor's Choice",
			awardNote: 'Best for calls and balanced sound',
			brand: 'Sony',
			price: '₹1,099',
			asin: 'B078PC3DKG',
			overallScore: 77,
			starRating: 4.3,
			bottomLine: 'A balanced wired earbud with clear vocals, reliable mic quality, and comfortable daily fit.',
			pros: ['Clear vocals', 'Comfortable angled fit', 'Dependable inline microphone'],
			cons: ['Cable tangles easily', 'Bass is controlled, not huge'],
			specs: {
				Driver: '9 mm',
				Microphone: 'Inline',
				Warranty: '1 year',
			},
			metrics: [
				{ label: 'Sound Quality', weight: '40%', score: 7.7 },
				{ label: 'Comfort', weight: '25%', score: 8.0 },
				{ label: 'Call Quality', weight: '20%', score: 7.4 },
				{ label: 'Build Quality', weight: '15%', score: 7.2 },
			],
		},
		{
			id: 'boat-bassheads-100',
			name: 'boAt Bassheads 100',
			slug: '/reviews/boat-bassheads-100',
			image: '/blog-placeholder-2.jpg',
			imageAlt: 'boAt Bassheads 100 wired earphones',
			awardBadge: 'Best Value',
			awardNote: 'Best under ₹500',
			brand: 'boAt',
			price: '₹399',
			asin: 'B071Z8M4KX',
			overallScore: 62,
			starRating: 3.8,
			bottomLine: 'A very affordable backup pair for casual music, classes, and basic calls.',
			pros: ['Very affordable', 'Widely available', 'Fun bass'],
			cons: ['Average mic clarity', 'Basic cable', 'Less detail in vocals'],
			specs: {
				Driver: '10 mm',
				Microphone: 'Inline',
				Warranty: '1 year',
			},
			metrics: [
				{ label: 'Sound Quality', weight: '40%', score: 6.1 },
				{ label: 'Comfort', weight: '25%', score: 6.7 },
				{ label: 'Call Quality', weight: '20%', score: 5.8 },
				{ label: 'Build Quality', weight: '15%', score: 6.2 },
			],
		},
		{
			id: 'jbl-c200si',
			name: 'JBL C200SI',
			slug: '/reviews/jbl-c200si',
			image: '/blog-placeholder-3.jpg',
			imageAlt: 'JBL C200SI wired earphones',
			awardBadge: 'Best Bass',
			awardNote: 'Best for energetic music',
			brand: 'JBL',
			price: '₹799',
			asin: 'B01DEWVZ2C',
			overallScore: 70,
			starRating: 4.1,
			bottomLine: 'A lively pair for buyers who prefer stronger bass and a warmer music profile.',
			pros: ['Strong bass', 'Comfortable tips', 'Good service reach'],
			cons: ['No volume controls', 'Treble is less refined'],
			specs: {
				Driver: '9 mm',
				Microphone: 'Inline',
				Warranty: '1 year',
			},
			metrics: [
				{ label: 'Sound Quality', weight: '40%', score: 7.0 },
				{ label: 'Comfort', weight: '25%', score: 7.2 },
				{ label: 'Call Quality', weight: '20%', score: 6.5 },
				{ label: 'Build Quality', weight: '15%', score: 7.1 },
			],
		},
	],
};

export const allReviews: ReviewPageData[] = [wiredEarbudsReview];

export const reviewCategories = [
	'Electronics',
	'Kitchen',
	'Audio',
	'Home & Garden',
	'Health',
	'Office',
	'Fitness',
	'Outdoor',
];

export const getAmazonUrl = (asin: string, country: 'us' | 'in' = 'us') => {
	if (country === 'in') {
		const tag = import.meta.env.PUBLIC_AMAZON_TAG_IN || 'affiliaterev-21';
		const suffix = tag ? `?tag=${tag}` : '';
		return `https://www.amazon.in/dp/${asin}/${suffix}`;
	} else {
		const tag = import.meta.env.PUBLIC_AMAZON_TAG_US || 'affiliaterevus-20';
		const suffix = tag ? `?tag=${tag}` : '';
		return `https://www.amazon.com/dp/${asin}/${suffix}`;
	}
};

export function getLocalizedProduct(product: any, country: 'us' | 'in') {
	const price = country === 'in' ? (product.price_in || product.price) : (product.price_us || product.price);
	const asin = country === 'in' ? (product.asin_in || product.asin) : (product.asin_us || product.asin);
	const buyUrl = getAmazonUrl(asin, country);
	return {
		...product,
		price,
		asin,
		buyUrl
	};
}

export function getLocalizedPath(path: string, country: 'us' | 'in') {
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	
	const isReviewOrCategoryOrSearch = 
		cleanPath.startsWith('/reviews') || 
		cleanPath.startsWith('/category') || 
		cleanPath.startsWith('/search');

	if (country === 'in' || isReviewOrCategoryOrSearch) {
		return `/in${cleanPath === '/' ? '' : cleanPath}`;
	}
	return cleanPath;
}

export const toSlug = (category: string) =>
	category.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-');

export const toTitle = (slug: string) =>
	slug
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ')
		.replace('And', '&');

