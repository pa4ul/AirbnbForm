// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Überprüfe beim Laden der App, ob der Benutzer eingeloggt ist
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); //stellt sicher, dass der Wert Boolean ist.
  }, []);

  const login = (data) => {
    localStorage.setItem("access_token", data.access); // Speichern des Access Tokens im localStorage
    localStorage.setItem("refresh_token", data.refresh); // Optional: Speichern des Refresh Tokens im localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
