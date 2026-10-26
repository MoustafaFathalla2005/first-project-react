import { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

const STORAGE_KEY = "sprintix_user";

function loadUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    return typeof parsed?.username === "string" && parsed.username.trim()
      ? { username: parsed.username.trim() }
      : null;
  } catch (error) {
    console.error("Unable to restore the saved user.", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const login = (username) => {
    const normalizedUsername = username.trim();
    if (!normalizedUsername) {
      throw new TypeError("A non-empty username is required.");
    }
    const nextUser = { username: normalizedUsername };
    setUser(nextUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch (error) {
      console.error("Unable to save the user in local storage.", error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Unable to remove the saved user from local storage.", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
