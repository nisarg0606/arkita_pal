const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const models = {
  User,
};

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded + " " + "decoded");
    if (decoded.exp < Date.now() / 1000) {
    //   console.log("Token expired");
      return res.status(401).send({ error: "Token expired" });
    }
    const user = await User.findOne({ _id: decoded._id });
    // console.log(user + " " + "user");
    if (!user) {
      throw new Error();
    }
    console.log("in auth");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
