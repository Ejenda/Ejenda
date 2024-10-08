<script setup lang="ts">
import { AddAssignmentModal, UButton } from "#components";

import { titleCase } from "scule";
import { format, sub } from "date-fns";
import { is } from "drizzle-orm";
import {useQuery} from '@tanstack/vue-query'
useHead({
  title: "Subjects",
});
definePageMeta({
  middleware: "auth",
});
const { data, isPending, suspense } = queryAssignments();

const { mutate: mutateAssn } = mutateAssignment();
const { mutate: createSubjectMut } = createSubject();
const { mutate: deleteAssignmentMut } = deleteAssignment();
const { mutate: deleteSubjectMut } = deleteSubject();

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
    ...subjectLinks,

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
  ];
});
const currentSubject = computed(() => {
  return data.value?.find((subject) => subject.id === currentSubjectId.value);
});

const modal = useModal();
function createAssn() {
  modal.open(AddAssignmentModal, {
    subjectId: currentSubjectId.value,
  });
}

const columns = [
  { key: "title", label: "Name" },
  { key: "due", label: "Due" },
  { key: "tags", label: "Tags" },
  { key: "actions" },
];
const rowItems = (row) => [
  [
    /*{
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      //click: () => markDone(row.id),
    },*/
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
      click: () => deleteAssignmentMut(row.id),
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
        click: () => confirm("are you sure?") && deleteSubjectMut(subject.id),
      },
    ],
  ];
};
const removeTag = (assignmentId: string, tagToRemove: string) => {
  const assignment = currentSubject.value?.assignments.find(
    (x) => x.id == assignmentId
  );
  mutateAssn({
    ...assignment,
    tags: assignment?.tags?.filter((x) => x !== tagToRemove),
  });
};
const addTag = (assignmentId: string, tag: string) => {
  const assignment = currentSubject.value?.assignments.find(
    (x) => x.id == assignmentId
  );
  mutateAssn({
    ...assignment,
    tags: [...(assignment?.tags || []), tag],
  });
};
const tagAddItems = (row: any) => {
  return [
    getTags()
      .filter((tag) => !row.tags.includes(tag))
      .map((tag) => ({
        label: tag,
        click: () => addTag(row.id, tag),
      })),
  ];
};  
//await suspense();

</script>
<template>
  <UContainer>
    <AppTabs />

    <div class="flex h-[calc(100vh-49px)]">
      <UVerticalNavigation
        :links="links"
        :ui="{ wrapper: 'w-64' }"
        class="border-r border-gray-200 dark:border-gray-700"
      >
        <template #badge="{ link }">
          <UBadge
            class="flex-shrink-0 ml-auto relative rounded"
            :color="link.badge?.color"
            :variant="link.badge?.variant"
            v-if="link.badge && !link.active"
            >{{ link.badge?.label }}
          </UBadge>
          <UDropdown
            :items="subjectItems(link)"
            v-if="link.active"
            class="flex-shrink-0 ml-auto relative rounded"
            size="sm"
          >
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UVerticalNavigation>

      <div class="flex flex-1 flex-col">
        <div
          class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 justify-end"
        >
          <UButton @click="createAssn">Add assignment</UButton>
        </div>
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
              <div
                class="flex flex-row gap-1 w-96 flex-wrap"
                tag="div"
                name="list"
              >
                <div v-for="tag of row.tags" :key="tag">
                  <UBadge :color="tag == 'done' ? 'green' : 'primary'"
                    >{{ tag }}
                    <UIcon
                      name="i-heroicons-x-mark"
                      class="ml-2 cursor-pointer"
                      @click="removeTag(row.id, tag)"
                    ></UIcon>
                  </UBadge>
                </div>
                <div v-for="tag of computedTags(row)" :key="tag">
                  <UBadge color="red">{{ tag }}</UBadge>
                </div>
                <UDropdown
                  :items="tagAddItems(row)"
                  :popper="{ placement: 'bottom-start' }"
                  key="addTag"
                >
                  <UBadge color="white" class="cursor-pointer"
                    ><UIcon name="i-heroicons-plus"></UIcon></UBadge
                ></UDropdown>
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
  </UContainer>
</template>
<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
