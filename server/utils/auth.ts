import { H3Event } from "h3";

export async function isLoggedIn(event: H3Event) {
  const token = getCookie(event, "session");
  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const session = await useDrizzle().query.session.findFirst({
    where: eq(tables.session.id, token),
  });
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  return session;
}

export async function notLoggedIn(event: H3Event) {
  const token = getCookie(event, "session");
  if (token) {
    const session = await useDrizzle().query.session.findFirst({
      where: eq(tables.session.id, token),
    });
    if (session) {
      throw createError({ statusCode: 404, message: "Logout first" });
    }
  }
}
