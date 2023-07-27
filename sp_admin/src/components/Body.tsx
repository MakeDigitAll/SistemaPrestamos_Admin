import React, { useState } from "react";
import { useGetAdmin } from "../hooks/useGetAdmin";
import useTokenRenewal from "../hooks/useTokenRenewal";
import { CustomNavBar } from "./navbar/NavBar";
import Footer from "../components/footer/Footer";
import SideBar from "../components/sidebar/SideBar";
import { ToastContainer } from "react-toastify";
import { SearchContextProvider } from "../context/SearchContext";
import "react-toastify/dist/ReactToastify.css";
import "./Body.css";

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  const user = useGetAdmin();
  useTokenRenewal();

  const [isSidebarCollapsed] = useState(
    localStorage.getItem("isSidebarCollapsed") === "true"
  );

  if (!user) {
    return null;
  }

  return (
    <SearchContextProvider>
      <div className="app-container">
        <SideBar />
        <div className="content-body">
          <div className="header" />
          <CustomNavBar />
          <div className="content-scrollable">
            <ToastContainer position="bottom-right" />
            <div className="content-container">
              <div
                className={`content ${
                  isSidebarCollapsed ? "content-sidebar-collapsed" : ""
                }`}
              >
                <div className="content-body">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </SearchContextProvider>
  );
};

export default Body;
