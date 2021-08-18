const serverCookie = process.server ? require("cookie") : undefined;
const clientCookie = process.client ? require("js-cookie") : undefined;

// make sure to keep this the same as notauthetnicated.js

export default async function ({ $auth, redirect, req, store }) {
  let token = null;
  if (process.server) {
    if (req.headers.cookie) {
      const parsed = serverCookie.parse(req.headers.cookie);
      token = parsed["token"];
    }
  } else {
    token = clientCookie.get("token");
  }

  await store.dispatch("auth/login", token); // reload just incase logged out on another tab or something

  if (!$auth.loggedIn) {
    return redirect("/login");
  }
  if (!$auth.onboarded) {
    return redirect("/onboarding");
  }
}
