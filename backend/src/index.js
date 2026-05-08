import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authroute from "./routes/AuthRoutes.js";

dotenv.config(); // .env file ko read karne ke liye
const app = express();

// Database se connect hona
connectDb(); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Cookies read karne ke liye

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Successfully running!" });
});

// Authentication wale Raste (Routes)
app.use('/api/v1/auth', authroute);

// Server Start Karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});