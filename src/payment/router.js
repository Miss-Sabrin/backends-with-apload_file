const express = require("express");
const { createPayment, getPayment, getPayments } = require("./paymentController");
const router = express.Router();

router.post("/create", createPayment);
router.get("/:id", getPayment);

router.get("/payment", getPayments);

module.exports = router;
