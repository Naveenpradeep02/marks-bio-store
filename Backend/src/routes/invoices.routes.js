import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  createInvoice,
  listInvoices,
  getInvoice,
  updateInvoiceStatus,
  downloadInvoicePdf,
} from "../controllers/invoices.controller.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, createInvoice);
router.get("/", requireAuth, listInvoices);
router.get("/:id", requireAuth, getInvoice);
router.get("/:id/pdf", requireAuth, downloadInvoicePdf);
router.patch("/:id/status", requireAuth, requireAdmin, updateInvoiceStatus);

export default router;
