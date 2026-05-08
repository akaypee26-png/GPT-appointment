import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-5">
        Welcome,
        {user?.fullName}
      </p>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white px-5 py-3 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;