import { prisma } from "../index";
import { NextFunction, Request, Response } from "express";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.cookies.UserId;
  try {
    const allUsers = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        blogs: true,
        name: true,
        username: true,
      },
    });
    res.status(200).json({
      allUsers,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const newUser = await prisma.user.create({
      data,
    });
    res.status(201).json({
      newUser,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  const username = req.params.username;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username: username,
      },
    });
    res.status(204).json({
      updatedUser,
    });
    return;
  } catch (error) {
    next(error);
  }
};
