import {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";

const AdminDashboard = () => {
  const [stats, setStats] =
    useState(null);

  const fetchStats =
    async () => {
      try {
        const response =
          await axiosInstance.get(
            "/appointments/admin/dashboard-stats"
          );

        setStats(
          response.data
        );
      } catch (error) {
        console.log(
          error.response.data.message
        );
      }
    };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-10">
          Admin Dashboard
        </h1>

       {stats && (
  <div className="grid grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-gray-500 mb-2">
        Today's Appointments
      </h2>

      <p className="text-4xl font-bold text-blue-600">
        {stats.todayAppointments}
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-gray-500 mb-2">
        Upcoming
      </h2>

      <p className="text-4xl font-bold text-green-600">
        {stats.upcomingAppointments}
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-gray-500 mb-2">
        Cancelled
      </h2>

      <p className="text-4xl font-bold text-red-600">
        {stats.cancelledAppointments}
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-gray-500 mb-2">
        Total Patients
      </h2>

      <p className="text-4xl font-bold text-purple-600">
        {stats.totalPatients}
      </p>
    </div>
  </div>
)}
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;