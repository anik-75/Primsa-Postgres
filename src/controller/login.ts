import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { prisma } from "../index";

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
    .cookie(token, { httpOnly: true ,})
    .status(200)
    .send({ token, username: user.username, name: user.name });
};
