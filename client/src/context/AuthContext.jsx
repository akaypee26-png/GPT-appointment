import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get(
          "/auth/check-auth"
        );

        setUser(response.data.user);
      } catch (error) {
        toast.error(error.response.data.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);