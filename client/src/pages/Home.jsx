import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Clinic Appointment System
        </h1>

        <p className="text-gray-600 text-lg">
          Book appointments easily online
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;