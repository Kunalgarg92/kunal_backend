// // backend/controllers/authController.js
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User";

// const secretKey = "your_secret_key"; // Replace with a secure key

// async function login(req, res) {
//   const { username, password } = req.body;

//   try {
//     // Find user in MongoDB
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "User not found." });

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials." });

//     // Generate JWT token
//     const token = jwt.sign(
//       { user: { id: user.id, username: user.username } },
//       secretKey
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error." });
//   }
// }
// async function signup(req, res) {
//   const { username, email, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     // Create new user
//     user = new User({
//       username,
//       email,
//       password, // This should be hashed before saving to DB (see next step)
//     });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     // Save user to MongoDB
//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { user: { id: user.id, username: user.username } },
//       secretKey
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// }

// export { login, signup };

// backend/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Adjust path and extension as per your setup

const secretKey = "your_secret_key"; // Replace with a secure key

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find user in MongoDB
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found." });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: user.id, username: user.username } },
      secretKey
    );

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error." });
  }
}

async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create new user
    user = new User({
      username,
      email,
      password, // This should be hashed before saving to DB (see next step)
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to MongoDB
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: user.id, username: user.username } },
      secretKey
    );

    res.json({ token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error." });
  }
}

export { login, signup };
