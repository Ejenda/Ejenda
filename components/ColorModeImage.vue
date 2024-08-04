<script setup lang="ts">
defineProps<{ light: string; dark: string }>();
</script>
<template>
  <img :src="light" alt="Light mode" v-show="$colorMode.value == 'light' || $colorMode.value == 'system'" :class="$attrs.class"/>
  <img :src="dark" alt="Dark mode" v-show="$colorMode.value == 'dark'" :class="$attrs.class"/>
</template>
