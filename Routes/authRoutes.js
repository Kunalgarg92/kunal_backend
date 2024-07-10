// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");
// import { signup, login } from "../controllers/authController";

// // POST /api/auth/login
// app.post("/api/auth/login", login);
// router.post("/login", authController.login);
// router.post("/signup", signup);

// export default router;

// backend/routes/authRoutes.js
import express from "express";
import { login, signup } from "../controllers/authController.js"; // Correct path and extension

const router = express.Router();

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/signup
router.post("/signup", signup);

export default router;
