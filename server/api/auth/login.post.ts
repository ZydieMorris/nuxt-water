import { compare, hash } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { register } from "~~/server/database/schemas"



export default defineEventHandler(async(event) =>{

    
    const body = await readBody(event)
    const {username, password}= body

    // Validation
    if (!(username && password)){
        throw createError({statusCode: 400, message: "Username and Password is required"})
    }

 

    //check if user exist
    const user = await db.select().from(register).where(eq(register.username, username)).limit(1);

    if(user.length ===0){
        throw createError({statusCode: 400, message: "user does not exist"})
    }

    //check is password is correct
    const foundUser = user[0];

    const isPasswordCorrect =await compare(password, foundUser.password)

    if(!isPasswordCorrect){
        throw createError({statusCode: 401, message: "Invalid Password"})
    }

    return {
        message : "Login Successful",
        user: {id: foundUser.id, username: foundUser.username}
    }
});