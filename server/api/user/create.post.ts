
import bcrypt from "bcrypt";

export default eventHandler(async (event) => {
  const { name, password } = await readBody(event);
  const hashed = await bcrypt.hash(password, 10);
  const user = await useDrizzle()
    .insert(tables.users)
    .values({
      id: useKSUID("user"),
      password: hashed,
      createdAt: Date.now(),
      name,
    })
    .returning();

  return user;
});
