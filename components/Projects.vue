<template>
  <section id="projects" class="max-w-5xl mx-auto px-6 py-16">
    <h2 class="text-3xl md:text-4xl font-bold uppercase inline-block mb-10">
      {{ $t("projects.title") }}
    </h2>

    <div v-if="pending">
      <p>Lade Projekte...</p>
    </div>

    <div v-else-if="error">
      <p>Fehler beim Laden der Projekte: {{ error.message }}</p>
    </div>

    <div v-else-if="projects?.length == 0">
      <p>Keine Projekte gefunden.</p>
    </div>

    <div v-else-if="projects" class="grid md:grid-cols-2 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="border-2 border-black p-6 bg-white text-black flex flex-col justify-between font-mono"
      >
        <div>
          <h3 class="text-xl font-bold uppercase mb-2">{{ project.title }}</h3>
          <p class="text-sm mb-2">
            <strong>Stack:</strong> {{ project.stack }}
          </p>
          <p class="text-sm">
            {{ project.short_description }}
          </p>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <a
            :href="project.link + '?id=' + project.id"
            class="underline uppercase text-sm"
            target="_self"
            rel="noopener noreferrer"
          >
            {{ $t("projects.view_project") }}
          </a>
          <div class="text-sm font-bold">
            Difficulty: {{ project.difficulty }}/5
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from "~/types/database";

const {
  data: projects,
  pending,
  error,
} = await useFetch<Project[]>("/api/projects");
</script>
