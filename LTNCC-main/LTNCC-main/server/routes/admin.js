import express from "express";

import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  getAdminDetail,
  updateAdmin,
  getCourse,
  deleteStC,
  createCourse,
  getCoursebyID,
  updateTeacherCourse,
  updateStudentCourse,
  getNameCourse,
} from "../controllers/admin.controller.js";


const router = express.Router();


router.patch("/admin/update/:id", updateAdmin);

router.post("/admin/create", createAdmin);

router.delete("/admin/delete/:id", deleteAdmin);

//get course
router.get("/admin/allcourse/:id", getCourse)

router.delete("/admin/delete_student_course/:mamonhoc/:lop/:mssv", deleteStC)
router.post("/admin/create-Course/:id", createCourse);
router.get("/admin/:id", getAdminDetail);
router.get("/admin/getcourse/:mamonhoc", getCoursebyID)
router.patch("/admin/update-teacherCourse/:mamonhoc/:lop", updateTeacherCourse)
router.patch("/admin/update-courseStudent/:mamonhoc/:lop", updateStudentCourse)
router.get("/course/name/:courseid", getNameCourse);
router.get("/admin", getAllAdmin);

export default router;
