import express from "express";
import { PortfolioChat } from "../controllers/PortfolioChat_Controller.js";

const router = express.Router();

router.post("/", PortfolioChat);

export default router;