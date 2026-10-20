/**
 * Masjid Zahir design system: Moorish arches, warm limestone, black domes and Kedah gold.
 * The SITE_URL environment variable is the single source of truth for all absolute URLs.
 */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL?.trim() || "https://zahirmosque.com";

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()],
  },
});
