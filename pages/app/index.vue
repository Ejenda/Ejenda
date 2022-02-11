<template>
  <div
    class="dark:bg-gray-700"
    :class="{ 'overflow-hidden': $fetchState.pending }"
  >
    <tabs />
    <div class="flex justify-end"></div>
    <div v-if="$fetchState.pending">
      <div
        v-for="item of skeleton"
        :key="item"
        class="h-64 w-full p-4 dark:bg-gray-400"
      >
        <skeleton-loader-vue
          type="rect"
          :width="300"
          :height="45"
          wave-color="#bbb"
          class="mb-2"
        />
        <skeleton-loader-vue
          type="rect"
          :width="'100%'"
          :height="'50px'"
          wave-color="#bbb"
        />
      </div>
    </div>
    <div
      class="flex min-h-screen items-center justify-center"
      v-else-if="$fetchState.error"
    >
      <span class="flex flex-col items-center justify-center text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block h-10 w-10"
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
    <div v-else class="bg-blue-50 dark:bg-transparent">
      <ul
        class="mb-1 w-full border-2 border-solid bg-opacity-10 p-6 text-gray-600 dark:bg-gray-700 dark:bg-opacity-50 dark:text-white"
        v-for="subject of subjects"
        :key="subject.name"
        :class="$color.parseColor(subject.color)"
      >
        <div class="flex justify-between">
          <div>
            <h1 class="inline-block text-4xl font-bold">
              {{ subject.name }}
            </h1>
            <span class="border-blue inline-block rounded-full border px-3">{{
              subject.assignments.length
            }}</span>
          </div>
          <div>
            <ImportGC
              :subject="subject"
              :googleClassroomState="googleClassroomState"
              :googleClassroomAssignments="googleClassroomAssignments"
              :importAssignment="importAssignment"
              v-if="googleClassroomState"
            ></ImportGC>
          </div>
        </div>

        <p v-show="!subject.assignments.length > 0" class="py-2 italic">
          Nothing yet, add a new assignment
        </p>
        <transition-group name="assignments">
          <Assignment
            v-for="assignment of sortAssignments(subject.assignments)"
            :key="`${assignment.id}`"
            :assignment="assignment"
            :subject="subject"
          />
        </transition-group>
        <div class="print:hidden">
          <button
            class="rounded-l-sm bg-white p-2 text-gray-800 shadow-sm"
            @click="push(subject)"
          >
            +</button
          ><input
            placeholder="Add a new assignment"
            class="rounded-r-sm p-2 text-gray-800 shadow-sm"
            v-model="subject.entry"
            @keydown.enter="push(subject)"
          />
          <div class="mt-1">
            <client-only>
              <v-date-picker
                class="block h-full w-72"
                v-model="subject.dateEntry"
                :min-date="new Date()"
                :is-dark="$colorMode.preference == 'dark'"
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <div class="flex items-center">
                    <div
                      class="rounded-l border border-red-200 bg-red-100 p-2 text-red-600 dark:border-gray-300 dark:bg-gray-200 dark:text-gray-800"
                      @click="togglePopover()"
                    >
                      <span>Due</span>
                    </div>
                    <input
                      :value="inputValue"
                      class="focus:outline-none focus:border-f-500 appearance-none rounded-r border bg-white p-2 text-gray-700"
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
  head() {
    return {
      title: "App - Ejenda",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
    };
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
  },
  async created() {
    await this.fetchGCI(); // This is a hack to speeeeeeeeeeeeeeeeddddd up loading
  },
  data() {
    let skeleton = [...Array(10).keys()];
    return {
      subjects: [],
      currentEntry: "",
      subjectModalOpen: false,
      googleClassroomState: false,
      googleClassroomAssignments: [],
      skeleton,
    };
  },
  methods: {
    sortAssignments(assignments) {
      return assignments
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    async fetchGCI() {
      let res = await this.$auth.fetch(
        new URL("/google/assignments", process.env.backendURL)
      );
      let data = await res.json();
      if (data.ok == "logged out") {
        this.googleClassroomState = "out";
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
        tags: [],
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
    generateSubject(name, color, assignments) {
      let migratedAssignments = assignments.map((item) => {
        let editing = item;
        editing.tags = item.tags ? item.tags : [];
        return editing;
      });
      return {
        name: name,
        id: name.toLowerCase(),
        color: color,
        assignments: migratedAssignments,
        importing: [],
      };
    },
    async importAssignment(subject) {
      for (let assignment of subject.importing) {
        let assignmentRich = this.googleClassroomAssignments.find((item) => {
          return item.id === assignment;
        });
        let date;
        if (assignmentRich.dueDate) {
          date = new Date(
            assignmentRich.dueDate.year,
            assignmentRich.dueDate.month - 1,
            assignmentRich.dueDate.day - 1
          );
        } else {
          date = undefined;
        }
        let obj = {
          name: assignmentRich.title,
          id: new Date(),
          date,
          tags: ["Google Classroom"],
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
      }
      subject.importing = [];
    },
  },
};
</script>
<style>
.assignments-enter,
.assignments-leave-to {
  @apply translate-x-8 transform opacity-0;
}
</style>
