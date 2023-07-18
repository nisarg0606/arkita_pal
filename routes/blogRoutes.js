const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const multer = require('multer');
const auth = require("../middleware/auth");

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

// Create a new blog
router.post('/', auth, upload.single('image'), blogController.createBlog);

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get a single blog by ID
router.get('/:id', blogController.getBlogById);

// Update a blog by ID
router.put('/:id', auth, upload.single('image'), blogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;


