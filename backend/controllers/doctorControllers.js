import Doctor from "../models/doctorModel.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password, -email");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
