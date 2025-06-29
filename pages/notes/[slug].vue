<template>
  <main class="max-w-5xl mx-auto px-6 py-16">
    <div>
      <div class="py-3">
        <h2 class="text-2xl">{{ heading }}</h2>
      </div>
      <ContentRenderer v-if="note" :value="note" />
      <div v-else>Home not found</div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug;

const heading = computed(() => {
  return typeof slug === "string" && slug.length > 0
    ? slug.at(0)?.toUpperCase() + slug.slice(1)
    : "";
});

const { data: note } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

useSeoMeta({
  title: note.value?.title,
  description: note.value?.description,
});

useHead({
  title: `Notiz: ${slug}`,
});
</script>
