import { Router } from "express";
import {
  trackEvents,
  getDashboardOverview,
  getProductPerformanceDashboard,
  getProductDeepDive,
  getMarketingIntelligence,
  exportAnalyticsCSV,
  triggerDailyAggregation,
  triggerRetentionPurge,
} from "../controllers/analytics.controller.js";
import { requireAuth, requireAdmin, optionalAuth } from "../middleware/auth.js";

const router = Router();

// Public event ingestion endpoint (supports optional auth if logged in)
router.post("/events", optionalAuth, trackEvents);

// Admin-only Analytics API Endpoints
router.use(requireAuth, requireAdmin);

// Dashboard overview
router.get("/dashboard", getDashboardOverview);

// Product Performance & Intelligence
router.get("/products/performance", getProductPerformanceDashboard);
router.get("/products/:id/deep-dive", getProductDeepDive);

// Marketing Intelligence & Attribution
router.get("/marketing/intelligence", getMarketingIntelligence);

// CSV Data Export
router.get("/export/:type", exportAnalyticsCSV);

// Maintenance / Automation Triggers
router.post("/aggregate-daily", triggerDailyAggregation);
router.post("/purge-retention", triggerRetentionPurge);

export default router;
