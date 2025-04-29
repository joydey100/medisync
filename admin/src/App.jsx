import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useAdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import Appointments from "./pages/Admin/Appointments";
import DoctorsList from "./pages/Admin/DoctorsList";

const App = () => {
  const { token } = useAdminContext();

  return (
    <main className="font-inter">
      {!token ? (
        <Login />
      ) : (
        <main>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <Routes>
              {/* <Route path="/" element={<></>} /> */}
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
            </Routes>
          </div>
        </main>
      )}
      <ToastContainer /> {/* Always render it here */}
    </main>
  );
};

export default App;
