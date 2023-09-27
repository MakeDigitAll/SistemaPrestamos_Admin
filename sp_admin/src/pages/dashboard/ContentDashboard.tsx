import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGetUsuariosPrestamistas } from "./getData";
import { UserPrestamista as UserTypePrestamista } from "../../types/UserPrestamista";
import { useTranslation } from "react-i18next";

const ContentDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getUsuarios = useGetUsuariosPrestamistas();
  const usuariosPrestamistas = getUsuarios.usuariosPrestamistas;
  const [usuariosActivos, setUsuariosActivos] = useState<UserTypePrestamista[]>(
    []
  );
  const [usuariosInactivos, setUsuariosInactivos] = useState<
    UserTypePrestamista[]
  >([]);
  const [usuariosEliminados, setUsuariosEliminados] = useState<
    UserTypePrestamista[]
  >([]);

  // Filtra los usuariosPrestamistas activos
  useEffect(() => {
    if (usuariosPrestamistas && usuariosPrestamistas.length > 0) {
      const filteredUsuariosActivos = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isActive &&
          !usuario.isDeleted &&
          usuario.isCompletedSuscription
      );
      setUsuariosActivos(filteredUsuariosActivos);

      const filteredUsuariosInactivos = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          !usuario.isActive &&
          !usuario.isDeleted &&
          usuario.isCompletedSuscription
      );
      setUsuariosInactivos(filteredUsuariosInactivos);

      const filteredUsuariosEliminados = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          !usuario.isActive &&
          usuario.isDeleted &&
          usuario.isCompletedSuscription
      );
      setUsuariosEliminados(filteredUsuariosEliminados);
    }
  }, [usuariosPrestamistas]);

  const data = [];

  if (usuariosActivos.length > 0) {
    data.push({
      name: t("dashboard.activos"),
      value: usuariosActivos.length,
      fill: "#749DC3",
    });
  }

  if (usuariosInactivos.length > 0) {
    data.push({
      name: t("dashboard.porSuscribir"),
      value: usuariosInactivos.length,
      fill: "#A9A9A9",
    });
  }

  if (usuariosEliminados.length > 0) {
    data.push({
      name: t("dashboard.eliminados"),
      value: usuariosEliminados.length,
      fill: "#E57373",
    });
  }

  const handlePieClick = (entry: any) => {
    // Realiza la redirección a la ubicación deseada según el nombre de la sección
    switch (entry.name) {
      case t("dashboard.activos"):
        navigate("/admin-usuarios-activos");
        break;
      case t("dashboard.porSuscribir"):
        navigate("/admin-suscribir-usuario");
        break;
      case t("dashboard.eliminados"):
        navigate("/admin-usuarios-eliminados");
        break;
      default:
        break;
    }
  };

  return (
    <Card
      style={{
        width: "fit-content",
      }}
    >
      <div>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3>{t("dashboard.usuariosPrestamistas")}</h3>
        </Card.Header>
        <Card.Body style={{ marginTop: "-20%" }}>
          {data.length > 0 ? (
            <PieChart width={300} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    onClick={() => handlePieClick(entry)}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <h4 style={{ textAlign: "center", marginTop: "20%" }}>
              {t("dashboard.noDatos")}
            </h4>
          )}
        </Card.Body>
      </div>
    </Card>
  );
};

export default ContentDashboard;
