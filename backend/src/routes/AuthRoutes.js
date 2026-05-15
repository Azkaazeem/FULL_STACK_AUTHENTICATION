import express from "express";
import { addUser, deleteUser, getUsers, loginUser, logout, updateUserRole } from "../controllers/AuthControllers.js";
import adminMiddle from "../middlewares/Adminmiddle.js";
import authMiddle from "../middlewares/Authmiddle.js";

const router = express.Router();

router.post("/register", addUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/users", authMiddle, adminMiddle, getUsers);
router.patch("/users/:id/role", authMiddle, adminMiddle, updateUserRole);
router.delete("/users/:id", authMiddle, adminMiddle, deleteUser);

export default router;
