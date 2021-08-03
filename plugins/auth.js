export default ({ store }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
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

    }
    inject('auth', auth)
  }
  