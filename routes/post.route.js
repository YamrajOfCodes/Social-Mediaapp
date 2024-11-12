import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post( upload.single('image'), addNewPost);
router.route("/all").get(getAllPost);
router.route("/userpost/all").get(getUserPost);
router.route("/:id/like").get( likePost);
router.route("/:id/dislike").get( dislikePost);
router.route("/:id/comment").post( addComment); 
router.route("/:id/comment/all").post( getCommentsOfPost);
router.route("/delete/:id").delete( deletePost);
router.route("/:id/bookmark").get( bookmarkPost);

export default router;

