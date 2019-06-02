import cars from "../modals/cars";
import user from "../modals/user";
import order from "../modals/order";
class carController{
    static addCarPost(req,res){
        const singleUser = user.find(useer=>useer.email===req.body.email);
        if(!req.body.email){res,status(400).send({messsage:"not found"});}
        else if(!singleUser) { res.status(400).send({ status: 400, message: "not match"});}
        else if(singleUser){
            const newCar ={
                id: cars.length+1,
                email: singleUser.email,
                manufacturer: req.body.manufacturer,
                model: req.body.model,
                created_on: new Date(),
                price: parseFloat(req.body.price),
                state: req.body.state,
                status: "available"
            };
            cars.push(newCar); 
            res.status(200).send({ status: 200, newCar}); 
        }
        else{res.status(400).send({message:"not found"});}
    }
    static purchaseOrder(req,res){
        const singleCar = cars.find(c=>c.model===req.body.model);
        const buyer = user.find(us=>us.email===req.body.email);
        if(buyer){
        if(singleCar){
            if(singleCar.status==="available"){
                const priceOffered = req.body.price;
               return res.status(200).send({status: 200, data: {
                    id: order.length+1,
                    car_id: singleCar.id,
                    created_on: new Date(),
                    status: "pending",
                    price: singleCar.price,
                    priceOfffered: priceOffered} });
            }else{
                res.status(400).send({status:400, message: "pendind or sold"});
            }
        }
        else{
            res.status(400).send({status: 400, message: "car not found"});
        }
    }else res.status(400).send({status: 400, message: "user not found"});
    }

    static updatePriceOfOrder(req,res){
        const order_id = req.params.id;
        const checkOrder = order.find(o=>o.id===parseInt(order_id));
        if(checkOrder){ 
            if(checkOrder.status==="pending"){ const newPrice=parseFloat(req.body.price); 
                res.status(200).send({status: 200, data:{
                    id: checkOrder.id,
                    car_id: checkOrder.car_id,
                    status: "pending",
                    oldPrice: parseFloat(checkOrder.amount),
                    newPrice: parseFloat(newPrice) 
                }});  
            }
            else{return res.status(400).send({message:"Your order is not in pending mode"});}
        }
        else return res.status(400).send({message:"Your order not exist"});
    }
    static updateCarPrice(req,res){
        const car_id = req.params.id;
        const checkCar = cars.find(c=>c.id===parseInt(car_id));
        if(checkCar){ 
                const newPrice=parseFloat(req.body.price); 
                checkCar.price = newPrice;
                res.status(200).send({status: 200, data:{
                    id: checkCar.id,
                    car_id: checkCar.car_id,
                    created_on: new Date(),
                    model:checkCar.model,
                    status: checkCar.status,
                    state: checkCar.state,
                    price: parseFloat(checkCar.price),
                    manufacturer: checkCar.manufacturer
                }});  
        }
        else return res.status(400).send({message:"Your Car not found"}); 
    }

    static markPosted(req,res){
        const singleCar = cars.find(cr=>cr.id===parseInt(req.params.id));
        const userEmail = user.find(us=>us.email===req.body.email);
        if(userEmail){
            if(singleCar){
                if(singleCar.status==="available"){
                    const newStatus = cars.map(c=>{if(c.status==="available") c.status="sold"; return c;});
                    res.status(200).send({status:200, data:{
                        id:singleCar.id,
                        email:userEmail.email,
                        created_on:singleCar.created_on,
                        manufacturer:singleCar.manufacturer,
                        model: singleCar.model,
                        status: singleCar.status,
                        state: singleCar.state
                        }})
                }else return res.status(400).send({status:400, message: "car status is sold"});
            }
            else return res.status(400).send({status:400, message: "car is not found"});   
        }else return res.status(400).send({status:400, message: "incorrect Email account"});
    }
    static viewSpecificCar(req,res){
        const car_id = req.params.id;
        const checkCar = cars.findAll(c=>c.id===parseInt(car_id));
        if(checkCar){ 
                res.status(200).send({status: 200, data:checkCar});  
        }
        else return res.status(400).send({message:"Car not found"}); 
    }
    static viewAllUnsoldCar(req,res){
        const checkCar = cars.filter(car=>car.status==="available");
        if(checkCar){ 
         res.status(200).send({status: 200, data:checkCar});      
        }
        else return res.status(400).send({message:"Car not found"}); 
    }
     static deleteCar(req,res){
        const car_id = req.params.id;
        const checkCar = cars.find(car=>car.id===parseInt(car_id));
        if(checkCar){  
            const result = cars.filter(car=>car.id!==parseInt(car_id));
            return res.status(200).send({status: 200, data:result})}
        else return res.status(400).send({message:"Car not found"}); 
     }
     static viewAllPostedCar(req,res){
        const checkCar = cars.filter(car=>car.status==="sold"&&car.status==="available");
        if(checkCar){ 
         res.status(200).send({status: 200, data:checkCar});      
        }
        else return res.status(400).send({message:"Car not found"}); 
        // res.status(200).send({status: 200, data:checkCar });
    }
    static viewAllUnsoldCarInRange(req,res){
        // const min=0,max=0;
        const min_price = req.body.min_price;
        const max_price = req.body.max_price;
        const check = cars.find(car=>car.price);
    
        if(check.price>=parseFloat(min_price) && check.price<=parseFloat(max_price)){
            res.status(200).send({status: 200, data:check});
        }else return res.status(200).send({status: 200, data:"not found"});
    }

}
export default carController;