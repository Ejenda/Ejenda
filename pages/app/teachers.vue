<template>
  <div class="m-1 min-h-screen">
    <div class="m-1 rounded bg-white p-3 dark:bg-gray-500">
      <label class="text-1xl font-bold">Subject:</label>
      <select
        v-model="subject"
        class="rounded-md border border-gray-300 bg-white p-2 text-gray-800 dark:border-gray-500"
      >
        <option value="math">Math</option>
        <option value="english">English</option>
        <option value="science">Science</option>
        <option value="social studies">Social Studies</option>
        <option value="foreign language">Foreign Language</option>
        <option value="related arts">Related Arts</option>
      </select>
    </div>
    <div class="m-1 rounded bg-white p-3 dark:bg-gray-500">
      <button
        class="m-1 rounded-md rounded-l-sm bg-white p-2 px-2 py-1 text-2xl text-gray-800 dark:bg-gray-500 dark:text-gray-900 print:hidden"
        @click="push(subject)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg></button
      ><input
        placeholder="Add a new assignment"
        class="rounded-md p-2 dark:bg-gray-300"
        v-model="entry"
        @keydown.enter="push(subject)"
      />
      <client-only>
        <v-date-picker
          class="inline-block w-72 p-2"
          v-model="dateEntry"
          :min-date="new Date()"
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
    <ul class="m-1">
      <li
        class="my-2 flex justify-between rounded-sm bg-white bg-opacity-75 p-1 text-gray-800 dark:bg-gray-500"
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
    <button class="ml-1 rounded bg-white p-2 dark:bg-gray-500" @click="send">
      Create Link
    </button>
    <span v-if="link"
      >Link: <a :href="link">{{ link }}</a></span
    >
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Teachers - Ejenda",
    };
  },
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
