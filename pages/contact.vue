<template>
  <section id="contact" class="max-w-5xl mx-auto px-6 py-16 border-t border-gray-100">

    <h2
      class="text-3xl md:text-4xl font-bold uppercase inline-block mb-12 text-gray-900 border-b-4 border-teal-600 pb-2">
      {{ $t("contact.title") || 'Kontakt' }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="md:col-span-2">
        <p class="text-xl mb-6 text-gray-800 font-medium">
          Bereit für das nächste Level?
        </p>
        <p class="text-lg text-gray-700 leading-relaxed mb-8">
          Ob es um komplexe Datenarchitekturen, High-Performance Engineering oder
          strategische Zusammenarbeit geht – ich bin immer offen für Projekte, die
          echte Herausforderungen bieten.
        </p>

        <div class="inline-block bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
          <p class="text-sm uppercase tracking-widest text-gray-500 mb-2 font-bold">Direktkontakt</p>
          <a href="mailto:f.hertsch@gmx.de"
            class="text-2xl md:text-3xl font-bold text-teal-600 hover:text-teal-700 transition-colors break-all">
            f.hertsch@gmx.de
          </a>
        </div>
      </div>

      <div class="md:col-span-1">
        <h3 class="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
          Netzwerke
        </h3>

        <ul class="space-y-4">
          <li>
            <a href="https://www.linkedin.com/in/finn-hrts/" target="_blank"
              class="flex items-center text-gray-700 hover:text-teal-600 transition-colors group">
              <span class="bg-gray-100 p-2 rounded mr-3 group-hover:bg-teal-50">LN</span>
              <span class="font-semibold">LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/F1nnSBK" target="_blank"
              class="flex items-center text-gray-700 hover:text-teal-600 transition-colors group">
              <span class="bg-gray-100 p-2 rounded mr-3 group-hover:bg-teal-50">GH</span>
              <span class="font-semibold">GitHub</span>
            </a>
          </li>
        </ul>

        <div class="mt-12 text-sm text-gray-500 font-mono">
          <p>Wangen im Allgäu</p>
          <p>Remote / Hybrid</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useHead({
  title: 'Kontakt | Finn Hertsch',
  meta: [
    { name: 'description', content: 'Nehmen Sie Kontakt auf mit Finn Hertsch für Projekte in den Bereichen Data Science, KI und Software Engineering.' }
  ]
})
</script>

<style scoped>
section {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>