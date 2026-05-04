import { defineConfig } from 'astro/config';
import tailwind          from '@astrojs/tailwind';
import sitemap           from '@astrojs/sitemap';
import vercel            from '@astrojs/vercel';

export default defineConfig({
  site:         'https://yourclientdomain.com', // updated per client
  output:       'static',                        // static + API routes (Astro v5 default)
  adapter:      vercel(),
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
});
