<template>
  <section class="max-w-5xl mx-auto px-6 py-16">
    <div v-if="pending" class="font-mono">Lade Projekt...</div>
    <div v-else-if="error" class="font-mono text-red-600">Fehler: {{ error.message }}</div>
    <div v-else-if="project">
      <h1 class="text-3xl md:text-4xl font-bold uppercase inline-block mb-4 font-mono">
        {{ project.title }}
      </h1>
      <p v-if="formattedDate" class="font-mono text-sm text-gray-600 mb-10">
        Erstellt am: {{ formattedDate }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <!-- Text -->
        <div class="font-mono space-y-4">
          <p class="font-bold">{{ project.short_description }}</p>
          <div class="space-y-3">
            <p v-for="(paragraph, i) in detailedParagraphs" :key="i" class="text-gray-800 leading-relaxed">
              <MathText :text="paragraph" />
            </p>
          </div>
          <div class="flex items-center gap-4 flex-wrap pt-4">
            <a
              v-if="project.github && eval_github_links(project.github)"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block border-2 border-black bg-white text-black font-bold uppercase py-2 px-5 font-mono transition-all duration-200 hover:bg-black hover:text-white"
            >GitHub</a>
            <a
              v-else-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block border-2 border-black bg-white text-black font-bold uppercase py-2 px-5 font-mono transition-all duration-200 hover:bg-black hover:text-white"
            >Link</a>
            <a
              v-if="project.pdf"
              :href="project.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block border-2 border-black bg-white text-black font-bold uppercase py-2 px-5 font-mono transition-all duration-200 hover:bg-black hover:text-white"
            >PDF</a>
          </div>
        </div>

        <!-- Bilder -->
        <div v-if="project.images?.length" class="space-y-4 md:col-start-2 md:row-start-1 md:row-span-2">
          <!-- Großes erstes Bild -->
          <img
            :src="project.images[0]"
            :alt="`${project.title} - Bild 1`"
            class="w-full h-auto object-cover"
            referrerpolicy="no-referrer"
          />
          <!-- Weitere Bilder als Grid -->
          <div
            v-if="project.images.length > 1"
            class="grid grid-cols-1 gap-2"
          >
            <img
              v-for="(img, i) in project.images.slice(1)"
              :key="i"
              :src="img"
              :alt="`${project.title} - Bild ${i + 2}`"
              class="w-full h-50 object-cover"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="font-mono">
      <p>Projekt nicht gefunden oder keine ID angegeben.</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Database } from '~/types/database.types'

type Project = Database['public']['Tables']['projects']['Row']

const route = useRoute()
const ref_link_name = ref("GitHub")
const { data: projects, pending, error } = await useFetch<Project[]>('/api/projects')

const project = computed(() => {
  const queryId = route.query.id as string
  if (!queryId || !projects.value) return undefined
  return projects.value.find((p) => p.id === Number(queryId))
})

const detailedParagraphs = computed(() =>
  project.value?.detailed_description?.split('\n\n').filter(Boolean) ?? []
)

function eval_github_links(text: string): boolean {
  const githubUrlPattern = /https?:\/\/github\.com\/[^\s]+/g
  if (!githubUrlPattern.test(text)) {
    return false
  }
  return true
}

const formattedDate = computed(() => {
  if (!project.value?.created_at) return ''
  return new Date(project.value.created_at).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>