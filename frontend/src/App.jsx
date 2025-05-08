import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

const App = () => {
  return (
    <main className="container mx-auto px-5 font-inter scroll-smooth ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="my-appointments" element={<MyAppointments />} />
        <Route path="appointment/:id" element={<Appointment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default App;
