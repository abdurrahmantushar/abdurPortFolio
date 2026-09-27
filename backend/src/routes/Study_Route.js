import express from "express";
import { CreateStudy, DeleteStudy, GetStudies, UpdateStudy } from "../controllers/Study_Controller.js";
import { IsAdmin, VerifyToken } from "../middleware/Auth.js";


const router = express.Router();

router.post("/",VerifyToken,IsAdmin, CreateStudy);
router.get("/", GetStudies);
router.put("/:id",VerifyToken,IsAdmin, UpdateStudy);
router.delete("/:id",VerifyToken,IsAdmin, DeleteStudy);

export default router;