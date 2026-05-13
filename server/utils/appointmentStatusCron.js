const cron = require("node-cron");

const Appointment = require(
  "../models/Appointment"
);

const appointmentStatusCron =
  () => {
    cron.schedule(
      "*/5 * * * *",
      async () => {
        try {
          const now =
            new Date();

          const today =
            now
              .toISOString()
              .split("T")[0];

          const currentTime =
            now.toTimeString()
              .slice(0, 5);

          const appointments =
            await Appointment.find({
              status: "booked",
            });

          for (const appointment of appointments) {
            const isPast =
              appointment.appointmentDate <
                today ||
              (
                appointment.appointmentDate ===
                  today &&
                appointment.endTime <=
                  currentTime
              );

            if (isPast) {
              appointment.status =
                "completed";

              await appointment.save();
            }
          }

          console.log(
            "Appointment status cron executed"
          );
        } catch (error) {
          console.log(
            error.message
          );
        }
      }
    );
  };

module.exports =
  appointmentStatusCron;