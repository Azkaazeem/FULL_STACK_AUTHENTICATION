import express from "express";
import { addUser, loginUser, logout } from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/register", addUser); // POST request for Signup
router.post("/login", loginUser);  // POST request for Login
router.post("/logout", logout);    // POST request for Logout

export default router;