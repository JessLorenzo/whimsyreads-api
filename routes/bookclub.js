import express from "express";
import { postBookClub } from "../controllers/postBookClub.js";
import { getBookClub } from "../controllers/getBookClub.js";

const router = express.Router();

router.post("/profile", postBookClub);
router.get("/:id", getBookClub);

export default router;
