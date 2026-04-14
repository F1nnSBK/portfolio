// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" }
      ],
      title: 'Finn Hertsch - Portfolio',
      meta: [
        { name: 'description', content: 'A Notion-like note-taking app built with Nuxt 3 and Supabase.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  modules: [
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@tresjs/nuxt',
    '@nuxtjs/supabase',
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
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
          theme: 'github-dark',
        }
      }
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'],
    },
    types: '~/types/database.types.ts'
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