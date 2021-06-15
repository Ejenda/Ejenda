<template>
  <div class="flex flex-col bg-red-100 min-h-screen">
    <div class="bg-red-600">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-red-800">
              <!-- Heroicon name: outline/speakerphone -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>
            <p class="ml-3 font-medium text-white truncate">
              <span class="md:hidden"> Have any feedback? </span>
              <span class="hidden md:inline">
                Have any feedback? Send it at GrahamSH.com
              </span>
            </p>
          </div>
          <div
            class="
              order-3
              mt-2
              flex-shrink-0
              w-full
              sm:order-2 sm:mt-0 sm:w-auto
            "
          >
            <a
              href="https://grahamsh.com/contact"
              class="
                flex
                items-center
                justify-center
                px-4
                py-2
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-red-600
                bg-white
                hover:bg-red-50
              "
            >
              Send feedback
            </a>
          </div>
        </div>
      </div>
    </div>

    <h1 class="font-serif font-bold text-4xl p-1">
      <img
        class="rounded-full h-10 w-10 inline align-text-bottom"
        src="~/static/logo.svg"
      />
      <nuxt-link to="/">E-jenda</nuxt-link> <span class="text-base">v{{ version }}</span>
    </h1>

    <Nuxt />
    <footer class="bg-red-50 p-4">
      <span class="text-1xl text-red-600 font-bold p-4">© 2021 GrahamSH</span>
    </footer>
  </div>
</template>
<script>
import { version } from '~/package.json'
export default {
  data() {
    return { version }
  },
}
</script>
<style lang="postcss">
.mx-input {
  @apply h-[40px];
  border: none;
  box-shadow: none;
}
</style>
