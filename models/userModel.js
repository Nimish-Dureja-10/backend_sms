import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true    
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student', 'parent'], 
        default: 'student'
    },
})




export const User = mongoose.model('user' , userSchema);


