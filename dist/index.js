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
const blogs_1 = require("./controller/blogs");
const middleware_1 = require("./utils/middleware");
app.use(body_parser_1.default.json());
app.get("/api/blogs", blogs_1.getBlogs);
app.post("/api/blogs", blogs_1.postBlogs);
app.put("/api/blogs/:id", blogs_1.updateBlogs);
app.delete("/api/blogs/:id", blogs_1.deleteBlogs);
app.use(middleware_1.errorMiddleware);
app.listen(3000, () => {
    console.log("App running at 3000");
});
process.on("beforeExit", () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
