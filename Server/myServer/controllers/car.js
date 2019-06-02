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
}
export default carController;