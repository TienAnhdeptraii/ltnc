import e from "express";
import { 
  readCollection,
  readDocument,
  deleteDocument,
  createDocumentWithId,
  createCollectionAtPath,
  updateDocument,
  getDocumentKeyByMSSV,
} from "../scripts/firestore.js";
import { updateDoc } from "firebase/firestore";

export const getAllAdmin = async (req,res) => {
  try {
    const ListAdmins = await readCollection('Admins');

    res.json({ success: true, ListAdmins });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllAdmin" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { id, ...dataWithoutId } = req.body;
    console.log(id);
    const createAd = await createDocumentWithId(`Admins`, id, dataWithoutId);
    await createCollectionAtPath(`Admins/${id}`, "MONHOC")
    await createDocumentWithId(`Admins/${id}/MONHOC`, "221", {MONHOC:[]})
    res.json({message: "Create admin successfully!"});
    
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createAdmin" });
  }
};

export const updateAdmin = async (req, res) => {
    try {
      const updatedAdmin = await updateDocument(`Admins`,req.params.id,req.body);
      if (!updatedAdmin.error) {
        res.json({ message: "Update successfully" });
      } else {
        res.json({ message: "Update fail" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error ~ updateAdmin" });
    }
  };

export const deleteAdmin = async (req, res) => {
  try { 
    const deletedAdmin = await deleteDocument('Admins', req.params.id);
    if (deletedAdmin) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteAdmin" });
  }
};

export const getAdminDetail = async (req, res) => {
  try {
    const { data, error } = await readDocument('Admins', req.params.id);
    if (error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ AdminDetail : data });
    } else {
      res.status(404).json({ success: false, message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getAdminDetail" });
  }
};

export const getCourse = async(req, res)=>{
  try{
    const getCourseResult = await readCollection(`Admins/${req.params.id}/MONHOC`)
    if(getCourseResult.error){
      res.status(500).json({ success: false, message: "Can't read collection MONHOC"})
    }else{
      res.json({listCourse: getCourseResult})
    }
  } catch{
    res.status(500).json({ success: false, message: "Server error ~ getCourse" });
  }
}

export const deleteStC = async(req, res) => {
  try {
    const docid = await getDocumentKeyByMSSV(req.params.mssv);
    const readMonhoc = await readCollection(`Students/${docid}/MONHOC`);
    let index = -1;
    let lop;
    for (let i = 0; i < readMonhoc.length; i++) {
      const monHocIndex = readMonhoc[i].MONHOC.findIndex(monHoc => monHoc.mamonhoc === req.params.mamonhoc);
      if (monHocIndex !== -1) {
        index = i;
        lop = readMonhoc[i].MONHOC[monHocIndex].lop;
        readMonhoc[i].MONHOC.splice(monHocIndex, 1);
        break;
      }
    }
    const readClassSV = await readDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`, lop);
    const { [req.params.mssv]: _, ...SINHVIENWithoutStudent } = readClassSV.data.SINHVIEN
    readClassSV.data.SINHVIEN = SINHVIENWithoutStudent;
    if (index !== -1) {
      const { id, ...monHocWithoutId } = readMonhoc[index];
      console.log(id);
      const deleteMonhoc = await updateDocument(`Students/${docid}/MONHOC`, id, monHocWithoutId);
      const deleteSinhvien = await updateDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`, lop, readClassSV.data);
      res.status(200).json({ message: 'MONHOC deleted successfully' });
    } else {
      res.status(404).json({ message: 'MONHOC not found' });
    }
  } catch (error) {

    console.error('Error deleting MONHOC:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createCourse = async(req, res) => {
  try{
    const readMonhocAdmin = await readCollection(`Admins/${req.params.id}/MONHOC`);
    let maxId = 0;
    let maxIndex = -1;
    readMonhocAdmin.forEach((doc, index) => {
        const id = parseInt(doc.id);
        if (id > maxId) {
          maxId = id;
          maxIndex = index;
        }
    });

    if (maxIndex === -1 || !readMonhocAdmin[maxIndex].MONHOC) {
      throw new Error("No valid document found to update");
    }

    const monHocToAdd = {
      mamonhoc: req.body.mamonhoc,
      lop: req.body.lop
    };

    readMonhocAdmin[maxIndex].MONHOC.push(monHocToAdd);

    const { id, ...monHocWithoutId } = readMonhocAdmin[maxIndex];


    const updateMonhocAD = await updateDocument(`Admins/${req.params.id}/MONHOC`, id, monHocWithoutId);

    const createMonhocCourse = await createDocumentWithId(`Courses`, req.body.mamonhoc, {NAME: req.body.tenmonhoc});
    const creteDANHSACHLOP = await createCollectionAtPath(`Courses/${req.body.mamonhoc}`, "DANHSACHLOP")
    
    const lops = req.body.lop.split(",");

    lops.forEach(async (lop) => {
      const createLop = await createDocumentWithId(`Courses/${req.body.mamonhoc}/DANHSACHLOP`, lop, {IDGV:"", SINHVIEN:{}})
    })
    res.status(200).json({ message: "Course created successfully" });
  }catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getCoursebyID = async (req, res) => {
  try {
    const getCourseResult = await readCollection(`Courses/${req.params.mamonhoc}/DANHSACHLOP`)
    if (getCourseResult) {
      res.status(200).json({
        success: true,
        data: getCourseResult
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export const updateTeacherCourse = async (req, res) => {
  try {
    const readClassResult = await readDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`, req.params.lop);

    const readDocumentgv = await readDocument(`Teachers`, req.body.IDGV);

    readClassResult.data.IDGV = readDocumentgv.data.ID;

    const updateTeacherCourseResult = await updateDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`,req.params.lop, readClassResult.data);

    res.status(200).json({ success: true, message: "Teacher course updated successfully" });
  } catch (error) {
    console.error("Error updating teacher course:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
export const updateStudentCourse = async (req, res)=>{
  try{
    const readClassResult = await readDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`, req.params.lop);
    console.log(readClassResult.data);

    const sinhVienData = req.body;
    const currentSinhVienData = readClassResult.data.SINHVIEN;

    const updatedSinhVienData = { ...currentSinhVienData, ...sinhVienData };

    const updatedObject = {
        SINHVIEN: updatedSinhVienData,
        IDGV: readClassResult.data.IDGV
    };
    const updateSinhvienResult = await updateDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`, req.params.lop, updatedObject)
  }catch{
    console.error("Error updating student course:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
export const getNameCourse = async (req, res) => {
  try{
    console.log(req.params.courseid);
    const readCourseResult = await readDocument(`Courses`, req.params.courseid);
    res.json({courseName: readCourseResult.data});
  }catch{

  }

}