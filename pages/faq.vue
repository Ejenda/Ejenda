<template>
  <div class="min-h-screen m-1">
    <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
      <div class="w-full px-4 py-2">
        <h1 class="font-bold text-5xl py-1">FAQ</h1>
        <FAQ q="Is it free?">Yes. E-jenda is, and always will be free.</FAQ>
        <FAQ q="Can I use this offline?"
          >Absolutely! E-jenda works perfectly offline.</FAQ
        >
        <FAQ q="Can you see what I have to do?"
          >Unless you add assignments via our Teacher link feature, which stores
          them on a database for access by students, no. By default, everything
          is stored on your computer.</FAQ
        >
        <FAQ q="Can I send my students a link to import assignments?"
          >Yes. Go to our
          <nuxt-link class="link" to="/teachers">teachers page</nuxt-link> to
          get started.</FAQ
        >
        <FAQ q="Is E-jenda safe?"
          >Yes. It is engineered to not save any of your data and is open-source
          so that you can read over the source code.</FAQ
        >
        <FAQ q="How can I help?"
          >You can show E-jenda to other students, or show your teachers it. If
          you know how to code, you can contribute at
          https://github.com/GrahamSH-LLK/E-jenda</FAQ
        >
      </div>
    </div>
  </div>
</template>
