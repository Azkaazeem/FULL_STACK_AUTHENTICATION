import Users from "../models/UsersSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    if (!email || !password || !name) {
      return res.json({ status: false, message: "All fields are required" });
    }
    
    const hashPass = await bcrypt.hash(password, 10);
    
    const newUser = new Users({ name, email, password: hashPass, role });
    const savedUser = await newUser.save();

    res.json({ status: true, message: "User created successfully", user: savedUser });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.json({ status: false, message: "All fields are required" });
    }

    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({ status: false, message: "Cannot find user" });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    
      // Cookies settings ko local development ke liye adjust kiya
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

export { addUser, loginUser, logout };