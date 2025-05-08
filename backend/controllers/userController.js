import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_API_SECRET);

//  API to register user
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, message: "User registered", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// API to login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, message: "User logged in", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// API to get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.user;
    const { fullName, phone, gender, age, bloodGroup, weight, feet, inches } =
      req.body;

    const imageFile = req.file;

    if (
      !fullName ||
      !phone ||
      !gender ||
      !age ||
      !bloodGroup ||
      !weight ||
      !feet ||
      !inches
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (imageFile) {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = result.secure_url;

      await User.findByIdAndUpdate(id, {
        image: imageUrl,
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        phone,
        gender,
        age,
        bloodGroup,
        weight,
        height: {
          feet,
          inches,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Profile updated", updateUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const id = req.user;

    const user = await User.findById(id);

    // delete image from cloudinary
    const imageId = user.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imageId);

    await User.findByIdAndUpdate(id, {
      image: "",
    });

    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Api to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, date, time } = req.body;
    const docData = await Doctor.findById(docId).select("-password");

    if (!docData.isAvailable) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = JSON.parse(JSON.stringify(docData.slots_booked || {}));

    if (slots_booked[date]) {
      if (slots_booked[date].includes(time)) {
        return res
          .status(404)
          .json({ success: false, message: "Time slot not available" });
      } else {
        slots_booked[date].push(time);
      }
    } else {
      slots_booked[date] = [];
      slots_booked[date].push(time);
    }

    const userData = await User.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      docId,
      userId,
      userData,
      docData,
      amount: docData.fees,
      date,
      time,
    };

    const newAppointment = await Appointment.create(appointmentData);

    await Doctor.findByIdAndUpdate(docId, {
      slots_booked,
    });

    res
      .status(200)
      .json({ success: true, message: "Appointment booked", newAppointment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to get user appointments
export const listAppointments = async (req, res) => {
  try {
    const userId = req.user;
    const appointments = await Appointment.find({ userId }).select("-password");
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user;
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== userId) {
      return res
        .status(404)
        .json({ success: false, message: "You are not authorized" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // realeasing doctor slot
    const { docId, date, time } = appointment;

    const docData = await Doctor.findById(docId).select("-password");

    let slots_booked = JSON.parse(JSON.stringify(docData.slots_booked || {}));

    if (slots_booked[date]) {
      if (slots_booked[date].includes(time)) {
        slots_booked[date] = slots_booked[date].filter((slot) => slot !== time);
      }
    }

    await Doctor.findByIdAndUpdate(docId, {
      slots_booked,
    });

    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const paymentStripe = async (req, res) => {
  const data = req.body;

  const { name, image, fees } = data;

  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name,
          images: [image],
        },
        unit_amount: fees * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  });

  res.json({ id: session.id });
};
