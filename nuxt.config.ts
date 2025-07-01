// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon', 
    '@nuxt/scripts', 
    '@nuxt/image', 
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@tresjs/nuxt'
  ],
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-math': {},
          'remark-wiki-link': {
            wikiLinkResolver: (permalink: string) => {
              return permalink.toLowerCase().replace(/\s+/g, '-');
            },
            hrefTemplate: (permalink: string) => `/notes/${permalink}`,
          }
        },
        rehypePlugins:{
          'rehype-katex': {
            output: 'mathml',
          }
        },
        highlight: {
          // Theme used in all color schemes.
          theme: 'github-light',
          // OR
        }
      }
    }
  },

  css: [
    '~/assets/css/main.css',
    'katex/dist/katex.min.css'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  i18n: {
    locales: [
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'de',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  }
})