import { defineConfig } from 'astro/config';
import tailwind          from '@astrojs/tailwind';
import sitemap           from '@astrojs/sitemap';
import vercel            from '@astrojs/vercel/serverless';

export default defineConfig({
  site:         'https://yourclientdomain.com', // updated per client
  output:       'hybrid',                        // static pages + API routes
  adapter:      vercel(),
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
});
