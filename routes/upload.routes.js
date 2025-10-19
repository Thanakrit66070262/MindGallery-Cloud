// routes/upload.routes.js
import express from "express";
import { requireAuth } from "../middlewares/authenticate.js";
import { getPresignedPutUrl, renderUploadPage } from "../controllers/upload.controller.js";

const router = express.Router();

// 🔹 หน้าสำหรับ render ฟอร์มอัปโหลด (ไม่จำเป็นต้องล็อกอินก็ได้ แต่แนะนำให้มี)
router.get("/", requireAuth, renderUploadPage);

// 🔹 API สำหรับขอ presigned URL เพื่ออัปโหลดไฟล์ขึ้น S3
// ใช้ method PUT เพราะเป็น presign สำหรับ S3 PUT Object
router.put("/presign", requireAuth, getPresignedPutUrl);

export default router;
