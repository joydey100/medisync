import Doctor from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js";

// API for adding doctor

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
    } = req.body;

    // Parse availability from separate JSON strings
    const days = JSON.parse(req.body.days || "[]");
    const timeSlots = JSON.parse(req.body.timeSlots || "[]");

    const imageFile = req.file;

    // Email validation
    const existingEmail = await Doctor.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await cloudinary.uploader.upload(imageFile.path);
    const imageURL = result.secure_url;

    const doctorData = {
      name,
      email,
      image: imageURL,
      speciality,
      degree,
      experience,
      about,
      fees,
      password: hashedPassword,
      availability: {
        days,
        timeSlots,
      },
    };

    const doctor = await Doctor.create(doctorData);

    res
      .status(200)
      .json({ success: true, message: "Doctor added successfully", doctor });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(email, process.env.JWT_SECRET);
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to  get all doctor list for admin panel
export const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const changeDoctorsAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    console.log(doctorId);

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const updateDoctorAvailable = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        isAvailable: !doctor.isAvailable,
      },
      { new: true }
    );

    console.log(updateDoctorAvailable);

    res.status(200).json({
      success: true,
      message: `${updateDoctorAvailable.name} is ${
        updateDoctorAvailable.isAvailable ? "available" : "not available"
      }`,
      updateDoctorAvailable,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to get appointment list
export const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).select("-password");
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
