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

type Position = "fixed" | "absolute" | "relative" | "static" | "sticky";

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
        <div
          className="header-sidebar-container"
          style={styles.headerNavBarContainer}
        >
          <Header />
        </div>

        <div
          className="header-sidebar-container"
          style={styles.headerSidebarContainer}
        >
          <SideBar />
        </div>
        <div
          className="content-footer-container"
          style={styles.contentFooterContainer}
        >
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
    gridAutoRows: "min-content", // Ajusta el tamaño de las filas según el contenido
  },
  headerNavBarContainer: {
    position: "fixed" as Position,
    top: 0,
    left: "16.3%",
    maxWidth: "100%",
    zIndex: 1, // Asegura que el encabezado esté por encima del contenido
  },
  headerSidebarContainer: {
    position: "fixed" as Position,
    top: 0,
    left: 0,
    width: "16.3%",
    height: "100%",
    zIndex: 1, // Asegura que el encabezado esté por encima del contenido
  },
  contentFooterContainer: {
    marginLeft: "16.3%", // Ajusta según el ancho del sidebar
    paddingTop: "2%", // Agrega un espacio en la parte superior del contenido
  },
  content: {
    padding: "2%",
    minHeight: "100vh", // Ajusta el alto del contenido
    marginTop: "2%",
  },
};

export default Body;
