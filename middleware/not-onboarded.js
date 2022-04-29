const serverCookie = process.server ? require("cookie") : undefined;
const clientCookie = process.client ? require("js-cookie") : undefined;

export default async function ({ $auth, redirect, req, store }) {
    return redirect("/app");
  
}
