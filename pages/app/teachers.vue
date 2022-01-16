<template>
  <div class="min-h-screen m-1">
    <div class="rounded bg-white dark:bg-gray-500 p-3 m-1">
      <label class="text-1xl font-bold">Subject:</label>
      <select
        v-model="subject"
        class="
          p-2
          rounded-md
          bg-white
          border border-gray-300
          dark:border-gray-500
          text-gray-800
        "
      >
        <option value="math">Math</option>
        <option value="english">English</option>
        <option value="science">Science</option>
        <option value="social studies">Social Studies</option>
        <option value="foreign language">Foreign Language</option>
        <option value="related arts">Related Arts</option>
      </select>
    </div>
    <div class="rounded bg-white dark:bg-gray-500 p-3 m-1">
      <button
        class="
          rounded-l-sm
          bg-white
          dark:bg-gray-500
          px-2
          py-1
          m-1
          rounded-md
          print:hidden
          text-gray-800
          dark:text-gray-900
          text-2xl
          p-2
        "
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
        class="rounded-md dark:bg-gray-300 p-2"
        v-model="entry"
        @keydown.enter="push(subject)"
      />
      <client-only>
        <v-date-picker
          class="inline-block p-2 w-72"
          v-model="dateEntry"
          :min-date="new Date()"
        >
        <template v-slot="{ inputValue, togglePopover }">
            <div class="flex items-center">
              <div
                class="
                  p-2
                  bg-red-100
                  dark:bg-gray-200
                  border border-red-200
                  dark:border-gray-300
                  text-red-600
                  dark:text-gray-800
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
    <ul class="m-1">
      <li
        class="
          rounded-sm
          bg-white
          dark:bg-gray-500
          bg-opacity-75
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
    <button class="bg-white dark:bg-gray-500 p-2 rounded ml-1" @click="send">
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
