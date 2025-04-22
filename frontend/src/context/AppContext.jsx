import { createContext, useContext, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  return (
    <AppContext.Provider
      value={{
        doctors,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
