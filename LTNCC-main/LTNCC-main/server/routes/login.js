import express from "express";
import {
  login,
  createStudentAccount,
  deleteStudentAccount,
  changePassword,
  createAdminAccount,
  deleteAdminAccount,
  deleteTeacherAccount,
  createTeacherAccount,
  logout,
} from "../controllers/login.controller.js";
const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);


router.delete("/delete-student-account/:msv", deleteStudentAccount);

router.post("/create-student-account", createStudentAccount);

router.post("/create-admin-account", createAdminAccount);

router.delete("/delete-admin-account/:ID", deleteAdminAccount);

router.delete("/delete-teacher-account/:ID", deleteTeacherAccount);

router.post("/create-teacher-account", createTeacherAccount);

router.patch("/change-password", changePassword);

// export default login;

export default router;
