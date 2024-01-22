import { Request, Response } from "express";

const errorMiddleware = (error: object, req: Request, res: Response) => {
  if (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

export { errorMiddleware };
