import { Router } from "express";
import {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  toggleBlogStatus,
  deleteBlog,
} from "../controllers/blogs.controller.js";

const router = Router();

// Public routes for website & developer panel
router.get("/", listBlogs);
router.get("/:identifier", getBlog);

// Developer panel mutation routes
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.patch("/:id/status", toggleBlogStatus);
router.delete("/:id", deleteBlog);

export default router;
