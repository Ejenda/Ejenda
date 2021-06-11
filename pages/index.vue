<template>
  <div class="flex flex-col bg-red-100 min-h-screen">
    <h1 class="font-serif font-bold text-4xl p-1">
      <img class="h-10 w-10 inline align-text-bottom" src="~/static/logo.svg" />
      E-jenda <span class="text-base">v{{ version }}</span>
    </h1>
    <ul
      class="-bg-opacity-50 w-full p-6"
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
          bg-white
          bg-opacity-75
          text-gray-800
          my-2
          p-1
          flex
          justify-between
        "
        v-for="(assignment, i) of subject.assignments"
        :key="`${assignment.id}`"
        :class="{ 'bg-red-800 text-white': isToday(new Date(assignment.date)),'bg-yellow-400': isLate(new Date(assignment.date)) }"
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
      <date-picker
        class=""
        v-model="subject.dateEntry"
        type="date"
        :disabled-date="notBeforeToday"
      ></date-picker>
    </ul>
  </div>
</template>

<script>
import { version } from '~/package.json'
export default {
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
  },
  data() {
    return {
      subjects: [],
      version,
      currentEntry: '',
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
    isLate(someDate) {
      const today = new Date()
      return (
        someDate.getDate() < today.getDate() &&
        someDate.getMonth() < today.getMonth() &&
        someDate.getFullYear() < today.getFullYear()
      )
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
          return 'bg-yellow-400 text-white'
        case 'green':
          return 'bg-green-400 text-white'
        case 'purple':
          return 'bg-purple-400 text-white'
        default:
          return 'text-red-700'
      }
    },
  },
}
</script>
<style lang="postcss">
.mx-input {
  @apply h-[40px];
  border: none;
  box-shadow: none;
}
</style>
