import express from "express";
import userController from "../controllers/users";
import auth from "../middleware/auth";
import validateUser from "../helper/authValidation";
import newpass from "../controllers/resetpassword";
import Securities from "../middleware/authUser";

const router = express.Router();

const { validateSignup } = validateUser;
const { validateLogin } = validateUser;
const { isUserLogged } = Securities;

router.post("/signup", validateSignup, userController.signup);
router.post("/signin", validateLogin, userController.signin);
router.post("/resetpassword",isUserLogged, newpass.reset);

export default router;