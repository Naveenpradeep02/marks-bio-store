import { auth } from "./firebase";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  const firebaseToken = await auth.currentUser?.getIdToken();
  const token = firebaseToken || localStorage.getItem("admin_token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) return null;

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

// Uploads a file as multipart/form-data (no JSON content-type override, the
// browser sets its own multipart boundary).
export async function uploadFile(path, file, fieldName = "image") {
  const token = await auth.currentUser?.getIdToken();
  const formData = new FormData();
  formData.append(fieldName, file);

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `Upload failed with status ${res.status}`);
  return data;
}
