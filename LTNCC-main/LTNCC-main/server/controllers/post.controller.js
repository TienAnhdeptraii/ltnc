import { 
  createDocumentWithId, 
  deleteDocument,
  updateDocument,
  getListPost,
  updateDocumentNoti,
} from "../scripts/firestore.js";

export const getPost = async (req, res) => {
  try {
    const ListPosts = await getListPost(req.params.item);

    res.json({ success: true, ListPosts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error ~ getAllPost" });
  }
};

export const createPost = async (req, res) => {
  try {
    console.log("ôk")
    const { id, ...dataWithoutId } = req.body;
    const createSt = await createDocumentWithId(`Posts`, id, dataWithoutId);
    res.json({message: "Create post successfully!", createSt});
  } catch (error) {
    res.status(500).json({ message: "Server error ~ createpost" });
  }
 
};

export const updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const updatedPost = await updateDocument(`Posts`, req.params.id, req.body);
    if (updatedPost) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ updatePost" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await deleteDocument('Posts', req.params.id);
    if (deletedPost) {
      res.json({ message: "Delete successfully" });
    } else {
      res.json({ message: "Delete fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deletePost" });
  }
};

export const commentPost = async (req, res) => {
  try {
   const { 
      mssv,
      cmt
    } = req.body;
    const comment = await updateDocumentNoti(`Posts`, req.params.id, {mssv, cmt});
    if (comment) {
      res.json({ message: "Comment successfully" , comment});
    } else {
      res.json({ message: "Comment fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ commentPost" });
  }
};
