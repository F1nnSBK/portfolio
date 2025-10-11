<template>
  <nav
    class="w-full border-b-2 border-black px-4 py-2 flex justify-between items-center bg-white font-mono relative"
  >
    <div class="text-2xl font-bold uppercase tracking-wide">
      <NuxtLink to="/" class="hover:underline">{{ $t("hero.title") }}</NuxtLink>
    </div>

    <!-- Desktop Nav -->
    <ul class="hidden md:flex gap-6 text-lg">
      <li>
        <NuxtLink
          to="/about"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Über mich
        </NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink
          to="/#projects"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Projekte
        </NuxtLink>
      </li> -->
      <!-- <li>
        <NuxtLink
          to="/#skills"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Skills
        </NuxtLink>
      </li> -->
      <li>
        <NuxtLink
          to="/contact"
          class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          Kontakt
        </NuxtLink>
      </li>
    </ul>

    <!-- Burger Icon (Mobile) -->
    <button
      class="md:hidden flex items-center"
      @click="isOpen = !isOpen"
      aria-label="Menü öffnen"
    >
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Mobile Nav -->
    <transition name="fade">
      <ul
        v-if="isOpen"
        class="absolute top-16 left-0 w-full bg-white border-b-2 border-black flex flex-col gap-4 px-4 py-6 md:hidden z-50"
      >
        <li>
          <NuxtLink
            to="/#about"
            class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
            @click="isOpen = false"
          >
            Über mich
          </NuxtLink>
        </li>
        <!-- <li>
          <NuxtLink
            to="/#projects"
            class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
            @click="isOpen = false"
          >
            Projekte
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/#skills"
            class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
            @click="isOpen = false"
          >
            Skills
          </NuxtLink>
        </li> -->
        <li>
          <NuxtLink
            to="/#contact"
            class="hover:bg-black hover:text-white px-2 py-1 transition-colors"
            @click="isOpen = false"
          >
            Kontakt
          </NuxtLink>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isOpen = ref(false);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
