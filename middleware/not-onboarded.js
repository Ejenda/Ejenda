export default async function ({ $auth, redirect, req, store }) {
  if ($auth.user.onboarded) {
    return redirect("/app");
  }
}
