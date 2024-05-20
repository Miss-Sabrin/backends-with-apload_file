const express = require("express");
const { createPayment, getPayment } = require("./paymentController");
const router = express.Router();

router.post("/create", createPayment);
router.get("/payment", getPayment);

module.exports = router;
