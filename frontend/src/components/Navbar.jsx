import React, { useState } from "react";
import { Stethoscope, ChevronDown, Menu, X } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);
  const { userToken, setUserToken, userData } = useAppContext();
  const [shoWDropDown, setShowDropDown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/");
    toast.success("Successfully logged out");
  };

  return (
    <nav>
      <div className="flex justify-between items-center  mb-5 py-5 shadow-xl rounded-2xl px-8 mt-3">
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
        <div className="flex items-center gap-5 justify-center  relative">
          {userToken && userData ? (
            <div
              className="flex items-center gap-2"
              onClick={() => setShowDropDown(!shoWDropDown)}
            >
              <img
                src={userData.image}
                alt="profile-pic"
                className="size-10 rounded-full cursor-pointer"
              />
              <ChevronDown className="size-5 cursor-pointer" />

              {
                // Dropdown menu
                shoWDropDown && (
                  <div className="absolute top-0 right-0 pt-14 text-base tex-gray-600 z-20  ">
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
                      <button
                        className="block w-full cursor-pointer hover:text-black transition-all"
                        onClick={handleLogout}
                      >
                        {" "}
                        Logout
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-primary text-white py-3 px-8 rounded-full hidden md:block text-base font-medium"
            >
              Create Account
            </NavLink>
          )}
          {!showMenu && (
            <Menu
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer block md:hidden"
            />
          )}
        </div>
      </div>

      {/* Mobile menu  */}
      {showMenu && (
        <div className="mobile-menu absolute top-0 left-0 z-10 bg-white h-screen w-full p-10">
          <div className="flex justify-between items-center py-4">
            <div className="logo" onClick={() => setShowMenu(!showMenu)}>
              <NavLink to="/" className="text-2xl flex items-center gap-2">
                <Stethoscope className="size-10 text-primary" />
                <h2 className="font-bold text-primary">MediSync</h2>
              </NavLink>
            </div>
            <X
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer size-10"
            />
          </div>
          <div className="mt-15 flex flex-col gap-10 items-center text-xl uppercase font-medium">
            <Link
              to="/"
              onClick={() => setShowMenu(!showMenu)}
              className="hover:bg-primary w-full block text-center py-3 hover:text-white transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/doctors"
              onClick={() => setShowMenu(!showMenu)}
              className="hover:bg-primary w-full block text-center py-3 hover:text-white transition-all duration-300"
            >
              All Doctors
            </Link>
            <Link
              to="/about"
              onClick={() => setShowMenu(!showMenu)}
              className="hover:bg-primary w-full block text-center py-3 hover:text-white transition-all duration-300"
            >
              About{" "}
            </Link>
            <Link
              to="/contact"
              onClick={() => setShowMenu(!showMenu)}
              className="hover:bg-primary w-full block text-center py-3 hover:text-white transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
