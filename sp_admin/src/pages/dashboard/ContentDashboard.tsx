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
  const { usuariosPrestamistas, usuariosAfiliados } =
    useGetUsuariosPrestamistas();

  //-------------------------Usuarios Prestamistas---------------------
  const [usuariosActivos, setUsuariosActivos] = useState<UserTypePrestamista[]>(
    []
  );
  const [usuariosInactivos, setUsuariosInactivos] = useState<
    UserTypePrestamista[]
  >([]);
  const [usuariosEliminados, setUsuariosEliminados] = useState<
    UserTypePrestamista[]
  >([]);

  //usuarios prestamistas con correo no verificado
  const [
    usuariosPrestamistasNoVerificados,
    setUsuariosPrestamistasNoVerificados,
  ] = useState<UserTypePrestamista[]>([]);

  //usuarios con suscripcion incompleta
  const [
    usuariosPrestamistasSinSuscripcion,
    setUsuariosPrestaministasSinSuscripcion,
  ] = useState<UserTypePrestamista[]>([]);

  //---------------------Fin Usuarios Prestamistas---------------------

  //-------------------------Usuarios Afiliados---------------------
  //usuarios con prestamos
  const [usuariosConPrestamos, setUsuariosConPrestamos] = useState<
    UserTypePrestamista[]
  >([]);

  //usuarios disponibles (sin prestamos)
  const [usuariosDisponibles, setUsuariosDisponibles] = useState<
    UserTypePrestamista[]
  >([]);

  //usuarios eliminados
  const [usuariosEliminadosAfiliados, setUsuariosEliminadosAfiliados] =
    useState<UserTypePrestamista[]>([]);

  //usuarios con correo no verificado
  const [usuariosAfiliadosNoVerificados, setUsuariosAfiliadosNoVerificados] =
    useState<UserTypePrestamista[]>([]);

  //---------------------Fin Usuarios Afiliados---------------------

  //-------------------- Usuarios Totales ---------------------------
  const [usuariosTotalesActivosTotales, setUsuariosTotalesActivosTotales] =
    useState<UserTypePrestamista[]>([]);
  //UsuariosInactivos (eliminados)
  const [usuariosInactivosTotales, setUsuariosInactivosTotales] = useState<
    UserTypePrestamista[]
  >([]);

  //-------------------- Fin Usuarios Totales ---------------------------

  //obtener el elemento cliqueado en dataUsuariosPrestamistas chart
  const printElementAtEventUsersPrestamistas = (element: InteractionItem[]) => {
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

  //obtener el elemento cliqueado en dataUsuariosAfiliados chart
  const printElementAtEventUsersAfiliados = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { index } = element[0];
    console.log(dataUsuariosAfiliados.labels[index]);

    // //navegar segun el label de dataUsuariosPrestamistas
    // if (dataUsuariosAfiliados.labels[index] === t("otros.conPrestamo")) {
    //   navigate("/admin-usuarios-con-prestamo");
    // } else if (
    //   dataUsuariosAfiliados.labels[index] === t("otros.disponibles")
    // ) {
    //   navigate("/admin-usuarios-disponibles");
    // } else if (
    //   dataUsuariosAfiliados.labels[index] === t("otros.eliminados")
    // ) {
    //   navigate("/admin-usuarios-eliminados");
    // }
  };

  //obtener el elemento cliqueado en dataUsuariosTotales chart
  const printElementAtEventUsersTotales = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { index } = element[0];
    console.log(dataUsuariosTotales.labels[index]);

    // //navegar segun el label de dataUsuariosPrestamistas
    // if (dataUsuariosTotales.labels[index] === t("dashboard.activos")) {
    //   navigate("/admin-usuarios-activos");
    // } else if (
    //   dataUsuariosTotales.labels[index] === t("dashboard.eliminados")
    // ) {
    //   navigate("/admin-usuarios-eliminados");
    // }
  };

  // UseEffect para calcular los datos
  useEffect(() => {
    //filtrar usuarios prestamistas con correo no verificado
    const filteredUsuariosPrestamistasNoVerificados =
      usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isEmailConfirmed === false &&
          usuario.isCompletedSuscription === false &&
          usuario.isDeleted === false &&
          usuario.isActive === false
      );
    setUsuariosPrestamistasNoVerificados(
      filteredUsuariosPrestamistasNoVerificados
    );

    //filtrar usuarios prestamistas sin suscripcion
    const filteredUsuariosPrestamistasSinSuscripcion =
      usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isEmailConfirmed === true &&
          usuario.isCompletedSuscription === false &&
          usuario.isDeleted === false &&
          usuario.isActive === false
      );
    setUsuariosPrestaministasSinSuscripcion(
      filteredUsuariosPrestamistasSinSuscripcion
    );

    //filtrar usuarios prestamistas activos
    if (usuariosPrestamistas && usuariosPrestamistas.length > 0) {
      const filteredUsuariosActivos = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isEmailConfirmed === true &&
          usuario.isCompletedSuscription === true &&
          usuario.isDeleted === false &&
          usuario.isActive === true
      );
      setUsuariosActivos(filteredUsuariosActivos);

      const filteredUsuariosInactivos = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isEmailConfirmed === true &&
          usuario.isCompletedSuscription === true &&
          usuario.isDeleted === false &&
          usuario.isActive === false
      );
      setUsuariosInactivos(filteredUsuariosInactivos);

      const filteredUsuariosEliminados = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isDeleted === true && usuario.isActive === false
      );
      setUsuariosEliminados(filteredUsuariosEliminados);
    }

    //usuarios afiliados
    if (usuariosAfiliados && usuariosAfiliados.length > 0) {
      //filtrar usuarios afiliados con prestamos
      const filteredUsuariosConPrestamos = usuariosAfiliados.filter(
        (usuario: any) =>
          usuario.isEmailConfirmed === true &&
          usuario.isOnPrestamo === true &&
          usuario.isDeleted === false
      );
      setUsuariosConPrestamos(filteredUsuariosConPrestamos);

      //filtrar usuarios afiliados disponibles
      const filteredUsuariosDisponibles = usuariosAfiliados.filter(
        (usuario: any) =>
          usuario.isEmailConfirmed === true &&
          usuario.isOnPrestamo === false &&
          usuario.isDeleted === false
      );
      setUsuariosDisponibles(filteredUsuariosDisponibles);

      //filtrar usuarios afiliados eliminados
      const filteredUsuariosEliminadosAfiliados = usuariosAfiliados.filter(
        (usuario: any) =>
          usuario.isOnPrestamo === false && usuario.isDeleted === true
      );
      setUsuariosEliminadosAfiliados(filteredUsuariosEliminadosAfiliados);

      //filtrar usuarios afiliados con correo no verificado
      const filteredUsuariosAfiliadosNoVerificados = usuariosAfiliados.filter(
        (usuario: any) =>
          usuario.isEmailConfirmed === false &&
          usuario.isOnPrestamo === false &&
          usuario.isDeleted === false
      );
      setUsuariosAfiliadosNoVerificados(filteredUsuariosAfiliadosNoVerificados);
    }

    //usuarios totales activos prestamistas
    const filteredUsuariosTotalesActivosTotales = usuariosPrestamistas.filter(
      (usuario: any) => !usuario.isDeleted
    );

    //usuarios activos totales afiliados
    const filteredUsuariosActivosTotalesAfiliados = usuariosAfiliados.filter(
      (usuario: any) => !usuario.isDeleted
    );

    //usuarios activos totales
    const usuariosActivosTotales = [
      ...filteredUsuariosTotalesActivosTotales,
      ...filteredUsuariosActivosTotalesAfiliados,
    ];
    setUsuariosTotalesActivosTotales(usuariosActivosTotales);

    //usuarios inactivos totales prestamistas
    const filteredUsuariosInactivosTotales = usuariosPrestamistas.filter(
      (usuario: any) => usuario.isDeleted
    );

    //usuarios inactivos totales afiliados
    const filteredUsuariosInactivosTotalesAfiliados = usuariosAfiliados.filter(
      (usuario: any) => usuario.isDeleted
    );

    //usuarios inactivos totales
    const usuariosInactivosTotales = [
      ...filteredUsuariosInactivosTotales,
      ...filteredUsuariosInactivosTotalesAfiliados,
    ];
    setUsuariosInactivosTotales(usuariosInactivosTotales);
  }, [usuariosPrestamistas]);

  //datos del chart de usuarios prestamistas
  const dataUsuariosPrestamistas = {
    labels: [
      t("dashboard.activos"),
      t("dashboard.porSuscribir"),
      t("dashboard.eliminados"),
      t("otros.correoNoVerificado"),
      t("otros.sinSuscripcion"),
    ],
    datasets: [
      {
        data: [
          usuariosActivos.length.toString(),
          usuariosInactivos.length.toString(),
          usuariosEliminados.length.toString(),
          usuariosPrestamistasNoVerificados.length.toString(),
          usuariosPrestamistasSinSuscripcion.length.toString(),
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2.5,
      },
    ],
  };

  //datos del chart de usuarios afiliados
  const dataUsuariosAfiliados = {
    labels: [
      t("otros.conPrestamo"),
      t("otros.disponibles"),
      t("otros.eliminados"),
      t("otros.correoNoVerificado"),
    ],
    datasets: [
      {
        data: [
          usuariosConPrestamos.length.toString(),
          usuariosDisponibles.length.toString(),
          usuariosEliminadosAfiliados.length.toString(),
          usuariosAfiliadosNoVerificados.length.toString(),
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2.5,
      },
    ],
  };

  //datos del chart de usuarios totales
  const dataUsuariosTotales = {
    labels: [t("dashboard.activos"), t("dashboard.eliminados")],
    datasets: [
      {
        data: [
          usuariosTotalesActivosTotales.length.toString(),
          usuariosInactivosTotales.length.toString(),
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 2.5,
      },
    ],
  };

  //referencia al chart de usuarios prestamistas
  const chartRefUsersPrestamistas = useRef<ChartJS>(null) as any;
  const chartRefUsersAfiliados = useRef<ChartJS>(null) as any;
  const chartRefUsersTotales = useRef<ChartJS>(null) as any;
  //funcion para obtener el elemento cliqueado en dataUsuariosPrestamistas chart
  const onClickUsersPrestamistas = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRefUsersPrestamistas;

    if (!chart) {
      return;
    }
    printElementAtEventUsersPrestamistas(getElementAtEvent(chart, event));
  };

  //funcion para obtener el elemento cliqueado en dataUsuariosAfiliados chart
  const onClickUsersAfiliados = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRefUsersAfiliados;

    if (!chart) {
      return;
    }
    printElementAtEventUsersAfiliados(getElementAtEvent(chart, event));
  };

  //funcion para obtener el elemento cliqueado en dataUsuariosTotales chart
  const onClickUsersTotales = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRefUsersTotales;

    if (!chart) {
      return;
    }
    printElementAtEventUsersTotales(getElementAtEvent(chart, event));
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

      <div className={styles["usuariosAfiliados"]}>
        <Card className={styles["card"]}>
          <Card.Header className={styles["center"]}>
            <h3>{t("otros.usuariosAfiliados")}</h3>
          </Card.Header>
          <Card.Body>
            <Doughnut
              width={35}
              height={20}
              options={{ maintainAspectRatio: false }}
              onClick={onClickUsersAfiliados}
              data={dataUsuariosAfiliados} //
              ref={chartRefUsersAfiliados}
            />
          </Card.Body>
        </Card>
      </div>

      <div className={styles["UsuariosTotales"]}>
        <Card className={styles["card"]}>
          <Card.Header className={styles["center"]}>
            <h3>{t("otros.totalUsuarios")}</h3>
          </Card.Header>
          <Card.Body>
            <Doughnut
              width={35}
              height={20}
              options={{ maintainAspectRatio: false }}
              onClick={onClickUsersTotales}
              data={dataUsuariosTotales}
              ref={chartRefUsersTotales}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ContentDashboard;
