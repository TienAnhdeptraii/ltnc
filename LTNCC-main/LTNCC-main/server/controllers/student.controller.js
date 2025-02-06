import { 
  readDocument, 
  readCollection,
  getListStudent, 
  deleteStudentByMSSV, 
  getStudentByMSSV,
  createDocumentWithId,
  getStudentKeyByMSSV,
  updateDocument,
  createCollectionAtPath,
 } from "../scripts/firestore.js";

export const getAllStudent = async (req, res) => {
  try {
    const ListStudents = await getListStudent(req.params.lop);
    res.json({ success: true, ListStudents });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllStudent" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    console.log(req.body);
    const updatedStudent = await updateDocument(`Students`, req.params.id, req.body);
    if (updatedStudent) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ updateStudent" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { id, ...dataWithoutId } = req.body;
    const createSt = await createDocumentWithId(`Students`, id, dataWithoutId);
    await createCollectionAtPath(`Students/${id}`, "MONHOC")
    await createDocumentWithId(`Students/${id}/MONHOC`, "221", {MONHOC:[]})
    res.json({message: "Create student successfully!"});
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createStudent" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await deleteStudentByMSSV(req.params.mssv);
    if (deletedStudent) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteStudent" });
  }
};


export const getStudentDetail = async (req, res) => {
  try {
    const { data, error } = await readDocument('Students', req.params.id);
    if (error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ studentData: data });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
  }
};

export const transcriptStudent = async (req, res) => {
  try {
    const result = await readCollection(`Students/${req.params.id}/BANGDIEM`);
    if (result.error) {
      return res.status(500).json({ success: false, message: "Server error ~ transcriptStudent" });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Transcripts not found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error ~ transcriptStudent" });
  }
};

export const getStudentM = async(req, res) => {
  try {
    const data = await getStudentByMSSV(req.params.id);
    console.log(data);
    if (data.error) {
      res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
    } else if (data) {
      res.json({ studentData: data });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error ~ getStudentDetail" });
  }
}

export const getCourse = async(req, res)=>{
  try{
    const getCourseResult = await readCollection(`Students/${req.params.id}/MONHOC`)
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
export const getClass = async (req, res) => {
  console.log(req.params.mmh);
  console.log(req.params.lop);
  try{
    const {data, error} = await readDocument(`Courses/${req.params.mmh}/DANHSACHLOP`,req.params.lop)
    if(error){
      res.status(500).json({ success: false, message: "Can't read collection class"})
    }else{
      res.json({class: data});
    }
  }catch{

  }
}

export const createCourseST = async (req,res) => {
  try{
    console.log("okok")
    const getresult = await getStudentKeyByMSSV(req.params.id);
    const readMonhocStudent = await readCollection(`Students/${getresult}/MONHOC`);
    let maxId = 0;
    let maxIndex = -1;
    readMonhocStudent.forEach((doc, index) => {
      const id = parseInt(doc.id);
      if (id > maxId) {
        maxId = id;
        maxIndex = index;
      }
    });
    if (maxIndex === -1 || !readMonhocStudent[maxIndex].MONHOC) {
      throw new Error("No valid document found to update");
    }

    readMonhocStudent[maxIndex].MONHOC.push(req.body);

    const { id, ...monHocWithoutId } = readMonhocStudent[maxIndex];
    const updateMonhocStudent = await updateDocument(`Students/${getresult}/MONHOC`, id, monHocWithoutId);
    res.status(200).json({ success: true, message: "Course created successfully" });
  } catch (error) {

    console.error("Error creating course:", error);
    res.status(500).json({ success: false, message: "Failed to create course", error: error.message });
  }
}