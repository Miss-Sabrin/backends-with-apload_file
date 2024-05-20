const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },


  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  



  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },


  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    
  },
  status: { type: String, required: true },
  desc: { type: String },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
