export default defineEventHandler(async (event) => {
  const token = getHeader(event, "Authorization")?.split(" ")[1];
  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const session = await useDrizzle().query.session.findFirst({
    where: eq(tables.session.id, token),
  });

  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.id, session.userId),
  });
  return { id: user?.id, name: user?.name, createdAt: user?.createdAt };
});
