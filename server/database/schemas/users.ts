import { int, mysqlTable, serial, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  email : varchar({length : 225}).notNull(),
  username: varchar({length : 225}).notNull().unique(),
  password: varchar({length : 225}).notNull(),
  createdAt : timestamp().defaultNow().notNull(),
  updatedAt : timestamp().$default(() => new Date()).$onUpdate(() => new Date()).notNull(),
});
