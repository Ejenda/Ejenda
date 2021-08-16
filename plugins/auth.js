export default ({ store }, inject) => {
  // Inject $auth in Vue, context and store.
  let auth = {
    get loggedIn() {
      return !!store.state.auth.user
    },
    get user() {
      return store.state.auth.user
    },
    get token() {
      return store.state.auth.token
    },
    get flags() {
      return store.state.auth.flags
    },
    async fetch(path, options = {}) {
      if (!options.headers) {
        options.headers = {}
      }
      options.headers.Authorization = store.state.auth.token
      return await fetch(path, options)
    },
  }
  inject('auth', auth)
}
