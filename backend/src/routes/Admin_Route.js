import express from "express";
import { AdminLogin } from "../controllers/Admin_Controller.js";

const router = express.Router();

router.post("/login", AdminLogin);

export default router;