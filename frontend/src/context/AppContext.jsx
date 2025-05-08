import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const getToken = localStorage.getItem("userToken");
  const [userToken, setUserToken] = useState(getToken || null);
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/doctors-list`);

      setDoctors(data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setAppointments(data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userToken) {
      getAppointments();
    }
  }, [userToken]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (userToken) {
      getUserData();
    }
  }, [userToken]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setUserData(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        userToken,
        setUserToken,
        userData,
        setUserData,
        getUserData,
        fetchDoctors,
        appointments,
        setAppointments,
        getAppointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
