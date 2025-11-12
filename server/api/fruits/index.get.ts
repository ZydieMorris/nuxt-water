import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {

const session = await requireUserSession(event);

  const fruits = await db.select().from(tables.fruits).where(eq(tables.fruits.userId, session.user.id));

  return fruits;
});