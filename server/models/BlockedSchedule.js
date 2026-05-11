const mongoose = require("mongoose");

const blockedScheduleSchema =
  new mongoose.Schema(
    {
      blockDate: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        default: null,
      },

      endTime: {
        type: String,
        default: null,
      },

      isFullDay: {
        type: Boolean,
        default: false,
      },

      reason: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "BlockedSchedule",
  blockedScheduleSchema
);