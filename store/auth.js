import cookies from 'js-cookie'

export const state = () => ({
  user: null,
  token: null,
  flags: null
})

export const mutations = {
  set_user(store, data) {
    store.user = data
  },
  set_token(store, data) {
    store.token = data
  },
  set_flags(store, data) {
    store.flags = data
  },
  reset_user(store) {
    store.user = null
  },
  reset_token(store, data) {
    store.token = null
  },
  reset_flags(store) {
    store.flags = null
  },
}

export const actions = {
  async login({ commit, dispatch }, token) { // this is also used as a general purpose "refresh user details" in middlewares/before doing an action
    return new Promise((resolve, reject) => {
      fetch(`${process.env.backendURL}/session`, {
        headers: {
          Authorization: token,
          'User-Agent': 'ANYTHING_WILL_WORK_HERE'

        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) { // TODO: should this check for empty sessions too?
            // console.warn(data.error)
            try {
              dispatch('logout')
            }
            catch (err) {
              console.error(`logout failed: ${err}`)
            }
            reject(data.error)
          } else {
            commit('set_user', data.user)
            commit('set_token', token)
            commit('set_flags', data.flags)
            resolve(data)
          }
        })
    })
  },
  async logout({ commit, dispatch },) {
    return new Promise(async (resolve, reject) => {
      let token = cookies.get('token')
      let res = await fetch(`${process.env.backendURL}/session`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          'User-Agent': 'ANYTHING_WILL_WORK_HERE'

        }
      })
      let data = await res.json()

      cookies.remove('token')
      commit('reset_user')
      commit('reset_token')
      commit('reset_flags')

      // TODO: work on these commits to eliminate extra commits


      if (data.error) {
        reject(data.error)
      } else {
        resolve('logged out')
      }
    })
  }
}
