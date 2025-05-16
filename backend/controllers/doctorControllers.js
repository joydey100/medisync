import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password, -email");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const docId = req.user;

    const doctor = await Doctor.findById(docId).select("-password");
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api for doctor login
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, message: "Doctor logged in", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// appointment Doctors
export const appointmentDoctor = async (req, res) => {
  const docId = req.user;

  try {
    const appointments = await Appointment.find({ docId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Api to mark completed
export const appointmentCompleted = async (req, res) => {
  try {
    const docId = req.user;
    const { appointmentId } = req.body;

    console.log(docId, appointmentId);

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId.toString() !== docId) {
      return res
        .status(404)
        .json({ success: false, message: "You are not authorized" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Appointment marked as completed" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to cancel  appointment
export const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user;
    const { appointmentId } = req.body;

    console.log(docId, appointmentId);

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId.toString() !== docId) {
      return res
        .status(404)
        .json({ success: false, message: "You are not authorized" });
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    res.status(200).json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to get dashboard data
export const doctorDashboard = async (req, res) => {
  try {
    const docId = req.user;
    const appointments = await Appointment.find({ docId });

    let earnings = 0;
    let patients = [];

    appointments.map((appointment) => {
      if (appointment.isCompleted || appointment.payment) {
        earnings += appointment.docData.fees;
      }
    });

    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId)) {
        patients.push(appointment.userId);
      }
    });

    const dashData = {
      earnings,
      patients,
      appointments,
    };

    res.status(200).json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api  to get doctor profile
export const doctorProfile = async (req, res) => {
  try {
    const docId = req.user;
    const profileData = await Doctor.findById(docId).select("-password");
    res.status(200).json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const docId = req.user;
    const { fees, speciality, degree, experience, isAvailable } = req.body;

    const profileData = await Doctor.findByIdAndUpdate(docId, {
      fees,
      speciality,
      degree,
      experience,
      isAvailable,
    });

    res.status(200).json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
