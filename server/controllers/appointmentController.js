const generateSlots = require("../utils/generateSlots");
const Appointment = require("../models/Appointment");
const generateBookingId = require("../utils/generateBookingId");
const createNotification = require("../utils/createNotification");
const BlockedSchedule = require( "../models/BlockedSchedule");

exports.testAppointment = async (req, res) => {
  try {
    res.status(200).json({
      message: "Appointment route working",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    const slots = generateSlots();
    const blockedSchedules =
  await BlockedSchedule.find({
    blockDate: date,
  });


    const bookedAppointments =
      await Appointment.find({
        appointmentDate: date,
        status: "booked",
      });

    const bookedStartTimes =
      bookedAppointments.map(
        (appointment) => appointment.startTime
      );

   const availableSlots = slots.filter(
  (slot) => {
    const isBooked =
      bookedStartTimes.includes(
        slot.startTime
      );

    const isBlocked =
      blockedSchedules.some((block) => {
        if (block.isFullDay) {
          return true;
        }

        return (
          slot.startTime >=
            block.startTime &&
          slot.startTime <
            block.endTime
        );
      });

    return !isBooked && !isBlocked;
  }
);

    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const {
      appointmentDate,
      startTime,
      endTime,
      notes,
    } = req.body;

    if (
      !appointmentDate ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const selectedDate = new Date(
      appointmentDate
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: "Past dates not allowed",
      });
    }

    const maxDate = new Date();

    maxDate.setDate(
      maxDate.getDate() + 30
    );

    if (selectedDate > maxDate) {
      return res.status(400).json({
        message:
          "Appointments only allowed within 30 days",
      });
    }

    const dayNumber =
      selectedDate.getDay();

    if (
      dayNumber === 0 ||
      dayNumber === 6
    ) {
      return res.status(400).json({
        message:
          "Clinic closed on weekends",
      });
    }

    const existingAppointment =
      await Appointment.findOne({
        appointmentDate,
        startTime,
        status: "booked",
      });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "This slot is already booked",
      });
    }

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const appointment =
      await Appointment.create({
        bookingId:
          generateBookingId(),

        patient: req.user._id,

        appointmentDate,

        day: dayNames[dayNumber],

        startTime,

        endTime,

        notes,
      });

    await createNotification({
      recipient: req.user._id,

      title: "Appointment Booked",

      message: `
Appointment booked for
${appointment.day},
${appointment.appointmentDate}
at ${appointment.startTime}
`,
    });

    res.status(201).json({
      message:
        "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments =
      await Appointment.find({
        patient: req.user._id,
      })
        .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment =
      await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (
      appointment.patient.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    if (appointment.status !== "booked") {
      return res.status(400).json({
        message:
          "Only booked appointments can be cancelled",
      });
    }

    const appointmentDateTime = new Date(
      `${appointment.appointmentDate}T${appointment.startTime}:00`
    );

    const currentTime = new Date();

    const differenceInMilliseconds =
      appointmentDateTime - currentTime;

    const differenceInHours =
      differenceInMilliseconds /
      (1000 * 60 * 60);

    if (differenceInHours < 2) {
      return res.status(400).json({
        message:
          "Cannot cancel within 2 hours of appointment",
      });
    }

    appointment.status = "cancelled";

    appointment.cancelledBy = "patient";

    await appointment.save();

await createNotification({
  recipient: req.user._id,

  title: "Appointment Cancelled",

  message: `
Your appointment for
${appointment.day},
${appointment.appointmentDate}
at ${appointment.startTime}
has been cancelled.
`,
});

    res.status(200).json({
      message:
        "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      appointmentDate,
      startTime,
      endTime,
    } = req.body;

    const appointment =
      await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

   const isPatientOwner =
  appointment.patient.toString() ===
  req.user._id.toString();

const isAdmin =
  req.user.role === "admin";

if (
  !isPatientOwner &&
  !isAdmin
) {
  return res.status(403).json({
    message: "Unauthorized access",
  });
}

    if (appointment.status !== "booked") {
      return res.status(400).json({
        message:
          "Only booked appointments can be rescheduled",
      });
    }

    if (
      appointment.rescheduledCount >= 1
    ) {
      return res.status(400).json({
        message:
          "Free reschedule limit reached. Extra ₹50 applicable at clinic.",
      });
    }

    const currentAppointmentTime = new Date(
      `${appointment.appointmentDate}T${appointment.startTime}:00`
    );

    const currentTime = new Date();

    const differenceInHours =
      (currentAppointmentTime - currentTime) /
      (1000 * 60 * 60);

    if (differenceInHours < 2) {
      return res.status(400).json({
        message:
          "Cannot reschedule within 2 hours of appointment",
      });
    }

    const existingAppointment =
      await Appointment.findOne({
        appointmentDate,
        startTime,
        status: "booked",
        _id: { $ne: id },
      });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "Selected slot already booked",
      });
    }

    const selectedDate = new Date(
      appointmentDate
    );

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    appointment.appointmentDate =
      appointmentDate;

    appointment.day =
      dayNames[selectedDate.getDay()];

    appointment.startTime = startTime;

    appointment.endTime = endTime;

    appointment.rescheduledCount += 1;

    await appointment.save();

await createNotification({
  recipient: req.user._id,

  title: "Appointment Rescheduled",

  message: `
Your appointment has been moved to
${appointment.day},
${appointment.appointmentDate}
at ${appointment.startTime}.
`,
});

    res.status(200).json({
      message:
        "Appointment rescheduled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await Appointment.find()
        .populate(
          "patient",
          "fullName email phone"
        )
        .sort({
          appointmentDate: 1,
          startTime: 1,
        });

    res.status(200).json(
      appointments
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.adminCancelAppointment = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { reason } = req.body;

    const appointment =
      await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (appointment.status !== "booked") {
      return res.status(400).json({
        message:
          "Only booked appointments can be cancelled",
      });
    }

    appointment.status =
      "cancelled";

    appointment.cancelledBy =
      "doctor";

    appointment.cancellationReason =
      reason || "";

    await appointment.save();

await createNotification({
  recipient: appointment.patient,

  title:
    "Appointment Cancelled By Doctor",

  message: `
Your appointment for
${appointment.day},
${appointment.appointmentDate}
at ${appointment.startTime}
was cancelled by doctor.

Reason:
${appointment.cancellationReason}
`,
});

    res.status(200).json({
      message:
        "Appointment cancelled by doctor",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.blockSchedule = async (
  req,
  res
) => {
  try {
    const {
      blockDate,
      startTime,
      endTime,
      isFullDay,
      reason,
    } = req.body;

    const blockedSchedule =
      await BlockedSchedule.create({
        blockDate,
        startTime,
        endTime,
        isFullDay,
        reason,
      });

    let affectedAppointments = [];

    if (isFullDay) {
      affectedAppointments =
        await Appointment.find({
          appointmentDate: blockDate,
          status: "booked",
        });
    } else {
      affectedAppointments =
        await Appointment.find({
          appointmentDate: blockDate,
          status: "booked",
          startTime: {
            $gte: startTime,
            $lt: endTime,
          },
        });
    }

    for (const appointment of affectedAppointments) {
      appointment.status =
        "cancelled";

      appointment.cancelledBy =
        "doctor";

      appointment.cancellationReason =
        reason || "Doctor unavailable";

      await appointment.save();

      await createNotification({
        recipient:
          appointment.patient,

        title:
          "Appointment Cancelled",

        message: `
Your appointment on
${appointment.day},
${appointment.appointmentDate}
at ${appointment.startTime}
was cancelled.

Reason:
${appointment.cancellationReason}
`,
      });
    }

    res.status(201).json({
      message:
        "Schedule blocked successfully",
      blockedSchedule,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDashboardStats = async (
  req,
  res
) => {
  try {
    const today = new Date();

    const formattedToday =
      today.toISOString().split("T")[0];

    const todayAppointments =
      await Appointment.countDocuments({
        appointmentDate:
          formattedToday,
        status: "booked",
      });

    const upcomingAppointments =
      await Appointment.countDocuments({
        appointmentDate: {
          $gte: formattedToday,
        },
        status: "booked",
      });

    const cancelledAppointments =
      await Appointment.countDocuments({
        status: "cancelled",
      });

    const totalPatients =
      await Appointment.distinct(
        "patient"
      );

    res.status(200).json({
      todayAppointments,

      upcomingAppointments,

      cancelledAppointments,

      totalPatients:
        totalPatients.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addDoctorNotes = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { doctorNotes } =
      req.body;

    const appointment =
      await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message:
          "Appointment not found",
      });
    }

    appointment.doctorNotes =
      doctorNotes;

    await appointment.save();

    await createNotification({
      recipient:
        appointment.patient,

      title:
        "Doctor Notes Added",

      message: `
Doctor notes were added to your appointment on
${appointment.appointmentDate}.
`,
    });

    res.status(200).json({
      message:
        "Doctor notes saved successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.completeAppointment =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const appointment =
        await Appointment.findById(id);

      if (!appointment) {
        return res.status(404).json({
          message:
            "Appointment not found",
        });
      }

      appointment.status =
        "completed";

      await appointment.save();

      await createNotification({
        recipient:
          appointment.patient,

        title:
          "Appointment Completed",

        message: `
Your appointment on
${appointment.appointmentDate}
has been marked completed.
`,
      });

      res.status(200).json({
        message:
          "Appointment marked as completed",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };