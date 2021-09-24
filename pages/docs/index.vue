<template>
  <div>
    <li v-for="doc of content" :key="doc.slug"><nuxt-link :to="`/docs/${doc.slug}`">{{doc.title}}</nuxt-link></li>
  </div>
</template>

<script>
export default {
  data() {
    return { content: {} };
  },
  async fetch() {
    this.content = await this.$content("docs").fetch();
  },
};
</script>
