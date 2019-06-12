import cars from "../modals/cars";
import user from "../modals/user";
import order from "../modals/order";
import flags from "../modals/flags";
class carController {
    static addCarPost(req, res) {
        const singleUser = user.find(useer => useer.email === req.body.email);
        if (!req.body.email) { res, status(400).send({ messsage: "not found" }); }
        else if (!singleUser) { res.status(400).send({ status: 400, message: "not match" }); }
        else if (singleUser) {
            const newCar = {
                id: cars.length + 1,
                email: singleUser.email,
                manufacturer: req.body.manufacturer,
                model: req.body.model,
                created_on: new Date(),
                price: parseFloat(req.body.price),
                state: req.body.state,
                status: "available"
            };
            cars.push(newCar);
            res.status(200).send({ status: 200, newCar });
        } else { res.status(400).send({ status: 400, message: "not found" }); }
    }
    static purchaseOrder(req, res) {
        const singleCar = cars.find(c => c.model === req.body.model);
        const buyer = user.find(us => us.email === req.body.email);
        if (buyer) {
            if (singleCar) {
                if (singleCar.status === "available") {
                    const priceOffered = req.body.price;
                    return res.status(200).send({
                        status: 200, data: {
                            id: order.length + 1,
                            car_id: singleCar.id,
                            created_on: new Date(),
                            status: "pending",
                            price: singleCar.price,
                            priceOfffered: priceOffered
                        }
                    });
                } else { res.status(400).send({ status: 400, message: "pendind or sold" }); }
            }
            else { res.status(400).send({ status: 400, message: "car not found" }); }
        } else res.status(400).send({ status: 400, message: "user not found" });
    }
    static updatePriceOfOrder(req, res) {
        const order_id = req.params.id;
        const checkOrder = order.find(o => o.id === parseInt(order_id));
        if (checkOrder) {
            if (checkOrder.status === "pending") {
                const newPrice = parseFloat(req.body.price);
                res.status(200).send({
                    status: 200, data: {
                        id: checkOrder.id,
                        car_id: checkOrder.car_id,
                        status: checkOrder.status,
                        oldPrice: parseFloat(checkOrder.amount),
                        newPrice: parseFloat(newPrice)
                    }
                });
            }
            else { return res.status(400).send({ status: 400, message: "Your order is not in pending mode" }); }
        }
        else return res.status(400).send({ status: 400, message: "Your order not exist" });
    }
    static markPosted(req, res) {
        const singleCar = cars.find(cr => cr.id === parseInt(req.params.id));
        const userEmail = user.find(us => us.email === req.body.email);
        if (userEmail) {
            if (singleCar) {
                if (singleCar.status === "available") {
                    cars.map(c => { if (c.status === "available") c.status = "sold"; return c; });
                    res.status(200).send({
                        status: 200, data: {
                            id: singleCar.id,
                            email: userEmail.email,
                            created_on: singleCar.created_on,
                            manufacturer: singleCar.manufacturer,
                            model: singleCar.model,
                            status: singleCar.status,
                            state: singleCar.state
                        }
                    });
                } else return res.status(400).send({ status: 400, message: "car status is sold" });
            }
            else return res.status(400).send({ status: 400, message: "car is not found" });
        } else return res.status(400).send({ status: 400, message: "incorrect Email account" });
    }
    static updateCarPrice(req, res) {
        const car_id = req.params.id;
        const checkCar = cars.find(c => c.id === parseInt(car_id));
        if (checkCar) {
            const newPrice = parseFloat(req.body.price);
            checkCar.price = newPrice;
            res.status(200).send({
                status: 200, data: {
                    id: checkCar.id,
                    car_id: checkCar.car_id,
                    created_on: new Date(),
                    model: checkCar.model,
                    status: checkCar.status,
                    state: checkCar.state,
                    price: parseFloat(checkCar.price),
                    manufacturer: checkCar.manufacturer
                }
            });
        }
        else return res.status(400).send({ status: 400, message: "Your Car not found" });
    }
    static viewSpecificCar(req, res) {
        const car_id = req.params.id;
        const checkCar = cars.find(c => c.id === parseInt(car_id));
        if (checkCar) {
            res.status(200).send({ status: 200, data: checkCar });
        }
        else return res.status(400).send({ status: 400, message: "Car not found" });
    }

    static deleteCar(req, res) {
        const car_id = req.params.id;
        const checkCar = cars.find(car => car.id === parseInt(car_id));
        if (checkCar) {
            cars.splice(cars.indexOf(checkCar), 1);
            const result = cars.filter(car => car.id !== parseInt(car_id));
            return res.status(200).send({ status: 200, data: result });
        }
        else { return res.status(400).send({ status: 400, message: "Car not found" }); }
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
        else { return res.status(400).send({ status: 400, data: "a car not found" }); }
    }

    /*
    static viewAllPostedCar(req, res) {
        const checkCar = cars.filter(car => car.status === "sold" || car.status === "available");
        if (checkCar.length > 0) { res.status(200).send({ status: 200, data: checkCar }); }
        else return res.status(400).send({ status: 400, message: "Car not found" });
    }*/

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
            const check = cars.filter(car => parseFloat(car.price) >= parseFloat(min) && parseFloat(car.price) <= parseFloat(max));
            if (check.length > 0) {
                res.status(200).send({
                    status: 200,
                    data: check
                });
            }
            else {
                return res.status(400).send({
                    status: 400,
                    data: "the range of price you specified not available!!"
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
                    status: "404",
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
            else return res.status(400).send({ status: 400, message: "Body Type not found" });
        }
        else {
            return res.status(400).send({ status: 400, message: "Bad request" });
        }


    }

}
export default carController; 