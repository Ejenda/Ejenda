<template>
  <div
    class="relative max-w-7xl px-4 min-h-screen sm:px-6 lg:px-8 mx-auto lg:flex"
  >
    <div
      class="
        absolute
        -inset-y-20
        left-2
        sm:left-4
        xl:left-2
        w-px
        bg-gray-900/[0.08]
      "
    ></div>
    <div
      class="
        absolute
        -inset-y-20
        right-2
        sm:right-4
        xl:right-2
        w-px
        bg-gray-900/[0.08]
      "
    ></div>

    <div class="flex-none max-w-screen-sm lg:max-w-xl mx-auto lg:ml-0 lg:mr-16">
      <main class="pb-16 lg:pb-20">
        <p
          class="
            font-semibold
            text-light-red-100
            leading-relaxed
            uppercase
            tracking-wider
          "
        >
          Coming soon
        </p>
        <h1
          class="
            mt-4
            text-4xl
            leading-none
            sm:text-5xl
            font-extrabold
            tracking-tight
          "
        >
          Talk, post resources, and see upcoming events <span class="text-red-600">with your class</span>
        </h1>

        <p class="mt-5 text-gray-800  leading-relaxed">
            Ejenda Blocks lets you chat with your class, share Ejenda assignments, and post resources for the rest of your class to use.
        </p>
        <div class="mt-8">
          <h2 class="font-semibold leading-relaxed mb-3 flex items-center">
            <span class="sm:hidden">Get notified when it’s ready</span>
            <div>
            <span class="hidden sm:inline"
              >Get behind-the-scenes updates and find out when it’s ready</span
            >
            <p class="italic font-normal">
                Just send me a way to contact you on the link below
            </p>
            </div>
            <svg
              width="12"
              height="12"
              fill="currentColor"
              class="ml-2 relative top-px"
            >
              <path
                d="M6.182 11.023l5.511-5.512L6.182 0l-1.17 1.165 3.505 3.5H0v1.693h8.517L5.011 9.864l1.17 1.159z"
              ></path>
            </svg>
          </h2>
          <div
            class="sm:flex"
          >
   
            <a
              type="submit"
              class="
                appearance-none
                w-full
                sm:w-auto sm:flex-none
                mt-3
                sm:mt-0 
                rounded-lg
                px-6
                h-12
                font-semibold
                flex
                items-center
                justify-center
                focus:outline-none focus:ring-4
                text-white
                shadow-sm
                bg-red-900
                hover:bg-red-800
                focus:ring-white/40
              "
              href="https://grahamsh.com/contact"
            >
              Get notified
            </a>
          </div>
        </div>
      </main>
    </div>
    <div
      class="
        flex-none
        w-[32.75rem]
        h-[32.75rem]
        mx-auto
        lg:mr-0
        relative
        rounded-t-lg
        overflow-hidden
        shadow-2xl
      "
    >
      <svg
        viewBox="0 0 500 500"
        class="lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-auto"
      >
        <defs>
          <radialGradient id="gradient">
            <stop offset="40%" stop-color="white"></stop>
            <stop offset="94%" stop-color="white" stop-opacity="0"></stop>
          </radialGradient>
          <mask id="mask">
            <circle cx="105" cy="0" r="1300" fill="url(#gradient)"></circle>
          </mask>
        </defs>
        <g mask="url(#mask)">
          <rect width="500" height="500" fill="white"></rect>
          <image
            xlink:href="/logo.svg"
            width="500"
            height="500"
          ></image>
        </g>
      </svg>
    </div>
  </div>
</template>
