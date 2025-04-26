import { createContext, useContext } from "react";

const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  return <DoctorContext.Provider value={{}}>{children}</DoctorContext.Provider>;
};

export const useDoctorContext = () => useContext(AppContext);

export default DoctorContextProvider;
