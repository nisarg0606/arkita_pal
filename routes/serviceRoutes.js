const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Set up multer upload
const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2 MB in bytes
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Create a new service
router.post('/', upload.single('image'), serviceController.createService);

// Get all services
router.get('/', serviceController.getAllServices);

// Get a single service by ID
router.get('/:id', serviceController.getServiceById);

// Update a service by ID
router.put('/:id', upload.single('image'), serviceController.updateService);

// Delete a service by ID
router.delete('/:id', serviceController.deleteService);

module.exports = router;
