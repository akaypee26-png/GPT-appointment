require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const appointmentStatusCron =
  require("./utils/appointmentStatusCron");
const PORT = process.env.PORT || 5000;

connectDB();
appointmentStatusCron();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});