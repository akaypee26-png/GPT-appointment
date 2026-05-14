
import {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";
import toast from "react-hot-toast";


const BookAppointment = () => {

  const [loading,
  setLoading] =
  useState(false);

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
      toast.error(
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
      setLoading(true);
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

        toast.success(response.data.message);

        setSelectedSlot(null);

        fetchSlots();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
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

            <button  disabled={
  loading ||
  !selectedSlot
}
              onClick={
                handleBookAppointment
              }
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
  ? "Booking..."
  : "Book Appointment"}
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default BookAppointment;