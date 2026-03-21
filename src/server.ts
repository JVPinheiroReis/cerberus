import app from "./app";
import { pool } from "./db/client";

const PORT = 3000;

async function start() {
    try {
        await pool.query("SELECT 1");
        console.log("Database connected...");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start: ", err);
        process.exit(1);
    }
}
start();
