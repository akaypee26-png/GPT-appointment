// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
//       <Link
//         to="/"
//         className="text-2xl font-bold text-blue-600"
//       >
//         Clinic System
//       </Link>

//       <div className="flex items-center gap-4">
//         <Link
//           to="/login"
//           className="text-gray-700 hover:text-blue-600"
//         >
//           Login
//         </Link>

//         <Link
//           to="/register"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Register
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser } =
    useAuth();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "/auth/logout"
      );

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log(
        error.response.data.message
      );
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        Clinic System
      </Link>

      <div className="flex items-center gap-5">
        {user ? (
          <>


            <p className="font-medium text-gray-700">
              Welcome,
              {" "}
              {user.fullName}
            </p>
{user.role === "admin" && (
  <>
    <Link
      to="/admin"
      className="text-gray-700 hover:text-blue-600"
    >
      Admin
    </Link>

    <Link
      to="/admin/appointments"
      className="text-gray-700 hover:text-blue-600"
    >
      Manage Appointments
    </Link>
  </>
)}

<Link
  to="/dashboard"
  className="text-gray-700 hover:text-blue-600"
>
  Dashboard
</Link>

<Link
  to="/book-appointment"
  className="text-gray-700 hover:text-blue-600"
>
  Book Appointment
</Link>
<Link
  to="/my-appointments"
  className="text-gray-700 hover:text-blue-600"
>
  My Appointments
</Link>

<Link
  to="/notifications"
  className="text-gray-700 hover:text-blue-600"
>
  Notifications
</Link>

{/* 
            <p className="font-medium text-gray-700">
              Welcome,
              {" "}
              {user.fullName}
            </p> */}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;