import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
const app = express();
export const prisma = new PrismaClient({ log: ["info", "query"] });
import { errorMiddleware } from "./utils/middleware";
import blogRouter from "./router/blogRouter";
import userRouter from "./router/userRouter";

app.use(bodyParser.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("App running at 3000");
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
