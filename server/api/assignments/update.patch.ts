export default eventHandler(async (event) => {
  const session = await isLoggedIn(event);
  const { id, title, due, tags } = await readBody(event);
  const assignment = await useDrizzle()
    .update(tables.assignments)
    .set({
      title,
      due: new Date(due),
      tags,
    })
    .where(
      and(
        eq(tables.assignments.id, id),
        eq(tables.assignments.userId, session.userId)
      )
    )
    .returning();
  return assignment;
});
