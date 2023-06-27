import React from "react";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardDesign from "./CardUsuariosPrestamistas";

const Dashboard: React.FC = () => {
  const user = useGetAdmin();
  useTokenRenewal();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
      <CardDesign />
      <Footer />
    </div>
  );
};

export default Dashboard;
