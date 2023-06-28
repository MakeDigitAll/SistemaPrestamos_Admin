import React from "react";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardDesign from "./CardUsuariosPrestamistas";
import SideBar from "../../components/sidebar/SideBar";

const Dashboard: React.FC = () => {
  const user = useGetAdmin();
  useTokenRenewal();

  if (!user) {
    return null;
  }

  return (
    <div style={styles.container}>
      <SideBar />
      <div style={styles.content}>
        <Header />
        <CardDesign />
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

export default Dashboard;
