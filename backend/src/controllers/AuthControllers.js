import Users from "../models/UsersSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// 1. SIGNUP FUNCTION (Naya User Banana)
const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    if (!email || !password || !name) {
      return res.json({ status: false, message: "All fields are required" });
    }
    
    // Password ko secure (hash) karna
    const hashPass = await bcrypt.hash(password, 10);
    
    // Database mein user save karna
    const newUser = new Users({ name, email, password: hashPass, role });
    const savedUser = await newUser.save();

    res.json({ status: true, message: "User created successfully", user: savedUser });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// 2. LOGIN FUNCTION (User ko system mein lana)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.json({ status: false, message: "All fields are required" });
    }

    // Database mein check karna ke user hai ya nahi
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({ status: false, message: "Cannot find user" });
    }
    
    // Password match karna
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (isPasswordCorrect) {
      // Agar password theek hai toh ek Token (Ticket) generate karna
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
      
      // Miss ne is Token ko browser ki Cookie mein save karwaya hai
      res.cookie("token", token, { httpOnly: true, secure: true });

      return res.json({ status: true, message: "Login successful", user: user, token: token });
    } else {
      res.status(404).json({ status: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// 3. LOGOUT FUNCTION
const logout = (req, res) => {
    res.clearCookie("token"); // Cookie delete kar dena
    res.json({ status: true, message: "Logout successful" });
};

export { addUser, loginUser, logout };