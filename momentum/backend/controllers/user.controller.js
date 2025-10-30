import { User } from "../models/user.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  // Respond with success
  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    })
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Respond with success
  res.status(200).json(
    new ApiResponse(200, "Login successful", {
      id: user._id,
      username: user.username,
      email: user.email,
    })
  );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -__v");

  if (!users || users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  res.status(200).json(
    new ApiResponse(200, "Users fetched successfully", {
      users,
    })
  );
});

export { registerUser, loginUser, getAllUsers };
