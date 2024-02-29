import express from "express";
import {
  addTeacherDetails,
  getStudentAttendanceList,
  getTeacherDetails,
  submitAttendance,
  submitAttendanceList,
} from "../controllers/teacherController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addTeacherDetails", requireSignIn, addTeacherDetails);
router.get("/getTeacherDetails", requireSignIn, getTeacherDetails);
router.get("/getAttendanceList",requireSignIn,getStudentAttendanceList);
// router.get("/markAttendace",requireSignIn,submitAttendanceList);
router.post("/markAttendace",requireSignIn,submitAttendance);

export default router;
