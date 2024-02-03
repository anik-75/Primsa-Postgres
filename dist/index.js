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
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient({ log: ["info", "query"] });
const middleware_1 = require("./utils/middleware");
const blogRouter_1 = __importDefault(require("./router/blogRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
app.use(body_parser_1.default.json());
app.use("/api/blogs", blogRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use(middleware_1.errorMiddleware);
app.listen(3000, () => {
    console.log("App running at 3000");
});
process.on("beforeExit", () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}));
