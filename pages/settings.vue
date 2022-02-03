<template>
  <div
    class="flex flex-row rounded-r-xl bg-white dark:bg-gray-700 sm:flex-col lg:flex-row xl:flex-row"
  >
    <div
      class="h-[75vh] flex-1 rounded-r-xl bg-red-300 p-4 text-white dark:bg-gray-600 lg:flex-none"
    >
      <h1 class="text-3xl font-bold">Settings</h1>
      <a href="#danger">Danger zone</a>
    </div>
    <div class="flex-1 rounded-r-lg p-4 dark:text-white">
      <section id="danger">
        <h1 class="text-2xl font-bold dark:text-opacity-90">Danger zone</h1>
        <p class="dark:text-opacity-60">
          Delete account: Email us at support@ejenda.org
        </p>
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
};
</script>
