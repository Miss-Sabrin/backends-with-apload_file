const ProductSchema = require("./model");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, desc, price, salePrice, category } = req.body;
      const photos = req.files.map((file) => {
        let correctedPath =
          process.env.IMAGE_URL + file.path.replace(/\\/g, "/");
        return correctedPath;
      });
      const product = await ProductSchema({
        name: name,
        desc: desc,
        price: price,
        salePrice: salePrice,
        category: category,
        photos: photos,
      });

      await product.save();

      res.status(201).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
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
