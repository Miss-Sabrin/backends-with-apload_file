const Order = require("./orderModel");
const mongoose = require("mongoose");
const Payment = require("../payment/model");
const { payByWaafiPay } = require("../payment/payment");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const {
        user,
        payment: paymentID,
        products,
        total,
        note,
        phone,
      } = req.body;

      // Validate payment method
      const paymentMethod = await Payment.findById(paymentID);
      if (!paymentMethod) {
        return res.status(400).json({ error: "Invalid payment method" });
      }

      if (paymentMethod.name === "CASH") {
        const order = await Order({
          user: user,
          payment: paymentID,
          products: products,
          total: total,
          note: note,
          phone: phone,
        }).save();

        return res.status(201).json(order);
      } else {
        const waafiResponse = await payByWaafiPay({
          phone: phone,
          amount: total,
          merchantUid: process.env.merchantUid,
          apiUserId: process.env.apiUserId,
          apiKey: process.env.apiKey,
        });

        if (waafiResponse.status) {
          const order = await Order({
            user: user,
            payment: paymentID,
            products: products,
            total: total,
            note: note,
            phone: phone,
          }).save();

          return res.status(201).json(order);
        } else {
          // Handling payment failure
          return res.status(400).send({
            status: "failed",
            message: `${waafiResponse.error}` ?? "Payment Failed Try Again",
          });
        }
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  getUserOrders: async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user: userId })
        .populate("payment")
        .populate({
          path: "products",
          populate: {
            path: "product",
            model: "Product",
          },
        });
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("payment")
        .populate({
          path: "products",
          populate: {
            path: "product",
            model: "Product",
          },
        });
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
