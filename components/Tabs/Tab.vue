<template>
  <nuxt-link
    class="mx-2 border-b-2 border-none border-white transition hover:border-solid hover:border-gray-500 dark:border-gray-900 dark:text-red-200 dark:hover:border-gray-600"
    :to="to"
    ><slot
  /></nuxt-link>
</template>

<script>
export default {
  props: ["to"],
};
</script>
