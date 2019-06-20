import { Pool } from "pg";
import dotenv from "dotenv";
import { loadavg } from "os";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const dropTable = [
    `DROP TABLE IF EXISTS orders`,
    `DROP TABLE IF EXISTS flags `,
    `DROP TABLE IF EXISTS tokens `,
    `DROP TABLE IF EXISTS cars cascade`,
    `DROP TABLE IF EXISTS users cascade`,
];

const dropTables = async () => {
    for (const single of dropTable) {
        await pool.query(single);
    }
};

dropTables();
