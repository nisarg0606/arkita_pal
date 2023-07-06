const Service = require("../models/serviceModel");

exports.createService = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;
    const imgType = req.file.mimetype;
    const newService = new Service({ title, description, image, imgType });
    console.log(newService);
    const savedService = await newService.save();
    res.status(201).json(savedService);
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

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const image = req.file.path;
    const imageType = req.file.mimetype;
    const title = req.body.title;
    const description = req.body.description;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { image, imageType, title, description },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
