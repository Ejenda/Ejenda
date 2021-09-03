const serverCookie = process.server ? require("cookie") : undefined;
const clientCookie = process.client ? require("js-cookie") : undefined;

// Sync with ./not-authenticated.js

export default async function ({ $auth, redirect, req, store,route }) {
  let token = null;
  if (process.server) {
    if (req.headers.cookie) {
      const parsed = serverCookie.parse(req.headers.cookie);
      token = parsed["token"];
    }
  } else {
    token = clientCookie.get("token");
  }

  await store.dispatch("auth/login", token); // Reload auth state (to help prevent weird edge-cases)

  if (!$auth.loggedIn) {
    return redirect("/login");
  }
  if (!$auth.user.onboarded && route.path !== '/onboarding') {
    return redirect("/onboarding");
  }
}
