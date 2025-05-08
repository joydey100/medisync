import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const { doctorList, fetchDoctors, token, changeAvailableDoctors } =
    useAdminContext();

  useEffect(() => {
    fetchDoctors();
  }, [token]);

  return (
    <section className="lg:p-10 md:p-8 p-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {doctorList.map((doctor) => {
          return (
            <div className="card p-5 shadow-md" key={doctor._id}>
              <div className="card-body">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full md:max-w-[400px] mx-auto"
                />
                <h2 className="card-title text-xl mt-4 mb-2 font-medium">
                  {doctor.name}
                </h2>
                <p className="card-text text-gray-500 text-base">
                  {doctor.speciality}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    name="available"
                    id={`available-${doctor._id}`}
                    onChange={() => changeAvailableDoctors(doctor._id)}
                    checked={doctor.isAvailable}
                  />
                  <label htmlFor={`available-${doctor._id}`}>
                    {doctor.isAvailable ? "Available" : "Not Available"}
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DoctorsList;
