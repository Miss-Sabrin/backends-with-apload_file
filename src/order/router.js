const express = require("express");
const { createOrder, getOrders,   } = require("./orderController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/", getOrders);
//router.get("/:id", getOrder);


module.exports = router;
