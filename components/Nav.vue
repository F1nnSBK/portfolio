<template>
  <nav
    v-show="showNav"
    class="w-full border-b-2 border-black px-4 py-2 flex justify-between items-center bg-white font-mono"
  >
    <div class="text-2xl font-bold uppercase tracking-wide">
      <NuxtLink to="/" class="hover:underline">{{ t("hero.title") }}</NuxtLink>
    </div>

    <ul class="flex gap-6 text-lg">
      <li>
        <NuxtLink
          to="/#about"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Über mich
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/#projects"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Projekte
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/#skills"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Skills
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/#contact"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Kontakt
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

const showNav = ref(true);

const handleScroll = () => {
  showNav.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
