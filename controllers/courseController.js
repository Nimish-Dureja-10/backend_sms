import { Course } from '../models/courseModel.js';

export const addCourse = async (req, res) => {
    try{
        const { courseName, courseCode, courseType, courseCredits, sem, branch } = req.body;
        if (!courseName || !courseCode || !courseType || !courseCredits || !branch) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const existingCourse = await Course.findOne({courseCode});
        if(existingCourse){
            return res.status(400).json({
                success: false,
                message: "Course already exists",
            });
        }
        const newCourse = await Course.create({
            courseName, courseCode, courseType, courseCredits, sem,branch
        });
        await newCourse.save();
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            newCourse,
        });
    }catch(err){
        console.log(err);
        res.status(401).json({
            success:false,
            message : "Failed to add course",
            error:err
        });
    }
};

export const getAllCourses = async (req,res) => {
    try{
        const courses = await Course.find();
        res.status(200).json({
            success:true,
            message: "All Courses",
            courses
        })
    }catch(err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Faield to get all courses",
            error:err,
        });
    }
};