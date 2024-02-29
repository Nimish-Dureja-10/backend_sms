// models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true 
    },
    enrollmentNo : {
        type : String,
        required :true,
        unique:true
    },
    contactNo : {
        type : Number,
        required : true,
    },
    fatherName : {
        type :String,
    },
    fatherContactNo : {
        type : Number,
    },
    motherName : {
        type : String
    },
    motherContactNo : {
        type : Number,
    },
    bloodGroup : {
        type : String
    },
    programme : {
        type : String,
        required : true
    },
    branch : {
        type : String
    },
    batch :{
        type : Number,
        required : true
    },
    group :{
        type : Number,
        required : true
    },
    sem : {
        type : Number,
        default : 1
    },
    hostelNo : {
        type : String
    },
    courses : {
        type : Object,
    }
});

export const Student = mongoose.model('Student', studentSchema);