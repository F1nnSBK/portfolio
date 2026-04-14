<template>
  <section id="search" class="max-w-5xl mx-auto px-6 py-16">
    <h2 class="text-3xl md:text-4xl font-bold inline-block mb-10">
      {{ $t("search.title", "Wissensdatenbank") }}
    </h2>

    <div class="mb-10 flex flex-col md:flex-row gap-4 font-mono">
      <input v-model="searchQuery" @keyup.enter="performSearch" type="text"
        placeholder="Wonach suchst du?"
        class="border-2 border-black p-4 w-full focus:outline-none focus:ring-0 bg-white text-black" />
      <button @click="performSearch" :disabled="pending || !searchQuery.trim()"
        class="border-2 border-black bg-black text-white px-8 py-4 font-bold uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white">
        Suchen
      </button>
    </div>

    <div v-if="pending" class="font-mono">
      <p>Suche läuft...</p>
    </div>

    <div v-else-if="error" class="font-mono text-red-500">
      <p>Fehler bei der Suche: {{ error.message }}</p>
    </div>

    <div v-else-if="hasSearched && results.length === 0" class="font-mono">
      <p>Keine Ergebnisse gefunden.</p>
    </div>

    <div v-else-if="results.length > 0" class="grid gap-6">
      <div v-for="result in results" :key="result.id"
        class="border-2 border-black p-6 bg-white text-black flex flex-col justify-between font-mono">
        <div>
          <h3 class="text-xl font-bold uppercase mb-2">{{ result.tags.title }}</h3>

          <p class="text-sm mb-4">
            <strong>Tags:</strong>
            <span v-if="result.tags.metadata?.tags?.length">
              {{ result.tags.metadata.tags.join(', ') }}
            </span>
            <span v-else>Keine</span>
          </p>

          <p class="text-sm line-clamp-3 text-gray-700">
            {{ result.tags.content }}
          </p>
        </div>

        <div class="mt-6 flex justify-between items-center">
          <a :href="`/notes/${result.id}`" class="underline uppercase text-sm" target="_self">
            {{ $t("search.view_note", "Notiz lesen") }}
          </a>
          <div class="text-sm font-bold">
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