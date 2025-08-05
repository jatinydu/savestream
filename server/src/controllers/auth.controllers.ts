import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { ENV } from "../config";
import { User } from "../models";
import { generateAuthToken } from "../utils";
import jwt from "jsonwebtoken";

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

    const payload = {
      id: user._id,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    const token = generateAuthToken(payload);

    res.status(StatusCodes.OK).cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, 
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

    if(username.length < 3 || username.length > 10) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          success: false,
          message: "Username must be between 3 and 20 characters long",
        });
    }

    if(password.length < 8 || password.length > 20) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Password must be between 8 and 20 characters long",
      })
    }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isPassStrong =  passwordRegex.test(password);

      if(!isPassStrong) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            success: false,
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          });
      }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

export const isUserAuthenticated = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message: 'Unauthorized user!' });
 
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    return res.status(StatusCodes.OK).json({success:true, message:"user authenticated succesfully!", data: decoded });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: 'Invalid or expired token' });
  }
} 