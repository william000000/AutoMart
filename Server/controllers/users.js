import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import admin from "../middleware/admin";
import validUser from "../helper/authValidation";
import { Pool } from "pg";
import { user } from "../db/queries.js";
import runQuery from "../db/executeQuery";


dotenv.config();
class userController {
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {object} next 
     * @returns signup when user not exist
     */
    static async signup(req, res) {
        const { email, first_name, last_name, password, address } = req.body;
        const singleUser = await runQuery(user.userExist, [email]);
        console.log(singleUser);
        if (singleUser[0]) return res.status(400).send({ status: 400, message: "User already exists" });

        const hash_password = await bcrypt.hash(password, 10);
        const newUser = [
            email,
            hash_password,
            first_name,
            last_name,
            address
        ];

        const result = await runQuery(user.createUser, newUser);
        const token = jwt.sign({ email: email, first_name: first_name, last_name: last_name, isAdmin: result[0].isAdmin }, process.env.secretKey);
        const storeToken = await runQuery(user.createToken, [token, email]);
        if (result) {
            res.status(201).send({
                status: 201,
                token: token
            });
        } else {
            res.status(400).send({
                status: 400
            });
        }
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {object} next 
     * @returns login when user exist
     */
    static async signin(req, res) {
        try {
            const { email, password } = req.body;
            const singleUser =  await runQuery(user.login, [email]);
            if(!singleUser) throw new Error();
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, singleUser[0].password);
            if(isPasswordCorrect) {
                const token = jwt.sign({ email, isAdmin: singleUser[0].isAdmin }, process.env.secretKey);
                res.status(200).send({
                    status: 200,
                    token,
                    first_name: singleUser[0].first_name,
                    last_name: singleUser[0].last_name,
                    email: singleUser[0].email,
                    address: singleUser[0].address,
                    isAdmin: singleUser[0].isAdmin
                });
            }
        } catch(err) {
            res.status(400).send({
                status: 400,
                error: 'incorrect username or password!',

         });
        }

    }
}
export default userController; 