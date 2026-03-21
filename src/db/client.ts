import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cerberus",
    password: "postgres",
    port: 1000,
});
