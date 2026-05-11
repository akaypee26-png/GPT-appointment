const express = require("express");

const {
  getMyNotifications,
  markNotificationAsRead,
  getUnreadNotificationCount,
markAllNotificationsAsRead,
} = require(
  "../controllers/notificationController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  getMyNotifications
);

router.put(
  "/read/:id",
  protect,
  markNotificationAsRead
);

router.get(
  "/unread-count",
  protect,
  getUnreadNotificationCount
);

router.put(
  "/mark-all-read",
  protect,
  markAllNotificationsAsRead
);

module.exports = router;