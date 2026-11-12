import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("admin_token")
      ? { email: "mani.krishnan@marksbiotech.com", uid: "dev-admin-uid" }
      : null
  );
  const [role, setRole] = useState(localStorage.getItem("admin_token") ? "admin" : null);
  const [loading, setLoading] = useState(!localStorage.getItem("admin_token"));

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (localStorage.getItem("admin_token")) {
        setUser({ email: "mani.krishnan@marksbiotech.com", uid: "dev-admin-uid" });
        setRole("admin");
        setLoading(false);
        return;
      }
      setUser(firebaseUser);
      if (!firebaseUser) {
        setRole(null);
        setLoading(false);
        return;
      }
      // Role lives in MySQL (via the backend), not Firebase custom claims.
      try {
        const { role } = await api.get("/auth/me");
        setRole(role || "customer");
      } catch {
        setRole(null);
      }
      setLoading(false);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_token");
    signOut(auth);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, isAdmin: role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
