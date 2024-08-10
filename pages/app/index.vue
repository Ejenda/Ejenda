<script setup lang="ts">
import { titleCase } from "scule";
import { format } from "date-fns";

definePageMeta({
  middleware: "auth",
});
const { data, isPending } = queryAssignments();
const { mutate, isError } = addAssignment();
const { mutate: createSubjectMut } = createSubject();

const tabsLinks = [
  { label: "Subjects", to: "/app", icon: "i-heroicons-academic-cap" },
  { label: "Todo", to: "/app/todo", icon: "i-heroicons-check-circle" },
  { label: "Calendar", to: "/app/calendar", icon: "i-heroicons-calendar" },
];
const currentSubjectId = ref(data.value?.[0].id);
const links = computed(() => {
  let subjectLinks =
    data.value?.map((subject) => {
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
    }) ?? [];

  return [
    {
      label: "New subject",
      icon: "i-heroicons-plus-circle",
      click: () => {
        const name = prompt("Enter subject name");
        if (name) {
          createSubjectMut({ name });
        }
      },
    },
    ...subjectLinks,
  ];
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
const createAssn = () => {
  mutate(assnWithSubject.value);
  if (!isError.value) {
    assn.value = {
      name: "",
      tags: [],
      due: new Date(),
    };
  }
};
const columns = [
  { key: "title", label: "Name" },
  { key: "due", label: "Due" },
  { key: "tags", label: "Tags" },
  { key: "actions" },
];
const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Mark as done",
      icon: "i-heroicons-check-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
</script>
<template>
  <UHorizontalNavigation :links="tabsLinks"></UHorizontalNavigation>
  <div class="flex">
    <UVerticalNavigation :links="links" />

    <div>
      <div>
        <!-- create new assn-->
         <UFormGroup label="Name">
        <UInput v-model="assn.name" placeholder="Assignment name" /></UFormGroup>
        <UFormGroup label="Due Date">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="format(assn.due, 'd MMM, yyy')"
          />

          <template #panel="{ close }">
            <DatePicker
              v-model="assn.due"
              is-required
              @close="close"
              :min-date="new Date()"
            />
          </template>
        </UPopover></UFormGroup>
        <UButton @click="createAssn" class="mt-2">Create new assignment</UButton>
      </div>
      <UTable
        grow
        :columns="columns"
        :rows="currentSubject?.assignments"
        :loading="isPending"
      >
        <template #due-data="{ row }">
          <span>{{ format(new Date(row.due), "MMMM d, yyy") }}</span>
        </template>
        <template #tags-data="{ row }">
          <div v-for="tag of row.tags" :key="tag">
            <UBadge>{{ tag }}</UBadge>
          </div>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
  
    </div>
  </div>
</template>
