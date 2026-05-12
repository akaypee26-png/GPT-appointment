import {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";

const Notifications = () => {
  const [notifications,
    setNotifications] =
    useState([]);

  const fetchNotifications =
    async () => {
      try {
        const response =
          await axiosInstance.get(
            "/notifications"
          );

        setNotifications(
          response.data
        );
      } catch (error) {
        console.log(
          error.response.data.message
        );
      }
    };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllRead =
    async () => {
      try {
        await axiosInstance.put(
          "/notifications/mark-all-read",
          {}
        );

        fetchNotifications();
      } catch (error) {
        console.log(
          error.response.data.message
        );
      }
    };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Notifications
          </h1>

          <button
            onClick={
              markAllRead
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Mark All Read
          </button>
        </div>

        <div className="grid gap-5">
          {notifications.map(
            (notification) => (
              <div
                key={
                  notification._id
                }
                className={`p-5 rounded-2xl shadow-md ${
                  notification.isRead
                    ? "bg-white"
                    : "bg-blue-100"
                }`}
              >
                <h2 className="text-xl font-bold mb-2">
                  {
                    notification.title
                  }
                </h2>

                <p className="text-gray-700 whitespace-pre-line">
                  {
                    notification.message
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;