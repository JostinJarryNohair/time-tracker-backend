const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getAllCarLogs,
  getCarLog,
  createCarLog,
  updateCarLog,
  deleteCarLog,
} = require("../controllers/carLogController");

// All routes are protected
router.use(protect);

// Car log routes
router.route("/").get(getAllCarLogs).post(createCarLog);

router.route("/:id").get(getCarLog).patch(updateCarLog).delete(deleteCarLog);

module.exports = router;
