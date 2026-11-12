import { Router } from "express";
import {
  listPagesSeo,
  getPageSeo,
  createPageSeo,
  updatePageSeo,
  deletePageSeo,
  resolveSeo,
  applyToAll,
  getGlobalSeo,
  updateGlobalSeo,
  auditImages,
} from "../controllers/seo.controller.js";

const router = Router();

// Public route for website dynamically injecting head tags & schema
router.get("/resolve", resolveSeo);

// Global SEO, GTM, Meta Pixel
router.get("/global", getGlobalSeo);
router.put("/global", updateGlobalSeo);

// Missing Alt Tag image scanner & audit
router.get("/audit-images", auditImages);

// Apply settings to all pages
router.post("/apply-to-all", applyToAll);

// Page-by-page SEO CRUD
router.get("/pages", listPagesSeo);
router.get("/pages/:id", getPageSeo);
router.post("/pages", createPageSeo);
router.put("/pages/:id", updatePageSeo);
router.delete("/pages/:id", deletePageSeo);

export default router;
