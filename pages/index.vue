<template>
  <div
    class="text-black leading-relaxed [text-shadow:0_2px_6px_rgba(0,0,0,0.1)]"
  >
    <section>
      <Hero />
    </section>
    <section>
      <Projects />
    </section>
    <section>
      <Skills />
    </section>
    <section>
      <NoteDir />
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();
const locale = t.locale;
const switchLocale = (event) => {
  locale.value = event.target.value;
};
</script>
