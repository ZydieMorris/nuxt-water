import { hash } from "bcrypt-ts";
import { drizzle } from "drizzle-orm/singlestore/driver";
import { register } from "~~/server/database/schemas";
import * as z from "zod/v4";

const registerSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);
  const { username, password } = body;

  const hashed = await hash(password, 10);

  await db.insert(register).values({
    username,
    password: hashed,
  });

  console.log(body);
  return body;
});
