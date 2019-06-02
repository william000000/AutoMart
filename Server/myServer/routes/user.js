import express from "express";
import userController from "../controllers/users";
const router = express.Router();

router.post("/signup",userController.signup);


export default router;