import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOAD_DIR = path.resolve(__dirname, "../../uploads/products");
export const BRAND_UPLOAD_DIR = path.resolve(__dirname, "../../uploads/brands");

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function fileFilter(req, file, cb) {
  if (!ALLOWED_TYPES.has(file.mimetype)) {
    return cb(new Error("Only JPEG, PNG, WEBP or GIF images are allowed"));
  }
  cb(null, true);
}

function makeUploader(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, unique);
    },
  });
  return multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
}

export const upload = makeUploader(UPLOAD_DIR);
export const brandUpload = makeUploader(BRAND_UPLOAD_DIR);
