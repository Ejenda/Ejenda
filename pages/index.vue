<template>
  <div class="">
    <div class="bg-white dark:bg-gray-600 bg-opacity-25 dark:bg-opacity-100 py-16 mt-1">
      <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div class="col-span-6">
            <h1
              class="
                font-bold
                text-4xl
                md:text-5xl
                max-w-xl
                text-gray-900
                dark:text-white
                dark:text-opacity-90
                leading-tight
              "
            >
              Ejenda
            </h1>
            <hr class="w-12 h-1 bg-red-400 dark:bg-gray-400 rounded-full mt-8" />
            <p
              class="text-gray-700 dark:text-white dark:text-opacity-80 text-2xl leading-relaxed mt-8 font-semibold"
            >
              The digital agenda
            </p>
            <div class="animate-bounce my-8">
              <nuxt-link
                v-if="$auth.loggedIn"
                to="/app"
                class="bg-red-500 p-3 rounded text-white font-bold"
                >Use the app</nuxt-link
              >
              <nuxt-link
                v-else
                to="/join"
                class="bg-red-500 p-3 rounded text-white font-bold"
                >Start using today!</nuxt-link
              >
            </div>
          </div>
          <div class="col-span-6">
            <img
              alt="Ejenda logo"
              src="~/static/screenshot.png"
              height="999px"
              width="572px"
              class="rounded-sm shadow-lg rotate-3 hidden md:block"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="py-12 bg-white dark:bg-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2
            class="text-base text-gray-400 dark:text-white dark:text-opacity-40 font-semibold tracking-wide uppercase"
          >
            Ejenda
          </h2>
          <p
            class="
              mt-2
              text-3xl
              leading-8
              font-extrabold
              tracking-tight
              text-gray-900
              dark:text-white
              dark:text-opacity-90
              sm:text-4xl
            "
          >
            A better way to keep track
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-400 dark:text-white dark:text-opacity-60 lg:mx-auto">
            Ejenda lets you keep track of all your assignments easily.
          </p>
        </div>

        <div class="mt-10">
          <dl
            class="
              space-y-10
              md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10
            "
          >
            <div class="relative">
              <dt>
                <div
                  class="
                    absolute
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-md
                    bg-red-500
                    text-white
                    shadow-xl
                  "
                >
                  <!-- Heroicon name: outline/globe-alt -->
                  <svg
                    class="h-6 w-6 "
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white dark:text-opacity-90">
                  Teacher provided links
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60">
                Teachers can give you links that add assignments right into your
                agenda.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="
                    absolute
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-md
                    bg-red-500
                    text-white
                    shadow-xl
                  "
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white dark:text-opacity-90">
                  No more writing
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60">
                All you have to do is type in assignments!
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="
                    absolute
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-md
                    bg-red-500
                    text-white
                    shadow-xl
                  "
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white dark:text-opacity-90">
                  Fast
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60">
                Ejenda is engineered to be super-fast, which saves you time.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="
                    absolute
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-md
                    bg-red-500
                    text-white
                    shadow-xl
                  "
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white dark:text-opacity-90">
                  Never miss another assignment
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-400 dark:text-white dark:text-opacity-60">
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
        class="
          max-w-7xl
          mx-auto
          py-12
          px-4
          sm:px-6
          lg:py-16 lg:px-8 lg:items-center
        "
      >
        <h2
          class="
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            sm:text-4xl
          "
        >
          <span class="block dark:text-white dark:text-opacity-90">Ready to dive in?</span>
          <span class="block text-red-600">Start using it today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow my-2">
            <nuxt-link
              to="/app"
              class="
                inline-flex
                items-center
                justify-center
                px-5
                py-3
                border border-transparent
                text-base
                font-medium
                rounded-md
                text-white
                bg-red-600
                hover:bg-red-700
              "
            >
              Get started
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 dark:bg-gray-800 text-right">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:justify-end">
        <h2
          class="
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            sm:text-4xl
          "
        >
          <span class="block dark:text-white dark:text-opacity-90">Are you a teacher?</span>
          <span class="block text-red-600"
            >Generate a link for your students!</span
          >
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0 justify-end">
          <div class="inline-flex rounded-md shadow my-2">
            <nuxt-link
              to="/app/teachers"
              class="
                inline-flex
                items-center
                justify-center
                px-5
                py-3
                border border-transparent
                text-base
                font-medium
                rounded-md
                text-white
                bg-red-600
                hover:bg-red-700
              "
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
}
</script>