import { NextFunction, Request, Response } from "express";
import { prisma } from "../index";

export const addToReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  // console.log(data);
  try {
    const readingList = await prisma.userReadingList.create({
      data: data,
    });
    res.status(201).json(readingList);
  } catch (error) {
    next(error);
  }
};

export const updateReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.id;
  const userId = req.cookies.UserId;
  console.log(blogId);
  console.log(userId);
  const data = req.body;

  try {
    const updateList = await prisma.userReadingList.update({
      where: {
        blogId_userId: {
          userId: Number(userId),
          blogId: Number(blogId),
        },
      },
      data: { read: data.read },
    });
    res.status(200).json(updateList);
  } catch (error) {
    next(error);
  }
};
