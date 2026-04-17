<template>
  <section id="about" class="max-w-5xl mx-auto px-6 py-16 border-t border-gray-100">
    <h2
      class="text-3xl md:text-4xl font-bold uppercase inline-block mb-12 text-gray-900 border-b-4 border-teal-600 pb-2">
      Über mich
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="md:col-span-2 space-y-6">
        <p class="text-xl leading-relaxed text-gray-800 font-medium">
          Ich warte nicht auf Aufgaben – ich baue Lösungen.
        </p>

        <p class="text-md leading-relaxed text-gray-700">
          In einer Welt, die oft in starren Prozessen verweilt, setze ich auf
          <span class="text-teal-600 font-semibold text-lg">High Agency</span>.
          Mein Ziel ist es, mathematische Präzision mit realer Wertschöpfung zu verbinden.
          Ich sehe Technologie nicht als Selbstzweck, sondern als das schärfste Werkzeug zur Lösung komplexer Probleme.
        </p>

        <p class="text-md leading-relaxed text-gray-700">
          Meine Arbeitsweise ist geprägt durch meine Zeit als Offizieranwärter:
          <span class="font-bold text-gray-900">Disziplin, klare Kommunikation und die konsequente Übernahme von
            Verantwortung</span>
          sind für mich keine Schlagworte, sondern das Fundament jeder Zusammenarbeit. Wenn ein System hakt, analysiere
          ich die Wurzel, nicht die Symptome.
        </p>
        <div class="flex justify-center mt-8">
          <img src="https://finn-hertsch.de/images/hg.JPG" alt="Hochgrat"
            class="w-[95%] h-auto rounded-lg shadow-md object-cover">
        </div>
      </div>

      <div class="md:col-span-1 bg-gray-50 p-8 rounded-lg border-l-4 border-teal-600">
        <h3 class="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
          Fokus
        </h3>

        <ul class="space-y-4">
          <li class="flex items-start">
            <span class="text-teal-600 mr-3 mt-1">▹</span>
            <span class="text-gray-700"><strong>Data Engineering:</strong> Effiziente & skalierbare Pipelines.</span>
          </li>
          <li class="flex items-start">
            <span class="text-teal-600 mr-3 mt-1">▹</span>
            <span class="text-gray-700"><strong>Deep Learning:</strong> Von der Theorie zur Implementierung.</span>
          </li>
          <li class="flex items-start">
            <span class="text-teal-600 mr-3 mt-1">▹</span>
            <span class="text-gray-700"><strong>Stoische Umsetzung:</strong> Fokus auf Ergebnisse in kritischen
              Umgebungen.</span>
          </li>
        </ul>

        <div class="mt-8 pt-6 border-t border-gray-200 italic text-sm text-gray-500">
          „Was dem Weg im Wege steht, wird selbst zum Weg.“
          <span class="block mt-1 not-italic font-bold text-teal-600">— Marcus Aurelius</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: 'Über mich | Finn Hertsch',
  meta: [
    { name: 'description', content: 'Finn Hertsch - High Agency, Data Science & Engineering.' }
  ]
})
</script>

<style scoped>
section {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>