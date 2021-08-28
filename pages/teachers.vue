<template>
  <div class="m-1">
    <div class="rounded bg-white p-3 m-1">
      <label class="text-1xl font-bold">Subject:</label>
      <select
        v-model="subject"
        class="p-2 rounded-sm bg-white border border-gray-300"
      >
        <option value="math">Math</option>
        <option value="english">English</option>
        <option value="science">Science</option>
        <option value="social studies">Social Studies</option>
        <option value="foreign language">Foreign Language</option>
        <option value="related arts">Related Arts</option>
      </select>
    </div>
    <div class="rounded bg-white p-3 m-1">
      <button
        class="rounded-l-sm bg-white text-gray-800 p-2"
        @click="push(subject)"
      >
        +</button
      ><input
        placeholder="Add a new assignment"
        class="text-gray-800 rounded-r-sm p-2"
        v-model="entry"
        @keydown.enter="push(subject)"
      />
      Due:
      <date-picker
        class=""
        v-model="dateEntry"
        type="date"
        :disabled-date="notBeforeToday"
        :default-value="new Date()"
        :shortcuts="shortcuts"
        format="MM/DD/YYYY"
      ></date-picker>
    </div>
    <ul class="m-1">
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
        v-for="assignment of assignments"
        :key="assignment.id"
      >
        {{ assignment.name }}
        <p v-if="assignment.date" class="italic text-gray-400">
          Due: {{ new Date(assignment.date).toLocaleDateString() }}
        </p>
        <p v-else class="italic text-gray-400">No due date</p>
      </li>
    </ul>
    <button class="bg-white p-2 rounded ml-1" @click="send">Create Link</button>
    <span v-if="link"
      >Link: <a :href="link">{{ link }}</a></span
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      subject: "math",
      assignments: [],
      entry: "",
      link: "",
      dateEntry: "",
      shortcuts: [
        {
          text: "Today",
          onClick() {
            const date = new Date();
            // return a Date
            return date;
          },
        },
        {
          text: "Tommorrow",
          onClick() {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
          },
        },
      ],
    };
  },
  methods: {
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    async send() {
      let toSend = { subject: this.subject, assignments: this.assignments };
      let data = await (
        await fetch("/get", {
          body: JSON.stringify(toSend),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).text();
      this.link = `https://${window.location.hostname}/add/${data}`;
    },
    push() {
      if (this.entry?.trim() == "" || !this.entry) return;
      this.assignments.push({
        name: this.entry,
        id: `${new Date()}`,
        date: this.dateEntry,
      });

      this.entry = "";
    },
  },
};
</script>
