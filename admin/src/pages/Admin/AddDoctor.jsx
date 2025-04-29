// src/components/AddDoctor.jsx
import React, { useState } from "react";
import { Plus, Trash2, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useAdminContext } from "../../context/AdminContext";
import axios from "axios";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    availability: {
      days: [],
      timeSlots: [],
    },
  });

  const [previewImage, setPreviewImage] = useState(null);
  const { backendUrl, token } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeSlotsOptions = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 Pm - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: checked
          ? [...prev.availability[type], value]
          : prev.availability[type].filter((item) => item !== value),
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.image) {
        toast.error("Please select an image.");
        return;
      }

      const dataToSend = new FormData();
      for (const key in formData) {
        if (key === "availability") {
          dataToSend.append("days", JSON.stringify(formData.availability.days));
          dataToSend.append(
            "timeSlots",
            JSON.stringify(formData.availability.timeSlots)
          );
        } else if (key === "image" && formData.image) {
          dataToSend.append("image", formData.image);
        } else {
          dataToSend.append(key, formData[key]);
        }
      }

      console.log(dataToSend, formData);
      dataToSend.forEach((value, key) => {
        console.log(key, value);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          image: null,
          speciality: "",
          degree: "",
          experience: "",
          about: "",
          fees: "",
          availability: {
            days: [],
            timeSlots: [],
          },
        });
        setPreviewImage(null);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input-field p-2"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field p-2"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-field p-2"
            required
          />
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            placeholder="Speciality"
            className="input-field p-2"
            required
          />
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="input-field p-2"
            required
          />
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience (e.g., 4 Years)"
            className="input-field p-2"
            required
          />
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            placeholder="Consultation Fees"
            className="input-field p-2"
            required
          />
        </div>

        {/* About Doctor */}
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About Doctor (optional)"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows="4"
        ></textarea>

        {/* Image Upload */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Doctor's Image</h3>
          {!previewImage ? (
            <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">
              <Plus className="text-gray-500 size-10" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative w-32 h-32">
              <img
                src={previewImage}
                alt="Doctor Preview"
                className="object-cover w-full h-full rounded-md"
              />
              <button
                type="button"
                onClick={handleImageRemove}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
              >
                <Trash2 size={18} className="text-red-600 cursor-pointer" />
              </button>
            </div>
          )}
        </div>

        {/* Days Available */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Available Days</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.availability.days.includes(day)}
                  onChange={(e) => handleCheckboxChange(e, "days")}
                  className="accent-blue-500"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {timeSlotsOptions.map((slot) => (
              <label key={slot} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={slot}
                  checked={formData.availability.timeSlots.includes(slot)}
                  onChange={(e) => handleCheckboxChange(e, "timeSlots")}
                  className="accent-blue-500"
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Add Doctor </span>
              <span>
                {" "}
                {isLoading && <Loader className="animate-spin size-5" />}
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
