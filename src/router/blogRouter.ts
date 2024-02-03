import express from "express";
const blogRouter = express.Router();
import {
  deleteBlogs,
  getBlogs,
  postBlogs,
  updateBlogs,
} from "../controller/blogs";

blogRouter.get("/", getBlogs);
blogRouter.post("/", postBlogs);
blogRouter.put("/:id", updateBlogs);
blogRouter.delete("/:id", deleteBlogs);

export default blogRouter;
