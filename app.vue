<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
  <VueQueryDevtools />
  <UModals />
</template>
<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

useSeoMeta({
  ogImage: "/favicon.svg",
});
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Ejenda` : 'Ejenda';
  }
})
</script>
<style>
html {
  scrollbar-gutter: stable;
}
</style>
