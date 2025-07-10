import { Request, Response } from 'express';

export const login=async(req:Request,res:Response)=>{
   try{

   }catch(error:any){
         console.error("🔴 Login error:", error.message);
         res.status(500).json({success:false, message: "Internal server error" });
   }
}

export const signup=async(req:Request,res:Response)=>{
    try{
    
    }catch(error:any){
            console.error("🔴 Signup error:", error.message);
            res.status(500).json({success:false, message: "Internal server error" });
    }
}