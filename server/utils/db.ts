import mysql from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../database/schemas/index";

export const tables = schema

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const db = drizzle(connection,{casing : 'snake_case'});
