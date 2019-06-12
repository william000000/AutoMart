import express from "express";
import userController from "../controllers/users";
import auth from "../middleware/auth";
import validateUser from "../helper/authValidation";
const router = express.Router();

const { validateSignup } = validateUser;
const { validateLogin } = validateUser;
router.post("/signup", validateSignup, userController.signup);
router.post("/signin", validateLogin, userController.signin);


export default router;