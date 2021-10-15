<template>
  <div class="bg-white flex dark:bg-gray-700 rounded-r-xl flex-row sm:flex-col lg:flex-row xl:flex-row">
    <div class="p-4 h-[75vh] bg-red-300 dark:bg-gray-600 text-white flex-1 lg:flex-none rounded-r-xl">
      <h1 class="text-3xl font-bold">Settings</h1>
      <a href="#danger">Danger zone</a>
    </div>
    <div class="p-4 rounded-r-lg  dark:text-white flex-1">
      <section id="danger">
        <h1 class="text-2xl font-bold dark:text-opacity-90">Danger zone</h1>
        <p class="dark:text-opacity-60 ">Delete account: Email us at support@ejenda.org</p>
        Change username: Email us at support@ejenda.org
      </section>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return { title: "Settings - Ejenda" };
  },
}
</script>