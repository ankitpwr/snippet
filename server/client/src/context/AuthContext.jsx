import { createContext, useState, useContext, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user info is in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("snippet_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await axiosClient.post("/auth/login", { email, password });
    setUser(response.data.user);
    localStorage.setItem("snippet_user", JSON.stringify(response.data.user));
    return response.data;
  };

  const signup = async (email, password) => {
    const response = await axiosClient.post("/auth/signup", {
      email,
      password,
    });
    setUser(response.data.user);
    localStorage.setItem("snippet_user", JSON.stringify(response.data.user));
    return response.data;
  };

  const logout = () => {
    // In a production app, you'd also hit a backend /logout route to clear the httpOnly cookie.
    // For this project, clearing the local state and letting the cookie expire is sufficient.
    setUser(null);
    localStorage.removeItem("snippet_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
