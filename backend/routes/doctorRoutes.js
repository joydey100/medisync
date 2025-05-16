import express from "express";
import {
  appointmentCancel,
  appointmentCompleted,
  appointmentDoctor,
  doctorDashboard,
  doctorProfile,
  getDoctor,
  getDoctors,
  loginDoctor,
  updateDoctor,
} from "../controllers/doctorControllers.js";
import authDoctor from "../middlewares/authDoctor.js";

const router = express.Router();

router.get("/doctors-list", getDoctors);
router.get("/get-doctor", authDoctor, getDoctor);
router.post("/doctor-login", loginDoctor);
router.get("/doctor-appointments", authDoctor, appointmentDoctor);
router.post("/appointment-complete", authDoctor, appointmentCompleted);
router.post("/appointment-cancel", authDoctor, appointmentCancel);
router.get("/doctor-dashboard", authDoctor, doctorDashboard);
router.get("/doctor-profile", authDoctor, doctorProfile);

export default router;
