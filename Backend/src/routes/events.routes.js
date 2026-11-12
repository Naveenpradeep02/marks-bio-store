import { Router } from "express";
import {
  listEvents,
  getEventStats,
  getEvent,
  createEvent,
  updateEvent,
  toggleEventStatus,
  deleteEvent,
} from "../controllers/events.controller.js";

const router = Router();

// Stats overview
router.get("/stats", getEventStats);

// List & single
router.get("/", listEvents);
router.get("/:id", getEvent);

// Mutations
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.patch("/:id/status", toggleEventStatus);
router.delete("/:id", deleteEvent);

export default router;
