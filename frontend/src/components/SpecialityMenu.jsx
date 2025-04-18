import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-4 py-15 text-gray-800"
    >
      <h1 className="text-3xl font-bold">Find by Speciality</h1>
      <p className="sm:w-lg text-center text-base mb-8">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      <div className="flex justify-center items-center flex-wrap gap-4 pt-4 w-full">
        {specialityData.map((item, index) => {
          return (
            <div key={index}>
              <Link
                to={`/doctors/${item.speciality} key=${index}`}
                onClick={() => scrollTo(0, 0)}
                className="flex flex-col items-center gap-2"
              >
                <img src={item.image} alt="speciality" className="size-28" />
                <p className="text-center text-sm">{item.speciality} </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SpecialityMenu;
