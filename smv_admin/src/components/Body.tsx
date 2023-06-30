import React from "react";
import { useGetAdmin } from "../hooks/useGetAdmin";
import useTokenRenewal from "../hooks/useTokenRenewal";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SideBar from "../components/sidebar/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Body.css";

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  const user = useGetAdmin();
  useTokenRenewal();

  if (!user) {
    return null;
  }

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <div style={styles.container}>
        <SideBar />
        <div className="header-dashboard-container">
          <Header />
          <div style={styles.content}>{children}</div>
          <Footer />
        </div>
      </div>
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

export default Body;
