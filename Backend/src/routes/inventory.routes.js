import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  adjustStock,
  listInventoryLogs,
  getStockSettings,
  updateStockSettings,
} from "../controllers/inventory.controller.js";

const router = Router();

// Publicly readable status
router.get("/settings", getStockSettings);

// Admin-only endpoints
router.use(requireAuth, requireAdmin);
router.patch("/settings", updateStockSettings);
router.post("/adjust", adjustStock);
router.get("/logs", listInventoryLogs);

export default router;
