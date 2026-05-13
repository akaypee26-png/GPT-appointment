const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointmentDate: {
      type: String,
      required: true,
    },

    day: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "booked",
        "cancelled",
        "completed",
        "rescheduled",
      ],
      default: "booked",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    rescheduledCount: {
      type: Number,
      default: 0,
    },

    cancelledBy: {
      type: String,
      enum: ["patient", "doctor", ""],
      default: "",
    },

    cancellationReason: {
      type: String,
      default: "",
    },

    doctorNotes: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);