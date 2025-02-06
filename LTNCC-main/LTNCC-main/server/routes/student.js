import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getStudentDetail,
  updateStudent,
  transcriptStudent,
  getStudentM,
  getCourse,
  getClass,
  createCourseST,
} from "../controllers/student.controller.js";

const router = express.Router();

router.patch("/student/update/:id", updateStudent);

router.post("/student/create", createStudent);

router.delete("/student/delete/:mssv", deleteStudent);

//Get 1 student by id
router.get("/student/:id", getStudentDetail);
router.get("/student/transtranscript/:id", transcriptStudent)
router.get("/student/mssv/:id", getStudentM)
//Get course
router.get("/student/allcourse/:id", getCourse)
router.get("/student/class/:mmh/:lop", getClass)
router.post("/student/create-courses/:id", createCourseST)
// Get all students in a class
router.get("/student/all/:lop", getAllStudent);

export default router;
