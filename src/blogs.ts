const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["info", "query"] });

async function main() {
  // create Blogs
  await prisma.blog.create({
    data: {
      author: "John",
      url: "google.com",
      title: "Google",
      likes: 1,
    },
  });

  await prisma.blog.create({
    data: {
      author: "Jane",
      url: "google.com",
      title: "Google",
      likes: 1,
    },
  });

  try {
    const allBlogs = await prisma.blog.findMany();
    console.log(allBlogs);
  } catch (err) {
    console.log(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
