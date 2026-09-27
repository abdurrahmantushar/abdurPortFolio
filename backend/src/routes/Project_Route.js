import express from "express";
import { CreateProject, DeleteProject, GetProjects, UpdateProject } from "../controllers/Project_Controller.js";
import { upload } from "../middleware/upload.js";
import { IsAdmin, VerifyToken } from "../middleware/Auth.js";



const router = express.Router();

router.post("/",VerifyToken,IsAdmin,upload.single('image'), CreateProject);
router.get("/", GetProjects);
router.put("/:id",VerifyToken,IsAdmin, UpdateProject);
router.delete("/:id",VerifyToken,IsAdmin, DeleteProject);

export default router;