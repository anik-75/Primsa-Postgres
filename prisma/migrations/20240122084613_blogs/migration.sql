-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
