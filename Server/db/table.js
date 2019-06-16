import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createTables = async () => {
    const userTable = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY UNIQUE,
        email TEXT NOT NULL UNIQUE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        password TEXT NOT NULL,
        address TEXT,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isAdmin boolean DEFAULT false
    )`;
    const carTable = `
    CREATE TABLE IF NOT EXISTS cars(
        id SERIAL PRIMARY KEY UNIQUE,
        owner TEXT NOT NULL REFERENCES users(email),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        state TEXT NOT NULL,
        status TEXT NOT NULL,
        price INTEGER NOT NULL,
        manufacturer TEXT,
        model TEXT,
        body_type TEXT,
        carName TEXT NOT NULL,
        image TEXT
    )`;
    const orderTable = `
    CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY UNIQUE,
        buyer TEXT NOT NULL REFERENCES users(email),
        car_id INTEGER NOT NULL REFERENCES cars(id),
        amount INTEGER NOT NULL,
        status TEXT DEFAULT 'pending'
    )`;
    const flagTable = `
    CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY UNIQUE,
        car_id INTEGER NOT NULL REFERENCES cars(id),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reason TEXT,
        description VARCHAR(50)
    )`;
    const tokenTable = `
    CREATE TABLE IF NOT EXISTS tokens(
        id SERIAL PRIMARY KEY UNIQUE,
        token TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE REFERENCES users(email),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
        
    await pool.query(userTable);
    await pool.query(carTable);
    await pool.query(flagTable);
    await pool.query(orderTable);
    await pool.query(tokenTable);
    pool.end();
    console.log("Table created");

};
createTables();