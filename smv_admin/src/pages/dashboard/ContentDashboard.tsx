import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGetUsuariosPrestamistas } from "../../hooks/userPrestamistas/usegetAllUsuarios";
import { UserPrestamista as UserTypePrestamista } from "../../types/UserPrestamista";

const ContentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const getUsuarios = useGetUsuariosPrestamistas();
  const usuariosPrestamistas = getUsuarios?.decodedToken?.usuariosPrestamistas;
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
        (usuario: UserTypePrestamista) => usuario.isActive && !usuario.isDeleted
      );
      setUsuariosActivos(filteredUsuariosActivos);

      const filteredUsuariosInactivos = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          !usuario.isActive && !usuario.isDeleted
      );
      setUsuariosInactivos(filteredUsuariosInactivos);

      const filteredUsuariosEliminados = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) => !usuario.isActive && usuario.isDeleted
      );
      setUsuariosEliminados(filteredUsuariosEliminados);
    }
  }, [usuariosPrestamistas]);

  const data = [];

  if (usuariosActivos.length > 0) {
    data.push({
      name: "Activos",
      value: usuariosActivos.length,
      fill: "#749DC3",
    });
  }

  if (usuariosInactivos.length > 0) {
    data.push({
      name: "Por Suscribir",
      value: usuariosInactivos.length,
      fill: "#A9A9A9",
    });
  }

  if (usuariosEliminados.length > 0) {
    data.push({
      name: "Eliminados",
      value: usuariosEliminados.length,
      fill: "#E57373",
    });
  }

  const handlePieClick = (entry: any) => {
    // Realiza la redirección a la ubicación deseada según el nombre de la sección
    switch (entry.name) {
      case "Activos":
        navigate("/admin-usuarios-activos");
        break;
      case "Por Suscribir":
        navigate("/admin-suscribir-usuario");
        break;
      case "Eliminados":
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
          <h3>Usuarios Prestamistas</h3>
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
              No hay datos disponibles para graficar
            </h4>
          )}
        </Card.Body>
      </div>
    </Card>
  );
};

export default ContentDashboard;
