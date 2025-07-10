import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const login=async(req:Request,res:Response)=>{
   try{

   }catch(error:any){
         console.error("🔴 Login error:", error.message);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: "Internal server error" });
   }
}

export const signup=async(req:Request,res:Response)=>{
    try{
    
    }catch(error:any){
            console.error("🔴 Signup error:", error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: "Internal server error" });
    }
}