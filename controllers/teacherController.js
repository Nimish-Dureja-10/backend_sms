import { Student } from "../models/studentModel.js";
import { Teacher } from "../models/teacherModel.js";
import { User } from "../models/userModel.js";

export const addTeacherDetails = async (req,res) => {
    try{
        const id = req.user._id
        const {email} = await User.findById(id);
        const {contactNo,fMemberName,fMemberContactNo} = req.body;
        const teacherDetails = await Teacher.create({
            id,
            contactNo,
            email,
            fMemberName,
            fMemberContactNo,
        });
        await teacherDetails.save();
        res.status(201).json({
            success:true,
            message:"Your details added successfully",
        });
    }catch(err) {
        console.log(err);
        res.status(401).json({
            success:false,
            message:"Failed to add teacher details",
            error : err
        });
    }
};

export const getTeacherDetails = async (req,res) => {
    try{
        const id = req.user._id;
        const teacher = await Teacher.findOne({id});
        if(!teacher) {
            res.status(400).json({
                success:false,
                message: "No teacher details found!",
            })
        }
        res.status(200).json({
            success:true,
            message:"Teacher details",
            teacher
        });
    }catch(err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Failed to fetch student details",
            error:err
        });
    }
};

export const getStudentAttendanceList = async (req,res) => {
    try{
        const studentList = await Student.find({batch : {$gte : 5 , $lte: 7}});
        res.status(200).json({
            success:true,
            message : "Student list for attendance",
            studentList
        });
    }catch(error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message : "Failed to get students list",
            error
        });
    } 
};

// export const submitAttendanceList = async(req,res) => {
//     try{
//         const 
//         res.status(201).json({
//             success:true,
//             message : "Attendace marked for current session",

//         })
//     }catch(error) {
//         console.log(error);
//         res.json(401).json({
//             success:false,
//             message : "Failed to submit attendance list",
//             error
//         });
//     }
// };


export const submitAttendance = async (req,res) => {
    try {
        const { courseId, studentId, date, status } = req.body;
        let attendance = await Attendance.findOne({ courseId, studentId });
        
        if (!attendance) {
          // If attendance record doesn't exist, create a new one
          attendance = new Attendance({
            courseId,
            studentId,
            attendanceRecords: [{ date, status }]
          });
        } else {
          // If attendance record already exists, update existing one or add new one
          const existingRecordIndex = attendance.attendanceRecords.findIndex(record => record.date === date);
          if (existingRecordIndex !== -1) {
            attendance.attendanceRecords[existingRecordIndex].status = status;
          } else {
            attendance.attendanceRecords.push({ date, status });
          }
        }
    
        await attendance.save();
        res.status(201).json(attendance);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

// app.post('/attendance', async (req, res) => {
//     try {
//       const { courseId, studentId, date, status } = req.body;
//       let attendance = await Attendance.findOne({ courseId, studentId });
      
//       if (!attendance) {
//         // If attendance record doesn't exist, create a new one
//         attendance = new Attendance({
//           courseId,
//           studentId,
//           attendanceRecords: [{ date, status }]
//         });
//       } else {
//         // If attendance record already exists, update existing one or add new one
//         const existingRecordIndex = attendance.attendanceRecords.findIndex(record => record.date === date);
//         if (existingRecordIndex !== -1) {
//           attendance.attendanceRecords[existingRecordIndex].status = status;
//         } else {
//           attendance.attendanceRecords.push({ date, status });
//         }
//       }
  
//       await attendance.save();
//       res.status(201).json(attendance);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });