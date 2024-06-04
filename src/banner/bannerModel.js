const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    desc: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", BannerSchema);
