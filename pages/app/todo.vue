<script setup lang="ts">
const tabsLinks = [
  { label: "Subjects", to: "/app", icon: "i-heroicons-academic-cap" },
  { label: "Todo", to: "/app/todo", icon: "i-heroicons-check-circle" },
  { label: "Calendar", to: "/app/calendar", icon: "i-heroicons-calendar" },
];
const { data, isPending } = queryAssignments();
const cards = computed(() => {
  // sort into array with no date, missing, due today, due this week, due later
  const categories = [
    { label: "No date", assignments: [] },
    { label: "Missing", assignments: [] },
    { label: "Due today", assignments: [] },
    { label: "Due this week", assignments: [] },
    { label: "Due later", assignments: [] },
  ];
  const isToday = (date) =>
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear();
  const isThisWeek = (date) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return (
      date.getTime() >= today.getTime() && date.getTime() < nextWeek.getTime()
    );
  };
  const isMissing = (date) => {
    return (
      new Date(date).getDate() > new Date().getDate() &&
      new Date(date).getMonth() >= new Date().getMonth() &&
      new Date(date).getFullYear() >= new Date().getFullYear()
    );
  };

  const assignments = data.value?.map((subject) => subject.assignments).flat();
  assignments?.forEach((assignment) => {
    if (!assignment.due) {
      categories[0].assignments.push(assignment);
    } else if (assignment.tags?.includes("done")) {
      return;
    } else if (isMissing(assignment.due)) {
      categories[1].assignments.push(assignment);
    } else if (isToday(new Date(assignment.due))) {
      categories[2].assignments.push(assignment);
    } else if (isThisWeek(new Date(assignment.due))) {
      categories[3].assignments.push(assignment);
    } else {
      categories[4].assignments.push(assignment);
    }
  });
  return categories;
});
</script>
<template>
  <UHorizontalNavigation :links="tabsLinks"></UHorizontalNavigation>
  <div v-for="card of cards" :key="card.label">
    <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-200">
      {{ card.label }}
    </h2>
    <div class="grid grid-cols-1 gap-4 mt-4">
      <div v-for="assignment of card.assignments" :key="assignment.id">
        {{ assignment.title }}
      </div>
    </div>
  </div>
</template>
