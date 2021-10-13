<template>
  <div class="flex flex-col bg-gray-50 dark:bg-gray-600 min-h-screen">

    <Nav class="print:hidden"/>
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    <Footer/>
    <div class="inset-x-0 bottom-0 rounded sticky" v-if="false">
      <div
        class="
          max-w-7xl
          mx-auto
          py-3
          px-3
          sm:px-6
          lg:px-8
          m-2
          bg-red-600
          rounded
        "
      >
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-red-800">
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
              <span class=""> Coming soon: Ejenda Blocks </span>
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
            <nuxt-link
              to="/blocks"
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
              Learn more
            </nuxt-link>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              class="
                -mr-1
                flex
                p-2
                rounded-md
                hover:bg-red-500
                focus:outline-none focus:ring-2 focus:ring-white
                sm:-mr-2
              "
              @click="hideComingSoonPopup"
            >
              <span class="sr-only">Dismiss</span>
              <!-- Heroicon name: outline/x -->
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { version } from "~/package.json";
export default {
  data() {
    return { version, hide: true };
  },
  mounted() {
    //this.hide = localStorage.getItem("hide") ?? false;
    console.log("Hello Ejenda console reader. The person writing this is GrahamSH, the creator of Ejenda. I'm fine with you playing around in the console as long as you try not to break the app! As always, if you find any security vulnerabilities, directly email me at graham@ejenda.org." )
  },
  methods: {
    hideComingSoonPopup() {
      this.hide = true;
      localStorage.setItem("hide", "true");
    },
  },
};
</script>
<style lang="postcss">
.mx-input {
  @apply !h-[40px];
  border: none !important;
  box-shadow: none !important;
}
</style>
