import { Router } from "express";
import {
  listPopups,
  getActivePopups,
  getPopup,
  createPopup,
  updatePopup,
  togglePopupStatus,
  deletePopup,
  toggleMasterPopups,
} from "../controllers/popups.controller.js";

const router = Router();

// Public route for website
router.get("/active", getActivePopups);

// Developer / Admin routes
router.get("/", listPopups);
router.get("/:id", getPopup);
router.post("/", createPopup);
router.put("/:id", updatePopup);
router.patch("/:id/status", togglePopupStatus);
router.delete("/:id", deletePopup);
router.post("/master-toggle", toggleMasterPopups);

export default router;
