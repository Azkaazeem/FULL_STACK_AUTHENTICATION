import jwt from "jsonwebtoken";
import Users from "../models/UsersSchema.js";

const authMiddle = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;
    const token = req.cookies?.token || bearerToken;

    if (!token) {
      return res.status(401).json({ status: false, message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid session" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ status: false, message: "Invalid session" });
  }
};

export default authMiddle;
