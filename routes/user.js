import express from "express";
import { postUser } from "../controllers/postUser.js";
import { getUserProfile } from "../controllers/getUserProfile.js";
import { loginUser } from "../controllers/loginUser.js";

const userRouter = express.Router();

userRouter.post("/signup", postUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile/:id", getUserProfile);

export default userRouter;
