import cars from "../modals/cars";
import flags from "../modals/flags";
import { car, user, order} from "../db/queries.js";
import runQuery from "../db/executeQuery";
import { throws } from "assert";

class carController {
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns post a car
     */
    static async addCarPost(req, res) {
        const { owner, state, price, manufacturer, model, image, body_type, carName } = req.body;
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
            const { buyer, car_id, amount, status, priceOffered } = req.body;
            const singleUser = await runQuery(user.userExist, [buyer]);
            const isOrderExist = await runQuery(order.isOrderExist, [car_id, buyer]);
            const singleCar = await runQuery(car.getCar, [car_id]);

            if (singleUser) {

                const newOrder = [buyer, car_id, amount];
                if (singleCar[0]) {
                    if (isOrderExist[0]) {
                        console.log(isOrderExist);
                        throw new Error("Order already exist");
                    }
                    const result = await runQuery(order.createOrder, newOrder);
                    res.status(200).send({ status: 200, result });
                } else {
                    throw new Error("Car not exist");
                }
            } else {
                throw new Error("User not exist");
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
     * @returns update price of order
     */
    static async updatePriceOfOrder(req, res) {
        const order_id = req.params.id;
        const isOrder = await runQuery(order.getOrder, [order_id]); 
        try{
            if(isOrder[0]){
                const amount = req.body.amount;
                
                const result = await runQuery(order.updateOrder, [order_id, amount]);
                res.status(200).send({status: 200, result});

            } else{
                throw new Error("order not exist");
            }

        } catch(err){ 
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
        const email = req.body.email;
        const singleCar = await runQuery(car.getCar, [id]);
        const singleUser = await runQuery(car.isOwner, [email]);

        try{
            if(singleUser[0]){
                if(singleCar[0]){
                    if(singleCar[0].status === "available"){
                        const update = await runQuery(car.updateCar,[id, "sold"]);                       
                            res.status(200).send({
                            status: 200,
                            data: update
                        });
                    } else{
                        throw new Error("Already sold");
                    }

                }else {
                    throw new  Error("car not exist");
                }
            } else{
                throw new Error("User not the owner of a car or not exist");
            }

        } catch(err){
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
    static  async updateCarPrice(req, res) {
        const id = parseInt(req.params.id);
        const email = req.body.email;
        const singleUser = await runQuery(car.isOwner, [email]);

        try{
            if(singleUser[0]&&singleUser[0].status==="available"){
                   const newPrice = req.body.amount;
                    const updateCarPrice = await runQuery(car.updateCarPrice, [id, newPrice, email]);
                    if(updateCarPrice[0]){

                        return res.status(200).send({
                            status: 200,
                            data: updateCarPrice
                        });

                }else {
                    throw new  Error("you are not the owner of a car or not exist and make sure the status is available");
                }
            } else{
                throw new Error("User not the owner of a car or not exist");
            }

        } catch(err){
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
        try{
            if(result[0]){
                return res.status(200).send({status: 200, data: result});
            } else {
                throw new Error("car not exist,Plz use exist one");
            }
           
        } catch(err){
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
        try{
            if(result[0]){
                return res.status(200).send({message: "Successfully deleted!"});
            } else {
                throw new Error("car not exist");
            }
           
        } catch(err){
            res.status(404).json({
                status: 404,
                error: err.message,

            });
        }

    }

    static flagAsFraudulent(req, res) {
        const car_id = req.body.id;
        const checkCar = flags.find(car => car.car_id == car_id);
        if (checkCar) {
            const newFlag = {
                id: flags.length + 1,
                car_id: checkCar.id,
                reason: checkCar.reason,
                description: checkCar.descriptive
            };
            return res.status(200).send({ status: 200, data: newFlag });
        }
        else { return res.status(404).send({ status: 404, data: "a car not found" }); }
    }

    //Routes with qwery parameter
    static viewCar(req, res) {

        const status = req.query.status;
        const state = req.query.state;
        const min = req.query.min_price;
        const max = req.query.max_price;
        const maker = req.body.make;
        const manufacturer = req.query.manufacturer;
        const body_type = req.query.body_type;

        //find all unsold car by manufacturer and state = used
        if (status && status.toLowerCase() === "available" && maker && state === "used") {
            const findCar = cars.find(car => car.manufacturer === maker.toLowerCase());
            if (findCar) { return res.status(200).send({ status: 200, data: findCar }); }
            else return res.status(404).send({ status: 404, message: "Manufacturer not found in available car" });
        }
        //find all unsold car by manufacturer and state = new
        if (status && status.toLowerCase() === "available" && maker && state === "new") {
            const findCar = cars.find(car => car.manufacturer === maker.toLowerCase());
            if (findCar) { return res.status(200).send({ status: 200, data: findCar }); }
            else return res.status(404).send({ status: 404, message: "Manufacturer not found in available car" });
        }

        //find availble cars in range of price
        else if (status && status.toLowerCase() === "available" && min && max) {
            const check = cars.filter(car => parseFloat(car.price) >= parseFloat(min) && parseFloat(car.price) <= parseFloat(max) && car.status === "available");
            if (check.length > 0) {
                res.status(200).send({
                    status: 200,
                    data: check
                });
            }
            else {
                return res.status(404).send({
                    status: 404,
                    data: "Not found, the range of price you specified not available!!"
                });
            }
        }
        //find sold cars in range of price
        else if (status && status.toLowerCase() === "sold" && min && max) {
            const check = cars.filter(car => parseFloat(car.price) >= parseFloat(min) && parseFloat(car.price) <= parseFloat(max) && car.status === "sold");
            if (check.length > 0) {
                res.status(200).send({
                    status: 200,
                    data: check
                });
            }
            else {
                return res.status(404).send({
                    status: 404,
                    data: "Not found, the range of price you specified is available!!"
                });
            }
        }
        //sstatus available and state used
        else if (status && status === "available" && state === "used") {
            const checkCar = cars.filter(car => car.status === "available" && car.state === "used");
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
            const checkCar = cars.filter(car => car.status === "available" && car.state === "new");
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
            const checkCar = cars.filter(car => car.status === "sold" && car.state === "new");
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
            const checkCar = cars.filter(car => car.status === "sold" && car.state === "used");
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
            const findCar = cars.filter(car => car.manufacturer === manufacturer.toLowerCase());
            if (findCar.length > 0) { return res.status(200).send({ status: 200, data: findCar }); }
            //else{ return res.status(404).send({status:404, message: "cars status is not available, use (available) status" });}

        }
        //find all unsold car, status= available
        else if (status && status.toLowerCase() === "available") {
            const checkCar = cars.filter(car => car.status === "available");
            if (checkCar.length > 0) {
                return res.status(200).send({ status: 200, data: checkCar });
            }
            else return res.status(404).send({ status: 404, message: "Car status are not available" });
        }
        //find all posted whether sold or not
        else if (!status && !min && !max && !maker && !manufacturer && !body_type) {
            return res.status(200).send({ status: 200, data: cars });
        }
        //find all unsold by body-type      
        else if (body_type) {
            const findBody = cars.filter(car => car.body_type === body_type.toLowerCase());
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