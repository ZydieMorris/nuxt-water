import { int, mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const fruits = mysqlTable('fruits', {
    id:int().primaryKey().autoincrement(),
    userId:int().references(() => users.id),
    name:varchar({length :255}).notNull(),
    createdAt : timestamp().defaultNow().notNull(),
    updatedAt : timestamp().$default(() => new Date()).$onUpdate(() => new Date()).notNull(),
});
