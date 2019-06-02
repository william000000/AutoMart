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
}
export default carController;