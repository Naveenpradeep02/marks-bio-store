import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { listCustomers, getCustomer, addAddress, updateCustomerType } from "../controllers/customers.controller.js";

const router = Router();

router.get("/", requireAuth, requireAdmin, listCustomers);
router.get("/:id", requireAuth, requireAdmin, getCustomer);
router.patch("/:id/type", requireAuth, requireAdmin, updateCustomerType);
router.post("/me/addresses", requireAuth, addAddress);

export default router;
