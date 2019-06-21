import { Pool } from "pg";
import dotenv from "dotenv";
import { loadavg } from "os";

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
        owner TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        state TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'available',
        price INTEGER NOT NULL,
        manufacturer TEXT NOT NULL,
        model TEXT NOT NULL,
        body_type TEXT NOT NULL,
        carName TEXT NOT NULL,
        image TEXT
    )`;
    const orderTable = `
    CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY UNIQUE,
        buyer TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        status TEXT DEFAULT 'pending'
    )`;
    const flagTable = `
    CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY UNIQUE,
        car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reason TEXT,
        description VARCHAR(50)
    )`;
    const tokenTable = `
    CREATE TABLE IF NOT EXISTS tokens(
        id SERIAL PRIMARY KEY UNIQUE,
        token TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE REFERENCES users(email) ON DELETE CASCADE,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    const dummy = [
        `insert into users(email,first_name,last_name,password,address,createdon,isAdmin) values ('willy@gmail.com','Musinga','Willy','$2b$10$2X70DV68hpCzB7.4dWt2VuvD.kqEKjNhwybv8YiukoUbF4vGfTYyC', 'Kigali','10/09/2000','true')`,
        `insert into users(email,first_name,last_name,password,address,createdon,isAdmin) values ('bobo@gmail.com','Bobo','Willo','$2b$10$2X70DV68hpCzB7.4dWt2VuvD.kqEKjNhwybv8YiukoUbF4vGfTYyC', 'Nigeria','10/09/2000','false')`,

        `INSERT INTO cars(owner, createdon, state, status, price, manufacturer, model, image, body_type, carName)
     VALUES('willy@gmail.com','10/04/2019','new','sold',5000.0,'lamborghini','lamborghini','https://william000000.github.io/AutoMart/UI/img/7.jpg','car','lamborghini')`,

        `INSERT INTO cars(owner, createdon, state, status, price, manufacturer, model, image, body_type, carName)
     VALUES('willy@gmail.com','12/04/2019','new','available',10000.0,'range','range','https://william000000.github.io/AutoMart/UI/img/7.jpg','car','range')`,

        `INSERT INTO cars(owner, createdon, state,  status, price, manufacturer, model, image, body_type, carName)
     VALUES('willy@gmail.com','12/04/2019','used','sold',12000.0,'bmw','bmw','https://william000000.github.io/AutoMart/UI/img/7.jpg','bmw','car')`,

        `INSERT INTO cars(owner, createdon, state,  status,price, manufacturer, model, image, body_type, carName)
     VALUES('willy@gmail.com','12/04/2019','used','available',20000.0,'nissan','nissan','https://william000000.github.io/AutoMart/UI/img/7.jpg','truck','nissan')`,

        `INSERT INTO cars(owner, createdon, state, status, price, manufacturer, model, image, body_type, carName)
     VALUES('willy@gmail.com','12/04/2019','used','available',20000.0,'fusso','fusso','https://william000000.github.io/AutoMart/UI/img/7.jpg','truck','fusso')`,

        `INSERT INTO cars(owner, createdon, state, status, price, manufacturer, model, image, body_type, carName)
     VALUES('willy@gmail.com','12/04/2019','new','available',10000.0,'v8','land-cruiser','https://william000000.github.io/AutoMart/UI/img/7.jpg','car','land-cruiser')`,

        `INSERT INTO cars(owner, createdon,state, status, price, manufacturer, model, image, body_type, carName)
     VALUES('willy@gmail.com','12/04/2019','used','available',20000.0,'fusso','huidai','https://william000000.github.io/AutoMart/UI/img/7.jpg','truck','huidai')`,

        `insert into flags(car_id,email,createdon,reason,description) values (1,'willy@gmail.com','12/04/2019','pricing','Has weak technology...')`,
        `insert into flags(car_id,email,createdon,reason,description) values (2,'willy@gmail.com','12/04/2019','weirds demands','Engine not working well...')`,

        `insert into orders(buyer,car_id,amount,status) values ('willy@gmail.com',4,10000,'accepted')`,
        `insert into orders(buyer,car_id,amount,status) values ('willy@gmail.com',2,10000,'pending')`,

    ];

    await pool.query(userTable);
    await pool.query(carTable);
    await pool.query(flagTable);
    await pool.query(orderTable);
    await pool.query(tokenTable);

    for (const single of dummy) {
        await pool.query(single);
    }
};
createTables();
