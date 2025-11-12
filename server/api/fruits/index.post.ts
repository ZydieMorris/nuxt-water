import { z } from "zod/v4";

const fruitSchema = z.object({
  name: z.string().min(1).max(255)
});

export default eventHandler(async (event) => {
  // Validate request body
  const body = await readValidatedBody(event, fruitSchema.parse);

  const session = await requireUserSession(event);

  // Insert new fruit
  await db.insert(tables.fruits).values({
    name: body.name,
    userId: session.user.id
  });

  return { message: "Fruit added successfully" };
});