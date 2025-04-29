import React from "react";
import { useAdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { Briefcase, CopyPlus, LayoutDashboard, UsersRound } from "lucide-react";

const Sidebar = () => {
  const { token } = useAdminContext();
  return (
    <div className="min-h-screen shadow-2xl basis-full md:basis-[20%] lg:basis-[25%]">
      {token && (
        <div className="mt-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 ${
                isActive
                  ? "bg-gray-100 border-r-3 border-r-primary font-bold"
                  : "font-medium"
              }`
            }
          >
            <LayoutDashboard className="size-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 ${
                isActive
                  ? "bg-gray-100 border-r-3 border-r-primary font-bold"
                  : "font-medium"
              }`
            }
          >
            <Briefcase className="size-5" />
            <span>All Appointments</span>
          </NavLink>
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 ${
                isActive
                  ? "bg-gray-100 border-r-3 border-r-primary font-bold"
                  : "font-medium"
              }`
            }
          >
            <CopyPlus className="size-5" />
            <span>Add Doctor</span>
          </NavLink>
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 ${
                isActive
                  ? "bg-gray-100 border-r-3 border-r-primary font-bold"
                  : "font-medium"
              }`
            }
          >
            <UsersRound className="size-5" />
            <span>Doctor List</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
