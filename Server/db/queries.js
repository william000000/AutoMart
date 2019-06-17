const user = {
    createUser: `
    INSERT INTO users(email, password, first_name, last_name, address)
    VALUES($1, $2, $3, $4, $5) RETURNING *`,
    login: `SELECT * FROM users WHERE email = $1`,
    isUserLogged: `SELECT * FROM tokens WHERE email = $1`,
    isUserLoggedT: `SELECT * FROM tokens WHERE token = $1`,
    createToken: `INSERT INTO tokens(token, email) VALUES($1, $2) RETURNING token`,
    logout: `DELETE FROM tokens WHERE token = $1 RETURNING token`,
    updatePassword: `UPDATE users SET password = $2 WHERE email = $1 RETURNING password`,
    userExist: `SELECT email FROM users WHERE email = $1`,
    isUserAdmin: `SELECT email FROM users WHERE isAdmin = true`,
    carOwner: `SELECT users.id FROM users, cars WHERE users.id = cars.owner`,
    orderOwner: `SELECT users.id FROM users, orders WHERE users.id = orders.buyer`,
};

const car = {
    createCar: `
    INSERT INTO cars(owner, state, price, manufacturer, model, image, body_type, carName)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    getCars: `SELECT * FROM cars`,
    getCar: `SELECT * FROM cars WHERE id = $1`,
    updateCar: `UPDATE cars SET $2 = $3 WHERE id = $1 RETURNING *`,
    deletecar: `DELETE FROM cars WHERE id = $1 RETURNING carName`,
    isCarExist: `SELECT * FROM cars WHERE owner= $1 AND carName = $2`
};

const order = {
    createOrder: `
    INSERT INTO orders(buyer, car_id, amount) VALUES($1, $2, $3) RETURNING *`,
    getOrder: `SELECT * FROM orders WHERE id = $1`,
    updateOrder: `UPDATE orders SET $2 = $3 WHERE id = $1 RETURNING *`,
    deleteOrder: `DELETE FROM orders WHERE id = $1 RETURNING id`,
    isOrderExist: `SELECT * FROM orders WHERE car_id = $1 and buyer = $2`
};

const flag = {
    createFlag: `INSERT INTO flags(car_id, reason, description)`,
};

export { user, car, order, flag };


