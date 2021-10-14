<template>
  <div class="p-2 flex dark:bg-gray-900 shadow-lg ">
    <nuxt-link class="dark:text-red-200 border-b-2 dark:border-gray-900 dark:hover:border-gray-600 transition border-white hover:border-gray-500 mx-2" to="/app">List</nuxt-link>
    <nuxt-link class="dark:text-red-200 border-b-2 dark:border-gray-900 dark:hover:border-gray-600 transition border-white hover:border-gray-500 mx-2" to="/app/calendar">Calendar</nuxt-link>
</div>
</template>
<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply dark:text-red-400 text-gray-900 border-b-2 dark:border-red-400 border-gray-900 font-bold;
}
</style>
