<template>
  <div>
    <h1 class="font-bold text-4xl mb-2">{{ article.title }}</h1>
    <nuxt-content :document="article" class="prose dark:prose-dark" />
  </div>
</template>

<script>
export default {
  data() {
    return { article: {} };
  },
  async fetch() {
    console.log(this.$route.params.slug);
    this.article = await this.$content("docs", this.$route.params.slug).fetch();
  },
};
</script>
