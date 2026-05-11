const Notification = require(
  "../models/Notification"
);

const createNotification = async ({
  recipient,
  title,
  message,
}) => {
  try {
    await Notification.create({
      recipient,
      title,
      message,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = createNotification;