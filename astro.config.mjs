/**
 * Masjid Zahir design system: Moorish arches, warm limestone, black domes and Kedah gold.
 * The SITE_URL environment variable is the single source of truth for all absolute URLs.
 */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL?.trim() || undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    server: {
      allowedHosts: ["4321-ic47rq1kimgg5hpyrhz78-40802e24.us3.manus.computer"],
    },
    plugins: [tailwindcss()],
  },
});
