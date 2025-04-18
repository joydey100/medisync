import React from "react";
import { NavLink } from "react-router-dom";
import { Stethoscope } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-15">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center flex-wrap gap-4 md:p-10 ">
        {/* left side */}
        <div className="md:w-1/4 w-full">
          <div className="logo">
            <NavLink to="/" className="text-2xl flex items-center gap-2">
              <Stethoscope className="size-10 text-primary" />
              <h2 className="font-bold text-primary">MediSync</h2>
            </NavLink>
          </div>
          <p className="text-base mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam ad
            dolor saepe dolorum quibusdam, corrupti necessitatibus veniam quidem
            cum porro vitae nemo commodi! Alias nulla consequatur quisquam ipsam
            sit voluptates.
          </p>
        </div>
        {/* middle part */}
        <div className="md:W-1/4 ">
          <h4 className="font-medium text-xl mb-4">Company</h4>
          <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li> Privacy policy</li>
          </ul>
        </div>
        {/* right side */}
        <div className="md:w-1/4 ">
          <h4 className="font-medium text-xl mb-4">GET IN TOUCH</h4>
          <ul className="flex flex-col gap-2 text-base">
            <li>+1-212-345789</li>
            <li>Medisync@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="copyright py-4 text-base text-center border-t-1 border-gray-200  mt-5">
        &copy; 2025 MediSync. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
