const express = require("express");

const {
  testAppointment,
  getAvailableSlots,
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  rescheduleAppointment,
   getAllAppointments,
   adminCancelAppointment,
   blockSchedule,
   getDashboardStats,
} = require("../controllers/appointmentController");


const {
  adminOnly,
} = require("../middleware/adminMiddleware");


const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/test", protect, testAppointment);

router.get("/slots", protect, getAvailableSlots);

router.post("/", protect, bookAppointment);

router.get("/my-appointments", protect, getMyAppointments);

router.put( "/cancel/:id", protect, cancelAppointment);

router.put("/reschedule/:id", protect, rescheduleAppointment);

router.get( "/admin/all", protect, adminOnly, getAllAppointments);

router.put("/admin/cancel/:id", protect, adminOnly, adminCancelAppointment);

router.post("/admin/block-schedule", protect, adminOnly, blockSchedule);

router.get("/admin/dashboard-stats", protect, adminOnly, getDashboardStats);

    module.exports = router;