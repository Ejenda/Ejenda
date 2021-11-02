<template>
  <div>
    <div class="p-2 flex dark:bg-gray-900 justify-between flex-row">
      <div class="p-2">
        <nuxt-link
          class="
            dark:text-red-200
            border-b-2
            dark:border-gray-900 dark:hover:border-gray-600
            transition
            border-white
            hover:border-gray-500
            mx-2
          "
          to="/app"
          >List</nuxt-link
        >
        <nuxt-link
          class="
            dark:text-red-200
            border-b-2
            dark:border-gray-900 dark:hover:border-gray-600
            transition
            border-white
            hover:border-gray-500
            mx-2
          "
          to="/app/calendar"
          >Calendar</nuxt-link
        >
        <nuxt-link
          class="
            dark:text-red-200
            border-b-2
            dark:border-gray-900 dark:hover:border-gray-600
            transition
            border-white
            hover:border-gray-500
            mx-2
          "
          to="/app/todo"
          >To Do</nuxt-link
        >

      </div>
      <blockquote
        class="p-2 dark:text-white dark:text-opacity-90 font-bold italic"
      >
        "{{ quote.text }}" - {{ quote.author }}
      </blockquote>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply dark:text-red-400 text-gray-900 border-b-2 dark:border-red-400 border-gray-900 font-bold;
}
</style>
<script>
export default {
  data() {
    return { quote: { author: "", text: "" } };
  },
  async fetch() {
    let res = await fetch(new URL("/quote", process.env.backendURL));
    let data = await res.json();
    console.log(data)
    this.quote.author = data.author;
    this.quote.text = data.text;
  },
};
</script>
