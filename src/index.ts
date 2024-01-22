import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
const app = express();
const prisma = new PrismaClient({ log: ["info", "query"] });

app.use(bodyParser.json());

app.get("/api/blogs", async (req: Request, res: Response) => {
  try {
    const allBlogs = await prisma.blog.findMany();
    res.json({
      allBlogs,
    });
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
    return;
  }
});

app.post("/api/blogs", async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newBlog = await prisma.blog.create({ data });
    res.status(201).json({
      message: "Create Successfully",
      newBlog,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/blogs/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "delete Successfully",
      deleteBlog,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("App running at 3000");
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
