<template>
  <details class="m-2 rounded-md bg-red-400 p-2 dark:bg-gray-400">
    <summary class="m-2 cursor-pointer p-2 font-bold">{{ name }}</summary>
    <ul>
      <assignment
        v-for="assignment of assignments"
        :key="assignment.id"
        :assignment="assignment"
        :subject="assignments"
      ></assignment>
    </ul>
  </details>
</template>

<script>
export default {
  props: ["name", "assignments"],
};
</script>

<style></style>
