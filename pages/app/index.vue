<template>
  <div class="dark:bg-gray-700">
    <ul
      class="dark:bg-opacity-50 w-full p-6"
      v-for="subject of subjects"
      :key="subject.name"
      :class="parseColor(subject.color)"
    >
      <h1 class="font-serif font-bold text-4xl">{{ subject.name }}</h1>
      <p v-show="!subject.assignments.length > 0" class="py-2 italic">
        Nothing yet, add a new assignment
      </p>
      <li
        class="
          font-serif
          rounded-sm
          bg-white bg-opacity-75
          text-gray-800
          my-2
          p-1
          flex
          justify-between
        "
        v-for="(assignment, i) of subject.assignments"
        :key="`${assignment.id}`"
        :class="{
          '!bg-red-800 !text-white': isToday(new Date(assignment.date)),
          '!bg-yellow-400': isLate(assignment.date),
        }"
      >
        <div class="block">
          <p>{{ assignment.name }}</p>

          <p v-if="assignment.date" class="italic text-gray-400">
            Due: {{ new Date(assignment.date).toLocaleDateString() }}
          </p>
          <p v-else class="italic text-gray-400">No due date</p>
        </div>
        <button
          class="px-2 py-1 m-1 bg-white rounded-md text-gray-800"
          @click="deleteItem(subject, i)"
        >
          Delete
        </button>
      </li>
      <button
        class="rounded-l-sm bg-white text-gray-800 p-2"
        @click="push(subject)"
      >
        +</button
      ><input
        placeholder="Add a new assignment"
        class="text-gray-800 rounded-r-sm p-2"
        v-model="subject.entry"
        @keydown.enter="push(subject)"
      />
      <div>
        Due:
        <client-only>
          <v-date-picker
            class="block h-full w-72"
            v-model="subject.dateEntry"
            :min-date="new Date()"
          >
            <template v-slot="{ inputValue, togglePopover }">
              <div class="flex items-center">
                <div
                  class="
                    p-1
                    bg-blue-100
                    border border-blue-200
                    text-blue-600
                    rounded-l
                  "
                  @click="togglePopover()"
                >
                  <span>Due</span>
                </div>
                <input
                  :value="inputValue"
                  class="
                    bg-white
                    text-gray-700
                    w-full
                    py-1
                    px-2
                    appearance-none
                    border
                    rounded-r
                    focus:outline-none focus:border-blue-500
                  "
                  @click="togglePopover()"
                  readonly
                />
              </div>
            </template>
          </v-date-picker>
        </client-only>
      </div>
    </ul>
  </div>
</template>

<script>
import { version } from "~/package.json";
export default {
  mounted() {
    if (window.location.hash) {
      let data = JSON.parse(decodeURI(window.location.hash.split("#")[1]));
      let assignments = this.subjects.find((item) => {
        return item.id == data.subject;
      }).assignments;
      assignments.push(...data.assignments);
      this.subjects.find((item) => {
        return item.id == data.subject;
      }).assignments = assignments;
      window.location.href = "";
    }
  },
  watch: {},
  async fetch() {
    // TODO: Make this variable
    let subjects = [
      ["Math", "red"],
      ["English", "indigo"],
      ["Science", "yellow"],
      ["Social Studies", "blue"],
      ["Foreign Language", "green"],
      ["Related Arts", "purple"],
      ["Random Things", ""],
    ];
    let built = [];
    for (let subject of subjects) {
      let assignments = await (
        await this.$auth.fetch(
          `${process.env.backendURL}/assignments/${subject[0].toLowerCase()}`
        )
      ).json();
      built.push(this.generateSubject(subject[0], subject[1], assignments));
    }
    this.subjects = [...built];
  },
  data() {
    return {
      subjects: [],
      currentEntry: "",
    };
  },
  methods: {
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },

    async push(subject) {
      if (subject.entry?.trim() == "" || !subject.entry) return;
      let obj = {
        name: subject.entry,
        id: new Date(),
        date: subject.dateEntry,
      };
      subject.assignments.push(obj);
      obj.subject = subject.id;
      await this.$auth.fetch(`${process.env.backendURL}/assignments/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      subject.entry = "";
    },
    async deleteItem(subject, i) {
      await this.$auth.fetch(`${process.env.backendURL}/assignments/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: subject.assignments[i].id }),
      });
      subject.assignments.splice(i, 1);
    },
    generateSubject(name, color, assignments) {
      return {
        name: name,
        id: name.toLowerCase(),
        color: color,
        assignments,
      };
    },
    isToday(someDate) {
      const today = new Date();
      return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
      );
    },
    isLate(date) {
      return new Date(date).valueOf() < new Date().valueOf();
    },

    parseColor(color) {
      switch (color) {
        case "red":
          return "bg-red-400 text-white";
        case "indigo":
          return "bg-indigo-400 text-white";
        case "blue":
          return "bg-blue-400 text-white";
        case "yellow":
          return "bg-yellow-400 dark:bg-yellow-300 text-white";
        case "green":
          return "bg-green-400 text-white";
        case "purple":
          return "bg-purple-400 text-white";
        default:
          return "dark:text-white text-red-700";
      }
    },
  },
};
</script>
