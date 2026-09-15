import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { upload, brandUpload } from "../middleware/upload.js";

const router = Router();

// Uploads a single product image to the local uploads/products folder and
// returns its public URL path. The frontend calls this first, then includes
// the returned path in the product create/update JSON payload.
router.post("/product-image", requireAuth, requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image file provided" });
  res.status(201).json({ path: `/uploads/products/${req.file.filename}` });
});

// Same idea, for brand logos - stored separately under uploads/brands.
router.post("/brand-logo", requireAuth, requireAdmin, brandUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image file provided" });
  res.status(201).json({ path: `/uploads/brands/${req.file.filename}` });
});

export default router;
