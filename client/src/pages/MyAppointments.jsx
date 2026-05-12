import {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";

const MyAppointments = () => {
  const [appointments, setAppointments] =
    useState([]);

const [selectedAppointment,
  setSelectedAppointment] =
  useState(null);

const [newDate, setNewDate] =
  useState("");

const [availableSlots,
  setAvailableSlots] =
  useState([]);

const [selectedSlot,
  setSelectedSlot] =
  useState(null);


  const fetchAppointments =
    async () => {
      try {
        const response =
          await axiosInstance.get(
            "/appointments/my-appointments"
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

const fetchAvailableSlots =
  async (date) => {
    try {
      const response =
        await axiosInstance.get(
          `/appointments/slots?date=${date}`
        );

      setAvailableSlots(
        response.data
      );
    } catch (error) {
      console.log(
        error.response.data.message
      );
    }
  };


  const handleCancel =
    async (id) => {
      try {
        const response =
          await axiosInstance.put(
            `/appointments/cancel/${id}`
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

const handleReschedule =
  async () => {
    try {
      const response =
        await axiosInstance.put(
          `/appointments/reschedule/${selectedAppointment._id}`,
          {
            appointmentDate:
              newDate,

            startTime:
              selectedSlot.startTime,

            endTime:
              selectedSlot.endTime,
          }
        );

      alert(
        response.data.message
      );

      setSelectedAppointment(
        null
      );

      setSelectedSlot(null);

      setNewDate("");

      fetchAppointments();
    } catch (error) {
      alert(
        error.response.data.message
      );
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          My Appointments
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
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xl mb-2">
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
                      Day:
                      {" "}
                      {
                        appointment.day
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
  <div className="flex gap-3">
    <button
      onClick={() =>
        setSelectedAppointment(
          appointment
        )
      }
      className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
    >
      Reschedule
    </button>

    <button
      onClick={() =>
        handleCancel(
          appointment._id
        )
      }
      className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
    >
      Cancel
    </button>
  </div>
)}
                </div>
              </div>
            )
          )}
        </div>

        
{selectedAppointment && (
  <div className="bg-white p-6 rounded-2xl shadow-md mt-10">
    <h2 className="text-2xl font-bold mb-6 text-blue-600">
      Reschedule Appointment
    </h2>

    <input
      type="date"
      value={newDate}
      onChange={(e) => {
        setNewDate(
          e.target.value
        );

        fetchAvailableSlots(
          e.target.value
        );
      }}
      className="border p-3 rounded-lg mb-6"
    />

    <div className="grid grid-cols-3 gap-4 mb-6">
      {availableSlots.map(
        (slot) => (
          <button
            key={
              slot.startTime
            }
            onClick={() =>
              setSelectedSlot(
                slot
              )
            }
            className={`p-3 rounded-lg border ${
              selectedSlot?.startTime ===
              slot.startTime
                ? "bg-blue-600 text-white"
                : ""
            }`}
          >
            {slot.startTime}
            {" "}
            -
            {" "}
            {slot.endTime}
          </button>
        )
      )}
    </div>

    {selectedSlot && (
      <button
        onClick={
          handleReschedule
        }
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Confirm Reschedule
      </button>
    )}
  </div>
)}

      </div>
    </AppLayout>
  );
};

export default MyAppointments;