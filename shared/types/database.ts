
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/db'

export type User = typeof tables.users.$inferSelect
export type InsertUser = typeof tables.users.$inferInsert

// Zod schemas
export const insertUserSchema = createInsertSchema(tables.users)
export const selectUserSchema = createSelectSchema(tables.users)
