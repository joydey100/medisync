import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authDoctor;
