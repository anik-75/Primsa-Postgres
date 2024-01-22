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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogs = exports.postBlogs = exports.getBlogs = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["info", "query"],
});
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield prisma.blog.findMany();
        res.json({
            allBlogs,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getBlogs = getBlogs;
const postBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newBlog = yield prisma.blog.create({ data });
        res.status(201).json({
            message: "Create Successfully",
            newBlog,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.postBlogs = postBlogs;
const deleteBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleteBlog = yield prisma.blog.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            message: "delete Successfully",
            deleteBlog,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBlogs = deleteBlogs;
