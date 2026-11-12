import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config(); // fallback to current working directory if any

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import brandRoutes from "./routes/brands.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import productRoutes from "./routes/products.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import customerRoutes from "./routes/customers.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import invoiceRoutes from "./routes/invoices.routes.js";
import uploadRoutes from "./routes/uploads.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import offerRoutes from "./routes/offers.routes.js";
import popupRoutes from "./routes/popups.routes.js";
import blogRoutes from "./routes/blogs.routes.js";
import seoRoutes from "./routes/seo.routes.js";
import eventRoutes from "./routes/events.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const configuredOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.ADMIN_ORIGIN,
  "https://demo.marksbiotech.in",
  "https://marksbiotech.com",
  "https://marksbiotech.in",
].filter(Boolean);

// Chrome Private Network Access preflight support (when HTTPS site calls localhost)
app.use((req, res, next) => {
  if (req.headers["access-control-request-private-network"]) {
    res.setHeader("Access-Control-Allow-Private-Network", "true");
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin/non-browser requests, any configured origin, and
      // any localhost dev port (Vite auto-increments when a port is taken).
      if (
        !origin ||
        configuredOrigins.includes(origin) ||
        /^https?:\/\/localhost:\d+$/.test(origin) ||
        /^https?:\/\/127\.0\.0\.1:\d+$/.test(origin) ||
        /^https?:\/\/([a-z0-9-]+\.)?marksbiotech\.(in|com)(:\d+)?$/i.test(origin)
      ) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Private-Network"],
  }),
);
app.options("*", cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
app.use("/assets", express.static(path.resolve(__dirname, "../../marksboiteck-website/public/assets")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/popups", popupRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/events", eventRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Marksbiotech backend listening on port ${PORT}`),
);
