import { users } from "../database/schemas"

export default defineEventHandler(async(event) =>{

    const body = await readBody(event)

    //save to db
   await db.insert(users).values(body)

    console.log(body)

    return {message : "success"}

})