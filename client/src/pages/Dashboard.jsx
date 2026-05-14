import AppLayout from "../layouts/AppLayout";

import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
const Dashboard = () => {
  const { user } = useAuth();
console.log(user);
  return (
    <AppLayout>
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Dashboard
        </h1>

        <p className="text-lg text-gray-700">
          Welcome back,
          {" "}
          {user?.fullName}
        </p>
      </div>
    </AppLayout>
  );
};

export default Dashboard;