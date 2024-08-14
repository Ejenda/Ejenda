<script lang="ts" setup>
import { format, sub } from "date-fns";
const { mutate, isError, isSuccess } = addAssignment();

const props = defineProps({
  subjectId: {
    type: String,
  },
});

const emit = defineEmits(["success"]);

function createAssignment() {
  mutate({
    ...assn.value,
    subjectId: props.subjectId,
  });
}
watch(isSuccess, (value) => {
  if (value) {
    useModal().close();
    emit("success");
  }
});
const assn = ref({
  name: "",
  tags: [],
  due: new Date(),
});
const tags = [
  "Long Term Assignment",
  "Physical",
  "Online",
  "Reading",
  "Imported",
  "Notice",

];
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <h2>Add Assignment</h2>
      </template>
      <div class="space-y-4 w-60">
        <!-- create new assn-->
        <UFormGroup label="Name">
          <UInput v-model="assn.name" placeholder="Assignment name"
        /></UFormGroup>
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
            </template> </UPopover
        ></UFormGroup>
        <USelectMenu
          searchable
          searchable-placeholder="Search tags..."
          class="w-full lg:w-48"
          placeholder="Select tags"
          multiple
          v-model="assn.tags"
          :options="tags"
        ></USelectMenu>
      </div>
      <template #footer>
        <UButton @click="createAssignment" class="mt-2">Add</UButton></template
      >
    </UCard>
  </UModal>
</template>
