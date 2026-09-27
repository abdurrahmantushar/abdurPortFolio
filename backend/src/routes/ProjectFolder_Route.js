import express from "express";

import {
  CreateProjectFolder,
  GetProjectFolders,
  UpdateProjectFolder,
  DeleteProjectFolder,
} from "../controllers/ProjectFolder_Controller.js";

import { VerifyToken, IsAdmin } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", VerifyToken, IsAdmin, CreateProjectFolder);

router.get("/", GetProjectFolders);

router.put("/:id", VerifyToken, IsAdmin, UpdateProjectFolder);

router.delete("/:id", VerifyToken, IsAdmin, DeleteProjectFolder);

export default router;