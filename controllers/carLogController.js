const CarLog = require("../models/CarLog");

// Get all car logs with pagination
const getAllCarLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const carLogs = await CarLog.find()
      .populate("assignedEmployee", "firstName lastName")
      .sort({ scheduledDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await CarLog.countDocuments();

    res.status(200).json({
      status: "success",
      results: carLogs.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
      data: { carLogs },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get single car log
const getCarLog = async (req, res) => {
  try {
    const carLog = await CarLog.findById(req.params.id).populate(
      "assignedEmployee",
      "firstName lastName"
    );

    if (!carLog) {
      return res.status(404).json({
        status: "fail",
        message: "Car log not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { carLog },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Create new car log
const createCarLog = async (req, res) => {
  try {
    const carLog = await CarLog.create(req.body);
    res.status(201).json({
      status: "success",
      data: { carLog },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update car log
const updateCarLog = async (req, res) => {
  try {
    const carLog = await CarLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedEmployee", "firstName lastName");

    if (!carLog) {
      return res.status(404).json({
        status: "fail",
        message: "Car log not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { carLog },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete car log
const deleteCarLog = async (req, res) => {
  try {
    const carLog = await CarLog.findByIdAndDelete(req.params.id);

    if (!carLog) {
      return res.status(404).json({
        status: "fail",
        message: "Car log not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllCarLogs,
  getCarLog,
  createCarLog,
  updateCarLog,
  deleteCarLog,
};
