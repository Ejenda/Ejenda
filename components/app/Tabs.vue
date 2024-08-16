<script setup lang="ts">
const tabsLinks = [
  { label: "Subjects", to: "/app", icon: "i-heroicons-academic-cap" },
  { label: "Todo", to: "/app/todo", icon: "i-heroicons-check-circle" },
  {
    label: "Calendar",
    to: "/app/calendar",
    icon: "i-heroicons-calendar",
  },
];
</script>
<template>
  <UHorizontalNavigation
    :links="tabsLinks"
    class="border-b border-gray-200 dark:border-gray-700"
  ></UHorizontalNavigation>
</template>
