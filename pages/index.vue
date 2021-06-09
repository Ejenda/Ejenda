<template>
  <div class="flex flex-col">
    <h1 class="font-serif font-bold text-4xl p-1">E-jenda <span class="text-base">v{{version}}</span></h1>
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
          bg-opacity-75
          font-serif
          rounded-sm
          bg-white
          text-gray-800
          my-2
          p-1
          flex
          justify-between
        "
        v-for="(assignment, i) of subject.assignments"
        :key="`${assignment.id}`"
      >
        <input class="bg-transparent flex-auto" v-model="assignment.name">
        <button
          class="px-2 py-1 m-1 bg-white rounded-md"
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
      />
    </ul>
  </div>
</template>

<script>
import {version} from '~/package.json'
export default {
  mounted() {
    [["Math","red"],['English', 'indigo'],["Science", "yellow"],['Social Studies', 'blue']].ma
    this.subjects.push(
      ...[
        this.generateSubject('Math', 'red'),
        this.generateSubject('English', 'indigo'),
        this.generateSubject('Science', 'yellow'),
        this.generateSubject('Social Studies', 'blue'),
        this.generateSubject('Foreign Language', 'green'),
        this.generateSubject('Related Arts', 'yellow'),
      ]
    )
  },
  data() {
    return {
      subjects: [],
      version
    }
  },
  methods: {
    push(subject) {
      let temporary = subject.assignments
      temporary.push({ name: subject.entry, id: new Date() })

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
        default:
          return 'bg-red-400 text-white'
      }
    },
  },
}
</script>
