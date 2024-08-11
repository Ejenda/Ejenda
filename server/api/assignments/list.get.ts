import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const session = await isLoggedIn(event);
  const subjects = await useDrizzle().query.subjects.findMany({
    where: eq(tables.subjects.userId, session.userId),
    with: {
      assignments: {
        orderBy: (table, {asc}) => asc(table.due),
      },
    },
    columns: {
      userId: false,
    }
  });
  return subjects;
});
