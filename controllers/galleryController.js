const fetch = require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");
const Gallery = require("../models/galleryModel");

// Get all images
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get an image by id
exports.downloadImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Upload an image
exports.uploadImage = async (req, res) => {
  try {
    const image = req.file.path;
    const imgType = req.file.mimetype;
    const alt = req.body.alt;
    const newImage = new Gallery({ image, imgType, alt });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    if (error.message === "Only image files are allowed") {
      return res.status(400).json({ error: error.message });
    } else if (error.message.startsWith("E11000")) {
      return res.status(400).json({ error: "Image already exists" });
    }
    res.status(500).json({ error: error.message });
  }
}

// delete an image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    await image.remove();
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
