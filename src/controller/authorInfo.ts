import { prisma } from "../index";
import { NextFunction, Request, Response } from "express";

export async function getAuthorsInfo(req: Request, res: Response) {
  const groupAuthors = await prisma.blog.groupBy({
    by: ["authorId"],
    _count: {
      id: true,
    },
    _sum: {
      likes: true,
    },
  });
  // console.log(groupAuthors);

  const groupAuthorsId = groupAuthors.map((author) => author.authorId);

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: groupAuthorsId,
      },
    },
  });
  // console.log(groupAuthorsId); // [id]
  // console.log(users); // [userinfo]

  const authorsInfo = groupAuthors.map((authorGroup) => {
    const user = users.find((user) => authorGroup.authorId === user.id);
    if (user) {
      return {
        author: user?.name,
        BlogsCount: authorGroup._count.id,
        TotalLikes: authorGroup._sum.likes,
      };
    } else {
      return null;
    }
  });

  // sort on basis of totalLikes
  const sortedAuthorInfo = authorsInfo.sort((a, b) => {
    if (
      typeof Number(a?.TotalLikes) === "number" &&
      typeof b?.TotalLikes === "number"
    ) {
      return Number(b?.TotalLikes) - Number(a?.TotalLikes);
    }
    return 0;
  });

  res.status(200).json(sortedAuthorInfo);
}
