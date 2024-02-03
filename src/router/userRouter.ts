import express from "express";
import { getUsers, addUser, updateUser } from "../controller/user";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", addUser);
userRouter.put("/:username", updateUser);

export default userRouter;
