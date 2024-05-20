const express = require("express");
const { createOrder, fetchOrders, getOrder, updateOrder, deleteOrder } = require("./orderController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/", fetchOrders);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
