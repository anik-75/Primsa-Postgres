import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { prisma } from "../index";
import { strict } from "assert";

export const login = async (request: Request, response: Response) => {
  const body = request.body;

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "123456";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, "SECRET");

  response
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .cookie("UserId", user.id, {
      httpOnly: true,
      sameSite: "strict",
    })
    .status(200)
    .send({ token, username: user.username, name: user.name });
};
