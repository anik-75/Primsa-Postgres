import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { UserInput } from "./schema/userSchema";
export const prisma = new PrismaClient({ log: ["info", "query"] })
  //  Email validation
  .$extends({
    query: {
      user: {
        create({ args, query }) {
          args.data = UserInput.parse(args.data);
          return query(args);
        },
      },
    },
  });
import { errorMiddleware } from "./utils/middleware";
import blogRouter from "./router/blogRouter";
import userRouter from "./router/userRouter";
import { login } from "./controller/login";
import { getAuthorsInfo } from "./controller/authorInfo";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.post("/api/login", login);
app.get("/api/authors", getAuthorsInfo);

app.post("/api/readinglists", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  try {
    const readingList = await prisma.userReadingList.create({
      data: data,
    });
    res.status(201).json(readingList);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("App running at 3000");
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
