import { 
  readCollection, 
  readDocument,
  createDocumentWithId, 
  deleteDocument,
  updateDocument,
  getListTeachersByDepartment,
  createCollectionAtPath,
} from "../scripts/firestore.js";
export const getAllTeacher = async (req,res) => {
  try {
    const ListTeachers = await readCollection('Teachers');

    res.json({ success: true, ListTeachers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllTeacher" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await updateDocument(`Teachers`, req.params.id, req.body);
    if (updatedTeacher) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ updateTeacher" });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { id, ...dataWithoutId } = req.body;
    const createTc = await createDocumentWithId(`Teachers`, id, dataWithoutId);
    await createCollectionAtPath(`Teachers/${id}`, "MONHOC")
    await createDocumentWithId(`Teachers/${id}/MONHOC`, "221", {MONHOC:[]})
    res.json({message: "Create teacher successfull"});
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createTeacher" });
  }
};

export const deleteTeacher = async (req, res) => {
  console.log(req.params.id);
  try { 
    const deleteTeacher = await deleteDocument('Teachers', req.params.id);
    if (deleteTeacher) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ delete teacher" });
  }
};


export const getTeacherDetail = async (req, res) => {
  try {
    const { data, error } = await readDocument('Teachers', req.params.id);
    if (error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ TeacherDetail : data });
    } else {
      res.status(404).json({ success: false, message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getAdminDetail" });
  }
};

export const getCourse = async(req, res)=>{
  try{
    const getCourseResult = await readCollection(`Teachers/${req.params.id}/MONHOC`)
    if(getCourseResult.error){
      res.status(500).json({ success: false, message: "Can't read collection MONHOC"})
    }else{
      console.log(getCourseResult)
      res.json({listCourse: getCourseResult})
    }
  } catch{
    res.status(500).json({ success: false, message: "Server error ~ getCourse" });
  }
}

export const updateScore = async(req, res)=>{
  try{
    const data = await readDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`,req.params.lop)
    if(!data.error){
      data.data.SINHVIEN[req.params.mssv] = req.body;
      const udScore = await updateDocument(`Courses/${req.params.mamonhoc}/DANHSACHLOP`,req.params.lop, data.data)
      if(udScore.error){
        res.status(500).json({ success: false, message: "Can't update document score"})
      }else{
        res.json({ success: true, message: "update file successfully"})
      }
    }else{
      res.status(500).json({ success: false, message: "Can't read document class"})
    }
  } catch{
    res.status(500).json({ success: false, message: "Server error ~ getCourse" });
  }
}
export const getAllTeacherD = async (req, res) => {
  try {
    const khoa = req.params.khoa;
    const teacherList = await getListTeachersByDepartment(khoa);
    res.status(200).json(teacherList);
  } catch (error) {
    console.error("Error getting teachers by department:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const readMonhocTeacher = await readCollection(`Teachers/${req.params.id}/MONHOC`);

    let maxId = 0;
    let maxIndex = -1;
    readMonhocTeacher.forEach((doc, index) => {
      const id = parseInt(doc.id);
      if (id > maxId) {
        maxId = id;
        maxIndex = index;
      }
    });
    if (maxIndex === -1 || !readMonhocTeacher[maxIndex].MONHOC) {
      throw new Error("No valid document found to update");
    }

    readMonhocTeacher[maxIndex].MONHOC.push(req.body);

    const { id, ...monHocWithoutId } = readMonhocTeacher[maxIndex];
    const updateMonhocTeacher = await updateDocument(`Teachers/${req.params.id}/MONHOC`, id, monHocWithoutId);

    res.status(200).json({ success: true, message: "Course created successfully" });
  } catch (error) {

    console.error("Error creating course:", error);
    res.status(500).json({ success: false, message: "Failed to create course", error: error.message });
  }
}
