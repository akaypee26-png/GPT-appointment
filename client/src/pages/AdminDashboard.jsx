import {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";

const AdminDashboard = () => {
  const [stats, setStats] =
    useState(null);
const [
  recentAppointments,
  setRecentAppointments,
] = useState([]);


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

const fetchRecentAppointments =
  async () => {
    try {
      const response =
        await axiosInstance.get(
          "/appointments/admin/all"
        );

      setRecentAppointments(
        response.data.slice(0, 5)
      );
    } catch (error) {
      console.log(
        error.response.data.message
      );
    }
  };

  useEffect(() => {
  fetchStats();

  fetchRecentAppointments();
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


<div className="mt-12 bg-white p-8 rounded-2xl shadow-md">
  <h2 className="text-2xl font-bold mb-6">
    Recent Appointments
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3">
            Patient
          </th>

          <th className="text-left py-3">
            Date
          </th>

          <th className="text-left py-3">
            Time
          </th>

          <th className="text-left py-3">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {recentAppointments.map(
          (appointment) => (
            <tr
              key={
                appointment._id
              }
              className="border-b"
            >
              <td className="py-4">
                {
                  appointment.patient
                    ?.fullName
                }
              </td>

              <td className="py-4">
                {
                  appointment.appointmentDate
                }
              </td>

              <td className="py-4">
                {
                  appointment.startTime
                }
              </td>

              <td className="py-4 capitalize">
                {
                  appointment.status
                }
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
</div>



      </div>
    </AppLayout>
  );
};

export default AdminDashboard;