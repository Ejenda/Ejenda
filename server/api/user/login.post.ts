import bcrypt from "bcrypt";
import { notLoggedIn } from "~/server/utils/auth";
export default eventHandler(async (event) => {
  await notLoggedIn(event);
  const { name, password } = await readBody(event);
  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.name, name),
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }
  const session = await useDrizzle()
    .insert(tables.session)
    .values({
      userId: user.id,
    })
    .returning();
  // set cookie
  // set-cookie: session=${session.id}; HttpOnly; Secure; SameSite=Strict
  return new Response(JSON.stringify(user), {
    headers: {
      "set-cookie": `session=${session[0].id}; Path=/; SameSite=Strict`,
      "content-type": "application/json",
    },
  });
});
