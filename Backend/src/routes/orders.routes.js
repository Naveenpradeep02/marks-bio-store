import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  createOrder,
  listMyOrders,
  listOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/mine", requireAuth, listMyOrders);
router.get("/", requireAuth, requireAdmin, listOrders);
router.get("/:id", requireAuth, getOrder);
router.patch("/:id/status", requireAuth, requireAdmin, updateOrderStatus);

export default router;
