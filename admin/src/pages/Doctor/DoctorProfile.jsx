import React from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { useState, useEffect } from "react";

const DoctorProfile = () => {
  const { doctorProfile, setDoctorProfile, docToken, getDoctorProfile } =
    useDoctorContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (docToken) {
      getDoctorProfile();
    }
  }, [docToken]);

  useEffect(() => {
    setFormData(doctorProfile);
  }, [doctorProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctor/update-doctor-profile/${
          doctorProfile._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${docToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setDoctorProfile(updatedProfile);
        setIsEditing(false);
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg mt-6">
      <div className="card max-w-lg mx-auto mt-5 shadow-2xl p-8">
        <div className="flex flex-col items-center">
          <img
            src={formData.image}
            alt={formData.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <h2 className="text-2xl font-bold mt-2">{formData.name}</h2>
          <p className="text-gray-500">{formData.speciality}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="font-semibold">Email:</label>
            <p>{formData.email}</p>
          </div>

          <div>
            <label className="font-semibold">Degree:</label>
            {isEditing ? (
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.degree}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Experience:</label>
            {isEditing ? (
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.experience}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Fees ($):</label>
            {isEditing ? (
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>${formData.fees}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Speciality:</label>
            {isEditing ? (
              <input
                type="text"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.speciality}</p>
            )}
          </div>

          <div className="flex items-center">
            <label className="font-semibold mr-2">Available:</label>
            {isEditing ? (
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="h-5 w-5"
              />
            ) : (
              <span>{formData.isAvailable ? "Yes" : "No"}</span>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 cursor-pointer transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
