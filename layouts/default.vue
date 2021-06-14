<template>
    <div class="flex flex-col bg-red-100 min-h-screen">
    <h1 class="font-serif font-bold text-4xl p-1">
      <img class="h-10 w-10 inline align-text-bottom" src="~/static/logo.svg" />
      E-jenda <span class="text-base">v{{ version }}</span>
    </h1>

    <Nuxt />
  </div>
</template>
<script>
import { version } from '~/package.json'
export default {
  data() {
    return {version}
  }
}
</script>
<style lang="postcss">
.mx-input {
  @apply h-[40px];
  border: none;
  box-shadow: none;
}
</style>
