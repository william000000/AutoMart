import express from "express";
import carController from "../controllers/car";
const router = express.Router();

router.post("/car", carController.addCarPost);

router.post("/order", carController.purchaseOrder);


export default router;