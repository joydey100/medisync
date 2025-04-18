import React from "react";
import { doctors } from "../assets/assets_frontend/assets";

const TopDoctors = () => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-4">
        Top Doctors to Book
      </h2>
      <p className="sm:w-lg text-center mx-auto text-lg mb-4">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {doctors.slice(0, 10).map((item, index) => {
          return (
            <div key={index} className="p-5 bg-slate-100 rounded-xl shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="bg-gray-200 rounded-xl"
              />
              <div className="mt-4">
                <h3 className="text-2xl font-semibold">{item.name}</h3>
                <p className="text-gray-600 my-2 text-xl">{item.speciality}</p>
              </div>
              <button className="text-xl">more</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopDoctors;
