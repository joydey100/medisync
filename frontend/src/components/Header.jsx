import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col md:flex-row flex-wrap  bg-primary/80 rounded-lg px-6 md:px-10 lg:px-20 mt-5 md:mt-10 mb-15 pt-10">
      {/* left side */}
      <div className="left-side-content md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 m-auto ">
        <h2 className="text-4xl lg:text-6xl text-white font-bold  ">
          Book Appointments with Trusted Doctors
        </h2>
        <div className="flex flex-col items-start md:flex-row md:items-center gap-4 text-white mt-4">
          <img
            src={assets.group_profiles}
            alt="group_of_doctors_profile"
            className="w-28"
          />
          <p className="text-base">
            Find experienced doctors near you and book your appointments
            instantly. No waiting, no hassle. Your health, just a click away.
          </p>
        </div>

        <a
          href="/#speciality"
          className=" flex gap-2 items-center bg-white px-6 py-3 rounded-full  cursor-pointer hover:shadow-md  transition-all duration-200 mt-4 text-base font-semibold"
        >
          <span>Book an appointment</span> <MoveRight className="size-5" />
        </a>
      </div>
      {/* right side */}
      <div className="right-side-content md:w-1/2 flex flex-col justify-end ">
        <img
          src={assets.header_img}
          alt="doctors_img"
          className="w-md md:w-full block"
        />
      </div>
    </header>
  );
};

export default Header;
