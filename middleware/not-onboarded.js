export default async function ({ $auth, redirect, req, store }) {
  await store.dispatch("auth/login", token); // Reload auth state (to help prevent weird edge-cases)
  if ($auth.user.onboarded) {
    return redirect("/app");
  }
}
