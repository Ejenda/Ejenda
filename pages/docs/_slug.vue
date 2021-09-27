<template>
  <div class="flex flex-row bg-white bg-opacity-25 min-h-screen">
    <doc-sidebar />

    <article class="flex-1 mx-2 mt-8">
      <h1 class="font-black text-5xl mb-2">{{ article.title }}</h1>
      <nuxt-content :document="article" class="prose dark:prose-dark" />
    </article>
    <TOC :toc="article.toc"></TOC>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.article.title} - Ejenda Docs`,
    };
  },
  data() {
    return { article: {} };
  },
  async fetch() {
    this.article = await this.$content("docs", this.$route.params.slug).fetch();
    console.log(this.article.toc)
  },
  fetchOnServer: true,
};
</script>
