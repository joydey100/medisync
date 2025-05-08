import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  deleteImage,
  getUserProfile,
  listAppointments,
  loginUser,
  paymentStripe,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-profile", upload.single("image"), authUser, updateProfile);
router.get("/profile", authUser, getUserProfile);
router.delete("/delete-image", authUser, deleteImage);
router.post("/book-appointment", authUser, bookAppointment);
router.get("/appointments", authUser, listAppointments);
router.post("/cancel-appointment", authUser, cancelAppointment);
router.post("/payment", authUser, paymentStripe);

export default router;
