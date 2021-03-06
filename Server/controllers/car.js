import cars from "../modals/cars";
import flags from "../modals/flags";
import { car, user, order, flag } from "../db/queries.js";
import runQuery from "../db/executeQuery";
import { throws } from "assert";
import jwt from "jsonwebtoken";

class carController {
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns post a car
     */
    static async addCarPost(req, res) {
        const { state, price, manufacturer, model, image, body_type, carName } = req.body;
        const owner = jwt.decode(req.body.token).email;
        const isCarExist = await runQuery(car.isCarExist, [owner, carName]);
        const singleUser = await runQuery(user.userExist, [owner]);

        if (!singleUser[0]) { return res.status(400).send({ messsage: "user not found" }); }
        else if (isCarExist[0]) { return res.status(400).send({ message: "car already exist" }); }
        else if (singleUser[0]) {
            const newCar = [owner, state, price, manufacturer, model, image, body_type, carName];

            const result = await runQuery(car.createCar, newCar);
            return res.status(201).send({ status: 201, newCar });

        } else { res.status(400).send({ status: 400, message: "invalid data" }); }
    }

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns make purchase order
     */
    static async purchaseOrder(req, res) {
        try {
            const { car_id, amount, status } = req.body;
            const buyer = jwt.decode(req.body.token).email;
            const isCarExist = await runQuery(car.getCar, [car_id]);
            const isOrderOwner = await runQuery(car.carOwner, [car_id, buyer]);
            const isOrderExist = await runQuery(order.isOrderExist, [car_id, buyer]);
            const isOrderAdded = await runQuery(order.isOrderAdded, [car_id]);

            if (!isCarExist[0]) { throw new Error("car not exist"); }
            if (!isOrderOwner[0]) {

                if (!isOrderExist[0] && !isOrderAdded[0]) {

                    const newOrder = [buyer, car_id, amount];
                    const result = await runQuery(order.createOrder, newOrder);
                    res.status(201).json({
                        status: 201,
                        data: result
                    });

                } else { throw new Error('order is already exist'); }


            } else throw new Error("Owner can not make a purchase order");

        } catch (err) {
            res.status(400).send({
                status: 400,
                error: err.message,

            });
        }

    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns update price of order
     */
    static async updatePriceOfOrder(req, res) {

        const car_id = req.params.id;
        const buyer = jwt.decode(req.body.token).email;
        const isOrder = await runQuery(order.isOrderOwner, [buyer, car_id]);
        const isCarOwner = await runQuery(car.carOwner, [car_id, buyer]);
        try {
            if (isOrder[0]) {
                if (isCarOwner[0]) { throw new Error("You are the owner of the car"); }
                const amount = req.body.amount;

                const result = await runQuery(order.updateOrder, [car_id, amount]);
                res.status(200).send({ status: 200, result });

            } else {
                throw new Error("you are not the owner of that order");
            }

        } catch (err) {
            res.status(400).send({
                status: 400,
                error: err.message,

            });
        }
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns mark a posted car as sold
     */
    static async markPosted(req, res) {
        const id = req.params.id;
        const email = jwt.decode(req.body.token).email;
        const singleCar = await runQuery(car.getCar, [id]);
        const singleUser = await runQuery(car.carOwner, [id, email]);

        try {
            if (singleUser[0]) {
                if (singleCar[0]) {
                    if (singleCar[0].status === "available") {
                        const update = await runQuery(car.updateCar, [id, "sold"]);
                        res.status(200).send({
                            status: 200,
                            data: update
                        });
                    } else {
                        const update = await runQuery(car.updateCar, [id, "available"]);
                        res.status(200).send({
                            status: 200,
                            data: update
                        });
                    }

                } else {
                    throw new Error("car not exist");
                }
            } else {
                throw new Error("User not the owner of a car or not exist");
            }

        } catch (err) {
            res.status(400).json({
                status: 400,
                error: err.message,

            });
        }

    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns update the price of a car
     */
    static async updateCarPrice(req, res) {
        const id = parseInt(req.params.id);
        const owner = jwt.decode(req.body.token).email;
        const singleUser = await runQuery(car.isOwner, [owner]);

        try {
            if (singleUser[0]) {
                const newPrice = req.body.amount;
                const updateCarPrice = await runQuery(car.updateCarPrice, [id, newPrice, owner]);
                if (updateCarPrice[0]) {

                    return res.status(200).send({
                        status: 200,
                        data: updateCarPrice
                    });

                } else {
                    throw new Error("you are not the owner of a car or not exist and make sure the status is available");
                }
            } else {
                throw new Error("User not the owner of a car or not exist");
            }

        } catch (err) {
            res.status(400).json({
                status: 400,
                error: err.message,

            });
        }
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns view specific car
     */
    static async viewSpecificCar(req, res) {
        const car_id = parseInt(req.params.id);
        const result = await runQuery(car.getCar, [car_id]);
        try {
            if (result[0]) {
                if (result[0].status === 'available') {
                    return res.status(200).send({ status: 200, data: result });
                } else {
                    throw new Error("car you are trying, not has status of available");
                }


            } else {
                throw new Error("car not exist, Plz use exist one");
            }

        } catch (err) {
            res.status(404).json({
                status: 404,
                error: err.message,

            });
        }
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns delete a car
     */
    static async deleteCar(req, res) {
        const car_id = req.params.id;
        const result = await runQuery(car.deletecar, [car_id]);
        try {
            if (result[0]) {
                return res.status(200).send({ message: "Successfully deleted!" });
            } else {
                throw new Error("car not exist");
            }

        } catch (err) {
            res.status(404).json({
                status: 404,
                error: err.message,

            });
        }

    }

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns flag a car as fraudulent
     */

    static async flagAsFraudulent(req, res) {
        const car_id = req.body.id;
        const email = jwt.decode(req.body.token).email;
        const checkCar = await runQuery(flag.isflagExist, [email, car_id]);
        const isCarExist = await runQuery(car.getCar, [car_id]);
        const reason = req.body.reason;
        const desc = req.body.description;

        try {
            if (!checkCar[0]) {
                if (isCarExist) { throw new Error("Car not exist"); }
                const result = await runQuery(flag.createFlag, [car_id, email, reason, desc]);
                res.status(200).send({ status: 200, message: "Successfully reported!" });

            } else {
                throw new Error("You have already reported!");
            }

        } catch (err) {
            res.status(404).json({
                status: 404,
                error: err.message,

            });
        }
    }

    /**
    * 
    * @param {object} req 
    * @param {object} res 
    * @returns Routes with qwery parameter
    */
    static async viewCar(req, res) {
        const status = req.query.status;
        const state = req.query.state;
        let min = req.query.min_price;
        let max = req.query.max_price;
        const maker = req.body.make;
        const manufacturer = req.query.manufacturer;
        const body_type = req.query.body_type;

        const allCar = await runQuery(car.getCars);
        let allCars = await runQuery(car.getCars);

        //find all unsold car by manufacturer and state = used
        if (status && status.toLowerCase() === "available" && maker && state === "used") {
            const findCar = allCar.find(car => car.manufacturer === maker.toLowerCase());
            if (findCar) { return res.status(200).send({ status: 200, data: findCar }); }
            else return res.status(404).send({ status: 404, message: "Manufacturer not found in available car" });
        }

        //find all unsold car by manufacturer and state = new
        else if (status && status.toLowerCase() === "available" && maker && state === "new") {
            const findCar = allCar.find(car => car.manufacturer === maker.toLowerCase());
            if (findCar) { return res.status(200).send({ status: 200, data: findCar }); }
            else return res.status(404).send({ status: 404, message: "Manufacturer not found in available car" });
        }
        //find available cars in range of price
        else if (status && status.toLowerCase() === "available" && min || max) {
            if (min > max) {
                let temp = min;
                min = max;
                max = temp;
            }
            if (max) {
                allCars = allCars.filter(car => parseFloat(car.price) <= parseFloat(max) && car.status === "available");
            }
            if (min) {
                allCars = allCars.filter(car => parseFloat(car.price) >= parseFloat(min) && car.status === "available");
            }

            return res.status(200).send({ status: 200, data: allCars });
        }

        //sstatus available and state used
        else if (status && status === "available" && state === "used") {
            const checkCar = allCar.filter(car => car.status === "available" && car.state === "used");
            if (checkCar.length > 0) {
                res.status(200).send({
                    status: "200",
                    data: { checkCar }
                });
            } else {
                res.status(404).send({
                    status: 404,
                    message: "Not found"
                });
            }
        }
        //status availble and state = new
        else if (status && status === "available" && state === "new") {
            const checkCar = allCar.filter(car => car.status === "available" && car.state === "new");
            if (checkCar.length > 0) {
                res.status(200).send({
                    status: "200",
                    data: { checkCar }
                });
            } else {
                res.status(404).send({
                    status: 404,
                    message: "Not found"
                });
            }
        }
        //status sold and state = new
        else if (status && status === "sold" && state === "new") {
            const checkCar = allCar.filter(car => car.status === "sold" && car.state === "new");
            if (checkCar.length > 0) {
                res.status(200).send({
                    status: "200",
                    data: { checkCar }
                });
            } else {
                res.status(404).send({
                    status: 404,
                    message: "Not found"
                });
            }
        }
        //status sold and state = new
        else if (status && status === "sold" && state === "used") {
            const checkCar = allCar.filter(car => car.status === "sold" && car.state === "used");
            if (checkCar.length > 0) {
                res.status(200).send({
                    status: "200",
                    data: { checkCar }
                });
            } else {
                res.status(404).send({
                    status: 404,
                    message: "Not found"
                });
            }
        }
        //find all unsold by make, status=avail.. and manufacturer=xxx
        else if (status && status.toLowerCase() === "available" && manufacturer) {
            const findCar = allCar.filter(car => car.manufacturer === manufacturer.toLowerCase());
            if (findCar.length > 0) { return res.status(200).send({ status: 200, data: findCar }); }
        }
        //find all unsold car, status= available
        else if (status && status.toLowerCase() === "available") {
            const checkCar = allCar.filter(car => car.status === "available");
            if (checkCar.length > 0) {
                return res.status(200).send({ status: 200, data: checkCar });
            }
            else return res.status(404).send({ status: 404, message: "Car status are not available" });
        }
        //find all posted whether sold or not
        else if (!status && !min && !max && !maker && !manufacturer && !body_type) {
            return res.status(200).send({ status: 200, data: allCar });
        }
        //find all unsold by body-type      
        else if (body_type) {
            const findBody = allCar.filter(car => car.body_type === body_type.toLowerCase());
            if (findBody.length > 0) {
                res.status(200).send({ status: 200, data: findBody });
            }
            else return res.status(404).send({ status: 404, message: "Body Type not found" });
        }
        else {
            return res.status(400).send({ status: 400, message: "Bad request" });
        }

    }

}
export default carController; 