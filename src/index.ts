import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
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

const app = express();
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
