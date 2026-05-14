import { useState } from "react";

import axiosInstance from "../api/axios";

import AppLayout from "../layouts/AppLayout";
import toast from "react-hot-toast";

const BlockSchedule = () => {
  const [formData,
    setFormData] =
    useState({
      blockDate: "",
      startTime: "",
      endTime: "",
      reason: "",
      isFullDay: true,
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await axiosInstance.post(
            "/appointments/admin/block-schedule",
            formData
          );

        toast.success(response.data.message);

        setFormData({
          blockDate: "",
          startTime: "",
          endTime: "",
          reason: "",
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Block Schedule
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <input
            type="date"
            name="blockDate"
            value={
              formData.blockDate
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="time"
            name="startTime"
            value={
              formData.startTime
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="time"
            name="endTime"
            value={
              formData.endTime
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="reason"
            placeholder="Reason"
            value={
              formData.reason
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            rows="4"
          />

          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            Block Schedule
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default BlockSchedule;