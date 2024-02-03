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
exports.updateBlogs = exports.deleteBlogs = exports.postBlogs = exports.getBlogs = void 0;
const index_1 = require("../index");
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield index_1.prisma.blog.findMany();
        res.json({
            allBlogs,
        });
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.getBlogs = getBlogs;
const postBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const authorId = req.cookies.UserId;
    console.log(data);
    console.log(authorId);
    try {
        const newBlog = yield index_1.prisma.blog.create({
            data: Object.assign(Object.assign({}, data), { authorId: +authorId }),
        });
        res.status(201).json({
            message: "Create Successfully",
            newBlog,
        });
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.postBlogs = postBlogs;
const updateBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    try {
        const updateBlog = yield index_1.prisma.blog.update({
            where: {
                id: Number(id),
            },
            data: Object.assign({}, data),
        });
        res.status(201).json({
            message: "updated Successfully",
            updateBlog,
        });
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.updateBlogs = updateBlogs;
const deleteBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleteBlog = yield index_1.prisma.blog.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            message: "delete Successfully",
            deleteBlog,
        });
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBlogs = deleteBlogs;
