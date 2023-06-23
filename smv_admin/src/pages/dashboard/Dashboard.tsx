import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface User {
  correo_electronico: string;
  nombres: string;
  apellidos: string;
  id: number;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token JWT desde una cookie
    const token = Cookies.get("token");

    if (!token) {
      // No se encontró el token en la cookie, redireccionar a la página de inicio de sesión
      navigate("/");
      return;
    }

    // Decodificar el token JWT para obtener los datos del usuario
    try {
      const decodedToken = jwt_decode<any>(token);
      setUser(decodedToken);
    } catch (error) {
      // El token no es válido, redireccionar a la página de inicio de sesión
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar la cookie y redireccionar a la página de inicio de sesión
    Cookies.remove("token");
    navigate("/");
  };

  if (!user) {
    return null; // Mostrar un spinner de carga o mensaje mientras se comprueba la sesión
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>
        Bienvenido {user.nombres} {user.apellidos}
      </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
