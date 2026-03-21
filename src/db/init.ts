import { readFileSync } from "fs";
import { pool } from "./client";
import path from "path";

export async function initDb() {
    const filePath = path.join(__dirname, "schema.sql");
    const sql = readFileSync(filePath, "utf-8");

    await pool.query(sql);
}
