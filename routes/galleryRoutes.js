const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const multer = require("multer");

// multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", galleryController.getImages);

router.get("/images", galleryController.getImagesBard);

router.get("/:path", galleryController.downloadImage);

router.post("/", upload.single("image"), galleryController.uploadImage);

module.exports = router;
