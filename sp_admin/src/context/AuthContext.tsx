import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import useTokenRenewal from "../hooks/useTokenRenewal";

interface AuthContextData {
  isAuthenticated: boolean;
  logout: () => void;
  login: (accessToken: string, refreshToken: string) => void;
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  logout: () => {},
  login: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = Cookies.get("accessToken");
  useTokenRenewal();

  // Function to logout the user by clearing cookies and redirecting to login
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
    navigate("/admin-login");
  };

  // Funcion para iniciar sesión del usuario
  const login = (accessToken: string, refreshToken: string) => {
    // Duración en minutos
    const accessTokenDurationMinutes = 60;
    const refreshTokenDurationMinutes = 20 * 60; // 20 horas en minutos

    // Convertir la duración en días
    const accessTokenDurationDays = accessTokenDurationMinutes / (60 * 24);
    const refreshTokenDurationDays = refreshTokenDurationMinutes / (60 * 24);

    // Establecer la cookie del access token con una duración de 55 minutos
    Cookies.set("accessToken", accessToken, {
      expires: accessTokenDurationDays,
    });

    // Establecer la cookie del refresh token con una duración de 20 horas
    Cookies.set("refreshToken", refreshToken, {
      expires: refreshTokenDurationDays,
    });

    setIsAuthenticated(true);
    navigate("/admin-dashboard"); // Redirigir al usuario a la página de inicio después de iniciar sesión
  };

  // Check if user is authenticated using the access token stored in cookies
  useEffect(() => {
    if (!accessToken) {
      Cookies.remove("refreshToken");
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate("/admin-login");
      return;
    }

    if (accessToken) {
      const decodedNewAccessToken: any = jwt_decode(accessToken);

      // Obtener la fecha de expiración del token
      const { exp } = decodedNewAccessToken;

      // Obtener la fecha actual en segundos
      const currentTimestamp = Date.now() / 1000;

      // Verificar si el token no ha expirado
      if (exp > currentTimestamp) {
        setIsAuthenticated(true);
      } else {
        // Si el token ha expirado, borrar las cookies y establecer el estado de autenticación en false
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setIsAuthenticated(false);
        // Redirigir al usuario a la página de inicio de sesión
        navigate("/admin-login");
      }
    }
    // Después de verificar el estado de autenticación, establecer isLoading en false
    setIsLoading(false);
  }, [navigate, accessToken]);

  useEffect(() => {
    //si le usuario esta autenticado y esta en la ruta de login
    if (
      (isAuthenticated && location.pathname === "/admin-login") ||
      (location.pathname === "/" && accessToken)
    ) {
      navigate("/admin-dashboard");
    }
  }, [isAuthenticated, location.pathname, navigate, accessToken]);

  // Render loading state while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
