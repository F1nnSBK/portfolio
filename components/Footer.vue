<template>
  <footer
    class="border-t-2 border-black px-4 py-6 mt-12 bg-white font-mono text-sm"
  >
    <div
      class="max-w-screen-md mx-auto flex flex-col sm:flex-row justify-between gap-6"
    >
      <div>
        <p class="uppercase font-bold tracking-wide mb-2">
          {{ $t("footer.title") }}
        </p>
        <p class="leading-relaxed">
          {{ $t("footer.description") }}
        </p>
        <p>
          <a class="text-blue-600" href="mailto:f.hertsch@gmx.de"
            >📧 {{ cleanEmail }}</a
          >
        </p>
      </div>

      <div>
        <p class="uppercase font-bold tracking-wide mb-2">
          {{ $t("footer.links") }}
        </p>
        <ul class="space-y-1">
          <li>
            <a
              href="https://github.com/F1nnSBK"
              target="_blank"
              class="hover:underline"
              >GitHub</a
            >
          </li>
          <li>
            <a
              href="https://linkedin.com/in/deinname"
              target="_blank"
              class="hover:underline"
              >LinkedIn</a
            >
          </li>
          <li>
            <NuxtLink to="/impressum" class="hover:underline">{{
              $t("footer.legal")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/datenschutz" class="hover:underline">{{
              $t("footer.data")
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 text-center text-xs text-gray-500">
      © {{ new Date().getFullYear() }} · {{ $t("footer.copyright") }}
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const cleanEmail = computed(() => {
  return t("footer.email").replace("[at]", "@");
});
</script>

<style></style>
