import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="my-15 lg:px-10">
      <div className="flex justify-around items-center flex-wrap bg-primary/80 rounded-lg px-10">
        {/* left side */}
        <div className=" w-full xl:w-1/2 py-10 lg:py-0">
          <h2 className="text-2xl md:text-5xl text-white font-bold leading-tight mb-8">
            Book Appointment With 100+ Trusted Doctors
          </h2>
          <Link
            to="login"
            className="font-medium bg-white text-black px-8 py-3 cursor-pointer rounded-full"
          >
            Create account
          </Link>
        </div>
        {/* right side */}
        <div className="xl:w-1/2  justify-end items-end hidden lg:flex">
          <img
            src={assets.appointment_img}
            alt="appointment_img"
            className="w-3/4 hidden xl:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
