import React from "react";
import { NavLink } from "react-router-dom";
import { Stethoscope } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-15">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center flex-wrap gap-4 md:py-10 ">
        {/* left side */}
        <div className="md:w-1/4 w-full">
          <div className="logo">
            <NavLink to="/" className="text-2xl flex items-center gap-2">
              <Stethoscope className="size-10 text-primary" />
              <h2 className="font-bold text-primary">MediSync</h2>
            </NavLink>
          </div>
          <p className="text-base mt-4 text-gray-500">
            MediSync connects patients with trusted doctors for fast and easy
            appointment booking. Healthcare made simpler.
          </p>
        </div>
        {/* middle part */}
        <div className="md:W-1/4 ">
          <h4 className="font-medium text-xl mb-4">Company</h4>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li> Privacy policy</li>
          </ul>
        </div>
        {/* right side */}
        <div className="md:w-1/4 ">
          <h4 className="font-medium text-xl mb-4">GET IN TOUCH</h4>
          <ul className="flex flex-col gap-2 text-base text-gray-500">
            <li>+1-212-345789</li>
            <li>Medisync@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="copyright py-4 text-base text-center border-t-1 border-gray-200  mt-5 text-gray-400 bg-slate-100">
        &copy; 2025 MediSync. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
