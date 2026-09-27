import express from "express";
import { CreateSkill, DeleteSkill, GetSkills, UpdateSkill } from "../controllers/Skill_Controller.js";
import { IsAdmin, VerifyToken } from "../middleware/Auth.js";


const router = express.Router();

router.post("/",VerifyToken,IsAdmin, CreateSkill);
router.get("/", GetSkills);
router.put("/:id",VerifyToken,IsAdmin, UpdateSkill);
router.delete("/:id",VerifyToken,IsAdmin, DeleteSkill);

export default router;