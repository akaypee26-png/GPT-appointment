const Notification = require(
  "../models/Notification"
);

exports.getMyNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          recipient: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        notifications
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

exports.markNotificationAsRead =
  async (req, res) => {
    try {
      const { id } = req.params;

      const notification =
        await Notification.findById(id);

      if (!notification) {
        return res.status(404).json({
          message:
            "Notification not found",
        });
      }

      notification.isRead = true;

      await notification.save();

      res.status(200).json({
        message:
          "Notification marked as read",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  exports.getUnreadNotificationCount =
  async (req, res) => {
    try {
      const count =
        await Notification.countDocuments({
          recipient: req.user._id,
          isRead: false,
        });

      res.status(200).json({
        unreadCount: count,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  exports.markAllNotificationsAsRead =
  async (req, res) => {
    try {
      await Notification.updateMany(
        {
          recipient: req.user._id,
          isRead: false,
        },
        {
          isRead: true,
        }
      );

      res.status(200).json({
        message:
          "All notifications marked as read",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };