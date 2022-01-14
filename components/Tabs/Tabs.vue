<template>
  <div>
    <div class="p-2 flex dark:bg-gray-900 justify-between flex-row">
      <div class="p-2">
        <TabsTab to="/app">List</TabsTab>
        <TabsTab to="/app/calendar">Calendar</TabsTab>
        <TabsTab to="/app/todo"> To Do</TabsTab>
        <span class="dark:text-red-200 mx-2"
          >Plan
          <span class="font-light italic text-sm hidden md:inline"
            >Coming Soon</span
          ></span
        >
      </div>
      <blockquote
        class="p-2 dark:text-red-200 dark:text-opacity-90 font-bold italic hidden md:block"
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
    this.quote.author = data.author;
    this.quote.text = data.text;
  },
};
</script>
