import React from "react";
import { Stethoscope } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center  mb-5 py-5 border-b border-b-gray-400">
      <div className="logo">
        <NavLink to="/" className="text-2xl flex items-center gap-2">
          <Stethoscope className="size-10 text-blue-600" />
          <h2 className="font-bold text-blue-600">MediSync</h2>
        </NavLink>
      </div>
      <ul className="menu hidden md:flex  items-start gap-5 font-medium">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/doctors">All Doctors</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </ul>
      <div className="nav-action">
        <button>Create Account</button>
      </div>
    </nav>
  );
};

export default Navbar;
