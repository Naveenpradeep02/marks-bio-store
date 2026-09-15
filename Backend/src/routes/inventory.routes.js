import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { adjustStock, listInventoryLogs } from "../controllers/inventory.controller.js";

const router = Router();

router.use(requireAuth, requireAdmin);
router.post("/adjust", adjustStock);
router.get("/logs", listInventoryLogs);

export default router;
