import express from "express";
import { postUser } from "../controllers/postUser.js";
import { getUserProfile } from "../controllers/getUserProfile.js";

const userRouter = express.Router();

userRouter.post("/signup", postUser);
userRouter.get("/profile/:id", getUserProfile);

export default userRouter;
