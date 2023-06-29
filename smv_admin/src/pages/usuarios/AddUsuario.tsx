import React from "react";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar";
import CardUsuariosActivos from "./content/CardUsuariosActivos";

const UsuariosActivos: React.FC = () => {
  const user = useGetAdmin();
  useTokenRenewal();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div style={styles.container}>
        <SideBar />
        <div className="header-dashboard-container">
          <Header />
          <div style={styles.content}>
            <CardUsuariosActivos />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "16.3% auto", // Ajusta los porcentajes según tus necesidades
    minHeight: "100vh",
  },
  content: {
    padding: "0%",
  },
};
export default UsuariosActivos;
