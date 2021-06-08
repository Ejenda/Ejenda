<template>
  <div class="flex flex-col">
    <h1 class="font-serif font-bold text-4xl p-1">E-jenda</h1>
    <ul
      class="-bg-opacity-50 w-full p-6"
      v-for="subject of subjects"
      :key="subject.name"
      :class="parseColor(subject.color)"
    >
      <h1 class="font-serif font-bold text-4xl">{{ subject.name }}</h1>
      <li
        class="
          bg-opacity-75
          font-serif
          rounded-sm
          bg-white
          text-gray-800
          m-2
          p-1
        "
        v-for="assignment of subject.assignments"
        :key="`${assignment.id}`"
      >
        {{ assignment.name }}
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
export default {
  mounted() {
    this.subjects.push(
      ...[
        this.generateSubject('Math', 'red'),
        this.generateSubject('English', 'indigo'),
        this.generateSubject('Science', 'yellow'),
      ]
    )
  },
  data() {
    return {
      subjects: [],
    }
  },
  methods: {
    push(subject) {
      subject.assignments = { name: subject.entry, id: new Date() }
      subject.entry = ''
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
            let temporary = this.assignments
            temporary.push(value)
            localStorage.setItem(name.toLowerCase(), JSON.stringify(t))
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

        default:
          return 'bg-red-400 text-white'
      }
    },
  },
}
</script>
