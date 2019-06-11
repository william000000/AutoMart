import express from "express";
import userController from "../controllers/users";
import auth from "../middleware/auth";
import validateUser from "../helper/signUpValid";
const router = express.Router();

const {validateSignup} = validateUser;
router.post("/signup",validateSignup,userController.signup);
router.post("/signin",userController.signin);


export default router;