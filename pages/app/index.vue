<script setup lang="ts">
import { titleCase } from "scule";
definePageMeta({
  middleware: "auth",
});
const { data, isPending } = queryAssignments();
const tabsLinks = [
  { label: "Subjects", to: "/app", icon: "i-heroicons-academic-cap" },
  { label: "Todo", to: "/app/todo", icon: "i-heroicons-check-circle" },
  { label: "Calendar", to: "/app/calendar", icon: "i-heroicons-calendar" },
];
const currentSubjectId = ref(data.value?.[0].id);
const links = computed(() => {
  return data.value?.map((subject) => {
    const done = subject.assignments.filter(
      (assignment) => !assignment.tags?.includes("done")
    ).length;
    const missing = subject.assignments.some(
      (assignment) =>
        !assignment.due || done || new Date(assignment.due) < new Date()
    );
    return {
      label: titleCase(subject.name, { normalize: true }),
      click: () => {
        currentSubjectId.value = subject.id;
      },
      active: subject.id === currentSubjectId.value,
      badge: {
        label: done,
        variant: missing ? "subtle" : "soft",
        color: missing ? "red" : "white",
      },
    };
  });
});
const currentSubject = computed(() =>
  data.value?.find((subject) => subject.id === currentSubjectId.value)
);
const assn = ref({
  name: "",
  tags: [],
  due: new Date(),
});
const assnWithSubject = computed(() => ({
  ...assn.value,
  subjectId: currentSubjectId.value,
}));
const { mutate } = addAssignment();
</script>
<template>
  <UHorizontalNavigation :links="tabsLinks"></UHorizontalNavigation>
  <div class="flex">
    <UVerticalNavigation :links="links" />

    <div>
      <div>
        <!-- create new assn-->
        <UInput v-model="assn.name" placeholder="Assignment name" />

        <div @click="mutate(assnWithSubject)">Create new assignment</div>
      </div>
      <div
        v-for="assignment in currentSubject?.assignments"
        :key="assignment.id"
        class="p-4 border rounded-md"
      >
        <h2>{{ assignment.title }}</h2>
        <div v-for="tag of assignment.tags" :key="tag">
          <span>{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
