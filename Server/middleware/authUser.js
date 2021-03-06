import runQuery from '../db/executeQuery';
import jwt from 'jsonwebtoken';
import { user } from '../db/queries'; 

class Securities {
    static async isUserLogged(req, res, next) {
        try {
            const result = await runQuery(user.isUserLoggedT, [req.body.token]);
            if(!result[0]) throw new Error('you must be logged in');
            next();
        } catch(err) {
            res.status(400).send({
                status: 400,
                error: err.message,
            });
        }
    }
}

export default Securities;