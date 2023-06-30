import React from "react";
import { toast } from "react-toastify";

const notify = () => toast.success("Usuario Eliminado Correctamente!");

const ContentDashboard: React.FC = () => {
  return (
    <div>
      <button onClick={notify}>Usuario Eliminado Correctamente!</button>
    </div>
  );
};

export default ContentDashboard;
