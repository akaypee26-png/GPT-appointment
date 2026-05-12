
import {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";

const BookAppointment = () => {
  const [date, setDate] =
    useState("");

  const [slots, setSlots] =
    useState([]);

  const [selectedSlot, setSelectedSlot] =
    useState(null);

  const [notes, setNotes] =
    useState("");

  const fetchSlots = async () => {
    try {
      const response =
        await axiosInstance.get(
          `/appointments/slots?date=${date}`
        );

      setSlots(response.data);
    } catch (error) {
      console.log(
        error.response.data.message
      );
    }
  };

  useEffect(() => {
    if (date) {
      fetchSlots();
    }
  }, [date]);

  const handleBookAppointment =
    async () => {
      try {
        const response =
          await axiosInstance.post(
            "/appointments",
            {
              appointmentDate:
                date,

              startTime:
                selectedSlot.startTime,

              endTime:
                selectedSlot.endTime,

              notes,
            }
          );

        alert(
          response.data.message
        );

        setSelectedSlot(null);

        fetchSlots();
      } catch (error) {
        console.log(
          error.response.data.message
        );
      }
    };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          Book Appointment
        </h1>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
          className="border p-3 rounded-lg mb-8"
        />

        <div className="grid grid-cols-3 gap-4">
          {slots.map((slot) => (
            <button
              key={
                slot.startTime
              }
              onClick={() =>
                setSelectedSlot(
                  slot
                )
              }
              className={`p-4 rounded-lg border transition ${
                selectedSlot?.startTime ===
                slot.startTime
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {slot.startTime}
              {" "}
              -
              {" "}
              {slot.endTime}
            </button>
          ))}
        </div>

        {selectedSlot && (
          <div className="mt-8">
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-lg mb-4"
            />

            <button
              onClick={
                handleBookAppointment
              }
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default BookAppointment;