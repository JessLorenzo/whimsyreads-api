import { postUser } from "../controllers/postUser.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", postUser);

export default userRouter;
