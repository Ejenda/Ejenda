<template>
  <details class="bg-red-400 rounded-md p-2 m-2">
    <summary class="p-2 m-2 font-bold cursor-pointer">{{ name }}</summary>
    <ul>
      <li v-for="assignment of assignments" :key="assignment.id" class="
      bg-red-200
      m-2
      p-2
      rounded-md
      ">
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

<style>
</style>