import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User, { UserRole } from "../models/user.model";
import Group from "../models/group.model";
import { generateToken } from "../utils/token.util";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
} from "../utils/response.util";

// @desc    Register a new leader and create a new group
// @route   POST /api/auth/register-leader
// @access  Public
export const registerLeader = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const {
    name,
    email,
    password,
    phoneNumber,
    groupName,
    groupId,
    presidentName,
    savingMonth,
    savingYear,
  } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    // Check if group ID already exists
    if (groupId) {
      const groupExists = await Group.findOne({ groupId });
      if (groupExists) {
        return errorResponse(res, "Group ID already exists", 400);
      }
    }

    // Create new group
    const group = await Group.create({
      name: groupName,
      groupId: groupId || undefined, // If not provided, the pre-save hook will generate one
      president: presidentName || name,
      createdBy: null, // Will be updated after user creation
      savingMonth,
      savingYear,
    });

    // Create user with leader role
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role: UserRole.LEADER,
      groupId: group._id,
    });

    // Update group with created by user
    group.createdBy = user._id;
    await group.save();

    // Generate JWT token
    const token = generateToken({
      id: user._id.toString(),
      role: user.role,
      groupId: group._id.toString(),
    });

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          groupId: group._id,
        },
        group: {
          id: group._id,
          name: group.name,
          groupId: group.groupId,
          president: group.president,
        },
        token,
      },
      "Leader registered and group created successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, "Failed to register leader", 500, error);
  }
};

// @desc    Register a new member
// @route   POST /api/auth/register-member
// @access  Private (Leader and Secretary only)
export const registerMember = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { name, email, password, phoneNumber, role } = req.body;
  const groupId = req.user?.groupId;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "User already exists", 400);
    }

    // Validate the group
    const group = await Group.findById(groupId);
    if (!group) {
      return notFoundResponse(res, "Group not found");
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role: role || UserRole.MEMBER,
      groupId: group._id,
    });

    return successResponse(
      res,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        groupId: user.groupId,
      },
      "Member registered successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, "Failed to register member", 500, error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // Check if user is active
    if (!user.isActive) {
      return errorResponse(res, "User account is inactive", 401);
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // Find user's group
    const group = await Group.findById(user.groupId);
    if (!group) {
      return notFoundResponse(res, "User's group not found");
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id.toString(),
      role: user.role,
      groupId: user.groupId.toString(),
    });

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          groupId: user.groupId,
        },
        group: {
          id: group._id,
          name: group.name,
          groupId: group.groupId,
          president: group.president,
          savingMonth: group.savingMonth,
          savingYear: group.savingYear,
        },
        token,
      },
      "Login successful"
    );
  } catch (error) {
    return errorResponse(res, "Login failed", 500, error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) {
      return notFoundResponse(res, "User not found");
    }

    const group = await Group.findById(user.groupId);
    if (!group) {
      return notFoundResponse(res, "User's group not found");
    }

    return successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        groupId: user.groupId,
        savings: user.savings,
        joinedAt: user.joinedAt,
      },
      group: {
        id: group._id,
        name: group.name,
        groupId: group.groupId,
        president: group.president,
        totalAmount: group.totalAmount,
        currentBalance: group.currentBalance,
        savingMonth: group.savingMonth,
        savingYear: group.savingYear,
      },
    });
  } catch (error) {
    return errorResponse(res, "Failed to get user profile", 500, error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { name, email, phoneNumber, currentPassword, newPassword } = req.body;

  try {
    // Find user with password
    const user = await User.findById(req.user?.id).select("+password");
    if (!user) {
      return notFoundResponse(res, "User not found");
    }

    // Update basic profile fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update password if provided
    if (currentPassword && newPassword) {
      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return errorResponse(res, "Current password is incorrect", 400);
      }
      user.password = newPassword;
    }

    // Save updated user
    await user.save();

    return successResponse(
      res,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      "Profile updated successfully"
    );
  } catch (error) {
    return errorResponse(res, "Failed to update profile", 500, error);
  }
};
