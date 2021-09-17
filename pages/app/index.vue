<template>
  <div class="dark:bg-gray-700">
    <div
      class="min-h-screen flex justify-center items-center"
      v-if="$fetchState.pending"
    >
      <span class="text-2xl">
        <svg
          class="animate-spin -ml-1 mr-3 h-10 w-10 text-black inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading
      </span>
    </div>
    <div
      class="min-h-screen flex justify-center items-center"
      v-else-if="$fetchState.error"
    >
      <span class="text-2xl justify-center flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Sorry, an error occurred
        <p>Try again later</p>
      </span>
    </div>
    <div v-else>
      <ul
        class="dark:bg-opacity-50 w-full p-6"
        v-for="subject of subjects"
        :key="subject.name"
        :class="parseColor(subject.color)"
      >
        <h1 class="font-bold text-4xl inline-block">
          {{ subject.name }}
        </h1>
        <span
          class="
            inline-block
            border border-blue
            rounded-full
            px-3
            bg-blue
            text-white
          "
          >{{ subject.assignments.length }}</span
        >
        <div>
          <ImportGC
            :subject="subject"
            :googleClassroomState="googleClassroomState"
            :googleClassroomAssignments="googleClassroomAssignments"
            :importAssignment="importAssignment"
          ></ImportGC>
        </div>

        <p v-show="!subject.assignments.length > 0" class="py-2 italic">
          Nothing yet, add a new assignment
        </p>
        <li
          class="
            rounded-sm
            bg-white bg-opacity-75
            dark:bg-opacity-50 dark:bg-gray-300
            text-gray-800
            my-2
            p-1
            flex
            justify-between
          "
          v-for="(assignment, i) of sortAssignments(subject.assignments)"
          :key="`${assignment.id}`"
          :class="{
            '!bg-yellow-500': isToday(new Date(assignment.date)),
            '!bg-red-800 !text-white': isLate(new Date(assignment.date)),
          }"
        >
          <div class="block">
            <p>{{ assignment.name }}</p>

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
          <button
            class="px-2 py-1 m-1 bg-white rounded-md text-gray-800 print:hidden"
            @click="deleteItem(subject, i)"
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
        </li>
        <div class="print:hidden">
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
          <div class="mt-1">
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
                        p-2
                        bg-red-100
                        border border-red-200
                        text-red-600
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
                        p-2
                        appearance-none
                        border
                        rounded-r
                        focus:outline-none focus:border-f-500
                      "
                      @click="togglePopover()"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker>
            </client-only>
          </div>
        </div>
      </ul>
      <Modal
        v-model="subjectModalOpen"
        :name="'subjectModal'"
        :show-buttons="true"
        @confirm="$nuxt.refresh() && $vfm.hide('subjectModal')"
        @cancel="$nuxt.refresh() && $vfm.hide('subjectModal')"
        ><edit-subjects /><template slot="title">Edit subjects</template></Modal
      >
      <CustomButton class="m-1 print:hidden" @click="$vfm.show('subjectModal')"
        >Edit your subjects</CustomButton
      >
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
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
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch();
    }
  },
  fetchOnServer: true,
  async fetch() {
    var opts = {
      method: "GET",
      headers: {
        pragma: "no-cache",
        "cache-control": "no-cache",
      },
    };

    let subjects = await (
      await this.$auth.fetch(`${process.env.backendURL}/subjects`, opts)
    ).json();
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
    await this.fetchGCI(); // Sadly this has to be async even though it takes FOREVER
    // So I have to run it last
  },
  data() {
    return {
      subjects: [],
      currentEntry: "",
      subjectModalOpen: false,
      googleClassroomState: false,
      googleClassroomAssignments: [],
    };
  },
  methods: {
    sortAssignments(assignments) {
      return assignments
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    async fetchGCI() {
      console.log(`${process.env.backendURL}/google/assignments/`);
      let res = await this.$auth.fetch(
        new URL("/google/assignments", process.env.backendURL)
      );
      let data = await res.json();
      if (data.ok == "logged out") {
        console.log("returning");
        this.googleClassroomState = false;
        return;
      }
      this.googleClassroomState = true;
      this.googleClassroomAssignments = data;
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
      subject.dateEntry = "";
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
        importing: "",
      };
    },
    importAssignment(subject) {
      let assignment = this.googleClassroomAssignments.find((item) => {
        return item.id === subject.importing;
      });
      let date;
      if (assignment.dueDate) {
        date = new Date(
          assignment.dueDate.year,
          assignment.dueDate.month - 1,
          assignment.dueDate.day
        );
      } else {
        date = undefined;
      }
      subject.assignments.push({
        name: assignment.title,
        id: new Date(),
        date,
      });
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
      return (
        new Date(date.toDateString()) < new Date(new Date().toDateString())
      );
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
