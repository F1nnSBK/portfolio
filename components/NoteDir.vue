<template>
  <nav class="notes-directory">
    <h2 class="text-2xl font-bold mb-4">Alle Notizen</h2>

    <p v-if="pending" class="text-gray-500">Notizen werden geladen...</p>

    <p v-else-if="error" class="text-red-500">
      Fehler beim Laden der Notizen: {{ error.message }}
    </p>

    <ul v-else-if="notes && notes.length" class="list-disc pl-5">
      <li v-for="note in notes" :key="note._path">
        <NuxtLink :to="note._path" class="text-blue-600 hover:underline">
          {{ note.title || note._slug }}
        </NuxtLink>
        <span v-if="note.description" class="text-gray-600 text-sm ml-2">
          - {{ note.description }}
        </span>
      </li>
    </ul>
    <p v-else class="text-gray-500">Es wurden keine Notizen gefunden.</p>
  </nav>
</template>

<script setup lang="ts">
// Typisierung der Note
interface Note {
  _path: string;
  _slug?: string;
  title?: string;
  description?: string;
  _partial?: boolean;
}

// Direkter Aufruf von useAsyncData und queryCollection in der Komponente
const {
  data: notes,
  pending,
  error,
  refresh,
} = await useAsyncData<Note[]>("all-notes-collection", async () => {
  let allItems: Note[] = []; // Initialisiere allItems als leeres Array

  try {
    // queryCollection direkt aufrufen
    // Der Rückgabewert könnte ein Array sein, oder undefined/null im Fehlerfall.
    // Wir müssen hier sehr vorsichtig sein.
    const result = await queryCollection<Note>("notes");

    // Überprüfen, ob 'result' tatsächlich ein Array ist, bevor wir es verwenden
    if (Array.isArray(result)) {
      allItems = result;
    } else {
      // Logge zur Fehlersuche, wenn result kein Array ist
      console.warn("queryCollection did not return an array:", result);
    }
  } catch (e: any) {
    // Fehler beim Abrufen abfangen
    console.error("Error fetching collection:", e);
    // Optional: Wirf den Fehler erneut, damit useAsyncData ihn fängt
    throw e;
  }

  // Manuelle Filterung der _partial-Dateien
  // Da allItems jetzt garantiert ein Array ist (oder leer), funktioniert filter
  const filteredItems = allItems.filter((item) => item._partial !== true);

  // Manuelle Sortierung nach Titel
  const sortedItems = filteredItems.sort((a, b) => {
    const titleA = a.title || a._slug || "";
    const titleB = b.title || b._slug || "";
    return titleA.localeCompare(titleB);
  });

  return sortedItems;
});

// SEO Meta bleibt hier
useSeoMeta({
  title: "Notiz-Verzeichnis",
  description: "Ein Verzeichnis aller verfügbaren Notizen und Artikel.",
});
</script>

<style scoped>
.notes-directory {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.notes-directory ul {
  line-height: 1.6;
}
</style>
