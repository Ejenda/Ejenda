<template>
  <nuxt-link
    class="dark:text-red-200 border-b-2 dark:border-gray-900 dark:hover:border-gray-600 transition border-white hover:border-gray-500 mx-2 border-none hover:border-solid"
    :to="to"
    ><slot
  /></nuxt-link>
</template>

<script>
export default {
  props: ["to"],
};
</script>
