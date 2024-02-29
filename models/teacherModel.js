import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    id : { 
        type: String,
        required: true 
    },
    contactNo : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    fMemberName : {
        type :String,
    },
    fMemberContactNo : {
        type : Number,
    },
    courses : {
        type : [Object],
    }
});

export const Teacher = mongoose.model('teacher',teacherSchema);