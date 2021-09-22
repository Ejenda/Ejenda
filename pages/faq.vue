<template>
  <div class="min-h-screen m-1">
    <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
      <div class="w-full px-4 py-2">
        <h1 class="font-bold text-5xl py-1 mb-2">FAQ</h1>
        <FAQ q="Is it free?">Yes. Ejenda is, and always will be free.</FAQ>
        <FAQ q="Can I use this offline?"
          >Somewhat. Currently, it will load but error out. This is a WIP.</FAQ
        >
        <FAQ q="Can you see what I have to do?"
          >Your items are stored on our servers. We do not look at them.</FAQ
        >
        <FAQ q="Can I send my students a link to import assignments?"
          >Yes. Go to our
          <nuxt-link class="link" to="/teachers">teachers page</nuxt-link> to
          get started.</FAQ
        >
        <FAQ q="Is Ejenda safe?"
          >Yes. It is engineered to not save any of your identifying data and is
          open-source so that you can read over the source code. (If you feel
          like it, no pressure)</FAQ
        >
       <FAQ q="I signed in with Google on the wrong account, how do I change it?"
          >Don't worry! You can go to
          <nuxt-link class="link" to="/google/auth">this link</nuxt-link> and select a new account.</FAQ
        > 
        <FAQ q="I found a bug, what do I do?"
          >If you found a bug, you can either make an issue on our github at
          https://github.com/Ejenda/Ejenda, contact our support at
          support@ejenda.org.</FAQ
        >
        <FAQ q="How can I help?"
          >You can show Ejenda to other students, or show your teachers it. If
          you know how to code, you can contribute at
          https://github.com/Ejenda/Ejenda</FAQ
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return { title: "FAQ - Ejenda" };
  },
};
</script>
