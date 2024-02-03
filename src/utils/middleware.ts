import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

const errorMiddleware = (error: object, req: Request, res: Response) => {
  if (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "Not Authorized || Login",
    });
  }

  try {
    const decode = jwt.verify(token, "SECRET");

    let userId;
    if (typeof decode === "object" && decode !== null && "id" in decode) {
      userId = decode.id;
    }

    const blogId = req.params.id;
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(blogId),
      },
    });
    if (!blog) {
      res.status(404).json({
        message: "No Blog Found",
      });
    }

    if (blog?.authorId === Number(userId)) {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized. You are not the author of this Blog",
      });
    }
  } catch (err) {
    next(err);
  }
};

export { errorMiddleware };
