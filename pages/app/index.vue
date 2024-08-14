<script setup lang="ts">
import { AddAssignmentModal, UButton } from '#components'

import { titleCase } from "scule";
import { format, sub } from "date-fns";
import { is } from "drizzle-orm";

definePageMeta({
  middleware: "auth",
});
const { data, isPending } = queryAssignments();
const { mutate: mutateAssn } = mutateAssignment();
const { mutate: createSubjectMut } = createSubject();
const { mutate: deleteAssignmentMut } = deleteAssignment();
const { mutate: deleteSubjectMut } = deleteSubject();

const tabsLinks = [
  { label: "Subjects", to: "/app", icon: "i-heroicons-academic-cap" },
  { label: "Todo", to: "/app/todo", icon: "i-heroicons-check-circle" },
  {
    label: "Calendar (coming soon)",
    to: "/app/calendar",
    icon: "i-heroicons-calendar",
    disabled: true,
  },
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
        id: subject.id,
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
const currentSubject = computed(() => {
  return data.value?.find((subject) => subject.id === currentSubjectId.value);
});


/*
const createAssn = () => {
  mutate(assnWithSubject.value);
  if (!isError.value) {
    assn.value = {
      name: "",
      tags: [],
      due: new Date(),
    };
  }
};*/
const modal = useModal();
function createAssn () {
  modal.open(AddAssignmentModal, {
    subjectId: currentSubjectId.value,
  })
}

const columns = [
  { key: "title", label: "Name" },
  { key: "due", label: "Due" },
  { key: "tags", label: "Tags" },
  { key: "actions" },
];
const rowItems = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      //click: () => markDone(row.id),
    },
    {
      label: !row.tags.includes("done") ? "Mark as done" : "Mark as not done",
      icon: "i-heroicons-check-20-solid",
      click: () => markDone(row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () =>  deleteAssignmentMut(row.id),
    },
  ],
];
watch(data, () => {
  if (!currentSubject.value) {
    currentSubjectId.value = data.value?.[0].id;
  }
});
const markDone = (id: string) => {
  const assignment = toRaw(currentSubject.value)?.assignments.find(
    (assn: any) => assn.id === id
  );
  if (assignment) {
    //assignment.title += " done"; // why on earth does this work
    let tags = [...assignment.tags];
    if (tags.includes("done")) {
      tags = assignment.tags.filter((tag: string) => tag !== "done");
    } else {
      tags.push("done");
    }
    mutateAssn({
      subjectId: assignment.subjectId,
      id: assignment.id,
      tags,
      due: assignment.due,
    });
  }
};
const computedTags = (row: any) => {
  const isMissing =
    new Date(row.due).getTime() < new Date().getTime() &&
    !row.tags.includes("done");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isDueTommorow =
    new Date(row.due).getDate() === tomorrow.getDate() &&
    new Date(row.due).getMonth() === tomorrow.getMonth() &&
    new Date(row.due).getFullYear() === tomorrow.getFullYear();
  let tags = [];
  if (isMissing) {
    tags.push("missing");
  } else if (isDueTommorow) {
    tags.push("due tomorrow");
  }
  return tags;
};
const subjectItems = (subject: any) => {
  return [
    [
      /*{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => console.log("edit"),
      },*/
      {
        label: "Delete",
        icon: "i-heroicons-trash-20-solid",
        click: () => confirm('are you sure?') && deleteSubjectMut(subject.id),
      },
    ],
  ];
};
</script>
<template>
  <UHorizontalNavigation :links="tabsLinks"></UHorizontalNavigation>
  <div class="flex">
    <UVerticalNavigation :links="links" :ui="{ wrapper: 'w-64' }">
      <template #badge="{ link }">
        <UBadge
          class="flex-shrink-0 ml-auto relative rounded"
          :color="link.badge?.color"
          :variant="link.badge?.variant"
          v-if="link.badge && !link.active"
          >{{ link.badge?.label }}</UBadge
        >
        <UDropdown :items="subjectItems(link)" v-if="link.active" class="flex-shrink-0 ml-auto relative rounded" size="sm">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UVerticalNavigation>

    <div class="flex flex-1 flex-col p-2">
      <UButton @click="createAssn" class="mb-2">Add assignment</UButton>
      <div class="flex-1 flex">
        <UTable
          :columns="columns"
          :rows="currentSubject?.assignments"
          :loading="isPending"
          :ui="{ wrapper: 'flex-1' }"
          :sort="{ key: 'due', direction: 'asc' }"
        >
          <template #due-data="{ row }">
            <span>{{ format(new Date(row.due), "MMMM d, yyy") }}</span>
          </template>
          <template #tags-data="{ row }">
            <span v-if="!row.tags.length && !computedTags(row).length"
              >No tags</span
            >
            <div class="flex flex-row gap-1">
              <div v-for="tag of row.tags" :key="tag">
                <UBadge :color="tag == 'done' ? 'green' : 'primary'"
                  >{{ tag }}
                </UBadge>
              </div>
              <div v-for="tag of computedTags(row)" :key="tag">
                <UBadge color="red">{{ tag }}</UBadge>
              </div>
            </div>
          </template>
          <template #actions-data="{ row }">
            <UDropdown :items="rowItems(row)">
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
  </div>
</template>
