import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
const app = express();
const prisma = new PrismaClient({ log: ["info", "query"] });
import { deleteBlogs, getBlogs, postBlogs } from "./controller/blogs";
import { errorMiddleware } from "./utils/middleware";

app.use(bodyParser.json());

app.get("/api/blogs", getBlogs);

app.post("/api/blogs", postBlogs);

app.delete("/api/blogs/:id", deleteBlogs);

app.use(errorMiddleware);
app.listen(3000, () => {
  console.log("App running at 3000");
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
