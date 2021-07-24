<script>
export default {
  data() {
    return { socket: {} }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'main', // select "main" socket from nuxt.config.js - we could also skip this because "main" is the default socket
    })
    this.socket.on('hi', (msg) => {
      console.log('Hi')
    })
  },
}
</script>
<template>
  <div></div>
</template>
