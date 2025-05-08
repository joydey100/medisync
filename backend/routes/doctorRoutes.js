import express from "express";
import { getDoctors } from "../controllers/doctorControllers.js";

const router = express.Router();

router.get("/doctors-list", getDoctors);

export default router;
