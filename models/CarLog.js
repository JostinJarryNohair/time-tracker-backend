const mongoose = require("mongoose");

const carLogSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    vehicleInfo: {
      make: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      color: String,
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      enum: [
        "Basic Wash",
        "Full Detail",
        "Interior Only",
        "Exterior Only",
        "Custom",
      ],
    },
    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    completionDate: Date,
    price: {
      type: Number,
      required: true,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CarLog", carLogSchema);
