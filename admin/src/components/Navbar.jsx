import React, { useState } from "react";
import { Stethoscope, LogOut, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";
import { useDoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useAdminContext();
  const { docToken, setDocToken } = useDoctorContext();
  const [showMenu, setShowMenu] = useState(false);
  const naviage = useNavigate();

  const LogoutHandle = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken("");
      naviage("/");
    }

    if (docToken) {
      localStorage.removeItem("docToken");
      setDocToken("");
      naviage("/");
    }
  };

  return (
    <nav>
      <div className="flex justify-between items-center  mb-5 py-5 shadow-xl rounded-2xl px-10 mt-3">
        <div className="logo">
          <NavLink to="/" className="text-2xl flex items-center gap-2">
            <Stethoscope className="size-10 text-primary" />
            <h2 className="font-bold text-primary">MediSync</h2>
          </NavLink>
        </div>

        <div className="flex  items-center gap-5 justify-center  relative">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full cursor-pointer flex gap-2 justify-center items-center"
            onClick={LogoutHandle}
          >
            <span> Log out </span>
            <LogOut className="size-5" />
          </button>
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
