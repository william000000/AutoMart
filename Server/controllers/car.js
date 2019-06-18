import cars from "../modals/cars";
import flags from "../modals/flags";
import { car, user, order, flag} from "../db/queries.js";
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
                if(result[0].status==='available'){
                    return res.status(200).send({status: 200, data: result});
                }else{
                    throw new Error("car you are trying, not has status of available");
                }
        
                
            } else {
                throw new Error("car not exist, Plz use exist one");
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

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns flag a car as fraudulent
     */

    static async flagAsFraudulent(req, res) {
        const car_id = req.body.id;
        const checkCar = await runQuery(car.getCar, [car_id]);
        const reason = req.body.reason;
        const desc = req.body.description;

        try{
            if(checkCar[0]){
                const result = await runQuery(flag.createFlag, [car_id, reason, desc]);
                res.status(200).send({status: 200, message: "Successfully reported!"});

            } else{
                throw new Error("car not found");
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
     * @returns Routes with qwery parameter
     */
    static async viewCar(req, res) {


    }

}
export default carController; 