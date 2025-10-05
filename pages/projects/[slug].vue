<template>
  <section class="max-w-5xl mx-auto px-6 py-16">
    <div v-if="pending" class="font-mono">Lade Projekt...</div>
    <div v-else-if="error" class="font-mono text-red-600">
      Fehler: {{ error.message }}
    </div>

    <div v-else-if="project">
      <h1
        class="text-3xl md:text-4xl font-bold uppercase inline-block mb-4 font-mono"
      >
        {{ project.title }}
      </h1>
      <p v-if="formattedDate" class="font-mono text-sm text-gray-600 mb-10">
        Erstellt am: {{ formattedDate }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div class="font-mono space-y-4">
          <p class="font-bold">{{ project.short_description }}</p>
          <p>{{ project.detailed_description }}</p>
        </div>

        <div class="md:col-start-2 md:row-start-1 md:row-span-2">
          <NuxtImg
            :src="project.title_image_url"
            :alt="project.title"
            class="w-full h-auto object-cover"
          />
        </div>

        <div class="flex items-center gap-4 flex-wrap">
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block border-2 border-black bg-white text-black font-bold uppercase py-2 px-5 font-mono transition-all duration-200 hover:bg-black hover:text-white"
          >
            GitHub
          </a>
          <a
            v-if="project.pdf"
            target="_blank"
            :href="project.pdf"
            rel="noopener noreferrer"
            class="inline-block border-2 border-black bg-white text-black font-bold uppercase py-2 px-5 font-mono transition-all duration-200 hover:bg-black hover:text-white"
          >
            PDF
          </a>
        </div>
      </div>
    </div>

    <div v-else class="font-mono">
      <p>Projekt nicht gefunden oder keine ID in der URL angegeben.</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Project } from "~/types/database";
import { computed } from "vue";

const route = useRoute();

const {
  data: projects,
  pending,
  error,
} = await useFetch<Project[]>("/api/projects");

const project = computed(() => {
  const queryId = route.query.id as string;
  if (!queryId || !projects.value) return undefined;
  return projects.value.find((p) => p.id === Number(queryId));
});

const formattedDate = computed(() => {
  if (project.value?.created_at) {
    return new Date(project.value.created_at).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return "";
});
</script>
