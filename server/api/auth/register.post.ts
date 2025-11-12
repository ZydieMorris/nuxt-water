import { eq } from "drizzle-orm";
import {  users } from "~~/server/database/schemas";

import { email, z } from "zod/v4";

 const registerSchema =  z.object({
  username: z.string().min(3).max(20),
  email: email(),
  password: z.string().min(6).max(100),
 });


export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);

  const hashed = await hashPassword(body.password);


  // existing user with the same email
  const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1);


  // if there is a user with the same email, throw error
  if (existingUser.length > 0) {
    throw createError({
      statusCode: 409, // 409 Conflict
      statusMessage: 'User with this email already exists',
    });
  }


  // assuming email is not taken, create new user
  const sqlResult = await db.insert(users).values({
    email : body.email,
    username : body.username,
    password: hashed,
  });
  

  // retrieve the newly created user

  const user = await db.select().from(users).where(eq(users.id, sqlResult[0].insertId)).limit(1);


  const registeredUser = user[0];


  const {password,...rest} = registeredUser


  // set the user session
  await setUserSession(event,{
    user : rest
  })
  
  return body;
});
