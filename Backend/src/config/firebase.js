import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const keyPath = path.resolve(
  __dirname,
  "../../",
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "serviceAccountKey.json"
);

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(keyPath, "utf-8"));
} catch (err) {
  throw new Error(
    `Firebase service account key not found at ${keyPath}. Download it from ` +
      "Firebase Console > Project Settings > Service Accounts > Generate new private key, " +
      "and save it as Backend/serviceAccountKey.json. This is used only to verify " +
      "sign-in tokens (Firebase Authentication) — all other data lives in MySQL."
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export default admin;
