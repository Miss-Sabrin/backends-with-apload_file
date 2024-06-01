const ProductSchema = require("./model");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, desc, price, isTrending, units, category } = req.body;

      // Handle salePrice
      const salePrice = {
        startDate: req.body["salePrice.startDate"],
        endDate: req.body["salePrice.endDate"],
      };

      // Handle photos
      let photos = [];
      if (req.files && req.files.length > 0) {
        photos = req.files.map((file) => {
          let correctedPath =
            process.env.IMAGE_URL + file.path.replace(/\\/g, "/");
          return correctedPath;
        });
      } else {
        photos = [
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        ];
      }

      const product = new ProductSchema({
        name: name,
        desc: desc,
        price: price,
        salePrice: salePrice,
        category: category,
        isTrending: isTrending,
        units: units,
        photos: photos,
      });

      await product.save();

      res.status(201).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;

      const products = await ProductSchema.find({
        category: categoryId,
      }).populate("category");
      if (!products.length) {
        return res
          .status(404)
          .json({ message: "No products found in this category" });
      }
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      const products = await ProductSchema.find().populate("category");
      if (!products.length) {
        return res.status(404).json({ message: "No products found" });
      }
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await ProductSchema.findById(id).populate("category");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
