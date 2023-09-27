import React from "react";
import { CustomNavBar } from "./navbar/NavBar";
import Footer from "../components/footer/Footer";
import SideBar from "../components/sidebar/SideBar";
import { ToastContainer } from "react-toastify";
import { SearchContextProvider } from "../context/SearchContext";
import useGetImagenAdmin from "../hooks/useGetImagenAdmin";
import { useGetAllNotificaciones } from "../hooks/getNotificaciones";

import "react-toastify/dist/ReactToastify.css";
import "./Body.css";
import styles from "./Body.module.css";

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  useGetImagenAdmin();
  const notificaciones = useGetAllNotificaciones();

  return (
    <SearchContextProvider>
      <div className={styles["layout"]}>
        <div className={styles["navbar"]}>
          <CustomNavBar notificaciones={notificaciones} />
        </div>

        <div className={styles["sidebar"]}>
          <SideBar />
        </div>

        <div className={styles["body"]}>{children}</div>

        <div className={styles["footer"]}>
          <Footer />
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </SearchContextProvider>
  );
};

export default Body;
