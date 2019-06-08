import express from "express";
import userController from "../controllers/users";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/signup",userController.signup);
router.post("/signin",auth,userController.signin);


export default router;