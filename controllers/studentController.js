import { Course } from "../models/courseModel.js";
import { Student } from "../models/studentModel.js";
import { User } from "../models/userModel.js";

export const addStudentDetails = async (req,res) => {
    try {
        const id = req.user._id;
        const {email} = await User.findById(id);
        const {enrollmentNo,contactNo,fatherName,fatherContactNo,
            motherName,motherContactNo,bloodGroup,programme,branch} = req.body;
        const studentDetails = await Student.create({
            id,email,enrollmentNo,contactNo,fatherName,fatherContactNo,
            motherName,motherContactNo,bloodGroup,programme,branch
        });
        await studentDetails.save();
        res.status(201).json({
            success:true,
            message: "Student details added successfully"
        });
    }catch(err) {
        console.log(err);
        res.status(401).json({
            success:false,
            message : "Failed to add user detials!",
            error : err
        })
    }
};

export const getStudentsDetails = async (req,res) => {
    try{
        const id = req.user._id;
        const student = await Student.findOne({id});
        if(!student) {
            res.status(400).json({
                success:false,
                message: "No student details found!",
            })
        }
        res.status(200).json({
            success:true,
            message:"Students details",
            student
        })
    }catch(err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Failed to fetch student details",
            error:err
        });
    }
};

export const courseRegistration = async (req,res) => {
    try{
        const id = req.user._id;
        const {sem,programme,branch} = await Student.findOne({id});
        const courseForRegistration = await Course.find({sem,courseType:programme,branch});
        res.status(200).json({
            success:true,
            message:"Your courses for registration",
            courseForRegistration
        })
    }catch(err) {
        console.log(err);
        res.status(401).json({
            success:false,
            message : "Failed to register courses",
            error:err
        });
    }
};

export const selectCoursesForRegistration = async (req,res) => {
    try{
        const id = req.user._id;
        const coursesAdded = req.body;
        const student = await Student.findOneAndUpdate({id},{$set : {courses:coursesAdded}},{new:true});
        res.status(201).json({
            success:true,
            message: "Course registeration successfully",
            student
        })
    }catch(err) {
        console.log(err);
        res.status(401).json({
            success:false,
            message : "Course registration failed",
            error:err
        });
    }
};