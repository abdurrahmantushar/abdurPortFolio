import express from "express";
import { CreateCertificate, DeleteCertificate, GetCertificateById, GetCertificates, UpdateCertificate } from "../controllers/Certificate_Controller.js";
import { upload } from "../middleware/upload.js";
import { IsAdmin, VerifyToken } from "../middleware/Auth.js";


const router = express.Router();

router.post(
  "/",
  VerifyToken,
  IsAdmin,
  upload.single("image"),
  CreateCertificate
);

router.get("/", GetCertificates);
router.get("/:id", GetCertificateById);

router.put(
  "/:id",
  VerifyToken,
  IsAdmin,
  upload.single("image"),
  UpdateCertificate
);

router.delete(
  "/:id",
  VerifyToken,
  IsAdmin,
  DeleteCertificate
);

export default router;
