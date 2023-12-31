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
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    // if image is updated then upload the new image
    if (req.file) {
      blog.image = req.file.path;
      blog.imgType = req.file.mimetype;
      // if mimetype is not image then return error
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({ error: "Only image files are allowed" });
      }
    }else{
      console.log("No image uploaded");
    }
    blog.title = req.body.title;
    blog.content = req.body.content;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
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
