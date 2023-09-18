import React, { useState, useEffect } from "react";
import { Card, Text, Badge, Grid } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useGetAllNotificaciones } from "./getData";
import styles from "./Notificaciones.module.css";

const ContentProfile = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const data = useGetAllNotificaciones();
  const [notifications, setNotifications] = useState<any>([]);

  const [notificationsAllUnread, setNotificationsAllUnread] = useState<any>([]);
  const [notificationsAllReaded, setNotificationsAllReaded] = useState<any>([]);
  const [notificationsAfiliadosUnread, setNotificationsAfiliadosUnread] =
    useState<any>([]);
  const [notificationsAfiliadosReaded, setNotificationsAfiliadosReaded] =
    useState<any>([]);
  const [notificationsPrestamistasReaded, setNotificationsPrestamistasReaded] =
    useState<any>([]);
  const [notificationsPrestamistasUnread, setNotificationsPrestamistasUnread] =
    useState<any>([]);

  const [subTabValue, setSubTabValue] = useState(0);

  useEffect(() => {
    setNotifications(data);
    if (data) {
      // filtrar notificaciones dependiendo el caso
      // todas las notificaciones sin leer
      const allUnread = data.filter(
        (notification: any) => JSON.parse(notification.isRead) === false
      );
      setNotificationsAllUnread(allUnread);
      // todas las notificaciones leídas
      const allReaded = data.filter(
        (notification: any) => JSON.parse(notification.isRead) === true
      );
      setNotificationsAllReaded(allReaded);

      // notificaciones de afiliados sin leer
      const afiliadosUnread = data.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === false &&
          JSON.parse(notification.isPrestamista) === false
      );
      setNotificationsAfiliadosUnread(afiliadosUnread);
      // notificaciones de afiliados leídas
      const afiliadosReaded = data.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === true &&
          JSON.parse(notification.isPrestamista) === false
      );
      setNotificationsAfiliadosReaded(afiliadosReaded);

      // notificaciones de prestamistas sin leer
      const prestamistasUnread = data.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === false &&
          JSON.parse(notification.isPrestamista) === true
      );
      setNotificationsPrestamistasUnread(prestamistasUnread);
      // notificaciones de prestamistas leídas
      const prestamistasReaded = data.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === true &&
          JSON.parse(notification.isPrestamista) === true
      );
      setNotificationsPrestamistasReaded(prestamistasReaded);
    }
  }, [data]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSubTabValue(newValue);
  };

  if (!notifications) {
    return null;
  }

  const renderAllTab = () => {
    const notificationsToRender =
      subTabValue === 0 ? notificationsAllUnread : notificationsAllReaded;

    return (
      <div>
        <Tabs
          centered
          value={subTabValue}
          onChange={handleSubTabChange}
          style={{ marginLeft: "10px" }}
        >
          <Tab label={t("Por Leer")} />
          <Tab label={t("Leídos")} />
        </Tabs>
        {notificationsToRender.map((notification: any) => (
          <div key={notification.idNotificacion}>
            {/* Renderizar la información de cada notificación */}
            <p>{notification.titulo}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderPrestamistaTab = () => {
    const notificationsToRender =
      subTabValue === 0
        ? notificationsPrestamistasUnread
        : notificationsPrestamistasReaded;

    return (
      <div>
        <Tabs
          centered
          value={subTabValue}
          onChange={handleSubTabChange}
          style={{ marginLeft: "10px" }}
        >
          <Tab label={t("Por Leer")} />
          <Tab label={t("Leídos")} />
        </Tabs>

        {notificationsToRender.map((notification: any) => (
          <Card>
            <div key={notification.idNotificacion}>
              <p>{notification.titulo}</p>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderAfiliadoTab = () => {
    const notificationsToRender =
      subTabValue === 0
        ? notificationsAfiliadosUnread
        : notificationsAfiliadosReaded;

    return (
      <div>
        <Tabs
          centered
          value={subTabValue}
          onChange={handleSubTabChange}
          style={{ marginLeft: "10px" }}
        >
          <Tab label={t("Por Leer")} />
          <Tab label={t("Leídos")} />
        </Tabs>
        {notificationsToRender.map((notification: any) => (
          <div key={notification.idNotificacion}>
            {/* Renderizar la información de cada notificación */}
            <p>{notification.titulo}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={styles["center"]} style={{ marginTop: "2%" }}>
      <div>
        <Tabs
          centered
          value={tabValue}
          onChange={handleTabChange}
          style={{ marginLeft: "10px" }}
        >
          <Tab label={t("Todas")} />
          <Tab label={t("Prestamistas")} />
          <Tab label={t("Afiliados")} />
        </Tabs>
        {tabValue === 0 ? renderAllTab() : null}
        {tabValue === 1 ? renderPrestamistaTab() : null}
        {tabValue === 2 ? renderAfiliadoTab() : null}
      </div>
    </Card>
  );
};

export default ContentProfile;
