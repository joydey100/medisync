import { useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const token = localStorage.getItem("docToken");
  const [docToken, setDocToken] = useState(token || "");
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctor, setDoctor] = useState(null);
  const [dashData, setDashData] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctor-appointments`,
        {
          headers: {
            Authorization: `Bearer ${docToken}`,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDoctor = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/get-doctor`, {
        headers: {
          Authorization: `Bearer ${docToken}`,
        },
      });

      if (data.success) {
        setDoctor(data.doctor);
      } else {
        setDoctor(null);
        setDocToken(null);
        localStorage.removeItem("docToken");
      }
    } catch (error) {
      setDoctor(null);
      setDocToken(null);
      localStorage.removeItem("docToken");
    }
  };

  useEffect(() => {
    if (docToken) {
      getDoctor();
    }
  }, [docToken]);

  const completeAppointment = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/appointment-complete`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${docToken}`,
          },
        }
      );

      if (data.success) {
        getAppointments();
        toast.success(data.message);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/appointment-cancel`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${docToken}`,
          },
        }
      );

      if (data.success) {
        getAppointments();
        toast.success(data.message);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDoctorDashboard = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctor-dashboard`,
        {
          headers: {
            Authorization: `Bearer ${docToken}`,
          },
        }
      );

      console.log(data);

      if (data.success) {
        setDashData(data.dashData);
      } else {
        console.log(data.message);
        setDashData(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctor-profile`,
        {
          headers: {
            Authorization: `Bearer ${docToken}`,
          },
        }
      );

      if (data.success) {
        setDoctorProfile(data.profileData);
      } else {
        setDoctorProfile(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        docToken,
        setDocToken,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        getDoctorDashboard,
        dashData,
        setDashData,
        doctorProfile,
        setDoctorProfile,
        getDoctorProfile,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorContext = () => useContext(DoctorContext);

export default DoctorContextProvider;
