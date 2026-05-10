import express from "express";
import { addUser, loginUser, logout } from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/register", addUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;