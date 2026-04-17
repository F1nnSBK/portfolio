<template>
  <div class="max-w-4xl mx-auto p-6">
    <Search />

    <div class="mt-12 p-8 bg-white rounded-2xl border border-gray-200 text-gray-900 shadow-sm">
      <h2 class="text-2xl font-semibold mb-6 flex items-center gap-3">
        Study-RAG Architecture
      </h2>

      <p class="text-gray-600 mb-8 leading-relaxed">
        Dieses System ermöglicht eine semantische Suche in DHBW-Studiennotizen.
        Die Pipeline nutzt Deep Learning, um den kontextuellen Sinn von Suchanfragen zu erfassen,
        statt lediglich auf Schlagwort-Übereinstimmungen zu prüfen.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
          <img src="https://finn-hertsch.de/images/jina.svg" class="w-12 h-12 mb-4" alt="Jina AI" />
          <h3 class="font-medium text-sm uppercase tracking-wider text-gray-500">Embeddings</h3>
          <p class="font-semibold mb-1">Jina AI v4</p>
          <p class="text-xs text-gray-400 mt-2 text-balance">Generierung von 1024-dimensionalen Dense Embeddings.</p>
        </div>

        <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
          <img src="https://simpleicons.org/icons/fastapi.svg" class="w-12 h-12 mb-4 color-[#05998b]" alt="FastAPI" />
          <h3 class="font-medium text-sm uppercase tracking-wider text-gray-500">API Layer</h3>
          <p class="font-semibold mb-1">FastAPI</p>
          <p class="text-xs text-gray-400 mt-2 text-balance">Python-Backend zur Orchestrierung der Query-Pipeline.</p>
        </div>

        <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
          <img src="https://raw.githubusercontent.com/qdrant/qdrant/master/docs/logo.svg" class="w-12 h-12 mb-4"
            alt="Qdrant" />
          <h3 class="font-medium text-sm uppercase tracking-wider text-gray-500">Vector Store</h3>
          <p class="font-semibold mb-1">Qdrant</p>
          <p class="text-xs text-gray-400 mt-2 text-balance">Vektordatenbank für effiziente Cosine-Similarity Suche.</p>
        </div>

      </div>

      <div class="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-[13px]">
        <span class="flex items-center gap-2 text-gray-500">
          <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
          Similarity Metric: <span class="font-medium text-gray-800">Cosine</span>
        </span>
        <span class="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">Dimension: 2048</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.grid div {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.grid div:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  border-color: #e5e7eb;
}
</style>