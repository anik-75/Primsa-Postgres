import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
const prisma = new PrismaClient({
  log: ["info", "query"],
});

const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBlogs = await prisma.blog.findMany();
    res.json({
      allBlogs,
    });
  } catch (err) {
    next(err);
  }
};
const postBlogs = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  try {
    const newBlog = await prisma.blog.create({ data });
    res.status(201).json({
      message: "Create Successfully",
      newBlog,
    });
  } catch (err) {
    next(err);
  }
};
const deleteBlogs = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "delete Successfully",
      deleteBlog,
    });
  } catch (err) {
    next(err);
  }
};
export { getBlogs, postBlogs, deleteBlogs };
