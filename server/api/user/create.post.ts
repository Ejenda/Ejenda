
import bcrypt from "bcrypt";

export default eventHandler(async (event) => {
  const { name, password } = await readBody(event);
  const hashed = await bcrypt.hash(password, 10);
  const user = await useDrizzle()
    .insert(tables.users)
    .values({
      id: useKSUID("user"),
      password: hashed,
      name,
    })
    .onConflictDoNothing()
    .returning();
    if (!user.length) {
      throw createError({
        statusCode: 409,
          message: "User already exists",
        
      });
    } else {
      // create default subject
      await useDrizzle()
        .insert(tables.subjects)
        .values({
          id: useKSUID("subj"),
          name: "Default",
          userId: user[0].id,
        })
        .returning();
        
    }
  

  return user[0];
});
