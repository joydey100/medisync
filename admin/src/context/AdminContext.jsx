import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const currentToken = localStorage.getItem("token");
  const [token, setToken] = useState(currentToken || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <AdminContext.Provider value={{ token, setToken, backendUrl }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
