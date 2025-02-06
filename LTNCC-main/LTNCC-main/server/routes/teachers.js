import express from "express";

import {
  createTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacherDetail,
  updateTeacher,
  getCourse,
  updateScore,
  getAllTeacherD,
  createCourse,
} from "../controllers/teacher.controller.js";

const router = express.Router();


router.patch("/teacher/update/:id", updateTeacher);

router.post("/teacher/create", createTeacher);

router.delete("/teacher/delete/:id", deleteTeacher);

//get Course
router.get("/teacher/allcourse/:id", getCourse)
router.patch("/teacher/update_score/:mamonhoc/:lop/:mssv", updateScore)

//Get 1 teacher by id
router.get("/teacher/:id", getTeacherDetail);

// Get all teachers in a class
router.get("/teacher", getAllTeacher);

//Get all teachers in a department
router.get("/teacher/department/:khoa", getAllTeacherD);

//Create course in teacher
router.post("/teacher/create-courses/:id", createCourse)

export default router;
