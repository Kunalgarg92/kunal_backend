// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import session from "express-session";
// import coursesRouter from "./routes/courses.js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import bodyParser from "body-parser"; // Import these two packages

// const app = express();
// dotenv.config();

// // Create __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Create uploads directory if it doesn't exist
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Connect to MongoDB
// const uri =
//   process.env.MONGODB_URI ||
//   "mongodb://localhost:27017/learning_management_system";
// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err.message);
//   });

// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: "http://localhost:4000", // Replace with your frontend URL
//     credentials: true,
//   })
// );
// app.use(
//   session({
//     secret: "mysecretkey",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use("/uploads", express.static(uploadDir)); // Serve uploaded files

// // Routes
// app.use("/api", coursesRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// app.use(bodyParser.json());
// // Routes
// app.use("/api/auth", authRoutes);
// app.post("/api/auth/login", login);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser"; // Import bodyParser

// Import routes
import authRoutes from "./Routes/authRoutes.js"; // Adjust path as necessary
import coursesRouter from "./Routes/courses.js"; // Assuming you have a courses router

const app = express();
dotenv.config();

// Connect to MongoDB
const uri =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/learning_management_system";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:4000", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json()); // Use bodyParser middleware

// Routes
app.use("/api", coursesRouter); // Assuming coursesRouter handles '/api' paths

// Authentication routes
app.use("/api/auth", authRoutes); // Mount authRoutes under /api/auth

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});
