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

  //obtener el elemento cliqueado en dataUsuariosPrestamistas chart
  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { index } = element[0];

    //navegar segun el label de dataUsuariosPrestamistas
    if (dataUsuariosPrestamistas.labels[index] === t("dashboard.activos")) {
      navigate("/admin-usuarios-activos");
    } else if (
      dataUsuariosPrestamistas.labels[index] === t("dashboard.porSuscribir")
    ) {
      navigate("/admin-suscribir-usuario");
    } else if (
      dataUsuariosPrestamistas.labels[index] === t("dashboard.eliminados")
    ) {
      navigate("/admin-usuarios-eliminados");
    }
  };

  // UseEffect para calcular los datos
  useEffect(() => {
    //filtrar usuarios prestamistas
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

      //todo
    }
  }, [usuariosPrestamistas]);

  //datos del chart de usuarios prestamistas
  const dataUsuariosPrestamistas = {
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

  //referencia al chart de usuarios prestamistas
  const chartRefUsersPrestamistas = useRef<ChartJS>(null) as any;

  //funcion para obtener el elemento cliqueado en dataUsuariosPrestamistas chart
  const onClickUsersPrestamistas = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRefUsersPrestamistas;

    if (!chart) {
      return;
    }
    printElementAtEvent(getElementAtEvent(chart, event));
  };
  return (
    <div className={styles["layout"]}>
      <div className={styles["usuariosPrestamistas"]}>
        <Card className={styles["card"]}>
          <Card.Header className={styles["center"]}>
            <h3>{t("dashboard.usuariosPrestamistas")}</h3>
          </Card.Header>
          <Card.Body>
            <Doughnut
              width={35}
              height={20}
              options={{ maintainAspectRatio: false }}
              onClick={onClickUsersPrestamistas}
              data={dataUsuariosPrestamistas}
              ref={chartRefUsersPrestamistas}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ContentDashboard;
