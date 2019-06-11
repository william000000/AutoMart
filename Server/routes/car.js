import express from "express";
import carController from "../controllers/car";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/car", carController.addCarPost);
router.post("/order", carController.purchaseOrder);
router.patch("/order/:id/price", carController.updatePriceOfOrder);
router.patch("/car/:id/status", carController.markPosted);
router.patch("/car/:id/price", carController.updateCarPrice);
router.get("/car/:id", carController.viewSpecificCar);
router.delete("/car/:id",[auth,admin], carController.deleteCar);
router.post("/flag", carController.flagAsFraudulent);
router.get("/car", carController.viewCar);
export default router;
