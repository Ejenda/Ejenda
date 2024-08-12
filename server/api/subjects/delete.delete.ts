export default eventHandler(async (event) => {
  const session = await isLoggedIn(event);
  const { id } = await readBody(event);
  const subject = await useDrizzle()
    .delete(tables.subjects)
    .where(
      and(
        eq(tables.subjects.id, id),
        eq(tables.subjects.userId, session.userId)
      )
    );
  const assignments = await useDrizzle()
    .delete(tables.assignments)
    .where(
      and(
        eq(tables.assignments.subjectId, id),
        eq(tables.assignments.userId, session.userId)
      )
    );

  return { ok: true };
});
