import Users from "../models/UsersSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    if (!email || !password || !name) {
      return res.json({ status: false, message: "All fields are required" });
    }
    
    const hashPass = await bcrypt.hash(password, 10);
    
    const newUser = new Users({ name, email, password: hashPass, role: "user" });
    const savedUser = await newUser.save();

    res.json({ status: true, message: "User created successfully", user: savedUser });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Frontend se aane wala email:", email);
  
  try {
    if (!email || !password) {
      return res.json({ status: false, message: "All fields are required" });
    }

    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({ status: false, message: "Invalid credentials" });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (isPasswordCorrect && (!role || user.role === role)) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    
      res.cookie("token", token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax' 
      });

      return res.json({ status: true, message: "Login successful", user: user, token: token });
    } else {
      res.status(401).json({ status: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ status: true, message: "Logout successful" });
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password").sort({ createdAt: -1, _id: -1 });
    res.json({ status: true, users });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;

  try {
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ status: false, message: "Invalid role" });
    }

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.json({ status: true, user: updatedUser });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (String(user._id) === String(req.user._id)) {
      return res.status(400).json({ status: false, message: "You cannot delete your own account" });
    }

    await Users.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export { addUser, loginUser, logout, getUsers, updateUserRole, deleteUser };
