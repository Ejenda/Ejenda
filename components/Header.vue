<template>
  <header class="py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <a aria-label="Home" href="#"
            ><img src="/wordmarks/light.svg" class="h-8 w-auto"></a>
          <div class="hidden md:flex md:gap-x-6">
            <a
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="#features"
              >Features</a
            ><a
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="#testimonials"
              >Testimonials</a
            ><a
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="#pricing"
              >Pricing</a
            >
          </div>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="hidden md:block">
            <a
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/login"
              >Sign in</a
            >
          </div>
          <a
            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-600 text-white hover:text-slate-100 hover:bg-primary-500 active:bg-primary-800 active:text-primary-100 focus-visible:outline-primary-600"
            color="primary"
            variant="solid"
            href="/register"
            ><span
              >Get started <span class="hidden lg:inline">today</span></span
            ></a
          >
          <div class="-mr-1 md:hidden">
            <div data-headlessui-state="">
              <button
                class="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                aria-label="Toggle Navigation"
                type="button"
                aria-expanded="false"
                data-headlessui-state=""
                id="headlessui-popover-button-:R5v6fja:"
              >
                <svg
                  aria-hidden="true"
                  class="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <path
                    d="M0 1H14M0 7H14M0 13H14"
                    class="origin-center transition"
                  ></path>
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    class="origin-center transition scale-90 opacity-0"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              hidden=""
              style="
                position: fixed;
                top: 1px;
                left: 1px;
                width: 1px;
                height: 0;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border-width: 0;
                display: none;
              "
            ></div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
