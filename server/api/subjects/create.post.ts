export default eventHandler(async (event) => {
  const session = await isLoggedIn(event);
  const { name, description } = await readBody(event);
  const subject = await useDrizzle()
    .insert(tables.subjects)
    .values({
      name,
      userId: session.userId,
    })
    .returning();
  return subject;
});
