import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">
        Clinic Appointment System
      </h1>

      <p className="mt-5">
        Current User:
        {user ? user.fullName : " Not Logged In"}
      </p>
    </div>
  );
};

export default Home;