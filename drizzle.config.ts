import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './server/database/migrations',
  schema: './server/database/schemas/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});