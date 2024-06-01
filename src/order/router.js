const express = require("express");
const { createOrder, getOrders, getUserOrders, deleteOrder } = require("./orderController");

const router = express.Router();
router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/user/:userId", getUserOrders);
 router.delete("/:id", deleteOrder);
module.exports = router;
