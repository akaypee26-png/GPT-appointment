import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";

import AdminRoute from "./routes/AdminRoute";
import AdminAppointments from "./pages/AdminAppointments";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />

      <Route path="/book-appointment" element={ <ProtectedRoute> <BookAppointment /> </ProtectedRoute> } />

      <Route path="/my-appointments" element={ <ProtectedRoute> <MyAppointments /> </ProtectedRoute> } />

      <Route path="/notifications" element={ <ProtectedRoute> <Notifications /> </ProtectedRoute> } />

      <Route path="/admin" element={ <AdminRoute> <AdminDashboard /> </AdminRoute> } />

      <Route path="/admin/appointments" element={ <AdminRoute> <AdminAppointments /> </AdminRoute> } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;