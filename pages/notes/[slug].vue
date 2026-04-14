<template>
  <main class="max-w-5xl mx-auto px-6 py-16 font-mono">
    <div v-if="pending" class="text-xl font-bold uppercase animate-pulse">
      Lade Notiz...
    </div>

    <div v-else-if="error || !note"
      class="text-xl font-bold uppercase text-red-500 border-4 border-red-500 p-8 bg-red-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      Notiz nicht gefunden (404)
    </div>

    <div v-else class="border-4 border-black p-8 bg-white text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">

      <div class="mb-10 border-b-4 border-black pb-8">
        <h1 class="text-2xl md:text-4xl font-black uppercase mb-6 tracking-tighter">
          {{ note.tags?.title || 'Ohne Titel' }}
        </h1>

        <div class="text-sm space-y-2 bg-gray-100 p-4 border-2 border-black inline-block">
          <p v-if="note.tags?.metadata?.tags?.length">
            <span class="font-bold">TAGS:</span> {{ note.tags.metadata.tags.join(' // ') }}
          </p>
          <p v-if="note.tags?.metadata?.source">
            <span class="font-bold">QUELLE:</span> {{ note.tags.metadata.source }}
          </p>
        </div>
      </div>

      <div class="content-area text-md">
        <MathText :text="cleanContent" />
      </div>

    </div>

    <div class="mt-12">
      <NuxtLink to="/wdb"
        class="inline-block border-2 border-black bg-black text-white px-6 py-3 font-bold uppercase hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
        &larr; Zurück zur Suche
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: note, pending, error } = await useAsyncData(`note-${slug}`, () => {
  return $fetch<any>(`/api/wdb/notes/${slug}`);
});

const cleanContent = computed(() => {
  if (!note.value?.tags?.content) return "";

  let text = note.value.tags.content;
  return text.replace(/^#finance\s+/i, "").trim();
});

useSeoMeta({
  title: () => note.value?.tags?.title ? `WDB | ${note.value.tags.title}` : 'Notiz wird geladen...',
});
</script>