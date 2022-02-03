<template>
  <div class="">
    <div class="bg-gray-100 py-24 dark:bg-gray-900 dark:bg-opacity-100">
      <div class="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
        <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div class="col-span-6">
            <h1
              class="max-w-xl text-5xl font-bold leading-tight text-gray-900 dark:text-white dark:text-opacity-90 md:text-5xl"
            >
              The Best Online <span class="text-red-500">Agenda</span>
            </h1>
            <hr
              class="mt-8 h-1 w-12 rounded-full bg-red-400 dark:bg-gray-400"
            />
            <p
              class="mt-8 text-2xl font-semibold leading-relaxed text-gray-700 dark:text-white dark:text-opacity-80"
            >
              Ejenda is the best agenda around — and it's digital
            </p>
            <div class="my-8 animate-bounce">
              <nuxt-link
                v-if="$auth.loggedIn"
                to="/app"
                class="rounded bg-red-500 p-3 font-bold text-white"
                >Use the app</nuxt-link
              >
              <nuxt-link
                v-else
                to="/join"
                class="rounded bg-red-500 p-3 font-bold text-white"
                >Start using today!</nuxt-link
              >
            </div>
          </div>

          <div class="col-span-6">
            <img
              alt="Ejenda logo"
              :src="require('~/assets/screenshot.png')"
              height="311px"
              width="544px"
              class="hidden rotate-3 rounded-sm shadow-lg md:block"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white py-12 dark:bg-gray-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2
            class="text-base font-semibold uppercase tracking-wide text-gray-400 dark:text-white dark:text-opacity-40"
          >
            Ejenda
          </h2>
          <p
            class="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white dark:text-opacity-90 sm:text-4xl"
          >
            A better way to keep track
          </p>
          <p
            class="mt-4 max-w-2xl text-xl text-gray-400 dark:text-white dark:text-opacity-60 lg:mx-auto"
          >
            Ejenda lets you keep track of all your assignments easily.
          </p>
        </div>

        <div class="mt-10">
          <dl
            class="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0"
          >
            <div class="relative">
              <dt>
                <div
                  class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-500 text-white shadow-xl"
                >
                  <!-- Heroicon name: outline/globe-alt -->
                  <svg
                    class="h-6 w-6"
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <p
                  class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white dark:text-opacity-90"
                >
                  Teacher provided links
                </p>
              </dt>
              <dd
                class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60"
              >
                Teachers can give you links that add assignments right into your
                agenda.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-500 text-white shadow-xl"
                >
                  <!-- Heroicon name: outline/scale -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <p
                  class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white dark:text-opacity-90"
                >
                  No more writing
                </p>
              </dt>
              <dd
                class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60"
              >
                All you have to do is type in assignments!
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-500 text-white shadow-xl"
                >
                  <!-- Heroicon name: outline/lightning-bolt -->
                  <svg
                    class="h-6 w-6"
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p
                  class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white dark:text-opacity-90"
                >
                  Fast
                </p>
              </dt>
              <dd
                class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60"
              >
                Ejenda is engineered to be super-fast, which saves you time.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-red-500 text-white shadow-xl"
                >
                  <!-- Heroicon name: outline/annotation -->
                  <svg
                    class="h-6 w-6"
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <p
                  class="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white dark:text-opacity-90"
                >
                  Never miss another assignment
                </p>
              </dt>
              <dd
                class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60"
              >
                We know it's hard to stay on top of everything, so Ejenda makes
                late and due-that-day assignments pop out.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 dark:bg-gray-800">
      <div
        class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:items-center lg:py-16 lg:px-8"
      >
        <h2
          class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          <span class="block dark:text-white dark:text-opacity-90"
            >Ready to dive in?</span
          >
          <span class="block text-red-600">Start using it today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="my-2 inline-flex rounded-md shadow">
            <nuxt-link
              to="/app"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-5 py-3 text-base font-medium text-white hover:bg-red-700"
            >
              Get started
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 text-right dark:bg-gray-800">
      <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:justify-end">
        <h2
          class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          <span class="block dark:text-white dark:text-opacity-90"
            >Are you a teacher?</span
          >
          <span class="block text-red-600"
            >Generate a link for your students!</span
          >
        </h2>
        <div class="mt-8 flex justify-end lg:mt-0 lg:flex-shrink-0">
          <div class="my-2 inline-flex rounded-md shadow">
            <nuxt-link
              to="/app/teachers"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-5 py-3 text-base font-medium text-white hover:bg-red-700"
            >
              Generate a link
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return { title: "Home - Ejenda" };
  },
};
</script>
