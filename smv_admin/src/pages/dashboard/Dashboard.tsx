import React from "react";
import { useGetUser } from "../../hooks/useGetUser";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Dashboard: React.FC = () => {
  const user = useGetUser();
  useTokenRenewal();

  if (!user) {
    return null; // Mostrar un spinner de carga o mensaje mientras se comprueba la sesión
  }

  return (
    <div>
      <Header />
      <div className="container"></div>
      <Footer />
    </div>
  );
};

export default Dashboard;
