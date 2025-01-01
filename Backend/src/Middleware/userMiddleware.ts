import { NextFunction, Router, Request,Response } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware=(req:Request,res:Response,next:NextFunction)=>{

    const token=req.headers.authorization;
    try{
        const decode=jwt.verify(token!,process.env.JWT_SECRET);
        // console.log(decode);
        // @ts-ignore
        req.userId=decode.id;
        // console.log(decode);
        // @ts-ignore
        // console.log(req.userId)
        next();
    }
    catch(e){
        res.sendStatus(403)
    }
}