const Blog = require("../models/blogModel");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.file.path;
    const imgType = req.file.mimetype;
    const newBlog = new Blog({ title, content, image, imgType });
    console.log(newBlog);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.message === "Only image files are allowed") {
      return res.status(400).json({ error: error.message });
      // if (error.message.startsWith("E11000")) {
    } else if (error.message.startsWith("E11000")) {
      return res.status(400).json({ error: "Title already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    //get recent 3 blogs other than the current blog
    const recentBlogs = await Blog.find({ _id: { $ne: req.params.id } })
      .sort({ createdAt: -1 })
      .limit(3);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ blog, recentBlogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const getBlog = await Blog.findById(req.params.id);
    if (!getBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const title = req.body.title;
    const content = req.body.content;
    let image = req.file ? req.file.path : null;
    if (image === getBlog.image) {  
    console.log("image not updated from if Line 65");
      image = null;
    }

    let imgType = req.file ? req.file.mimetype : null;
    if (image) {
      if (
        imgType !== "image/jpeg" &&
        imgType !== "image/jpg" &&
        imgType !== "image/png"
      ) {
        res.status(400).json({ error: "Only image files are allowed" });
      }
    }
    let updatedBlog;
    if (!image) {
      updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      );
        console.log("image not updated from if");
    } else {
      updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, content, image, imgType },
        { new: true }
      );
    }

    if (!updatedBlog) {
      return res.status(404).json({ error: error.message });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    if (error.message === "Only image files are allowed") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
