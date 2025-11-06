import { drizzle } from "drizzle-orm/mysql2";


const runtimeConfig = useRuntimeConfig();

const db = drizzle(runtimeConfig.databaseUrl);

export {
    db
}