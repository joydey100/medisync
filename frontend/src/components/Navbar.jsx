import React, { useState } from "react";
import { Stethoscope, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

const Navbar = () => {
  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <nav>
      <div className="flex justify-between items-center  mb-5 py-5">
        <div className="logo">
          <NavLink to="/" className="text-2xl flex items-center gap-2">
            <Stethoscope className="size-10 text-primary" />
            <h2 className="font-bold text-primary">MediSync</h2>
          </NavLink>
        </div>
        <ul className="menu hidden md:flex  items-start gap-5 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "text-primary" : "text-black"
              }  hover:text-primary  `
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `${
                isActive ? "text-primary" : "text-black"
              }  hover:text-primary  `
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? "text-primary" : "text-black"} hover:text-primary `
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? "text-primary" : "text-black"} hover:text-primary `
            }
          >
            Contact
          </NavLink>
        </ul>
        <div className="flex items-center gap-5 justify-center cursor-pointer group relative">
          {token ? (
            <div className="flex items-center gap-2">
              <img
                src={assets.profile_pic}
                alt="profile-pic"
                className="size-10 rounded-full"
              />
              <ChevronDown className="size-5" />
              <div className="absolute top-0 right-0 pt-14 text-base tex-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 flex flex-col rounded gap-4 p-4 text-center text-base font-medium">
                  <NavLink
                    to="my-profile"
                    className="hover:text-black transition-all block w-full "
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="my-appointments"
                    className="hover:text-black transition-all block w-full "
                  >
                    My Appointments
                  </NavLink>
                  <button className="block w-full cursor-pointer hover:text-black transition-all">
                    {" "}
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-primary text-white py-3 px-8 rounded-full hidden md:block text-base font-medium"
            >
              Create Account
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
