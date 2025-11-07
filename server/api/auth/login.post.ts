import { compare, hash } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { register } from "~~/server/database/schemas"
import * as z from "zod/v4"


const loginSchema = z.object({
    username : z.string().min(5),
    password : z.string().min(8)
})



export default defineEventHandler(async(event) =>{

    
    const body = await readValidatedBody(event, loginSchema.parse)
    const {username, password}= body
 

    //check if user exist
    const user = await db.select().from(register).where(eq(register.username, username)).limit(1);

    if(user.length ===0){
        throw createError({statusCode: 400, message: "Invalid Credetials"})
    }

    //check is password is correct
    const foundUser = user[0];

    const isPasswordCorrect =await compare(password, foundUser.password)

    if(!isPasswordCorrect){
        throw createError({statusCode: 401, message: "Invalid Credetials"})
    }

    return {
        message : "Login Successful",
        user: {id: foundUser.id, username: foundUser.username}
    }
});