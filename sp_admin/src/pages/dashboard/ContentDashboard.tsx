import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useGetUsuariosPrestamistas } from "./getData";
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
  const [usuariosActivos, setUsuariosActivos] = useState<any[]>([]);
  const [usuariosInactivos, setUsuariosInactivos] = useState<any[]>([]);
  const [usuariosEliminados, setUsuariosEliminados] = useState<any[]>([]);

  //usuarios prestamistas con correo no verificado
  const [
    usuariosPrestamistasNoVerificados,
    setUsuariosPrestamistasNoVerificados,
  ] = useState<any[]>([]);

  //usuarios con suscripcion incompleta
  const [
    usuariosPrestamistasSinSuscripcion,
    setUsuariosPrestaministasSinSuscripcion,
  ] = useState<any[]>([]);

  //---------------------Fin Usuarios Prestamistas---------------------

  //-------------------------Usuarios Afiliados---------------------
  //usuarios con prestamos
  const [usuariosConPrestamos, setUsuariosConPrestamos] = useState<any[]>([]);

  //usuarios disponibles (sin prestamos)
  const [usuariosDisponibles, setUsuariosDisponibles] = useState<any[]>([]);

  //usuarios eliminados
  const [usuariosEliminadosAfiliados, setUsuariosEliminadosAfiliados] =
    useState<any[]>([]);

  //usuarios con correo no verificado
  const [usuariosAfiliadosNoVerificados, setUsuariosAfiliadosNoVerificados] =
    useState<any[]>([]);

  const [ingresosMensuales, setIngresosMensuales] = useState<any[]>([]);

  //---------------------Fin Usuarios Afiliados---------------------

  //-------------------- Usuarios Totales ---------------------------
  const [usuariosTotalesActivosTotales, setUsuariosTotalesActivosTotales] =
    useState<any[]>([]);
  //UsuariosInactivos (eliminados)
  const [usuariosInactivosTotales, setUsuariosInactivosTotales] = useState<
    any[]
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
        (usuario: any) =>
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
        (usuario: any) =>
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
        (usuario: any) =>
          usuario.isEmailConfirmed === true &&
          usuario.isCompletedSuscription === true &&
          usuario.isDeleted === false &&
          usuario.isActive === true
      );
      setUsuariosActivos(filteredUsuariosActivos);

      //calcular los ingresos mensuales de los usuarios prestamistas activos (sumar el costoMembresia de cada uno)
      const ingresosMensuales = filteredUsuariosActivos.reduce(
        (a: any, b: any) => a + b.suscripcion.costoMembresia,
        0
      );

      setIngresosMensuales(ingresosMensuales);

      const filteredUsuariosInactivos = usuariosPrestamistas.filter(
        (usuario: any) =>
          usuario.isEmailConfirmed === true &&
          usuario.isCompletedSuscription === true &&
          usuario.isDeleted === false &&
          usuario.isActive === false
      );
      setUsuariosInactivos(filteredUsuariosInactivos);

      const filteredUsuariosEliminados = usuariosPrestamistas.filter(
        (usuario: any) =>
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
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86,  0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86,  0.8)",
          "rgba(255, 99, 132,  0.8)",
          "rgba(75, 192, 192,  0.8)",
          "rgba(153, 102, 255,  0.8)",
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
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235,  0.8)",
          "rgba(255, 206, 86,  0.8)",
          "rgba(255, 99, 132,  0.8)",
          "rgba(75, 192, 192, 0.8)",
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
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235,  0.8)", "rgba(255, 99, 132,  0.8)"],
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
        <div className={styles["center-card"]}>
          <Card className={styles["card"]}>
            <div className={styles["center"]}>
              <h3>{t("dashboard.usuariosPrestamistas")}</h3>
            </div>
            <Card.Body className={styles["body"]}>
              <Doughnut
                width={35}
                height={20}
                options={{ maintainAspectRatio: false }}
                onClick={onClickUsersPrestamistas}
                data={dataUsuariosPrestamistas}
                ref={chartRefUsersPrestamistas}
              />
            </Card.Body>
            <div className={styles["center"]}>
              <p className="text-small text-default-500">
                {t("otros.total")}
                {": "}
                {usuariosPrestamistas.length}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className={styles["usuariosAfiliados"]}>
        <div className={styles["center-card"]}>
          <Card className={styles["card"]}>
            <div className={styles["center"]}>
              <h3>{t("otros.usuariosAfiliados")}</h3>
            </div>
            <Card.Body className={styles["body"]}>
              <Doughnut
                width={35}
                height={20}
                options={{ maintainAspectRatio: false }}
                onClick={onClickUsersAfiliados}
                data={dataUsuariosAfiliados} //
                ref={chartRefUsersAfiliados}
              />
            </Card.Body>

            <div className={styles["center"]}>
              <p>
                {t("otros.total")}
                {": "}
                {usuariosAfiliados.length}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className={styles["UsuariosTotales"]}>
        <div className={styles["center-card"]}>
          <Card className={styles["card"]}>
            <div className={styles["center"]}>
              <h3>{t("otros.totalUsuarios")}</h3>
            </div>
            <Card.Body className={styles["body"]}>
              <Doughnut
                width={35}
                height={20}
                options={{ maintainAspectRatio: false }}
                onClick={onClickUsersTotales}
                data={dataUsuariosTotales}
                ref={chartRefUsersTotales}
              />
            </Card.Body>
            <div className={styles["center"]}>
              <p>
                {t("otros.total")}
                {": "}
                {usuariosTotalesActivosTotales.length +
                  usuariosInactivosTotales.length}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className={styles["ingresos"]}>
        <div className={styles["center-card"]}>
          <Card className={styles["card-bottom"]}>
            <div className={styles["center"]}>
              <h3>{t("otros.totalIngresos")}</h3>
            </div>
            <Card.Body className={styles["body"]}>
              <div className={styles["center"]}>
                <p className={styles["ingresos"]}>
                  {t("otros.total")}
                  {": $"}
                  {ingresosMensuales}
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className={styles["ultimosUsuarios"]}>
        <div className={styles["center-card"]}>
          <Card className={styles["card-bottom"]}>
            <div className={styles["center"]}>
              <h3>{t("otros.ultimosUsuarios")}</h3>
            </div>
            <Card.Body className={styles["body"]}></Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentDashboard;
