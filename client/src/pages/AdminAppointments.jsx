import {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";

const AdminAppointments = () => {
  const [appointments,
    setAppointments] =
    useState([]);

  const fetchAppointments =
    async () => {
      try {
        const response =
          await axiosInstance.get(
            "/appointments/admin/all"
          );

        setAppointments(
          response.data
        );
      } catch (error) {
        console.log(
          error.response.data.message
        );
      }
    };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel =
    async (id) => {
      try {
        const response =
          await axiosInstance.put(
            `/appointments/admin/cancel/${id}`,
            {
              reason:
                "Doctor unavailable",
            }
          );

        alert(
          response.data.message
        );

        fetchAppointments();
      } catch (error) {
        console.log(
          error.response.data.message
        );
      }
    };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-10">
          All Appointments
        </h1>

        <div className="grid gap-6">
          {appointments.map(
            (appointment) => (
              <div
                key={
                  appointment._id
                }
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-xl mb-2">
                      {
                        appointment.patient
                          ?.fullName
                      }
                    </p>

                    <p>
                      Email:
                      {" "}
                      {
                        appointment.patient
                          ?.email
                      }
                    </p>

                    <p>
                      Phone:
                      {" "}
                      {
                        appointment.patient
                          ?.phone
                      }
                    </p>

                    <p className="mt-3">
                      Booking ID:
                      {" "}
                      {
                        appointment.bookingId
                      }
                    </p>

                    <p>
                      Date:
                      {" "}
                      {
                        appointment.appointmentDate
                      }
                    </p>

                    <p>
                      Time:
                      {" "}
                      {
                        appointment.startTime
                      }
                      {" "}
                      -
                      {" "}
                      {
                        appointment.endTime
                      }
                    </p>

                    <p>
                      Status:
                      {" "}
                      <span className="font-semibold">
                        {
                          appointment.status
                        }
                      </span>
                    </p>
                  </div>

                  {appointment.status ===
                    "booked" && (
                    <button
                      onClick={() =>
                        handleCancel(
                          appointment._id
                        )
                      }
                      className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 h-fit"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminAppointments;