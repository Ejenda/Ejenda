const cookie = process.server ? require('cookie') : undefined

export const actions = {
  async nuxtServerInit({ commit }, { req, res }) {
    // handle auth stuff

    let token = null
    if (req.headers.cookie) {
      const parsed = cookie.parse(req.headers.cookie)
      try {
        token = parsed['token']
      } catch (error) {
        console.log(error)
      }
    }
    // if the cookie exists, then get user data
    if (token !== null && token !== false) {
      await fetch(`${process.env.backendURL}/session`, {
        headers: {
          'Authorization': token,
        }
      })
        .then(res => res.json())
        .then((data) => {
          if (data.error) {
            // if theres an error (token invalid or user deleted, log the user out and remove the token)
            commit('auth/reset_user', null)
            commit('auth/set_token', null)
            commit('auth/set_flags', null)
            // TODO: there is a reset one we could use instead

            res.setHeader('Set-Cookie', [`token=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`])
          } else {
            // if data, save to store
            commit('auth/set_user', data.user)
            commit('auth/set_token', token)
            commit('auth/set_flags', data.flags)
          }
        }).catch((error) => {
          console.warn(error)
        })
    }
  }
}
