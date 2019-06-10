import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function auth(req,res,next){
 const token = req.header("x-auth-token");
 if(!token){ return res.status(400).send({status:400, message:"access denied!"});}
 try{
    const decode = jwt.verify(token,process.env.secretKey);
    req.user = decode;
    next();
 } catch(ex){
     res.status(400).send({status:400, message:"invalid token"});
 }

}
export default auth;