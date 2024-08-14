// src/components/ProtectedRoute.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext"; // Importiere AuthContext
import api from "../api";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    // Stelle sicher, dass der Authentifizierungsstatus überprüft wird
    const checkAuth = async () => {
      if (!isAuthenticated) {
        setIsAuthorized(false);
        return;
      }

      // Prüfe ob der Token abgelaufen ist und ggf. erneuere ihn
      const token = localStorage.getItem("access_token");
      const now = Date.now() / 1000;
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp < now) {
          try {
            await refreshToken();
            setIsAuthorized(true);
          } catch (error) {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(true);
        }
      } else {
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      const res = await api.post("/api/auth/jwt/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access);
        setIsAuthorized(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
