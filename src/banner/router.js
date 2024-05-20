const express = require("express");
const { createBanner, fetchBanner } = require("./bannerController");
const { upload } = require("../multer");
const router = express.Router();

router.post("/create",upload.single("photo"), createBanner);
router.get("/", fetchBanner);

module.exports = router;
