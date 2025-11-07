import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";


export const register = mysqlTable ('register',{
    id:serial().primaryKey().autoincrement(),
    username:varchar({length:255}).notNull(),
    password:varchar({length:255}).notNull()
})