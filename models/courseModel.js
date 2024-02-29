import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        required : true
    },
    courseCode : {
        type : String,
        unique : true,
        required : true
    },
    courseCredits : {
        type : Number,
        required : true
    },
    //  course belong to which programme like - btech,bca.
    courseType : {
        type : String,
        required : true
    },
    sem : {
        type : Number,
        required : true
    },
    branch : {
        type : String,
        required : true
    }
});

export const Course = mongoose.model('course' , courseSchema);