
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
    }

  return user[0];
});
