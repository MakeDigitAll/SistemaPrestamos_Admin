import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGetUsuariosPrestamistas } from "./getData";
import { UserPrestamista as UserTypePrestamista } from "../../types/UserPrestamista";
import { useTranslation } from "react-i18next";
import styles from "./Dashboard.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { InteractionItem } from "chart.js";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { index } = element[0];

    console.log(data.labels[index]);

    //navegar segun el label
    if (data.labels[index] === t("dashboard.activos")) {
      navigate("/admin-usuarios-activos");
    } else if (data.labels[index] === t("dashboard.porSuscribir")) {
      navigate("/admin-suscribir-usuario");
    } else if (data.labels[index] === t("dashboard.eliminados")) {
      navigate("/admin-usuarios-eliminados");
    }
  };

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

  const data = {
    labels: [
      t("dashboard.activos"),
      t("dashboard.porSuscribir"),
      t("dashboard.eliminados"),
    ],
    datasets: [
      {
        data: [
          usuariosActivos.length.toString(),
          usuariosInactivos.length.toString(),
          usuariosEliminados.length.toString(),
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2.5,
      },
    ],
  };

  const chartRef = useRef<ChartJS>(null) as any;

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }
    printElementAtEvent(getElementAtEvent(chart, event));
  };
  return (
    <div className={styles["layout"]}>
      <div className={styles["usuariosPrestamistas"]}>
        <Card className={styles["card"]}>
          <div>
            <Card.Header>
              <h3>{t("dashboard.usuariosPrestamistas")}</h3>
            </Card.Header>
            <Card.Body>
              <Doughnut onClick={onClick} data={data} ref={chartRef} />
            </Card.Body>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentDashboard;
