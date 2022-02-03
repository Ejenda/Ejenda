<template>
  <details class="m-2 rounded-md bg-red-400 p-2 dark:bg-gray-400">
    <summary class="m-2 cursor-pointer p-2 font-bold">{{ name }}</summary>
    <ul>
      <li
        v-for="assignment of assignments"
        :key="assignment.id"
        class="m-2 rounded-md bg-red-200 p-2"
      >
        {{ assignment.name }}
      </li>
    </ul>
  </details>
</template>

<script>
export default {
  props: ["name", "assignments"],
};
</script>

<style></style>
