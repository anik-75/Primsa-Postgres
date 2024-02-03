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
exports.errorMiddleware = exports.isAuthorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const errorMiddleware = (error, req, res) => {
    if (error) {
        console.log(error);
        res.json({
            error,
        });
    }
};
exports.errorMiddleware = errorMiddleware;
const isAuthorized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            message: "Not Authorized || Login",
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, "SECRET");
        console.log(decode);
        let userId;
        if (typeof decode === "object" && decode !== null && "id" in decode) {
            userId = decode.id;
        }
        const blogId = req.params.id;
        const blog = yield index_1.prisma.blog.findUnique({
            where: {
                id: Number(blogId),
            },
        });
        if (!blog) {
            res.status(404).json({
                message: "No Blog Found",
            });
        }
        if ((blog === null || blog === void 0 ? void 0 : blog.authorId) === Number(userId)) {
            next();
        }
        else {
            res.status(401).json({
                message: "You are not authorized. You are not the author of this Blog",
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.isAuthorized = isAuthorized;
