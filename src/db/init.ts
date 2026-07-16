import { readFileSync } from "node:fs";
import path from "node:path";
import { pool } from "./client";

export async function initDb() {
	const filePath = path.join(__dirname, "schema.sql");
	const sql = readFileSync(filePath, "utf-8");

	await pool.query(sql);
}
