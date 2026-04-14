<template>
  <section id="search" class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold inline-block mb-8 sm:mb-10">
      {{ $t("search.title", "Wissensdatenbank") }}
    </h2>

    <div class="mb-8 sm:mb-10 flex flex-col sm:flex-row gap-3 sm:gap-4 font-mono">
      <input v-model="searchQuery" @keyup.enter="performSearch" type="text" placeholder="Wonach suchst du?"
        class="border-2 border-black p-3 sm:p-4 w-full focus:outline-none focus:ring-0 bg-white text-black text-sm sm:text-base" />
      <button @click="performSearch" :disabled="pending || !searchQuery.trim()"
        class="border-2 border-black bg-black text-white px-6 py-3 sm:px-8 sm:py-4 font-bold uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white text-sm sm:text-base">
        Suchen
      </button>
    </div>

    <div v-if="pending" class="font-mono text-sm sm:text-base">
      <p>Suche läuft...</p>
    </div>

    <div v-else-if="error" class="font-mono text-red-500 text-sm sm:text-base">
      <p>Fehler bei der Suche: {{ error.message }}</p>
    </div>

    <div v-else-if="hasSearched && results.length === 0" class="font-mono text-sm sm:text-base">
      <p>Keine Ergebnisse gefunden.</p>
    </div>

    <div v-else-if="results.length > 0" class="grid gap-4 sm:gap-6">
      <div v-for="result in results" :key="result.id"
        class="border-2 border-black p-4 sm:p-6 bg-white text-black flex flex-col justify-between font-mono">

        <div>
          <h3 class="text-lg sm:text-xl font-bold uppercase mb-2 break-words">
            {{ result.tags.title }}
          </h3>

          <p class="text-xs sm:text-sm mb-3 break-words">
            <strong>Tags:</strong>
            <span v-if="result.tags.metadata?.tags?.length">
              {{ result.tags.metadata.tags.join(', ') }}
            </span>
            <span v-else>Keine</span>
          </p>

          <p class="text-xs sm:text-sm line-clamp-3 text-gray-700 break-words">
            {{ result.tags.content }}
          </p>
        </div>

        <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
          <a :href="`/notes/${result.id}`" class="underline uppercase text-xs sm:text-sm" target="_self">
            {{ $t("search.view_note", "Notiz lesen") }}
          </a>
          <div
            class="text-xs sm:text-sm font-bold bg-gray-100 sm:bg-transparent px-2 py-1 sm:p-0 border border-black sm:border-transparent">
            Match: {{ (result.score * 100).toFixed(0) }}%
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface SearchResult {
  id: string;
  score: number;
  tags: {
    title: string;
    content: string;
    metadata: {
      tags: string[];
      source: string | null;
    };
  };
}

const searchQuery = ref("");
const results = ref<SearchResult[]>([]);
const pending = ref(false);
const error = ref<any>(null);
const hasSearched = ref(false);

const performSearch = async () => {
  if (!searchQuery.value.trim()) return;

  pending.value = true;
  error.value = null;
  hasSearched.value = true;

  try {
    const response: any = await $fetch("/api/wdb/search", {
      method: "POST",
      body: {
        query: searchQuery.value,
        limit: 5,
      },
    });

    if (response?.status === "success") {
      results.value = response.results;
    }
  } catch (err) {
    console.error(err);
    error.value = err;
    results.value = [];
  } finally {
    pending.value = false;
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>