<template>
      <div
      class="
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
                    doc-link
                  "
                  :to="`/docs/${doc.slug}`"
                  ><span
                    class="rounded-md absolute inset-0 bg-red-100 opacity-0"
                  ></span
                  ><span class="relative">{{ doc.title }}</span></nuxt-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>

</template>

<script>
export default {
data(){
    return {content: {}}
},
//fetchKey: 'sidebarMembers',
async fetch(){
    let content = await this.$content("docs").fetch();
    this.content = content.sort(function(x,y){ return x.title == 'Home' ? -1 : y.title == 'Home' ? 1 : 0; });
}
}
</script>

<style>
.doc-link.nuxt-link-exact-active > .opacity-0 {
  @apply opacity-100
}
.doc-link.nuxt-link-exact-active {
  @apply text-red-400
}
</style>