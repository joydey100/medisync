import Doctor from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

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
      availability,
    } = req.body;
    const imageFile = req.file;

    //  check if all fields are filled
    // if (
    //   !name ||
    //   !email ||
    //   !password ||
    //   !speciality ||
    //   !degree ||
    //   !experience ||
    //   !about ||
    //   !fees ||
    //   !availability
    // ) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "All fields are required" });
    // }

    //  if email exist
    const existingEmail = await Doctor.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
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
      availability,
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
