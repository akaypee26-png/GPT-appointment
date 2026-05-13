// import {
//   useEffect,
//   useState,
// } from "react";

// import axiosInstance from "../api/axios";

// import AppLayout from "../layouts/AppLayout";

// import toast from "react-hot-toast";

// const AdminAppointments = () => {
//   const [appointments,
//     setAppointments] =
//     useState([]);

// const [searchTerm,
//   setSearchTerm] =
//   useState("");

// const [statusFilter,
//   setStatusFilter] =
//   useState("all");

//   const [
//   selectedAppointment,
//   setSelectedAppointment,
// ] = useState(null);

// const [newDate,
//   setNewDate] =
//   useState("");

// const [availableSlots,
//   setAvailableSlots] =
//   useState([]);

// const [selectedSlot,
//   setSelectedSlot] =
//   useState(null);

//   const [notesAppointment,
//   setNotesAppointment] =
//   useState(null);

// const [doctorNotes,
//   setDoctorNotes] =
//   useState("");

//   const [currentPage,
//   setCurrentPage] =
//   useState(1);

// const appointmentsPerPage = 5;

//   const fetchAppointments =
//     async () => {
//       try {
//         const response =
//           await axiosInstance.get(
//             "/appointments/admin/all"
//           );

//         setAppointments(
//           response.data
//         );
//       } catch (error) {
//         console.log(
//           error.response.data.message
//         );
//       }
//     };

// const fetchAvailableSlots =
//   async (date) => {
//     try {
//       const response =
//         await axiosInstance.get(
//           `/appointments/slots?date=${date}`
//         );

//       setAvailableSlots(
//         response.data
//       );
//     } catch (error) {
//       console.log(
//         error.response.data.message
//       );
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const handleCancel =
//     async (id) => {
//       try {
//         const response =
//           await axiosInstance.put(
//             `/appointments/admin/cancel/${id}`,
//             {
//               reason:
//                 "Doctor unavailable",
//             }
//           );

//         alert(
//           response.data.message
//         );

//         fetchAppointments();
//       } catch (error) {
//         console.log(
//           error.response.data.message
//         );
//       }
//     };

// const handleComplete =
//   async (id) => {
//     try {
//       const response =
//         await axiosInstance.put(
//           `/appointments/admin/complete/${id}`
//         );

//       alert(
//         response.data.message
//       );

//       fetchAppointments();
//     } catch (error) {
//       alert(
//         error.response.data.message
//       );
//     }
//   };

// const handleSaveNotes =
//   async () => {
//     try {
//       const response =
//         await axiosInstance.put(
//           `/appointments/admin/doctor-notes/${notesAppointment._id}`,
//           {
//             doctorNotes,
//           }
//         );

//       alert(
//         response.data.message
//       );

//       setNotesAppointment(
//         null
//       );

//       setDoctorNotes("");

//       fetchAppointments();
//     } catch (error) {
//       alert(
//         error.response.data.message
//       );
//     }
//   };

//       const handleReschedule =
//   async () => {
//     try {
//       const response =
//         await axiosInstance.put(
//           `/appointments/reschedule/${selectedAppointment._id}`,
//           {
//             appointmentDate:
//               newDate,

//             startTime:
//               selectedSlot.startTime,

//             endTime:
//               selectedSlot.endTime,
//           }
//         );

//       alert(
//         response.data.message
//       );

//       setSelectedAppointment(
//         null
//       );

//       setSelectedSlot(null);

//       setAvailableSlots([]);

//       setNewDate("");

//       fetchAppointments();
//     } catch (error) {
//       alert(
//         error.response.data.message
//       );
//     }
//   };


//     const filteredAppointments =
//   appointments.filter(
//     (appointment) => {
//       const matchesSearch =
//         appointment.patient?.fullName
//           .toLowerCase()
//           .includes(
//             searchTerm.toLowerCase()
//           );

//       const matchesStatus =
//         statusFilter ===
//           "all" ||
//         appointment.status ===
//           statusFilter;

//       return (
//         matchesSearch &&
//         matchesStatus
//       );
//     }
//   );

//   const indexOfLastAppointment =
//   currentPage *
//   appointmentsPerPage;

// const indexOfFirstAppointment =
//   indexOfLastAppointment -
//   appointmentsPerPage;

// const currentAppointments =
//   filteredAppointments.slice(
//     indexOfFirstAppointment,
//     indexOfLastAppointment
//   );

// const totalPages =
//   Math.ceil(
//     filteredAppointments.length /
//     appointmentsPerPage
//   );


//   return (
//     <AppLayout>
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-blue-600 mb-10">
//           All Appointments
//         </h1>

//         <div className="flex gap-4 mb-8">
//   <input
//     type="text"
//     placeholder="Search patient..."
//     value={searchTerm}
//     onChange={(e) =>
//       setSearchTerm(
//         e.target.value
//       )
//     }
//     className="border p-3 rounded-lg w-full"
//   />

//   <select
//     value={statusFilter}
//     onChange={(e) =>
//       setStatusFilter(
//         e.target.value
//       )
//     }
//     className="border p-3 rounded-lg"
//   >
//     <option value="all">
//       All
//     </option>

//     <option value="booked">
//       Booked
//     </option>

//     <option value="completed">
//       Completed
//     </option>

//     <option value="cancelled">
//       Cancelled
//     </option>
//   </select>
// </div>




//         <div className="grid gap-6">
//           {currentAppointments.map(
//             (appointment) => (
//               <div
//                 key={
//                   appointment._id
//                 }
//                 className="bg-white p-6 rounded-2xl shadow-md"
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="font-bold text-xl mb-2">
//                       {
//                         appointment.patient
//                           ?.fullName
//                       }
//                     </p>

//                     <p>
//                       Email:
//                       {" "}
//                       {
//                         appointment.patient
//                           ?.email
//                       }
//                     </p>

//                     <p>
//                       Phone:
//                       {" "}
//                       {
//                         appointment.patient
//                           ?.phone
//                       }
//                     </p>

//                     <p className="mt-3">
//                       Booking ID:
//                       {" "}
//                       {
//                         appointment.bookingId
//                       }
//                     </p>

//                     <p>
//                       Date:
//                       {" "}
//                       {
//                         appointment.appointmentDate
//                       }
//                     </p>

//                     <p>
//                       Time:
//                       {" "}
//                       {
//                         appointment.startTime
//                       }
//                       {" "}
//                       -
//                       {" "}
//                       {
//                         appointment.endTime
//                       }
//                     </p>

//                     <p>
//                       Status:
//                       {" "}
//                       <span className="font-semibold">
//                         {
//                           appointment.status
//                         }
//                       </span>
//                     </p>
//                   </div>

//                 {appointment.status ===
//   "booked" && (
//   <div className="flex gap-3 h-fit">
// <button
//   onClick={() => {
//     setNotesAppointment(
//       appointment
//     );

//     setDoctorNotes(
//       appointment.doctorNotes || ""
//     );
//   }}
//   className="bg-purple-500 text-white px-5 py-3 rounded-lg hover:bg-purple-600"
// >
//   Notes
// </button>

//     <button
//       onClick={() => {
//         setSelectedAppointment(
//           appointment
//         );

//         setSelectedSlot(null);

//         setAvailableSlots([]);

//         setNewDate("");
//       }}
//       className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
//     >
//       Reschedule
//     </button>

// <button
//   onClick={() =>
//     handleComplete(
//       appointment._id
//     )
//   }
//   className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
// >
//   Complete
// </button>


//     <button
//       onClick={() =>
//         handleCancel(
//           appointment._id
//         )
//       }
//       className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600"
//     >
//       Cancel
//     </button>
//   </div>
// )}
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>

//      {selectedAppointment && (
//   <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//     <div className="bg-white p-8 rounded-2xl shadow-xl w-[700px] max-h-[90vh] overflow-y-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-blue-600">
//           Reschedule Appointment
//         </h2>

//         <button
//           onClick={() =>
//             setSelectedAppointment(null)
//           }
//           className="text-red-500 text-xl font-bold"
//         >
//           ✕
//         </button>
//       </div>

//       <input
//         type="date"
//         value={newDate}
//         onChange={(e) => {
//           setNewDate(
//             e.target.value
//           );

//           fetchAvailableSlots(
//             e.target.value
//           );
//         }}
//         className="border p-3 rounded-lg mb-6 w-full"
//       />

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         {availableSlots.map(
//           (slot) => (
//             <button
//               key={
//                 slot.startTime
//               }
//               onClick={() =>
//                 setSelectedSlot(
//                   slot
//                 )
//               }
//               className={`p-3 rounded-lg border ${
//                 selectedSlot?.startTime ===
//                 slot.startTime
//                   ? "bg-blue-600 text-white"
//                   : ""
//               }`}
//             >
//               {slot.startTime}
//               {" "}
//               -
//               {" "}
//               {slot.endTime}
//             </button>
//           )
//         )}
//       </div>

//       {selectedSlot && (
//         <button
//           onClick={
//             handleReschedule
//           }
//           className="bg-green-600 text-white px-6 py-3 rounded-lg"
//         >
//           Confirm Reschedule
//         </button>
//       )}
//     </div>
//   </div>
  
// )}

// <div className="flex justify-center items-center gap-4 mt-10">
//   <button
//     disabled={
//       currentPage === 1
//     }
//     onClick={() =>
//       setCurrentPage(
//         currentPage - 1
//       )
//     }
//     className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-50"
//   >
//     Previous
//   </button>

//   <p className="font-semibold">
//     Page {currentPage} of{" "}
//     {totalPages || 1}
//   </p>

//   <button
//     disabled={
//       currentPage ===
//       totalPages ||
//       totalPages === 0
//     }
//     onClick={() =>
//       setCurrentPage(
//         currentPage + 1
//       )
//     }
//     className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-50"
//   >
//     Next
//   </button>
// </div>



// {notesAppointment && (
//   <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//     <div className="bg-white p-8 rounded-2xl shadow-xl w-[700px]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-purple-600">
//           Doctor Notes
//         </h2>

//         <button
//           onClick={() =>
//             setNotesAppointment(null)
//           }
//           className="text-red-500 text-xl font-bold"
//         >
//           ✕
//         </button>
//       </div>

//       <textarea
//         rows="8"
//         placeholder="Write consultation notes..."
//         value={doctorNotes}
//         onChange={(e) =>
//           setDoctorNotes(
//             e.target.value
//           )
//         }
//         className="w-full border rounded-xl p-4 mb-6"
//       />

//       <button
//         onClick={handleSaveNotes}
//         className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
//       >
//         Save Notes
//       </button>
//     </div>
//   </div>
// )}

//     </AppLayout>
//   );
// };

// export default AdminAppointments;
//=====================================================================================================================================================

import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import AppLayout from "../layouts/AppLayout";
import toast from "react-hot-toast";

const AdminAppointments = () => {
  // =====================
  // STATE
  // =====================
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [notesAppointment, setNotesAppointment] = useState(null);
  const [doctorNotes, setDoctorNotes] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // =====================
  // API CALLS
  // =====================
  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(
        "/appointments/admin/all"
      );
      setAppointments(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await axiosInstance.get(
        `/appointments/slots?date=${date}`
      );
      setAvailableSlots(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // =====================
  // EFFECTS
  // =====================
  useEffect(() => {
    fetchAppointments();
  }, []);

  // =====================
  // ACTION HANDLERS
  // =====================
  const handleCancel = async (id) => {
    try {
      const response = await axiosInstance.put(
        `/appointments/admin/cancel/${id}`,
        {
          reason: "Doctor unavailable",
        }
      );

      toast.success(
  response.data.message
);
      fetchAppointments();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await axiosInstance.put(
        `/appointments/admin/complete/${id}`
      );

    toast.success(
  response.data.message
);
      fetchAppointments();
    } catch (error) {
      toast.success(
  response.data.message
);
    }
  };

  const handleSaveNotes = async () => {
    try {
      const response = await axiosInstance.put(
        `/appointments/admin/doctor-notes/${notesAppointment._id}`,
        {
          doctorNotes,
        }
      );

     toast.success(
  response.data.message
);
      setNotesAppointment(null);
      setDoctorNotes("");
      fetchAppointments();
    } catch (error) {
      toast.success(
  response.data.message
);
    }
  };

  const handleReschedule = async () => {
    try {
      const response = await axiosInstance.put(
        `/appointments/reschedule/${selectedAppointment._id}`,
        {
          appointmentDate: newDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        }
      );

    toast.success(
  response.data.message
);

      setSelectedAppointment(null);
      setSelectedSlot(null);
      setAvailableSlots([]);
      setNewDate("");

      fetchAppointments();
    } catch (error) {
     toast.success(
  response.data.message
);
    }
  };

  // =====================
  // FILTERING + PAGINATION
  // =====================
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient?.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastAppointment =
    currentPage * appointmentsPerPage;

  const indexOfFirstAppointment =
    indexOfLastAppointment - appointmentsPerPage;

  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  // =====================
  // UI
  // =====================
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-10">
          All Appointments
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="all">All</option>
            <option value="booked">Booked</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* APPOINTMENTS LIST */}
        <div className="grid gap-6">
          {currentAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-xl mb-2">
                    {appointment.patient?.fullName}
                  </p>

                  <p>Email: {appointment.patient?.email}</p>
                  <p>Phone: {appointment.patient?.phone}</p>

                  <p className="mt-3">
                    Booking ID: {appointment.bookingId}
                  </p>

                  <p>Date: {appointment.appointmentDate}</p>

                  <p>
                    Time: {appointment.startTime} -{" "}
                    {appointment.endTime}
                  </p>

                  <p>
                    Status:{" "}
                    <span className="font-semibold">
                      {appointment.status}
                    </span>
                  </p>
                </div>

                {appointment.status === "booked" && (
                  <div className="flex gap-3 h-fit">
                    <button
                      onClick={() => {
                        setNotesAppointment(appointment);
                        setDoctorNotes(
                          appointment.doctorNotes || ""
                        );
                      }}
                      className="bg-purple-500 text-white px-5 py-3 rounded-lg hover:bg-purple-600"
                    >
                      Notes
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setSelectedSlot(null);
                        setAvailableSlots([]);
                        setNewDate("");
                      }}
                      className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
                    >
                      Reschedule
                    </button>

                    <button
                      onClick={() =>
                        handleComplete(appointment._id)
                      }
                      className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        handleCancel(appointment._id)
                      }
                      className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESCHEDULE MODAL */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[700px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-600">
                Reschedule Appointment
              </h2>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <input
              type="date"
              value={newDate}
              onChange={(e) => {
                setNewDate(e.target.value);
                fetchAvailableSlots(e.target.value);
              }}
              className="border p-3 rounded-lg mb-6 w-full"
            />

            <div className="grid grid-cols-3 gap-4 mb-6">
              {availableSlots.map((slot) => (
                <button
                  key={slot.startTime}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border ${
                    selectedSlot?.startTime === slot.startTime
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>

            {selectedSlot && (
              <button
                onClick={handleReschedule}
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Confirm Reschedule
              </button>
            )}
          </div>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <p className="font-semibold">
          Page {currentPage} of {totalPages || 1}
        </p>

        <button
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* DOCTOR NOTES MODAL */}
      {notesAppointment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[700px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600">
                Doctor Notes
              </h2>

              <button
                onClick={() => setNotesAppointment(null)}
                className="text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <textarea
              rows="8"
              placeholder="Write consultation notes..."
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              className="w-full border rounded-xl p-4 mb-6"
            />

            <button
              onClick={handleSaveNotes}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default AdminAppointments;
