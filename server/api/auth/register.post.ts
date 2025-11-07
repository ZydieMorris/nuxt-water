import { hash } from "bcrypt-ts"
import { drizzle } from "drizzle-orm/singlestore/driver"
import { register } from "~~/server/database/schemas"

export default defineEventHandler(async(event) =>{

    
    const body = await readBody(event)
    const {username, password}= body

   if(!(username && password)){
    return {message : "username and password is required"}
   }
    
const hashed = await hash(password, 10)


   await db.insert(register).values({
    username,
    password : hashed
   });

    console.log(body)
    return (body)
})