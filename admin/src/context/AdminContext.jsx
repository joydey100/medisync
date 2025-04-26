import { createContext } from "react";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
