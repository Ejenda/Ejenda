<template>
  <div class="min-h-screen">
    <tabs />
    <div class="m-2">
      <todo :name="'No date'" :assignments="assignmentsNoDate"></todo>
      <todo :name="'Missing'" :assignments="assignmentsMissing"></todo>
      <todo :name="'Due today'" :assignments="assignmentsToday"></todo>
      <todo :name="'Due this week'" :assignments="assignmentsThisWeek"></todo>
      <todo :name="'Due later'" :assignments="assignmentsLater"></todo>
    </div>
  </div>
</template>

<script>
import date from "../../lib/date.js";
import { mapActions, mapState } from "vuex";
export default {
  middleware: "authenticated",
  activated() {
    // Call fetch again if last fetch more than 5 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch();
    }
  },

  data() {
    return {
      assignmentsToday: [],
      assignmentsMissing: [],
      assignmentsThisWeek: [],
      assignmentsLater: [],
      assignmentsNoDate: [],
    };
  },
  computed: {
    ...mapState({ subjects: (state) => state.assignments.subjects }),
  },
  methods: {
    ...mapActions({
      loadData: "assignments/loadData",
    }),
    generateSubject(name, color, assignments) {
      return {
        name: name,
        id: name.toLowerCase(),
        color: color,
        assignments,
        importing: "",
      };
    },
  },

  async fetch() {
    await this.loadData()

    let built = [];
    this.assignmentsToday = [];
    this.assignmentsMissing = [];
    this.assignmentsThisWeek = [];
    this.assignmentsLater = [];
    this.assignmentsNoDate = [];
    for (let subject of this.subjects) {
      
      for (let assignment of subject.assignments) {
        if (assignment.date) {
          if (date.isLate(new Date(assignment.date))) {
            this.assignmentsMissing.push(assignment);
          } else if (date.isToday(new Date(assignment.date))) {
            this.assignmentsToday.push(assignment);
          } else if (date.isThisWeek(new Date(assignment.date))) {
            this.assignmentsThisWeek.push(assignment);
          } else {
            this.assignmentsLater.push(assignment);
          }
        } else {
          this.assignmentsNoDate.push(assignment);
        }
      }
    }
  },
};
</script>

<style></style>
