const express = require("express");
const router = express.Router();

let { adminAuth } = require("../../../middlewares/auth");

const carController = require("../../../controllers/carController");

router.post("/", adminAuth, carController.addCar);
router.get("/", carController.getAllCars);

// filters
router.get("/filter?", carController.getFilterResults);

router.get("/:id", carController.getSingleCar);
router.put("/:id", adminAuth, carController.updateCar);
router.delete("/:id", adminAuth, carController.deleteCar);

module.exports = router;
