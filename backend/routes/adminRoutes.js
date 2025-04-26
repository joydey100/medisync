import express from "express";
import {
  addDoctor,
  adminLoginController,
} from "../controllers/adminControllers.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.post("/login", adminLoginController);

export default router;
