<template>
  <section class="mt-20 max-w-5xl mx-auto">
    <h2 class="text-3xl uppercase border-b-2 border-black pb-2 mb-6">Skills</h2>

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-6 text-base leading-relaxed font-mono tracking-wide"
    >
      <div
        v-for="category in skillCategories"
        :key="category.title"
        class="border border-black p-4"
      >
        <h3 class="text-xl uppercase mb-2 border-b border-black pb-1">
          {{ category.title }}
        </h3>
        <ul class="list-square pl-4">
          <li v-for="skill in category.skills" :key="skill">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skillCategories = [
  {
    title: "🧠 Mathematik & Statistik",
    skills: [
      "Lineare Algebra",
      "Wahrscheinlichkeitsrechnung",
      "Hypothesentests",
      "Stochastik",
      "Regression & Clustering",
    ],
  },
  {
    title: "💻 Programmieren",
    skills: ["Python", "Java", "TypeScript", "SQL"],
  },
  {
    title: "📊 Data Science & ML",
    skills: ["pandas", "scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
  },
  {
    title: "🛠️ Tools & Frameworks",
    skills: ["Flask - FastAPI", "Spring Boot", "Docker", "Git", "Redis"],
  },
];
</script>

<style scoped>
.list-square {
  list-style-type: square;
}
</style>
