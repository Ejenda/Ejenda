<template>
  <li
    class="rounded-sm bg-white bg-opacity-75 dark:bg-opacity-50 dark:bg-gray-300 text-gray-800 my-2 p-1 shadow-sm transition-all border border-gray-100"
    :class="{
      '!bg-yellow-500': $date.isToday(new Date(assignment.date)),
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
          v-model="assignment.name"
          v-show="editing"
          class="px-2 bg-transparent flex-1"
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
      <div class="flex">
        <button
          class="px-2 py-1 m-1 bg-white rounded-md text-gray-800 print:hidden"
          @click="editAssigment"
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
          class="px-2 py-1 m-1 bg-white rounded-md text-gray-800 print:hidden"
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
          class="px-2 py-1 m-1 bg-white rounded-md text-gray-800 print:hidden"
          @click="deleteItem()"
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
    <client-only>
      <TRichSelect
        :options="possibleTags"
        multiple
        v-model="assignment.tags"
        :close-on-select="false"
        @input="edit"
      >
        <template slot="dropdownDown" slot-scope="{ query }">
          <div v-if="query" class="text-center">
            <button
              type="button"
              class="block w-full p-3 text-white bg-blue-500 border hover:bg-blue-600"
              @click="createOption(query, assignment)"
            >
              Create {{ query }}
            </button>
          </div>
        </template>
      </TRichSelect>
    </client-only>
  </li>
</template>
<script>
export default {
  props: ["assignment", "subject"],
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
      ],
    };
  },
  methods: {
    completeAssignment() {
      let done = "Done";
      var index = this.assignment.tags.indexOf(done);

      if (index === -1) {
        this.assignment.tags.push(done);
      } else {
        this.assignment.tags.splice(index, 1);
      }
      this.edit(this.assignment);
    },
    async edit() {
      await this.$auth.fetch(`${process.env.backendURL}/assignments/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newAssignment: this.assignment,
          id: this.assignment.id,
        }),
      });
    },

    editAssigment() {
      this.editing = !this.editing;
      if (!this.editing) { // This is a little confusing, but we've already changed this.editing
        this.edit();
      } else {
        this.$nextTick(() => this.$refs.name.focus())

      }
      
    },
    async deleteItem() {
      let { id } = this.assignment;
      await this.$auth.fetch(`${process.env.backendURL}/assignments/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      let index = this.subject.assignments.findIndex((item) => {
        return item.id === id;
      });
      this.subject.assignments.splice(index, 1);
    },
  },
};
</script>
