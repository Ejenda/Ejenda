<template>
  <div class="flex flex-row bg-white bg-opacity-25 min-h-screen">
    <div
      class="
        h-full
        overflow-y-auto
        scrolling-touch
        lg:h-auto lg:block lg:relative lg:sticky 
        overflow-hidden
        lg:top-18
        mr-24
        lg:mr-0
        bg-white bg-opacity-50
        h-screen
      "
    >
      <nav
        class="
          px-1
          pt-6
          overflow-y-auto
          font-medium
          text-base
          sm:px-3
          xl:px-5
          lg:text-sm
          pb-10
          lg:pt-10 lg:pb-14
          sticky?lg:h-(screen-18)
        "
      >
        <h1 class="text-2xl font-bold">Ejenda Docs</h1>
        <ul>
          <li class="mt-8">
            <h5
              class="
                px-3
                mb-3
                lg:mb-3
                uppercase
                tracking-wide
                font-semibold
                text-sm
                lg:text-xs
                text-gray-900
              "
            >
              Docs
            </h5>
            <ul>
              <li v-for="doc of content" :key="doc.slug">
                <nuxt-link
                  class="
                    px-3
                    py-2
                    transition-colors
                    duration-200
                    relative
                    block
                    hover:text-gray-900
                    text-gray-500
                  "
                  :to="`/docs/${doc.slug}`"
                  ><span
                    class="rounded-md absolute inset-0 bg-cyan-50 opacity-0"
                  ></span
                  ><span class="relative">{{ doc.title }}</span></nuxt-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    <article class="flex-1 mx-2 mt-8">
      <h1 class="font-black text-5xl mb-2">{{ article.title }}</h1>
      <nuxt-content :document="article" class="prose dark:prose-dark" />
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return { article: {}, content: {} };
  },
  async fetch() {
    this.article = await this.$content("docs", this.$route.params.slug).fetch();
    this.content = await this.$content("docs").fetch();
  },
};
</script>
