export default eventHandler(async (event) => {
  const session = await isLoggedIn(event);
  const { subjectId, name, due, tags } = await readBody(event);
  const assignment = await useDrizzle()
    .insert(tables.assignments)
    .values({
      userId: session.userId,
      title: name,
      due: new Date(due),
      tags,
      subjectId,
    })
    .returning();
  return assignment;
});
