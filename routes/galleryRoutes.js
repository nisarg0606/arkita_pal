const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const multer = require("multer");
const auth = require("../middleware/auth");

// multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "gallery/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB in bytes
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    },
});

router.get("/", galleryController.getImages);

router.delete("/:id", galleryController.deleteImage);

router.get("/:id", galleryController.downloadImage);

//add auth middleware
router.post("/", auth, upload.single("image"), galleryController.uploadImage);

module.exports = router;
