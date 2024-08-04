export default eventHandler(async (event) => {
  const session = await isLoggedIn(event);
  const { id, name, due, tags } = await readBody(event);
  const assignment = await useDrizzle()
    .update(tables.assignments)
    .set({
      title: name,
      due: new Date(due),
      tags,
    })
    .where(and(eq(tables.assignments.id, id)))
    .returning();
  return assignment;
});
