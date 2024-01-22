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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient({ log: ["info", "query"] });
app.use(body_parser_1.default.json());
app.get("/api/blogs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield prisma.blog.findMany();
        res.json({
            allBlogs,
        });
    }
    catch (err) {
        res.status(500).json({ err });
        console.log(err);
        return;
    }
}));
app.post("/api/blogs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newBlog = yield prisma.blog.create({ data });
        res.status(201).json({
            message: "Create Successfully",
            newBlog,
        });
    }
    catch (err) {
        console.log(err);
    }
}));
app.delete("/api/blogs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(err);
    }
}));
app.listen(3000, () => {
    console.log("App running at 3000");
});
process.on("beforeExit", () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
