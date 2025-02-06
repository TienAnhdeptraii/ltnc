import { 
  loginUser,
  logOut,
 } from "../scripts/auth.js";
import {
  readDocument,
  readCollection,
  createDocumentWithId,
  deleteDocument,
} from "../scripts/firestore.js"
import { 
  authChangePassword, 
  deleteUserByUID,
  createUser,
} from "../scripts/auth.js";

// @Router: /login
// @desc: user login
// @access: public
export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const loginResult = await loginUser(email, password);

    if (!loginResult.error) {
      const userDoc = await readDocument('Users',loginResult.data);
      if(!userDoc.error){
        const userRole = userDoc.data.role;
        if(userRole === "student"){
          const studentDoc = await readDocument('Students', loginResult.data);
          res.json({
            success: true,
            message: "Student logged in successfully",
            userId: loginResult.data,
            role : userRole,
            lop : studentDoc.data.lop,
            email: studentDoc.data.email,
            mssv: studentDoc.data.mssv,
            khoa: studentDoc.data.department,
          });
        }else if(userRole === "admin") {
          const adminDoc = await readDocument(`Admins`, loginResult.data);
          res.json({
              success: true,
              massage: "Admin logged in successfully",
              userId: loginResult.data,
              lop: adminDoc.data.lop,
              role : userRole,
              khoa: adminDoc.data.department,
          });
        }else{
          const teacherDoc = await readDocument('Teachers', loginResult.data)
          res.json({
            success: true,
            message: "Teacher logged in successfully",
            userId: loginResult.data,
            lop: teacherDoc.data.management,
            role : userRole,
            khoa: teacherDoc.data.department,
          });
        }
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Login failed",
        error: loginResult.error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @Router: /logout
// @desc: user logout
// @access: public
export const logout = async (req, res)=>{
  try{
    const logoutResult = await logOut();
    if(logoutResult.error){
      res.status(400).json({
        success: false,
        message: "Logout failed",
        error: logoutResult.error,
      });
    }
  }catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// @Router: POST /create-student-account
// @desc: Admin create new account for student
// @access: Only admin can do
export const createStudentAccount = async (req, res) => {
  req.body.role = 'student';
  const { username, password, role} = req.body;
  try {
    const create = await createUser(username, password);
    createDocumentWithId('Users',create.data,req.body)
      if(!create.error){
      res.json({
        success: true,
        message: "Student created successfully",
        id: create.data,
      });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to create student",
          id: null,
          error: create.error.message
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error", id: null,});
  }
};

export const deleteStudentAccount = async (req, res) => {
  const data = await readDocument('Users', req.params.ID)
  try{
    const deleteStudent = await deleteUserByUID(data.data.username, data.data.password)
    if(deleteStudent.error){
      res.json({message: deleteStudent.error})
    }else{
      deleteDocument('Users',req.params.ID);
      res.json({message:"Delete student account successfully"})
    }
  }catch(error){
    res.json({message: "Error:", error})
  }
};


export const changePassword = async (req, res) => {
  try {
    const result = await authChangePassword(req.body.email, req.body.old_pass, req.body.new_pass);
    if (result.error) {
      res.json({massage: result.data});
    } else {
      res.json({massage: "Password changed successfully"});
    }
  } catch (error) {
    res.json({massage:"Error:", error});
  }
};

export  const createAdminAccount = async (req, res)=>{
  req.body.role = 'admin';
  const { username, password, role } = req.body;
  try {
    const create = await createUser(username, password);
    createDocumentWithId('Users',create.data,req.body)
      if(!create.error){
      res.json({
        success: true,
        message: "Admin created successfully",
        id: create.data,
      });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to create Admin",
          id: null,
          error: create.error.message
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error", id: null,});
  }
}

export  const deleteAdminAccount = async (req, res)=>{
  const data = await readDocument('Users', req.params.ID)
  try{
    const deleteAdmin = await deleteUserByUID(data.data.username, data.data.password)
    if(deleteAdmin.error){
      res.json({message: deleteAdmin.error})
    }else{
      deleteDocument('Users',req.params.ID);
      res.json({message:"Delete admin account successfully"})
    }
  }catch(error){
    res.json({message: "Error:", error})
  }
}

export  const deleteTeacherAccount = async (req, res)=>{
  const data = await readDocument('Users', req.params.ID)
  try{
    const deleteTeacher = await deleteUserByUID(data.data.username, data.data.password)
    if(deleteTeacher.error){
      res.json({message: deleteTeacher.error})
    }else{
      deleteDocument('Users',req.params.ID);
      res.json({message:"Delete teacher account successfully"})
    }
  }catch(error){
    res.json({message: "Error:", error})
  }
}

export  const createTeacherAccount = async (req, res)=>{
  req.body.role = 'teacher';
  const { username, password, role} = req.body;
  
  try {
    const create = await createUser(username, password);
    createDocumentWithId('Users',create.data,req.body)
      if(!create.error){
      res.json({
        success: true,
        message: "Teacher created successfully",
        id: create.data,
      });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to create teacher",
          id: null,
          error: create.error.message
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error", id: null,});
  }
}