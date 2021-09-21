<template>
  <div class="bg-white flex dark:bg-gray-400 rounded-r-xl flex-row sm:flex-col lg:flex-row xl:flex-row">
    <div class="p-4 h-[75vh] bg-red-300 text-white flex-1 lg:flex-none rounded-r-xl">
      <h1 class="text-3xl font-bold">Settings</h1>
      <a href="#danger">Danger zone</a>
    </div>
    <div class="p-4 rounded-r-lg flex-1">
      <section id="danger">
        <h1 class="text-2xl font-bold">Danger zone</h1>
        <p>Delete account: Email us at support@ejenda.org</p>
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