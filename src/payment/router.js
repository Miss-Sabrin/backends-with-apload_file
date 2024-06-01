const express = require("express");
const { createPayment, getPayment, getPayments, deletePayment } = require("./controller");
const router = express.Router();
router.post("/create", createPayment);
router.get("/:id", getPayment);
router.get("/", getPayments);
router.delete("/:id",deletePayment);

module.exports = router;