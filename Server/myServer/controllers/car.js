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
        } else { res.status(400).send({ status:400,message: "not found" }); }
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
            else { return res.status(400).send({status:400, message: "Your order is not in pending mode" }); }
        }
        else return res.status(400).send({status:400, message: "Your order not exist" });
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
        else return res.status(400).send({ status:400,message: "Your Car not found" });
    }
    static viewSpecificCar(req, res) {
        const car_id = req.params.id;
        const checkCar = cars.find(c => c.id === parseInt(car_id));
        if (checkCar) {
            res.status(200).send({ status: 200, data: checkCar });
        }
        else return res.status(400).send({status:400, message: "Car not found" });
    }
    static viewAllUnsoldCar(req, res) {
        const statuss = req.query.status;
        const checkCar = cars.filter(car => car.status === "available");
        if (checkCar) {
            if (statuss.toLowerCase() === "available") { return res.status(200).send({ status: 200, data: checkCar }); }
            else { return res.status(400).send({status:400, message:"search for available status not others"}); }
        }
        else return res.status(400).send({status:400, message: "Car status are not available" });
    }
    static deleteCar(req, res) {
        const car_id = req.params.id;
        const checkCar = cars.find(car => car.id === parseInt(car_id));
        if (checkCar) {
            const result = cars.filter(car => car.id !== parseInt(car_id));
            return res.status(200).send({ status: 200, data: result });
        }
        else { return res.status(400).send({status:400, message: "Car not found" }); }
    }

    static viewAllPostedCar(req, res) {
        const checkCar = cars.filter(car => car.status === "sold" || car.status === "available");
        if (checkCar) { res.status(200).send({ status: 200, data: checkCar }); }
        else return res.status(400).send({ status:400, message: "Car not found" });
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
            if (newFlag) return res.status(200).send({ status: 200, data: newFlag });
            else return res.status(400).send({status:400, message:"flag not specified"});
        }
        else { return res.status(400).send({ status: 400, data: "a car not found" }); }
    }
    static viewAllUnsoldCarInRange(req, res) {
        const min = req.query.min_price;
        const max = req.query.max_price;
        const status = req.query.status;
        const checked = cars.find(car=>car.status===status.toLowerCase());
        if (checked&&status.toLowerCase()==="available"){
            const check = cars.filter(car => car.price >= parseFloat(min) && car.price <= parseFloat(max)&&car.status==="available");
            if(check){res.status(200).send({ status: 200, data: check });}
            else {return res.status(200).send({ status: 200, data: "sold and not available!!" });}
        } else return res.status(200).send({ status: 200, data: "the range you specified not found" });
    }
    static viewAllUnsoldCarBySpecificMakeUsed(req, res) {
        const maker = req.body.make;
        const status = req.query.status;
        const state = req.query.state;
        const findCar = cars.find(car=>car.manufacturer === maker.toLowerCase() && car.state==="used" && car.status==="available");
        
        if (findCar) {
            const result = cars.filter(car=>car.manufacturer === maker.toLowerCase()&&car.status===status.toLowerCase()&&car.state===state);
            if(result){return res.status(200).send({ status: 200, data: result });}
            else return res.status(400).send({ status:400, message: "manufacturer not found" });
            }
        else return res.status(400).send({ status:400 ,message: "no cars available that are used" });
    }
    static viewAllUnsoldCarBySpecificMakeNew(req, res) {
        const maker = req.body.make;
        const statu = req.query.status;
        const state = req.query.state;
        const findCar = cars.find(car=>car.manufacturer === maker.toLowerCase() && car.state==="new" && car.status==="available");
        
        if (findCar) {
            const result = cars.filter(car=>car.manufacturer === maker.toLowerCase()&&car.status===statu.toLowerCase()&&car.state===state);
            if(result){return res.status(200).send({ status: 200, data: result });}
            else return res.status(400).send({status:400, message: "manufacturer not found" });
            }
        else return res.status(400).send({ status:400, message: "no cars available that are new" });
    }
    static viewAllUnsoldCarofSpecificMake(req,res){
        const maker = req.query.manufacturer;
        const status = req.query.status;
        const findCar = cars.filter(car=>car.manufacturer === maker.toLowerCase() && car.status==="available");
        if (findCar) {
            if(status.toLowerCase()==="available"){return res.status(200).send({ status: 200, data: findCar });}
            else{ return res.status(400).send({status:400, message: "cars status is not available, use (available) status" });}
        }
            
        else return res.status(400).send({status:400, message: "Manufacturer not found in available car" });
    }
    static viewAllCarByBodyType(req,res){
        const body_type = req.query.body_type;
        const findBody = cars.find(car=>car.body_type===body_type.toLowerCase());
        
        if (findBody){
            const findCar = cars.filter(car=>car.body_type === body_type.toLowerCase());
            return res.status(200).send({ status: 200, data: findCar }); }   
        else return res.status(400).send({status:400, message: "Body Type not found" });
    }
}
export default carController; 