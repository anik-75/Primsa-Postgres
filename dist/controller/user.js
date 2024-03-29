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
exports.getUserInfo = exports.updateUser = exports.addUser = exports.getUsers = void 0;
const index_1 = require("../index");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.cookies.UserId;
    try {
        const allUsers = yield index_1.prisma.user.findUnique({
            where: {
                id: Number(userId),
            },
            select: {
                blogs: true,
                name: true,
                username: true,
            },
        });
        res.status(200).json({
            allUsers,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newUser = yield index_1.prisma.user.create({
            data,
        });
        res.status(201).json({
            newUser,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addUser = addUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const username = req.params.username;
    try {
        const updatedUser = yield index_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                username: username,
            },
        });
        res.status(204).json({
            updatedUser,
        });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const query = req.query;
    console.log(query);
    try {
        const userInfo = yield index_1.prisma.user.findUnique({
            where: {
                id: Number(userId),
            },
            include: {
                readings: Object.assign(Object.assign({}, ((query === null || query === void 0 ? void 0 : query.read) !== undefined
                    ? {
                        where: {
                            read: Boolean(query.read === "true"),
                        },
                    }
                    : {})), { select: {
                        blog: true,
                        read: true,
                    } }),
            },
        });
        res.status(200).json(userInfo);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserInfo = getUserInfo;
