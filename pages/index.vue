<template>
  <div
    class="text-black leading-relaxed [text-shadow:0_2px_6px_rgba(0,0,0,0.1)]"
  >
    <section>
      <Projects />
    </section>
    <section>
      <div class="border-8 border-black">
        <OU />
      </div>
      <span class="text-sm"
        ><a
          class="underline"
          href="/notebooks/ornstein_uhlenbeck.ipynb"
          download
          >Ornstein-Uhlenbeck Prozess</a
        ></span
      >
    </section>
    <section>
      <About />
    </section>

    <section>
      <DNA />
    </section>
    <!-- <section class="mt-10">
      <Blog />
    </section> -->
  </div>
</template>

<script setup>
const { t } = useI18n();
const locale = t.locale;
const switchLocale = (event) => {
  locale.value = event.target.value;
};

useSeoMeta({
  title: 'Finn Hertsch – Portfolio',
  description: 'Portfolio von Finn Hertsch – Dualer Student in Data Science & KI an der DHBW.',
})
</script>
