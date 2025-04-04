import express from "express";
import { postBookClub } from "../controllers/postBookClub.js";

const router = express.Router();

router.post("/profile", postBookClub);

export default router;
