import express from "express";
import {
  addDoctor,
  adminDashboard,
  adminLoginController,
  allDoctors,
  appointmentsAdmin,
  changeDoctorsAvailability,
} from "../controllers/adminControllers.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.get("/all-doctors", authAdmin, allDoctors);
router.put("/available/:doctorId", authAdmin, changeDoctorsAvailability);
router.post("/login", adminLoginController);
router.get("/appointments", authAdmin, appointmentsAdmin);
router.get("/dashboard", authAdmin, adminDashboard);

export default router;
