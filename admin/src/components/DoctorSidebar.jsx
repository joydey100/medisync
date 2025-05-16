import { NavLink } from "react-router-dom";
import { Briefcase, CopyPlus, LayoutDashboard, UsersRound } from "lucide-react";
import { useDoctorContext } from "../context/DoctorContext";

const DoctorSidebar = () => {
  const { docToken } = useDoctorContext();
  return (
    <div className="min-h-screen shadow-2xl basis-full md:basis-[20%] lg:basis-[25%]">
      {docToken && (
        <div className="mt-4">
          <NavLink
            to="/doctor-dashboard"
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
            to="/doctor-appointments"
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
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 ${
                isActive
                  ? "bg-gray-100 border-r-3 border-r-primary font-bold"
                  : "font-medium"
              }`
            }
          >
            <UsersRound className="size-5" />
            <span>Doctor Profile</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default DoctorSidebar;
