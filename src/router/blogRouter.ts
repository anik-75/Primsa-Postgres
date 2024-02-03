import express from "express";
const blogRouter = express.Router();
import {
  deleteBlogs,
  getBlogs,
  postBlogs,
  updateBlogs,
} from "../controller/blogs";
import {  isAuthorized } from "../utils/middleware";

blogRouter.get("/", getBlogs);
blogRouter.post("/", postBlogs);
blogRouter.put("/:id", updateBlogs);
blogRouter.delete("/:id", isAuthorized, deleteBlogs);

export default blogRouter;
