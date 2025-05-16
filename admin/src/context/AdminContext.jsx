import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const currentToken = localStorage.getItem("token");
  const [token, setToken] = useState(currentToken || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctorList, setDoctorList] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.data;
      if (result.success) {
        setDoctorList(result.doctors);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvailableDoctors = async (doctorId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/admin/available/${doctorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      if (result.success) {
        fetchDoctors();
        if (result.updateDoctorAvailable.isAvailable) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        token,
        setToken,
        fetchDoctors,
        backendUrl,
        doctorList,
        changeAvailableDoctors,
        appointments,
        setAppointments,
        getAllAppointments,
        dashData,
        setDashData,
        getDashData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
