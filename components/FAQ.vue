<template>
  <details class="mb-4 bg-red-200 dark:bg-gray-500 rounded-md py-2 px-4">
    <summary class="font-semibold py-2 cursor-pointer focus:outline-none">
      {{ q }}
    </summary>

    <span>
      <slot />
    </span>
  </details>
</template>
<script>
export default {
  props: ["q"],
};
</script>
