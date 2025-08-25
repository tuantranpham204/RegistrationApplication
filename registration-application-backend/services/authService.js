const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Changed to bcrypt for consistency
const {
  createUser,
  findUserByEmail,
  updatePassword,
} = require("../models/user"); // Added updatePassword
const { emailLinkSender } = require("./emailService");
require("dotenv").config();

const register = async (username, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  await createUser(username, email, password);
  return { message: "User registered successfully" };
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SYSTEM_JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return { token };
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SYSTEM_JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const forgotPassword = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.CLIENT_JWT_SECRET,
      {
        expiresIn: "15m", // Increased to 15 minutes for usabWility
      }
    );
    const resetLink = `http://localhost:3000/api/auth/reset-password?token=${token}`; // Full URL
    await emailLinkSender(
      "Password Reset Request",
      resetLink,
      "Click here to reset your password",
      email // Pass email as a string
    );
    return { message: `Password reset link sent to email: ${resetLink}` };
  } catch (e) {
    console.log("Forgit password error: ", e);
  }
};

const resetPassword = async (token, newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.CLIENT_JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
  const user = await findUserByEmail(decoded.email);
  if (!user) {
    throw new Error("User not found");
  }
  await updatePassword(decoded.email, newPassword);
  return { message: "Password reset successfully" };
};

module.exports = {
  register,
  login,
  verifyToken,
  forgotPassword,
  resetPassword,
};
