import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ENV } from "../config";

interface authRequest extends Request {
    user?: any;
}

export const auth = async (req:authRequest, res:Response, next:NextFunction) => {
   const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token || req.body.token; 
   if (!token) {
     return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authentication token is missing",
     })
  }
  try{
    const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken; 
    next(); 
  }catch(error:any){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred during token verification",
    });
  }
}