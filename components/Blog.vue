<template>
  <section class="max-w-5xl mx-auto px-6 py-16">
    <template v-if="post">
      <h2 class="text-3xl md:text-4xl font-bold uppercase inline-block mb-2 text-gray-900">
        {{ post.title }}
      </h2>
      <p v-if="post.subtitle" class="text-lg text-gray-500 mt-2 mb-4 italic">
        {{ post.subtitle }}
      </p>
      <div class="flex gap-4 text-sm text-teal-600 font-medium mb-12">
        <span>{{ formatDate(post.created_at) }}</span>
        <span v-if="post.updated_at !== post.created_at">
          · bearbeitet {{ formatDate(post.updated_at) }}
        </span>
      </div>

      <div class="relative border-l-2 border-gray-200 pl-8">
        <div class="absolute -left-[0.4rem] top-1 w-3 h-3 rounded-full bg-teal-500 border-2 border-white" />
        <p
          v-for="(paragraph, i) in paragraphs"
          :key="i"
          class="text-gray-700 leading-relaxed mb-6 text-base"
        >
          {{ paragraph }}
        </p>
      </div>
    </template>

    <div v-else-if="status === 'pending'" class="text-sm text-gray-400 py-12">
      Lädt...
    </div>

    <div v-else-if="error" class="text-sm text-red-500 py-12">
      Post nicht gefunden.
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

const props = defineProps<{
  slug?: string
}>()

const { data: post, error, status } = await useFetch<BlogPost>('/api/projects/blog', {
  query: props.slug ? { slug: props.slug } : {}
})

const paragraphs = computed(() =>
  post.value?.content.split('\n\n').filter(Boolean) ?? []
)

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
</script>