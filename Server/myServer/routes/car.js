import express from "express";
import carController from "../controllers/car";
const router = express.Router();

router.post("/car", carController.addCarPost);
router.post("/order", carController.purchaseOrder);
router.patch("/order/:id/price", carController.updatePriceOfOrder);
router.patch("/car/:id/status", carController.markPosted);
router.patch("/car/:id/price", carController.updateCarPrice);
router.get("/car/:id", carController.viewSpecificCar);
router.get("/car", carController.viewAllUnsoldCar);
router.delete("/car/:id", carController.deleteCar);
router.get("/car-all", carController.viewAllPostedCar);
router.post("/flag", carController.flagAsFraudulent);
router.get("/car-range", carController.viewAllUnsoldCarInRange);
router.get("/car-used", carController.viewAllUnsoldCarBySpecificMakeUsed);
export default router;
