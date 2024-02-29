import express from 'express';
import { addStudentDetails, courseRegistration, getStudentsDetails, selectCoursesForRegistration } from '../controllers/studentController.js';
import { checkStudent, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/studentDetails",requireSignIn,addStudentDetails);
router.get("/studentDetails",requireSignIn,getStudentsDetails);
router.get("/courseRegistration",requireSignIn,checkStudent,courseRegistration);
router.post("/courseRegistration",requireSignIn,checkStudent,selectCoursesForRegistration);

export default router;