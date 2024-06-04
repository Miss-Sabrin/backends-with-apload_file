const Payment = require("././model");
module.exports = {
  createPayment: async (req, res) => {
    try {
      const { name, desc } = req.body;
      const payment = await Payment({ name, desc }).save();
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getPayments: async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (e) {
      res.status(400).json({ error: error.message });
    }
  },
  getPayment: async (req, res) => {
    const { id } = req.params;
    try {
      const payment = await Payment.findById(id);
      res.status(200).json(payment);
    } catch (e) {
      res.status(400).json({ error: error.message });
    }
  },
  //delete payment
  deletePayment: async (req, res) => {
    try {
      const payment = await Payment.findByIdAndDelete(req.params.id);

      res.status(200).json({ status: "success", data: "succesfullay deleted" });
    } catch (e) {
      res.status(401).json({ status: "fail", message: e.toString() });
    }
  },
};
