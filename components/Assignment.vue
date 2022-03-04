<template>
  <li
    class="my-2 rounded-sm border border-gray-100 bg-white bg-opacity-75 p-1 text-gray-800 shadow-sm transition-all dark:bg-gray-300 dark:bg-opacity-50"
    :class="{
      '!bg-amber-500': $date.isToday(new Date(assignment.date)),
      '!bg-red-800 !text-white': $date.isLate(new Date(assignment.date)),
    }"
  >
    <div class="flex justify-between">
      <div class="block">
        <p
          :class="{ 'line-through': assignment.tags.includes('Done') }"
          v-show="!editing"
        >
          {{ assignment.name }}
        </p>
        <input
          ref="name"
          v-model="newText"
          v-show="editing"
          class="flex-1 bg-transparent px-2"
        />

        <p
          v-if="assignment.date"
          class="italic text-gray-400 dark:text-gray-600"
        >
          Due: {{ new Date(assignment.date).toLocaleDateString() }}
        </p>
        <p v-else class="italic text-gray-400 dark:text-gray-600">
          No due date
        </p>
      </div>
      <div class="flex" v-if="!disableActions">
        <button
          class="m-1 rounded-md bg-white px-2 py-1 text-gray-800 print:hidden"
          @click="editName"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            v-show="!editing"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            /></svg
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            v-show="editing"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button
          class="m-1 rounded-md bg-white px-2 py-1 text-gray-800 print:hidden"
          @click="completeAssignment"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>

        <button
          class="m-1 rounded-md bg-white px-2 py-1 text-gray-800 print:hidden"
          @click="deleteItem()"
          v-if="!disableDelete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
    <v-select
      :options="possibleTags"
      :value="assignment.tags"
      @input="editEvent($event, 'tags')"
      multiple
    ></v-select>
  </li>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  props: ["assignment", "subject", "disableActions"],
  data() {
    return {
      editing: false,
      newText: "",
      possibleTags: [
        "Long Term Assignment",
        "Physical",
        "Google Classroom",
        "Online",
        "Done",
        "Reading",
        "Imported",
        "Notice",
      ],
    };
  },
  methods: {
    ...mapActions({
      editAssignment: "assignments/editAssignment",
      deleteAssignment: "assignments/deleteAssignment",
    }),

    completeAssignment() {
      let done = "Done";
      var index = this.assignment.tags.indexOf(done);
      let tags = Array.from(this.assignment.tags);
      if (index === -1) {
        tags.push(done);
      } else {
        tags.splice(index, 1);
      }
      this.edit("tags", tags);
    },
    createOption(text) {
      // TODO: This logic breaks on reload, FIX!!!
      if (this.assignment.tags.includes(text)) return;
      this.possibleTags.push(text);
      this.assignment.tags.push(text);
    },
    editName() {
      if (!this.editing) {
        this.newText = this.assignment.name;
        this.$nextTick(() => this.$refs.name.focus());
      } else {
        this.edit("name", this.newText);
      }
      this.editing = !this.editing;
    },
    editEvent(e, toEdit) {
      console.log("event", e);
      this.edit(toEdit, e);
    },
    edit(toEdit = "name", value) {
      let assignment = Object.assign({}, this.assignment);
      assignment[toEdit] = value;
      this.editAssignment({ subject: this.subject, assignment });
    },
    async deleteItem() {
      let { id } = this.assignment;
      this.deleteAssignment({ id, subject: this.subject });
    },
  },
};
</script>
<style>
/* Overriding v-select styles */
.vs__selected {
  @apply !bg-red-300 !p-2 !text-white;
}
.vs__selected-options {
  @apply !p-1;
}
.vs__deselect > svg {
  @apply mx-1 fill-current text-white;
}
.vs__dropdown-option {
  @apply !p-2;
}
</style>
