// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: "de" },
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
      title: "Finn Hertsch – Portfolio",
      meta: [
        {
          name: "description",
          content:
            "Portfolio von Finn Hertsch – Dualer Student in Data Science & KI an der DHBW. Projekte, Skills und Kontakt.",
        },
        { name: "author", content: "Finn Hertsch" },
        { property: "og:title", content: "Finn Hertsch – Portfolio" },
        {
          property: "og:description",
          content:
            "Portfolio von Finn Hertsch – Data Science & KI Student an der DHBW.",
        },
        { property: "og:url", content: "https://finn-hertsch.de" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "de_DE" },
      ],
      link: [
        { rel: "canonical", href: "https://finn-hertsch.de" },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Finn Hertsch",
            url: "https://finn-hertsch.de",
            jobTitle: "Dualer Student Data Science & KI",
            worksFor: { "@type": "Organization", name: "DHBW" },
            sameAs: [
              "https://github.com/F1nnSBK",
              "https://www.linkedin.com/in/finn-hrts/",
            ],
          }),
        },
      ],
    },
  },
  modules: [
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@tresjs/nuxt",
    "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    wdbApiKey: process.env.WDB_API_KEY,
    wdbBaseUrl: process.env.WDB_BASE_URL || "http://localhost:8080",
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          "remark-math": {},
          "remark-wiki-link": {
            wikiLinkResolver: (permalink: string) => {
              return permalink.toLowerCase().replace(/\s+/g, "-");
            },
            hrefTemplate: (permalink: string) => `/notes/${permalink}`,
          },
        },
        rehypePlugins: {
          "rehype-katex": {
            output: "mathml",
          },
        },
        highlight: {
          theme: "github-dark",
        },
      },
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/*"],
    },
    types: "~/types/database.types.ts",
  },
  css: ["~/assets/css/main.css", "katex/dist/katex.min.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: [
      { code: "de", iso: "de-DE", name: "Deutsch", file: "de.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "de",
    lazy: true,
    langDir: "locales/",
    strategy: "prefix_except_default",
  },
});