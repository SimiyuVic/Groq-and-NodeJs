import express from "express";
import { groqController } from "../controllers/groq.controller.js";

const router = express.Router();

//groq route
router.post("/groq-prompt", groqController)

export default router;