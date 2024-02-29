import express from 'express';
import { addCourse, getAllCourses } from '../controllers/courseController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddlleware.js';

const router = express.Router();

router.post("/addCourse", requireSignIn,isAdmin,addCourse);
router.get("/getAllCourses",requireSignIn,isAdmin,getAllCourses);

export default router;