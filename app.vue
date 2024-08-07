<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
  <VueQueryDevtools />
</template>
<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

useSeoMeta({
  ogImage: "/favicon.svg",
});
</script>
