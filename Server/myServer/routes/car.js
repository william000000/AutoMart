import express from "express";
import carController from "../controllers/car";
const router = express.Router();

router.post("/car", carController.addCarPost);
router.post("/order", carController.purchaseOrder);
router.patch("/order/:id/price",carController.updatePriceOfOrder);
router.patch("/car/:id/status",carController.markPosted);

export default router;