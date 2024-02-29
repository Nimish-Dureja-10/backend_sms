import { User } from "../models/userModel.js";

export const isAdmin = async (req,res,next) => {
    try{
        const userDetail = await User.findById(req.user._id);
        if(userDetail.role !== 'admin') {
            res.status(400).json({
                success:false,
                message : "Only admin is allowed to perform this action",
            });
        }
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