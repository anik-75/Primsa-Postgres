import express from "express";
import { getUsers, addUser, updateUser,getUserInfo } from "../controller/user";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserInfo);
userRouter.post("/", addUser);
userRouter.put("/:username", updateUser);

export default userRouter;
