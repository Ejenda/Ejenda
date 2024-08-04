import { MongoClient } from "mongodb";
export default defineTask({
  meta: {
    name: "db:migrate",
    description: "Run database seed task",
  },
  async run() {
    const mongoUri = `mongodb://216.158.66.120:27017/ejenda`;
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection("users");
    const users = await usersCollection.find().toArray();
    for (const user of users) {
      console.log(user);
      if (!user.name || !user.password) {
        continue;
      }
      const drizzleUser = await useDrizzle()
        .insert(tables.users)
        .values({
          id: useKSUID("user"),
          name: user.name,
          password: user.password,
        })
        .returning();

      for (let subject of user.subjects) {
        if (subject[0]) {
          const drizzleSubject = await useDrizzle()
            .insert(tables.subjects)
            .values({
              name: subject[0].toLowerCase(),
              userId: drizzleUser[0].id,
            })
            .returning();
        }
      }
            console.log("post subjects");

      for (let assignment of user.assignments) {
        if (!assignment.subject) {
          console.log("subjectless assignment");
        } else {
          const subject = await useDrizzle().query.subjects.findFirst({
            where: and(
              eq(tables.subjects.userId, drizzleUser[0].id),
              eq(tables.subjects.name, assignment.subject)
            ),
          });
          if (subject) {
            await useDrizzle()
              .insert(tables.assignments)
              .values({
                userId: drizzleUser[0].id,
                title: assignment.name,
                due: assignment.date?.length
                  ? new Date(assignment.date)
                  : new Date(),
                tags: assignment.tags || [],
                subjectId: subject.id,
              })
              .returning();
          } else {
            console.log("subject not found");
          }
        }
      }
    }

    return { result: "success" };
  },
});
