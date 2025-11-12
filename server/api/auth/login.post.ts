import { eq } from "drizzle-orm"
import { email } from "zod/v4";
import {  users } from "~~/server/database/schemas"

import { z } from "zod/v4";

const loginSchema = z.object({
    email: email(),
    password: z.string().min(6).max(100),
})




export default defineEventHandler(async(event) =>{
    
    const body = await readValidatedBody(event, loginSchema.parse)
 

    //check if user exist
    const user = await db.select().from(users).where(eq(users.email, body.email)).limit(1);

    if(user.length ===0){
        throw createError({statusCode: 400, statusMessage: "Invalid Credetials"})
    }

    //check is password is correct
    const foundUser = user[0];

    const isPasswordCorrect =await verifyPassword(foundUser.password,body.password)

    if(!isPasswordCorrect){
        throw createError({statusCode: 401, statusMessage: "Invalid Credetials"})
    }


    // set the user session
    await setUserSession(event,{
        user : foundUser
    })

    return {
        message : "Login Successful",
        user: {id: foundUser.id, username: foundUser.username}
    }
});