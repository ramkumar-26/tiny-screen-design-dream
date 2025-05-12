import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Group from "../models/group.model";
import User, { UserRole } from "../models/user.model";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
} from "../utils/response.util";

// @desc    Get group details
// @route   GET /api/groups
// @access  Private
export const getGroupDetails = async (req: Request, res: Response) => {
  try {
    const groupId = req.user?.groupId;
    const group = await Group.findById(groupId);

    if (!group) {
      return notFoundResponse(res, "Group not found");
    }

    // Count members by role
    const memberCounts = await User.aggregate([
      { $match: { groupId: group._id, isActive: true } },
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    // Format member counts
    const memberCountsByRole: Record<string, number> = {};
    memberCounts.forEach((item) => {
      memberCountsByRole[item._id] = item.count;
    });

    // Count total members
    const totalMembers = await User.countDocuments({
      groupId: group._id,
      isActive: true,
    });

    return successResponse(res, {
      id: group._id,
      name: group.name,
      groupId: group.groupId,
      president: group.president,
      totalAmount: group.totalAmount,
      currentBalance: group.currentBalance,
      totalLoans: group.totalLoans,
      totalSavings: group.totalSavings,
      totalExpenses: group.totalExpenses,
      totalIncome: group.totalIncome,
      isActive: group.isActive,
      savingMonth: group.savingMonth,
      savingYear: group.savingYear,
      members: {
        total: totalMembers,
        leaders: memberCountsByRole[UserRole.LEADER] || 0,
        secretaries: memberCountsByRole[UserRole.SECRETARY] || 0,
        members: memberCountsByRole[UserRole.MEMBER] || 0,
      },
      createdAt: group.createdAt,
    });
  } catch (error) {
    return errorResponse(res, "Failed to get group details", 500, error);
  }
};

// @desc    Update group details
// @route   PUT /api/groups
// @access  Private (Leader only)
export const updateGroup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { name, president, savingMonth, savingYear } = req.body;

  try {
    const groupId = req.user?.groupId;
    const group = await Group.findById(groupId);

    if (!group) {
      return notFoundResponse(res, "Group not found");
    }

    // Update fields if provided
    if (name) group.name = name;
    if (president) group.president = president;
    if (savingMonth) group.savingMonth = savingMonth;
    if (savingYear) group.savingYear = savingYear;

    // Save updated group
    await group.save();

    return successResponse(
      res,
      {
        id: group._id,
        name: group.name,
        groupId: group.groupId,
        president: group.president,
        savingMonth: group.savingMonth,
        savingYear: group.savingYear,
      },
      "Group updated successfully"
    );
  } catch (error) {
    return errorResponse(res, "Failed to update group", 500, error);
  }
};

// @desc    Get group members
// @route   GET /api/groups/members
// @access  Private
export const getGroupMembers = async (req: Request, res: Response) => {
  try {
    const groupId = req.user?.groupId;

    // Find all active members in the group
    const members = await User.find({
      groupId,
      isActive: true,
    })
      .select("-password")
      .sort("name");

    if (!members || members.length === 0) {
      return successResponse(res, [], "No members found");
    }

    const formattedMembers = members.map((member) => ({
      id: member._id,
      name: member.name,
      email: member.email,
      phoneNumber: member.phoneNumber,
      role: member.role,
      savings: member.savings,
      joinedAt: member.joinedAt,
    }));

    return successResponse(res, formattedMembers);
  } catch (error) {
    return errorResponse(res, "Failed to get group members", 500, error);
  }
};

// @desc    Get group rules and notices
// @route   GET /api/groups/rules-notices
// @access  Private
export const getRulesAndNotices = async (req: Request, res: Response) => {
  try {
    const groupId = req.user?.groupId;
    const group = await Group.findById(groupId).select("rules notices");

    if (!group) {
      return notFoundResponse(res, "Group not found");
    }

    return successResponse(res, {
      rules: group.rules || [],
      notices: group.notices || [],
    });
  } catch (error) {
    return errorResponse(res, "Failed to get rules and notices", 500, error);
  }
};

// @desc    Update group rules and notices
// @route   PUT /api/groups/rules-notices
// @access  Private (Leader only)
export const updateRulesAndNotices = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { rules, notices } = req.body;

  try {
    const groupId = req.user?.groupId;
    const group = await Group.findById(groupId);

    if (!group) {
      return notFoundResponse(res, "Group not found");
    }

    // Update rules and notices if provided
    if (rules !== undefined) group.rules = rules;
    if (notices !== undefined) group.notices = notices;

    // Save updated group
    await group.save();

    return successResponse(
      res,
      {
        rules: group.rules,
        notices: group.notices,
      },
      "Rules and notices updated successfully"
    );
  } catch (error) {
    return errorResponse(res, "Failed to update rules and notices", 500, error);
  }
};
