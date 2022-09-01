<template>
  <div>
    <div class="flex flex-row justify-between p-2 dark:bg-gray-900">
      <div class="p-2">
        <TabsTab to="/app">List</TabsTab>
        <TabsTab to="/app/calendar">Calendar</TabsTab>
        <TabsTab to="/app/todo"> To Do</TabsTab>
        <TabsTab to="/app/horizontal"
          >Horizontal
          </TabsTab
        >
      </div>
      <blockquote
        class="hidden p-2 font-bold italic dark:text-red-200 dark:text-opacity-90 md:block"
      >
        "{{ quote.text }}" - {{ quote.author }}
      </blockquote>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply border-b-2 border-gray-900 font-bold text-gray-900 dark:border-red-400 dark:text-red-400;
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
