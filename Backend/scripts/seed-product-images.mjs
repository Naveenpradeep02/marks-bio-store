// Link verified local photography to products that do not yet have images.
// Preview: node scripts/seed-product-images.mjs
// Apply:   node scripts/seed-product-images.mjs --apply
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { pool } from "../src/config/db.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(scriptDir, "../uploads/products");
const sourceDir = path.resolve(scriptDir, "../../marksboiteck-website/public/assets/imgs");
const apply = process.argv.includes("--apply");

// Exact product/category names prevent matching a different graft material.
const productImages = new Map([
  ["Cancellous Particulate Vials", "allograft-cancellous-particulate.png"],
  ["Cortical / Cancellous Bone Blocks", "allograft-bone-blocks.png"],
  ["Cortical Particulate Vials", "allograft-cortical-particulate.png"],
  ["Allograft - Cancellous Particulate", "allograft-cancellous-particulate.png"],
  ["Allograft - Bone Blocks", "allograft-bone-blocks.png"],
  ["Allograft - Cortical Particulate", "allograft-cortical-particulate.png"],
  ["Tissue Adhesive", "amcrylate-pack.jpeg"],
  ["Xenograft - NovoBone Granules", "image 101.webp"],
  ["Xenograft - T-Barrier Collagen Membrane", "t-barrier.webp"],
  ["Xenograft - T-Barrier Titanium Membrane", "titanium-membrane-1.webp"],
]);

async function main() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [products] = await connection.query(
      "SELECT p.id, p.name, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.id FOR UPDATE"
    );
    const pending = [];
    for (const product of products) {
      const [existing] = await connection.execute(
        "SELECT id FROM product_images WHERE product_id = ? LIMIT 1", [product.id]
      );
      if (existing.length) {
        console.log("KEEP: #" + product.id + " " + product.name + " (already has image)");
        continue;
      }
      const source = productImages.get(product.name) || productImages.get(product.category_name);
      if (!source) {
        console.log("UNMAPPED: #" + product.id + " " + product.name);
        continue;
      }
      const bytes = fs.readFileSync(path.join(sourceDir, source));
      const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 16);
      const filename = "catalog-" + hash + path.extname(source);
      pending.push({ product, bytes, filename });
      console.log((apply ? "LINK: " : "PREVIEW: ") + "#" + product.id + " " + product.name + " -> " + source);
    }
    if (apply) {
      fs.mkdirSync(uploadDir, { recursive: true });
      for (const { product, bytes, filename } of pending) {
        const destination = path.join(uploadDir, filename);
        if (!fs.existsSync(destination)) fs.writeFileSync(destination, bytes, { flag: "wx" });
        await connection.execute(
          "INSERT INTO product_images (product_id, image_path, sort_order) VALUES (?, ?, 0)",
          [product.id, "/uploads/products/" + filename]
        );
      }
      await connection.commit();
    } else {
      await connection.rollback();
    }
    console.log((apply ? "Linked " : "Would link ") + pending.length + " product images.");
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
