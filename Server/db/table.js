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
        email VARCHAR(30) NOT NULL UNIQUE,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        password VARCHAR(200) NOT NULL,
        address VARCHAR(200),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isAdmin boolean DEFAULT false
    )`;
    const carTable = `
    CREATE TABLE IF NOT EXISTS cars(
        id SERIAL PRIMARY KEY UNIQUE,
        owner TEXT NOT NULL REFERENCES users(email),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        state VARCHAR(30) NOT NULL,
        status VARCHAR(30) NOT NULL,
        price INTEGER NOT NULL,
        manufacturer VARCHAR(30),
        model VARCHAR(30),
        body_type VARCHAR(30),
        carName TEXT NOT NULL,
        image TEXT
    )`;
    const orderTable = `
    CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY UNIQUE,
        buyer TEXT NOT NULL REFERENCES users(email),
        car_id INTEGER NOT NULL REFERENCES cars(id),
        amount INTEGER NOT NULL,
        status VARCHAR(30) DEFAULT 'pending'
    )`;
    const flagTable = `
    CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY UNIQUE,
        car_id INTEGER NOT NULL REFERENCES cars(id),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reason VARCHAR(30),
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

};
createTables();