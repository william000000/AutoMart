import jwt from "jsonwebtoken";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { user } from "../db/queries.js";
import runQuery from "../db/executeQuery";


class Password {
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns reset password 
     */
    static async reset(req, res) {
        const { token, password } = req.body;
        const email = jwt.decode(token).email;
        const singleUser = await runQuery(user.userExist, [email]);

        if (singleUser[0]) {
            console.log(singleUser[0]);
            const hash_password = await bcrypt.hash(password, 10);
            const resetp = await runQuery(user.updatePassword,[email, hash_password]);
            res.status(200).send({status: 200, message: "Successfully updated!", newPassword: resetp});
        }

    }
}
export default Password; 