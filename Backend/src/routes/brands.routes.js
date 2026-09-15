import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  listBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brands.controller.js";

const router = Router();

router.get("/", listBrands);
router.get("/:id", getBrand);
router.post("/", requireAuth, requireAdmin, createBrand);
router.put("/:id", requireAuth, requireAdmin, updateBrand);
router.delete("/:id", requireAuth, requireAdmin, deleteBrand);

export default router;
