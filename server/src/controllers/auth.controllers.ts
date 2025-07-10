import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { ENV } from "../config";
import { User } from "../models";
import { generateAuthToken } from "../utils";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          success: false,
          message: "Username and password are required",
        });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateAuthToken(user);

    res.status(StatusCodes.OK).cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }).json({
        success: true,
        message: "Login successfull",
        user: {
            id: user._id,
            username: user.username,
            created_at: user.created_at,
            updated_at: user.updated_at,
        },
    });

  } catch (error: any) {
    console.error("🔴 Login error:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          success: false,
          message: "Username and password are required",
        });
    }

    const userExist = await User.findOne({ username });

    if (userExist) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error: any) {
    console.error("🔴 Signup error:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};
