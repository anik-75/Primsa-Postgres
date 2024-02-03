"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRouter = express_1.default.Router();
const blogs_1 = require("../controller/blogs");
blogRouter.get("/", blogs_1.getBlogs);
blogRouter.post("/", blogs_1.postBlogs);
blogRouter.put("/:id", blogs_1.updateBlogs);
blogRouter.delete("/:id", blogs_1.deleteBlogs);
exports.default = blogRouter;
