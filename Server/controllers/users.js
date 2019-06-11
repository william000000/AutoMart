import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import joi from "joi";
import user from "../modals/user";
import bcrypt from "bcrypt";
import admin from "../middleware/admin";
import validUser from "../helper/signUpValid";

dotenv.config();
class userController {
    static async signup(req, res) {
        const singleUser = user.find(useer => useer.email === req.body.email);
        if (singleUser) return res.status(400).send({ status: 400, message: "User already exists" });
        const newUser = {
            id: user.length + 1,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            address: req.body.address,
            isAdmin: false};
            validUser.validate(newUser);
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password,salt);      
        const token = jwt.sign({ _id: user.id}, process.env.secretKey);
            user.push(newUser);
            res.status(200).send({ status: 200, 
                data: {
                    token: token,
                    id: newUser.id,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    address: newUser.address,
                    password:newUser.password
                }
            });
    }
    static signin(req, res) { 
        const singleUser = user.find(useer => useer.email === req.body.email );
        if (!singleUser) return res.status(400).send({ status: 400, message: "incorrect username or password" });
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,singleUser.password);
        const token = jwt.sign({ _id: user.id, isAdmin: singleUser.isAdmin }, process.env.secretKey);
        if (!isPasswordCorrect) return res.status(400).send({ status: 400, message: "incorrect username or password" });
            res.status(200).send({
                status: 200, data: {
                    token: token,
                    id: singleUser.id,
                    first_name: singleUser.first_name,
                    last_name: singleUser.last_name,
                    email: singleUser.email,
                    address: singleUser.address,
                    isAdmin: singleUser.isAdmin
                }
            });
        
    }
}
export default userController; 