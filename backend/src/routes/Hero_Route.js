import express from "express";
import { upload } from "../middleware/upload.js";
import { CreateHero, DeleteHero, GetHero, UpdateHero } from "../controllers/Hero_Controller.js";
import { IsAdmin, VerifyToken } from "../middleware/Auth.js";


const router = express.Router();

router.post("/",VerifyToken,IsAdmin, upload.single("image"), CreateHero);
router.get("/", GetHero
);
router.put("/:id",VerifyToken,IsAdmin, upload.single("image"), UpdateHero);
router.delete("/:id",VerifyToken,IsAdmin, DeleteHero);

export default router;