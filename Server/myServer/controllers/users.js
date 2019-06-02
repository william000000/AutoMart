import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import joi from "joi";
import user from "../modals/user";

dotenv.config();
class userController{
    static signup(req,res){
        const singleUser = user.find(useer=>useer.email===req.body.email);
            if(singleUser) return res.status(400).send({ status: 400, message: "User already exists"});
            const newUser ={
                id: user.length+1,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password,
                address: req.body.address,
                isAdmin: false
            };
            const token = jwt.sign({ _id: user.id  }, process.env.secretKey);
            if(newUser){
                user.push(newUser);
                res.status(200).send({status:200, data:{
                    token:token, 
                    id:newUser.id,
                    first_name:newUser.first_name,
                    last_name:newUser.last_name,
                    email: newUser.email,
                    address: newUser.address

                }});
            }
            else{res.status(404).send({status:404, message:'not data inserted!'});}
        }
    static signin(req,res){
        const token = jwt.sign({_id:user.id}, process.env.secretKey)
        const singleUser=user.find(useer=>useer.email===req.body.email && (useer.password===req.body.password));
        if(!singleUser) return res.status(400).send({status: 400 , message: "incorrect username or password"});
        if(singleUser){res.status(200).send({status: 200,data:{
            token:token,
            id:singleUser.id,
            first_name:singleUser.first_name,
            last_name:singleUser.last_name,
            email: singleUser.email,
            address: singleUser.address
        }});}
    }
}
export default userController; 