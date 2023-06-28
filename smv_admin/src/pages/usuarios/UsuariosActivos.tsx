import React from "react";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar";
import CardUsuariosActivos from "../usuarios/CardUsuariosActivos";

const UsuariosActivos: React.FC = () => {
  const user = useGetAdmin();
  useTokenRenewal();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <SideBar />
        <div style={styles.content}>
          <CardUsuariosActivos />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "16.3% 83.7%", // Ajusta el valor del ancho del sidebar aquí
    minHeight: "100vh",
  },
  content: {
    padding: "0%",
  },
};

export default UsuariosActivos;
