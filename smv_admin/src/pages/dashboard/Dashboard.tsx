import React from "react";
import { useGetUser } from "../../hooks/useGetUser";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import { CustomNavBar } from "../../components/navbar/NavBar";

const Dashboard: React.FC = () => {
  const user = useGetUser();
  useTokenRenewal();

  if (!user) {
    return null; // Mostrar un spinner de carga o mensaje mientras se comprueba la sesión
  }

  return (
    <div>
      <CustomNavBar />
      <h1>Dashboard</h1>
      <h2>
        Bienvenido {user.nombres} {user.apellidos}
      </h2>
    </div>
  );
};

export default Dashboard;
