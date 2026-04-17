<template>
  <div class="math-renderer">
    <template v-for="(segment, i) in segments" :key="i">
      <div v-if="segment.type === 'block'"
        class="my-6 p-4 border-y-2 border-black bg-gray-50 overflow-x-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        v-html="segment.html" />

      <span v-else-if="segment.type === 'inline'" class="inline-math font-sans" v-html="segment.html" />

      <span v-else-if="segment.type === 'text-inline'" class="prose-custom" v-html="segment.html" />
      <div v-else class="prose-custom" v-html="segment.html" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import katex from 'katex'
import { marked } from 'marked'

const props = defineProps<{ text: string }>()

type Segment =
  | { type: 'text'; html: string }
  | { type: 'text-inline'; html: string }
  | { type: 'inline'; html: string }
  | { type: 'block'; html: string }

function hasBlockMarkdown(text: string): boolean {
  return /^(#{1,6}\s|[-*+]\s|\d+\.\s|```|~~~|>|\|)/m.test(text)
}

function parseText(text: string): Segment {
  if (hasBlockMarkdown(text)) {
    return { type: 'text', html: marked.parse(text) as string }
  }
  const withBreaks = text.replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>')
  return { type: 'text-inline', html: marked.parseInline(withBreaks) as string }
}

const segments = computed<Segment[]>(() => {
  const result: Segment[] = []
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(props.text)) !== null) {
    if (match.index > lastIndex) {
      result.push(parseText(props.text.slice(lastIndex, match.index)))
    }

    const raw = match[0]
    const isBlock = raw.startsWith('$$')
    const latex = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim()

    try {
      const html = katex.renderToString(latex, { displayMode: isBlock, throwOnError: false })
      result.push({ type: isBlock ? 'block' : 'inline', html })
    } catch {
      result.push({ type: 'text-inline', html: raw })
    }

    lastIndex = match.index + raw.length
  }

  if (lastIndex < props.text.length) {
    result.push(parseText(props.text.slice(lastIndex)))
  }

  return result
})
</script>

<style scoped>
/* Standard CSS, um den Tailwind v4 @apply Fehler zu umgehen.
   Das erzeugt exakt den gleichen Brutalist-Look! */

:deep(.prose-custom) p {
  margin-bottom: 1rem;
  line-height: 1.625;
}

:deep(.prose-custom) strong {
  background-color: #fef08a;
  /* entspricht bg-yellow-200 */
  padding: 0 0.25rem;
  /* entspricht px-1 */
  border: 1px solid black;
}

:deep(.prose-custom) ul {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
  border-left: 4px solid black;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

:deep(.prose-custom) h4 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-decoration: underline;
  text-decoration-thickness: 4px;
}
</style>