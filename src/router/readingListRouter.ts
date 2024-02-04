import express from "express";
import { addToReadingList, updateReadingList } from "../controller/readingList";
const readingListRouter = express.Router();

readingListRouter.post("/", addToReadingList);
readingListRouter.put("/:id", updateReadingList);

export default readingListRouter;
