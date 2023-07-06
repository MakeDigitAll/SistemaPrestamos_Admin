import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGetUsuarios } from "../../hooks/usegetUsuarios";
import { User as UserType } from "../../types/types";

const ContentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const getUsuarios = useGetUsuarios();
  const usuarios = getUsuarios?.decodedToken?.usuarios;
  const [usuariosActivos, setUsuariosActivos] = useState<UserType[]>([]);
  const [usuariosInactivos, setUsuariosInactivos] = useState<UserType[]>([]);
  const [usuariosEliminados, setUsuariosEliminados] = useState<UserType[]>([]);

  // Filtra los usuarios activos
  useEffect(() => {
    if (usuarios && usuarios.length > 0) {
      const filteredUsuariosActivos = usuarios.filter(
        (usuario: UserType) => usuario.isActive && !usuario.isDeleted
      );
      setUsuariosActivos(filteredUsuariosActivos);

      const filteredUsuariosInactivos = usuarios.filter(
        (usuario: UserType) => !usuario.isActive && !usuario.isDeleted
      );
      setUsuariosInactivos(filteredUsuariosInactivos);

      const filteredUsuariosEliminados = usuarios.filter(
        (usuario: UserType) => !usuario.isActive && usuario.isDeleted
      );
      setUsuariosEliminados(filteredUsuariosEliminados);
    }
  }, [usuarios]);

  const data = [
    { name: "Activos", value: usuariosActivos.length, fill: "#749DC3" },
    { name: "Inactivos", value: usuariosInactivos.length, fill: "#A9A9A9" },
    { name: "Eliminados", value: usuariosEliminados.length, fill: "#E57373" },
  ];

  const handlePieClick = (entry: any) => {
    // Realiza la redirección a la ubicación deseada según el nombre de la sección
    switch (entry.name) {
      case "Activos":
        navigate("/usuarios-activos");
        break;
      case "Inactivos":
        navigate("/usuarios-inactivos");
        break;
      case "Eliminados":
        navigate("/usuarios-eliminados");
        break;
      default:
        break;
    }
  };

  return usuariosActivos.length > 0 ? (
    <Card style={{ marginTop: "7%" }} css={{ width: "20%" }}>
      <div>
        <Card.Header style={{ display: "flex", justifyContent: "center" }}>
          <h3>Usuarios</h3>
        </Card.Header>
        <Card.Body style={{ marginTop: "-25%", marginBottom: "-10%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
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
          </ResponsiveContainer>
        </Card.Body>
      </div>
    </Card>
  ) : (
    <div style={{ marginTop: "10%" }}></div>
  );
};

export default ContentDashboard;
