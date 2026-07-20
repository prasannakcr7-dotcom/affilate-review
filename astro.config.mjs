// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://thesecondlook.pages.dev",
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes("/newreview"),
			serialize: (item) => {
				item.lastmod = new Date().toISOString();
				return item;
			},
		}),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
