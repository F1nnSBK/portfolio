<!-- components/MathText.vue -->
<template>
  <span>
    <template v-for="(segment, i) in segments" :key="i">
      <!-- Block-Math: $$...$$ -->
      <span v-if="segment.type === 'block'" class="block my-4 overflow-x-auto" v-html="segment.html" />
      <!-- Inline-Math: $...$ -->
      <span v-else-if="segment.type === 'inline'" v-html="segment.html" />
      <!-- Normaler Text -->
      <span v-else>{{ segment.text }}</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
import katex from 'katex'

const props = defineProps<{ text: string }>()

type Segment =
  | { type: 'text'; text: string }
  | { type: 'inline'; html: string }
  | { type: 'block'; html: string }

const segments = computed<Segment[]>(() => {
  const result: Segment[] = []
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(props.text)) !== null) {
    if (match.index > lastIndex) {
      result.push({ type: 'text', text: props.text.slice(lastIndex, match.index) })
    }

    const raw = match[0]
    const isBlock = raw.startsWith('$$')
    const latex = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim()

    try {
      const html = katex.renderToString(latex, {
        displayMode: isBlock,
        throwOnError: false,
      })
      result.push({ type: isBlock ? 'block' : 'inline', html })
    } catch {
      result.push({ type: 'text', text: raw })
    }

    lastIndex = match.index + raw.length
  }

  if (lastIndex < props.text.length) {
    result.push({ type: 'text', text: props.text.slice(lastIndex) })
  }

  return result
})
</script>