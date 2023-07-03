import React from "react";
import { toast } from "react-toastify";

const notify = () => toast.error("Usuario Eliminado Correctamente!");

const ContentDashboard: React.FC = () => {
  return (
    <div style={{ marginTop: "10%" }}>
      <button onClick={notify}>Usuario Eliminado Correctamente!</button>
    </div>
  );
};

export default ContentDashboard;
