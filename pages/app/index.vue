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
      Due: <date-picker
        class=""
        v-model="subject.dateEntry"
        type="date"
        :disabled-date="notBeforeToday"
        :default-value="new Date()"
        :shortcuts="shortcuts"
        format="MM/DD/YYYY"
      ></date-picker>
    </ul>
  </div>
</template>

<script>
import calendar from '~/components/calendar.vue'
import { version } from '~/package.json'
export default {
  components: { calendar },
  mounted() {
    this.subjects.push(
      ...[
        this.generateSubject('Math', 'red'),
        this.generateSubject('English', 'indigo'),
        this.generateSubject('Science', 'yellow'),
        this.generateSubject('Social Studies', 'blue'),
        this.generateSubject('Foreign Language', 'green'),
        this.generateSubject('Related Arts', 'purple'),
        this.generateSubject('Random Things', ''),
      ]
    )
    if (window.location.hash) {
      let data = JSON.parse(decodeURI(window.location.hash.split('#')[1]))
      let assignments = this.subjects.find((item) => {return item.id == data.subject}).assignments
      assignments.push(...data.assignments)
      this.subjects.find((item) => {return item.id == data.subject}).assignments = assignments
      window.location.href = ''
    }
    this.$set(this.subjects[0].assignments, 0, {})

  },
  data() {
    return {
      subjects: [],
      currentEntry: '',
      shortcuts: [
        {
          text: 'Today',
          onClick() {
            const date = new Date()
            // return a Date
            return date
          },
        },
        {
          text: 'Tommorrow',
          onClick() {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
          },
        },
      ],
    }
  },
  methods: {
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0))
    },

    change(assignment, subject, i) {
      temp = subject.assignments
      temporary = assignment
      temporary.name = this.currentEntry
      temp.assignments[i] = assignment
      subject.assignments = temp
    },
    push(subject) {
      if (subject.entry?.trim() == '' || !subject.entry) return
      let temporary = subject.assignments
      temporary.push({
        name: subject.entry,
        id: new Date(),
        date: subject.dateEntry,
      })

      subject.assignments = temporary
      subject.entry = ''
    },
    deleteItem(subject, i) {
      let temporary = subject.assignments
      temporary.splice(i, 1)
      subject.assignments = temporary
    },
    generateSubject(name, color) {
      return {
        name: name,
        id: name.toLowerCase(),
        color: color,
        get assignments() {
          return JSON.parse(localStorage.getItem(name.toLowerCase()) || '[]')
        },
        set assignments(value) {
          localStorage.setItem(name.toLowerCase(), JSON.stringify(value))
        },
      }
    },
    isToday(someDate) {
      const today = new Date()
      return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
      )
    },
    isLate(date) {
      return new Date(date).valueOf() < new Date().valueOf();
    },

    parseColor(color) {
      switch (color) {
        case 'red':
          return 'bg-red-400 text-white'
        case 'indigo':
          return 'bg-indigo-400 text-white'
        case 'blue':
          return 'bg-blue-400 text-white'
        case 'yellow':
          return 'bg-yellow-400 dark:bg-yellow-300 text-white'
        case 'green':
          return 'bg-green-400 text-white'
        case 'purple':
          return 'bg-purple-400 text-white'
        default:
          return 'dark:text-white text-red-700'
      }
    },
  },
}
</script>
