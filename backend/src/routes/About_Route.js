import express from "express";
import { CreateAbout, DeleteAbout, GetAbout, UpdateAbout } from "../controllers/About_Controller.js";
import { IsAdmin, VerifyToken } from "../middleware/Auth.js";



const router = express.Router();

router.post("/",VerifyToken,IsAdmin, CreateAbout);
router.get("/", GetAbout);
router.put("/:id",VerifyToken,IsAdmin, UpdateAbout);
router.delete("/:id",VerifyToken,IsAdmin, DeleteAbout);

export default router;