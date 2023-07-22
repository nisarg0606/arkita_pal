const express = require("express");
const cors = require("cors");
const moongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/gallery", express.static(path.join(__dirname, "gallery")));
// routes
app.use("/blog", require("./routes/blogRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/service", require("./routes/serviceRoutes"));
app.use("/gallery", require("./routes/galleryRoutes"));
app.use("/feedback", require("./routes/feedbackRoutes"));
app.use("/stats", require("./routes/statsRoutes"));

// connect to mongodb
const uri = process.env.ATLAS_URI;
moongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => console.log(err));

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
