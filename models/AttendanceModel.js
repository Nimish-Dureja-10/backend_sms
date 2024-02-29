import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now
    },
    student: { 
        type : Object
    },
    attendanceStatus: { 
        type: String,  
    }
});

const attendanceSchema = new mongoose.Schema({
    courseName : {
        type : String
    },
    courseCode : {
        type : String
    },
    sem : {
        type : Number
    },
    batch : {
        type : Number
    },
    list : {
        type : [attendanceRecordSchema]
    }
});

export const Attendance = mongoose.Model("Attendace",attendanceSchema)