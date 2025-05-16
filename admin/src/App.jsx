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
import { useDoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorSidebar from "./components/DoctorSidebar";

const App = () => {
  const { token } = useAdminContext();
  const { docToken } = useDoctorContext();



  if (!token && !docToken) {
    return (
      <main className="font-inter">
        <Login />
        <ToastContainer />
      </main>
    );
  }

  return (
    <main className="font-inter">
      {token && (
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
      {docToken && !token && (
        <main>
          <Navbar />

          <div className="flex">
            <DoctorSidebar />
            <Routes>
              {/* <Route path="/" element={<></>} /> */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointment />}
              />
            </Routes>
          </div>
        </main>
      )}
      <ToastContainer />
    </main>
  );
};

export default App;
