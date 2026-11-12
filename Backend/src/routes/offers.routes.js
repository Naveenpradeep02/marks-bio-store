import { Router } from "express";
import {
  listOffers,
  getOfferById,
  createOffer,
  updateOffer,
  toggleOfferStatus,
  duplicateOffer,
  deleteOffer,
  calculateCart,
  getProductOfferDetails,
  getProductRecommendations,
  listActiveStorefrontOffers,
} from "../controllers/offers.controller.js";
import { requireAuth, requireAdmin, optionalAuth } from "../middleware/auth.js";

const router = Router();

// Storefront routes (public / optional auth)
router.get("/active", optionalAuth, listActiveStorefrontOffers);
router.post("/calculate-cart", optionalAuth, calculateCart);
router.get("/product/:productId", optionalAuth, getProductOfferDetails);
router.get("/recommendations/:productId", optionalAuth, getProductRecommendations);

// Admin routes (require auth + admin)
router.get("/", requireAuth, requireAdmin, listOffers);
router.get("/:id", requireAuth, requireAdmin, getOfferById);
router.post("/", requireAuth, requireAdmin, createOffer);
router.put("/:id", requireAuth, requireAdmin, updateOffer);
router.patch("/:id/status", requireAuth, requireAdmin, toggleOfferStatus);
router.post("/:id/duplicate", requireAuth, requireAdmin, duplicateOffer);
router.delete("/:id", requireAuth, requireAdmin, deleteOffer);

export default router;
