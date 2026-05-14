import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authroute from "./routes/AuthRoutes.js";
import dns from 'dns'

dns.setServers(['8.8.8.8','1.1.1.1'])
dotenv.config();
const app = express();

connectDb(); 

// CORS update kiya gaya hai credentials ke liye
app.use(cors({
  origin: 'http://localhost:5173', // Aapka frontend URL (Vite default)
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Successfully running!" });
});

app.use('/api/v1/auth', authroute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});