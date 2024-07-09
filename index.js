import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import coursesRouter from "./routes/courses.js"; // Updated import without {}

const app = express();
dotenv.config();

const uri = "mongodb://localhost:27017/learning_management_system";
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

const Port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

// Routes
app.use("/api", coursesRouter); // Mount coursesRouter under /api

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
