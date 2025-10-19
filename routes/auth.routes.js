import express from "express";
import {
  renderSignup, signup,
  renderConfirm, confirm,
  renderLogin,  login,
  logout, oauthCallback,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Forms (GET) + Actions (POST)
router.get("/signup",  renderSignup);
router.post("/signup", signup);

router.get("/confirm", renderConfirm);
router.post("/confirm", confirm);

router.get("/login",  renderLogin);
router.post("/login", login);

// Auth session mgmt
router.post("/logout", logout);       // แนะนำ POST แทน GET
router.get("/auth/callback", oauthCallback);

export default router;
