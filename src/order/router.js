const express = require("express");
const { createOrder, getOrders, getUserOrders } = require("./orderController");

const router = express.Router();
router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/user/:userId", getUserOrders);
// router.get("/:id", getPayment);
module.exports = router;
