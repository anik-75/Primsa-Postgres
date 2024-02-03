import { NextFunction, Request, Response } from "express";
import { prisma } from "../index";

const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBlogs = await prisma.blog.findMany();
    res.json({
      allBlogs,
    });
    return;
  } catch (err) {
    next(err);
  }
};
const postBlogs = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const authorId = req.cookies.UserId;
  console.log(data);
  console.log(authorId);
  try {
    const newBlog = await prisma.blog.create({
      data: { ...data, authorId: +authorId },
    });
    res.status(201).json({
      message: "Create Successfully",
      newBlog,
    });
    return;
  } catch (err) {
    next(err);
  }
};

const updateBlogs = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const updateBlog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    });
    res.status(201).json({
      message: "updated Successfully",
      updateBlog,
    });
    return;
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
    return;
  } catch (err) {
    next(err);
  }
};
export { getBlogs, postBlogs, deleteBlogs, updateBlogs };
