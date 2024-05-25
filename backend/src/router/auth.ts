import { AuthController } from "@/controllers/auth";
import express, { Router } from "express";

const router: Router = express.Router();

const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/profile", authController.profile);

export default router;
