"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["info", "query"] });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // create Blogs
        yield prisma.blog.create({
            data: {
                author: "John",
                url: "google.com",
                title: "Google",
                likes: 1,
            },
        });
        yield prisma.blog.create({
            data: {
                author: "Jane",
                url: "google.com",
                title: "Google",
                likes: 1,
            },
        });
        try {
            const allBlogs = yield prisma.blog.findMany();
            console.log(allBlogs);
        }
        catch (err) {
            console.log(err);
        }
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
