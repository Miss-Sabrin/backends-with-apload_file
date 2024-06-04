const Banner = require("./bannerModel");

module.exports = {
  //todo create banner 👍
  createBanner: async (req, res) => {
    try {
      const { name, desc, productId } = req.body;
      const banner = await Banner({
        name: name,
        desc: desc,
        productId: productId,
      }).save();

      res.status(200).json({ status: "success", data: banner });
    } catch (e) {
      res.status(401).json({ status: "fail", message: e.toString() });
    }
  },

  ///todo get data
  fetchBanner: async (req, res) => {
    try {
      const banners = await Banner.find().populate("productId");

      res.status(200).json({ status: "success", data: banners });
    } catch (e) {
      res.status(401).json({ status: "fail", message: e.toString() });
    }
  },
};
