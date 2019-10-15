const express = require("express");
const router = express.Router();

let { adminAuth } = require("../../../middlewares/auth");

const bookingController = require("../../../controllers/bookingController");

router.post("/", adminAuth, bookingController.makeBooking);

module.exports = router;
