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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userSchema_1 = require("./schema/userSchema");
exports.prisma = new client_1.PrismaClient({ log: ["info", "query"] })
    //  Email validation
    .$extends({
    query: {
        user: {
            create({ args, query }) {
                args.data = userSchema_1.UserInput.parse(args.data);
                return query(args);
            },
        },
    },
});
const middleware_1 = require("./utils/middleware");
const blogRouter_1 = __importDefault(require("./router/blogRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const login_1 = require("./controller/login");
const authorInfo_1 = require("./controller/authorInfo");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/blogs", blogRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.post("/api/login", login_1.login);
app.get("/api/authors", authorInfo_1.getAuthorsInfo);
app.post("/api/readinglists", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    try {
        const readingList = yield exports.prisma.userReadingList.create({
            data: data,
        });
        res.status(201).json(readingList);
    }
    catch (error) {
        next(error);
    }
}));
app.use(middleware_1.errorMiddleware);
app.listen(3000, () => {
    console.log("App running at 3000");
});
process.on("beforeExit", () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}));
