const Stats = require("../models/statsModel");

// create stats
exports.createStats = (req, res) => {
  const stats = new Stats({
    completedSeminars: req.body.completedSeminars,
    onlineConsultation: req.body.onlineConsultation,
    totalClients: req.body.totalClients,
  });
  stats
    .save()
    .then(function () {
      res.status(200).json({
        message: "Stats created successfully",
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

// get all stats
exports.getStats = (req, res) => {
  Stats.find()
    .then(function (stats) {
      res.status(200).json(stats);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// update stats
exports.updateStats = (req, res) => {
  Stats.updateOne(
    { _id: req.params.id },
    {
      $set: {
        completedSeminars: req.body.completedSeminars,
        onlineConsultation: req.body.onlineConsultation,
        totalClients: req.body.totalClients,
      },
    }
  ).then(function () {
    res.status(200).json({
      message: "Stats updated successfully",
    });
  });
};
