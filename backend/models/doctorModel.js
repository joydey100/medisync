import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: process.env.DEFAULT_IMAGE,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
    fees: {
      type: Number,
      required: true,
    },
    availability: {
      days: {
        type: [String],
        required: true,
      },
      timeSlots: {
        type: [String],
        required: true,
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    slots_booked: { type: Object, default: {} },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
