import express from "express";
import { requireAuth } from "../middlewares/authenticate.js";
import { renderOwnGallery, renderFeedGallery } from "../controllers/gallery.controller.js";

const router = express.Router();

// อยากให้หน้าแรกไปหน้า login (ระวัง redirect loop ถ้า /login redirect กลับมา /)
router.get("/", (req, res) => res.redirect("/login"));

// อัปโหลด (ต้องล็อกอิน)
router.get("/upload", requireAuth, (req, res) => {
  const claims = req.user || {};
  const username =
    req.query.username ||
    claims["cognito:username"] ||
    claims.username ||
    claims.email ||
    claims.sub ||
    "Anonymous";

  res.render("upload", { title: "Mind Gallery - Upload", username });
});

// แกลอรีของฉัน
router.get("/owngallery", requireAuth, renderOwnGallery);

// ฟีดรวม (แบบที่คุณทำให้ presign list จาก S3)
router.get("/feed", requireAuth, renderFeedGallery);

export default router;
