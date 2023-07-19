const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const statsController = require("../controllers/statsController");

router.post("/create", auth, statsController.createStats);
router.get("/get", statsController.getStats);
router.put("/update/:id", auth, statsController.updateStats);

module.exports = router;
