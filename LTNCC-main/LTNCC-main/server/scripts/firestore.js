// NPM packages
import { collection, query, where, doc } from "firebase/firestore";
import { addDoc, getDoc, getDocs, setDoc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Project files
import { fireStore } from "./firebase.js";

// TODO: This file will do the simple CRUD operation for fireStore

// TODO: Create
//
// In order to create a document in firestore, we first find the path of the document, and then use addDoc function to add a new document
export async function createDocument(path, data) {
  let payload = { message: null, error: null, loading: true };
  try {
    const documentPath = collection(fireStore, path);
    await addDoc(documentPath, data);
    payload = { message: "created successfully", error: null, loading: false };
  } catch (error) {
    payload = { message: "created failed", error: error, loading: false };
  }

  return payload;
}

// In order to create a document with id, first find its path, but this time find with path and ID so we need to use doc() function. Then use setDoc to set the document
export async function createDocumentWithId(path, id, data) {
  let payload = { message: null, error: null, loading: true };
  try {
    const documentPath = doc(fireStore, path, id);
    await setDoc(documentPath, data);
    payload = { message: "created successfully", error: null, loading: false };
  } catch (error) {
    payload = { message: "created failed", error: error, loading: false };
  }
  return payload;
}

// TODO: Read
// In order to read the document with specific id, first find the document path (as always) and then use getDoc to get the document
export async function readDocument(path, id) {
  const payload = { data: {}, error: null, loading: true };
  try {
    const documentPath = doc(fireStore, path, id);
    const document = await getDoc(documentPath);
    payload.data = document.data();

    payload.loading = false;
    console.log("firestore read document", payload.data);
  } catch (error) {
    payload.error = error;
    payload.loading = false;
  }
  return payload;
}

// TODO: ReadCollection
// In order to read all the documents in a collection, first find the collection path (as always) and then use getDocs to get the documents,
export async function readCollection(path) {
  console.log(path);
  const collectionPath = collection(fireStore, path);
  const snapshot = await getDocs(collectionPath);

  const documents = snapshot.docs.map((doc) => {
    return { id: doc.id, ... doc.data() };
  });
  return documents;
}

// TODO: Update
// use setDoc
export async function updateDocument(path, id, data) {
  let payload = { message: null, error: null, loading: true };
  try {
    const documentPath = doc(fireStore, path, id);
    await setDoc(documentPath, data);
    payload = { message: "updated successfully", error: null, loading: false };
  } catch (error) {
    payload = { message: "updated failed", error: error, loading: false };
  }
  return payload;
}

// TODO: Delete
// use deleteDoc
export async function deleteDocument(path, id) {
  let payload = { message: null, error: null, loading: true };
  try {
    const documentPath = doc(fireStore, path, id);
    await deleteDoc(documentPath);
    payload = { message: "deleted successfully", error: null, loading: false };
  } catch (error) {
    payload = { message: "deleted failed", error: error, loading: false };
  }
  return payload;
}
export async function updateDocumentNoti(path, id, {mssv,cmt}) {
  let payload = { message: null, error: null, loading: true };
  try {
    const documentPath = doc(fireStore, path, id);
    console.log(documentPath);
    await updateDoc(documentPath, {
      comment: arrayUnion({mssv: mssv, cmt: cmt})
    });
    payload = { message: "updated successfully", error: null, loading: false };
  } catch (error) {
    payload = { message: "updated failed", error: error, loading: false };
  }
  return payload;
}
//TODO: Getlist

export async function getListStudent(className){
  try {
    const studentsRef = collection(fireStore, 'Students');
    const q = query(studentsRef, where('lop', '==', className));
    const querySnapshot = await getDocs(q);
    const students = [];
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });
    return students;
  } catch (error) {
    console.log('Error getting students:', error);
    return [];
  }
}

export async function getListPost(className){
  try {
    const postsRef = collection(fireStore, 'Posts');
    const q = query(postsRef, where('lop', '==', className));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.log('Error getting posts:', error);
    return [];
  }
}

// TODO: deleteStudent
export async function deleteStudentByMSSV(mssv) {
  try {
    const studentsRef = collection(fireStore, 'Students');
    const q = query(studentsRef, where('mssv', '==', mssv));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    console.log('Student with MSSV', mssv, 'deleted successfully.');
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    return false;
  }
}

// TODO: get Student with mssv
export async function getStudentByMSSV(mssv) {
  try {
    const studentsRef = collection(fireStore, "Students");
    const q = query(studentsRef, where("mssv", "==", mssv));
    const querySnapshot = await getDocs(q);
    let studentData = null;
    querySnapshot.forEach((doc) => {
      studentData = doc.data();
    });
    return studentData;
  } catch (error) {
    console.error("Error fetching student information:", error);
    return null;
  }
}

// TODO: Create Collection at Path
export async function createCollectionAtPath(path, collectionName) {
  try {
    const collectionRef = collection(fireStore, path, collectionName);
    await addDoc(collectionRef, {}); // Add an empty document to initialize the collection
    console.log("Collection", collectionName, "created successfully at path", path);
    return true;
  } catch (error) {
    console.error("Error creating collection at path", path, ":", error);
    return false;
  }
}

//TO DO: get key document
export async function getDocumentKeyByMSSV(mssv) {
  try {
    const studentsRef = collection(fireStore, 'Students');
    const q = query(studentsRef, where('mssv', '==', mssv));
    const querySnapshot = await getDocs(q);
    let documentKey = null;
    querySnapshot.forEach(doc => {
      documentKey = doc.id;
    });
    return documentKey;
  } catch (error) {
    console.error('Error getting document key:', error);
    return null;
  }
}

//TO DO: get all teacher from department
export async function getListTeachersByDepartment(department) {
  try {
    const teachersRef = collection(fireStore, 'Teachers');
    const q = query(teachersRef, where('department', '==', department));
    const querySnapshot = await getDocs(q);
    const teachers = [];
    querySnapshot.forEach((doc) => {
      teachers.push({ id: doc.id, ...doc.data() });
    });
    return teachers;
  } catch (error) {
    console.log('Error getting teachers:', error);
    return [];
  }
}

export async function getStudentKeyByMSSV(mssv) {
  try {
    const studentsRef = collection(fireStore, "Students");
    const q = query(studentsRef, where("mssv", "==", mssv));
    const querySnapshot = await getDocs(q);
    let studentKey = null;
    querySnapshot.forEach((doc) => {
      studentKey = doc.id;
    });
    return studentKey;
  } catch (error) {
    console.error("Error fetching student key:", error);
    return null;
  }
}
