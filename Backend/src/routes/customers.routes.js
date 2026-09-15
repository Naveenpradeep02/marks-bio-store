import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { listCustomers, getCustomer, addAddress } from "../controllers/customers.controller.js";

const router = Router();

router.get("/", requireAuth, requireAdmin, listCustomers);
router.get("/:id", requireAuth, requireAdmin, getCustomer);
router.post("/me/addresses", requireAuth, addAddress);

export default router;
