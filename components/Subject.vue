<template>
  <ul
    class="my-2 mx-2 flex-1 snap-center rounded-md bg-white bg-opacity-75 p-6 pb-8 text-gray-600 shadow dark:bg-gray-500 dark:bg-opacity-50 dark:text-white"
  >
    <div class="flex justify-between items-center">
      <div>
        <span
          class="p-1/2 h-6  px-1 text-2xl font-bold text-white"
          :class="$color.parseColorBackground(subject.color)"
          >{{ subject.name }}
        </span>
        <span
          class="p-1/2 h-6 bg-gray-300 px-2 text-2xl font-bold text-white text-gray-800"
        >
          {{ subject.assignments.length }}
        </span>
      </div>
      <div>
        <ImportGC
          :subject="subject"
          :googleClassroomState="googleClassroomState"
          :googleClassroomAssignments="googleClassroomAssignments"
          :importAssignment="importAssignment"
          :importing="importing"
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
        :disableDelete="false"
      />
    </transition-group>
    <div class="w-min rounded p-2 shadow print:hidden">
      <div>
        <button
          class="rounded-l-sm bg-white p-2 text-gray-800 shadow-sm"
          @click="push(subject)"
        >
          +</button
        ><input
          placeholder="Add a new assignment"
          class="rounded-r-sm p-2 text-gray-800 shadow-sm"
          :ref="subject.id"
          @keydown.enter="push(subject)"
        />
      </div>
      <div class="min-w-60 mt-1">
        <client-only>
          <v-date-picker
            class="block h-full w-full"
            :min-date="new Date()"
            v-model="date"
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
                  class="focus:border-f-500 appearance-none rounded-r border bg-white p-2 text-gray-700 focus:outline-none"
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
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["subject", "googleClassroomAssignments", "googleClassroomState"],
  data() {
    return { date: "", importing: [] };
  },
  methods: {
    ...mapActions({ addAssignment: "assignments/addAssignment" }),
    sortAssignments(assignments) {
      return assignments
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    async importAssignment(subject) {
      for (let assignment of this.importing) {
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
          subject: subject.id,
        };
        this.addAssignment({ subject, assignment: obj });
      }
      this.importing = [];
    },
    async push() {
      let subject = this.subject;
      let entry = this.$refs[subject.id].value;
      if (entry?.trim() == "" || !entry) return;
      let obj = {
        name: entry,
        id: new Date(),
        date: this.date,
        tags: [],
        subject: subject.id,
      };
      this.addAssignment({ subject, assignment: obj });
      this.$refs[subject.id].value = "";
      this.date = "";
    },
  },
};
</script>
