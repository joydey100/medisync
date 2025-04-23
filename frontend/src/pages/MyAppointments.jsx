import React from "react";
import { useAppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useAppContext();
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold my-8">My Appointments</h2>
      <div className="flex flex-col gap-5">
        {doctors.slice(0, 2).map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between my-4 md:items-center shadow-lg rounded-lg p-8"
            >
              <div className="flex flex-col md:flex-row wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="md:size-40 sm:size-80 block sm:mx-auto md:mx-0"
                />
                <div className="p-4  mt-5 md:mt-0">
                  <h4 className="font-semibold text-xl mb-3 text-primary/80">
                    {item.name}{" "}
                  </h4>
                  <p className="text-gray-500 text-base mb-3">
                    {item.speciality}
                  </p>
                  <p className="font-medium text-base">
                    Date & time: 24 January | 4.00 PM
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-5 md:mt-0">
                <button className="bg-primary py-3 px-8 text-white rounded-full text-base font-medium cursor-pointer">
                  Pay Online
                </button>
                <button className="py-3 px-8 text-gray-700 bg-slate-100 rounded-full text-base font-medium cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200 ">
                  {" "}
                  Cancel Payment
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyAppointments;
