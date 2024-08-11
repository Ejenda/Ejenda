export default eventHandler(async (event) => {
  const session = await isLoggedIn(event);
  const { id } = await readBody(event);
  const assignment = await useDrizzle()
    .delete(tables.assignments)
    .where(and(eq(tables.assignments.id, id), eq(tables.assignments.userId, session.userId)))
    .returning();
  return assignment;
});
