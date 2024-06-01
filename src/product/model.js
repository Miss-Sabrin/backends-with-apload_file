const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    price: { type: Number, required: true },
    salePrice: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isTrending: { type: Boolean, default: false },

    photos: {
      type: [],
      default: [
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);



// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     desc: { type: String },
//     price: { type: Number, required: true },
//     salePrice: {
//       startDate: { type: Date },
//       endDate: { type: Date },
//       discountPercentage: { type: Number, default: 0 }, // Discount percentage
//       discountedPrice: { type: Number } // Calculated discounted price
//     },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
//     isTrending: { type: Boolean, default: false },
//     photos: {
//       type: [],
//       default: [
//         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//       ],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Pre-save middleware to calculate the discounted price
// ProductSchema.pre('save', function (next) {
//   if (this.salePrice.discountPercentage) {
//     this.salePrice.discountedPrice = this.price - (this.price * this.salePrice.discountPercentage / 100);
//   }
//   next();
// });

// module.exports = mongoose.model("Product", ProductSchema);

