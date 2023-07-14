const express = require("express");
const router = express.Router();

const statsController = require("../controllers/statsController");

router.post("/create", statsController.createStats);
router.get("/get", statsController.getStats);
router.put("/update/:id", statsController.updateStats);

module.exports = router;
