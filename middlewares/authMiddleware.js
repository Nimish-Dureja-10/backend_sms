import JWT from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const requireSignIn = async (req,res,next) => {
    try {
        const decode = await JWT.verify(req.headers.authorization,"PNP");
        // req.user gives only _id
        req.user = decode;
        next();
    }catch(err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message : "Need to login!",
            error : err
        });
    }
};

export const checkStudent = async (req,res,next) => {
    try{
        const {role} = await User.findById(req.user._id);
        if(role !== "student") {
            res.status(400).json({
                success:false,
                message : "Only student can perform this action",
            });
        }
        next();
    }catch(err) {
        console.log(err);
    }
};

export const checkTeacher = async (req,res,next) => {
    try{
        const {role} = await User.findById(req.user._id);
        if(role !== "teacher") {
            res.status(400).json({
                success:false,
                message : "Only teacher can perform this action",
            });
        }
        next();
    }catch(err) {
        console.log(err);
    }
};