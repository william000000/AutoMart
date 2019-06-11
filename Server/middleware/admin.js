function admin(req,res,next){
    if(!req.user.isAdmin){ return res.status(403).send({status:403, message:"Forbidden, you are not allowed!"});}
    next();
}
export default admin;