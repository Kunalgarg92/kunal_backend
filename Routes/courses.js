// routes/courses.js

import express from "express";
import multer from "multer";
import Course from "../models/Course.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new course
router.post("/courses", upload.single("image"), async (req, res, next) => {
  try {
    const { title, instructor, description } = req.body;
    const image = req.file.path;

    const course = new Course({
      title,
      instructor,
      description,
      image,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
});

// Get all courses
router.get("/courses", async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    next(error);
  }
});

// Get a single course
router.get("/courses/:id", async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
});

// Update a course
router.put("/courses/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
});

// Delete a course
router.delete("/courses/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
