<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import {format} from "date-fns";
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
      new Date(date).getTime() < new Date().getTime()
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
  <UContainer>
    <AppTabs/>
  <UAccordion :items="cards">
    <template #default="{ item, index, open }">
      <UButton variant="soft" class="mb-1.5 w-full">
        <span class="truncate"> {{ item.label }}</span>
        <UBadge color="gray" class="ml-2">{{ item.assignments.length }}</UBadge>

        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template> </UButton
    ></template>
    <template #item="{ item }">
      <div v-if="!item.assignments.length">
        <p class="text-center text-gray-500">No assignments</p>
      </div>
      <div class="grid grid-cols-1 gap-4 mt-4">
        <div v-for="assignment of item.assignments" :key="assignment.id">
          <UCard>
            <template #header>
              {{ assignment.title }}
            </template>
              <div class="flex gap-2 mt-2">
                <UBadge>Due {{ format(new Date(assignment.due), "MMMM d, yyy") }}</UBadge>
                <div v-for="tag of assignment.tags" :key="tag">
                  <UBadge>{{ tag }} </UBadge>
                </div>
              </div>
          </UCard>
        </div>
      </div>
    </template>
  </UAccordion>
  </UContainer>
</template>
