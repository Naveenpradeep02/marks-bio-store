import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { bootstrapAdmin, syncProfile, getMe } from "../controllers/auth.controller.js";

const router = Router();

router.post("/bootstrap-admin", bootstrapAdmin);
router.post("/sync-profile", requireAuth, syncProfile);
router.get("/me", requireAuth, getMe);

export default router;
