<template>
  <div class="min-h-screen ">
    <tabs />
    <div class="m-2">
      <todo :name="'No date'" :assignments="assignmentsNoDate"></todo>
      <todo :name="'Missing'" :assignments="assignmentsMissing"></todo>
      <todo :name="'Due today'" :assignments="assignmentsToday"></todo>
    </div>
  </div>
</template>

<script>
import date from "../../lib/date.js";
export default {
  data() {
    return {
      assignmentsToday: [],
      assignmentsMissing: [],
      assignmentsThisWeek: [],
      assignmentsLater: [],
      assignmentsNoDate: [],
    };
  },
  methods: {
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
    this.assignmentsToday = [];
    this.assignmentsMissing = [];
    this.assignmentsThisWeek = [];
    this.assignmentsLater = [];
    this.assignmentsNoDate = [];
    for (let subject of subjects) {
      let assignments = await (
        await this.$auth.fetch(
          `${process.env.backendURL}/assignments/${subject[0].toLowerCase()}`
        )
      ).json();
      let builtSubject = this.generateSubject(
        subject[0],
        subject[1],
        assignments
      );
      built.push(builtSubject);
      for (let assignment of assignments) {
        if (assignment.date) {
          if (date.isLate(new Date(assignment.date))) {
            this.assignmentsMissing.push(assignment);
          } else if (date.isToday(new Date(assignment.date))) {
            this.assignmentsToday.push(assignment);
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
