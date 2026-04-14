<template>
  <div class="max-w-5xl mx-auto px-6 py-16 font-mono">
    <header class="mb-16">

      <h2
        class="text-3xl md:text-4xl font-bold uppercase inline-block mb-12 text-gray-900 border-b-4 border-teal-600 pb-2">
        {{ $t("blog.title") || 'Blog' }}
      </h2>
      <p class="text-md text-gray-600 max-w-2xl">
        Gedanken zu Engineering, Mathematik und dem Weg zum technologischen Vorsprung. Ein Logbuch über Projekte und
        Erkenntnisse.
      </p>
    </header>

    <main class="min-h-[60vh]">
      <Blog />
    </main>

    <section class="mt-20 p-8 bg-gray-50 border-l-4 border-teal-600">
      <p class="text-sm uppercase tracking-widest text-gray-500 font-bold mb-2">Interesse an fachlichem Austausch?</p>
      <NuxtLink to="/#contact" class="text-md font-bold hover:text-teal-600 transition-colors">
        Schreib mir eine Mail →
      </NuxtLink>
    </section>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Blog | Finn Hertsch',
  meta: [
    {
      name: 'description',
      content: 'Der Blog von Finn Hertsch: Tiefe Einblicke in Data Science, Machine Learning und High-Performance Systeme.'
    }
  ]
})
</script>

<style scoped>
h1 {
  letter-spacing: -0.02em;
}
</style>