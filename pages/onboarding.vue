<template>
  <div class="bg-white flex">
    <div class="p-4 h-[75vh] bg-red-800 text-white">
      <h1 class="text-3xl font-bold">Welcome to Ejenda</h1>
      Let's get you set up
    </div>
    <div class="p-4">
      <h1 class="text-2xl font-bold">Find your school</h1>
      Enter your school domain
      <input v-model="domain" />
      <div v-if="school.name"><span class="italic text-sm text-gray-300">You are at {{ school.name }}</span></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { domain: '', school: {} }
  },
  watch: {
    async domain() {
      //if (new RegExp("[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)").test(this.domain)) {
      let res = await fetch('/schools/lookup', {
        method: 'POST',
        body: JSON.stringify({ url: this.domain.replace('https://','').replace('http://','') }),
        headers: {
      'Content-Type': 'application/json'
    },

      })
      let data = await res.json()
      this.school = data
      //}
    },
  },
}
</script>
