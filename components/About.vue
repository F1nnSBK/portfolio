<template>
  <section id="resume" class="max-w-5xl mx-auto px-6 py-16">
    <h2
      class="text-3xl md:text-4xl font-bold uppercase inline-block mb-12 text-gray-900"
    >
      {{ $t("resume.title") }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="md:col-span-2">
        <div class="mb-12">
          <h3 class="text-2xl font-semibold mb-6 text-gray-800">
            {{ $t("resume.experience.title") }}
          </h3>
          <div class="relative border-l-2 border-gray-200 pl-8 space-y-10">
            <div
              v-for="(job, index) in experience"
              :key="index"
              class="timeline-item"
            >
              <p class="text-sm font-medium text-teal-600">{{ job.period }}</p>
              <h4 class="relative text-xl font-bold text-gray-900 mt-1">
                {{ job.role }}
              </h4>
              <p class="text-md font-semibold text-gray-600">
                {{ job.company }}
              </p>
              <ul class="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                <li v-for="(task, i) in job.tasks" :key="i">{{ task }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-semibold mb-6 text-gray-800">
            {{ $t("resume.education.title") }}
          </h3>
          <div class="relative border-l-2 border-gray-200 pl-8 space-y-10">
            <div
              v-for="(edu, index) in education"
              :key="index"
              class="timeline-item"
            >
              <p class="text-sm font-medium text-teal-600">{{ edu.period }}</p>
              <h4 class="relative text-xl font-bold text-gray-900 mt-1">
                {{ edu.degree }}
              </h4>
              <p class="text-md font-semibold text-gray-600">
                {{ edu.institution }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-1">
        <h3 class="text-2xl font-semibold mb-6 text-gray-800">
          {{ $t("resume.skills.title") }}
        </h3>
        <div class="space-y-6">
          <div v-for="(category, index) in skills" :key="index">
            <h4 class="text-lg font-bold text-gray-700 mb-3">
              {{ category.title }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in category.items"
                :key="skill"
                class="bg-gray-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface TimelineItem {
  period: string;
  role?: string;
  company?: string;
  tasks?: string[];
  degree?: string;
  institution?: string;
}

interface SkillCategory {
  title: string;
  items: string[];
}

const experience: TimelineItem[] = [
  {
    period: "Okt 2024 – Heute",
    role: "Dualer Student Data Science & Ki",
    company: "Schwäbischer Verlag GmbH & Co. KG Drexler, Gessler",
    tasks: [
      "Erstellung von Business Intelligence Berichten mit Microsoft PowerBi",
      "Planung und Konzeption eines prototypischen Empfehlungssystem für Online Nachrichtenartikel",
      "Unterstützung bei der Entwicklung zahlreicher Datenpipelines",
    ],
  },
];

const education: TimelineItem[] = [
  {
    period: "Okt 2024 – Sept 2027",
    degree: "B.Sc. in Data Science & Ki",
    institution: "DHBW Ravensburg",
  },
  {
    period: "Sept 21 - Jul 2024",
    degree: "Allgemeine Hochschulreife",
    institution: "Edith-Stein-Schule Ravensburg Biotechnologische Richtung",
  },
];

const skills: SkillCategory[] = [
  {
    title: "Frontend",
    items: ["JavaScript", "TypeScript", "Vue.js", "Nuxt.js", "Tailwind CSS"],
  },
  {
    title: "Backend & Datenbanken",
    items: [
      "FastAPI / Flask",
      "Spring Boot",
      ".NET / Blazor",
      "SQL",
      "BigQuery",
    ],
  },
  {
    title: "Tools & Methoden",
    items: ["Git", "Vite", "npm/yarn", "Figma", "Scrum", "REST APIs"],
  },
];
</script>

<style scoped>
.timeline-item h4::before {
  content: "";
  position: absolute;
  left: -2.5rem;
  top: 50%;
  transform: translateY(-50%);

  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: teal;
  border: 2px solid white;
}
</style>
