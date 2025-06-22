<template>
  <section id="projects" class="max-w-5xl mx-auto px-6 py-16">
    <h2 class="text-3xl md:text-4xl font-bold uppercase inline-block mb-10">
      {{ $t("projects.title") }}
    </h2>

    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="project in projects"
        :key="project.title"
        class="border-2 border-black p-6 bg-white text-black flex flex-col justify-between font-mono"
      >
        <div>
          <h3 class="text-xl font-bold uppercase mb-2">{{ project.title }}</h3>
          <p class="text-sm mb-2">
            <strong>Stack:</strong> {{ project.stack }}
          </p>
          <p class="text-sm">
            {{ project.description }}
          </p>
        </div>
        <div class="mt-4">
          <a
            :href="project.link"
            class="underline uppercase text-sm"
            target="_blank"
            rel="noopener"
          >
            {{ $t("projects.view_project") }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    title: "Artikel-Empfehlungssystem",
    stack: "Python, scikit-learn, Flask, Redis",
    description:
      "Hybrides Empfehlungssystem für Nachrichteninhalte – kombiniert Content-Filtering und User-Verhalten.",
    link: "https://github.com/deinname/artikel-empfehlung",
  },
  {
    title: "Monte-Carlo Portfolio Simulation",
    stack: "Python, NumPy, Matplotlib",
    description:
      "Risikosimulation für Finanzportfolios – Fokus auf Value-at-Risk und Expected Shortfall.",
    link: "#",
  },
];
</script>
