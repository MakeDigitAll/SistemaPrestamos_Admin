import React from "react";
import { useGetUser } from "../../hooks/useGetUser";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardDesign from "./CardDesign";

const Dashboard: React.FC = () => {
  const user = useGetUser();
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
