<template>
  <span v-html="require(`../assets/icons/${name}.svg?raw`)" />
</template>

<script>
export default {
  props: ["name"],
};
</script>
