<template>
  <div class="flex flex-col bg-red-100 dark:bg-gray-600 min-h-screen">

    <Nav class="print:hidden"/>
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />

    <section class="text-gray-700 bg-white body-font dark:bg-gray-600 dark:text-white print:hidden">
      <div
        class="
          container
          flex flex-col
          items-center
          px-8
          py-8
          mx-auto
          max-w-7xl
          sm:flex-row
        "
      >
        <nuxt-link
          to="/"
          class="text-xl font-black leading-none text-gray-900 select-none logo"
          >ejenda<span class="text-red-600">.</span></nuxt-link
        >
        <p
          class="
            mt-4
            text-sm text-gray-500
            sm:mx-4 sm:px-4 sm:border-l sm:border-gray-200 sm:mt-0
          "
        >
          © 2021 Ejenda
        </p>
        <select
          class="p-2 rounded dark:bg-gray-700 w-24"
          v-model="$colorMode.preference"
        >
          <option value="system">System‍</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <span
          class="
            inline-flex
            justify-center
            mt-4
            space-x-5
            sm:ml-auto sm:mt-0 sm:justify-start
          "
        >
          <a
            href="https://github.com/Ejenda"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">GitHub</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>

          <a href="https://fosshost.org" class="text-white font-black ">
            <span class="sr-only">Hosted by Fosshost</span>
            <span class="bg-gray-300 hover:bg-gray-400 rounded-md p-2">Hosted by <span class="text-red-500">Fosshost</span></span>
          </a>
        </span>
      </div>
    </section>

    <div class="inset-x-0 bottom-0 rounded sticky" v-show="!hide">
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
    this.hide = localStorage.getItem("hide") ?? false;
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
