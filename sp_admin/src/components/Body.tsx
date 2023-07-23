import React, { useState } from "react";
import { useGetAdmin } from "../hooks/useGetAdmin";
import useTokenRenewal from "../hooks/useTokenRenewal";
import { ToastContainer } from "react-toastify";
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
    <div>
      <ToastContainer position="bottom-right" />
      <div
        className={`content ${
          isSidebarCollapsed ? "content-sidebar-collapsed" : ""
        }`}
      >
        <div className="content-body">{children}</div>
      </div>
    </div>
  );
};

export default Body;
