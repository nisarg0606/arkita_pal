const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const multer = require("multer");
const auth = require("../middleware/auth");

// multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", galleryController.getImages);

router.get("/images", galleryController.getImagesBard);

router.get("/:path", galleryController.downloadImage);

//add auth middleware
router.post("/", auth, upload.single("image"), galleryController.uploadImage);

module.exports = router;
