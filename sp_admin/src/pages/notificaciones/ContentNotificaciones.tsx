import React, { useState, useEffect } from "react";
import { Button, Card } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useGetAllNotificaciones from "./getData";
import styles from "./Notificaciones.module.css";
import { aesEncrypt } from "../../utils/encryption";
import db from "../../services/service";
import { toast } from "react-toastify";

const ContentProfile = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const { notificaciones, refetchNotifications } = useGetAllNotificaciones();

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
    setNotifications(notificaciones);
    if (notificaciones) {
      // filtrar notificaciones dependiendo el caso
      // todas las notificaciones sin leer
      const allUnread = notificaciones.filter(
        (notification: any) => JSON.parse(notification.isRead) === false
      );
      setNotificationsAllUnread(allUnread);
      // todas las notificaciones leídas
      const allReaded = notificaciones.filter(
        (notification: any) => JSON.parse(notification.isRead) === true
      );
      setNotificationsAllReaded(allReaded);

      // notificaciones de afiliados sin leer
      const afiliadosUnread = notificaciones.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === false &&
          JSON.parse(notification.isPrestamista) === false
      );
      setNotificationsAfiliadosUnread(afiliadosUnread);
      // notificaciones de afiliados leídas
      const afiliadosReaded = notificaciones.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === true &&
          JSON.parse(notification.isPrestamista) === false
      );
      setNotificationsAfiliadosReaded(afiliadosReaded);

      // notificaciones de prestamistas sin leer
      const prestamistasUnread = notificaciones.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === false &&
          JSON.parse(notification.isPrestamista) === true
      );
      setNotificationsPrestamistasUnread(prestamistasUnread);
      // notificaciones de prestamistas leídas
      const prestamistasReaded = notificaciones.filter(
        (notification: any) =>
          JSON.parse(notification.isRead) === true &&
          JSON.parse(notification.isPrestamista) === true
      );
      setNotificationsPrestamistasReaded(prestamistasReaded);
    }
  }, [notificaciones]);

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

  const handleMarkAsRead = async (idNotificacion: number) => {
    const encryptedId = aesEncrypt(idNotificacion.toString());
    try {
      const res = (await db.markNotificationAsRead(encryptedId)) as any;
      if (res.status === 200) {
        refetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNotification = async (idNotificacion: number) => {
    const encryptedId = aesEncrypt(idNotificacion.toString());
    try {
      const res = (await db.deleteNotification(encryptedId)) as any;
      if (res.status === 200) {
        toast.success("Notificación eliminada");
        refetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const timeDiff = Math.floor(
      (now.getTime() - notificationDate.getTime()) / 1000
    );

    if (timeDiff < 60) {
      return `${timeDiff} segundos atrás`;
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${
        minutes === 1 ? `Hace ${minutes} minuto` : `Hace ${minutes} minutos`
      }`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      return `${hours === 1 ? `Hace ${hours} hora` : `Hace ${hours} horas`}`;
    } else if (timeDiff < 604800) {
      const days = Math.floor(timeDiff / 86400);
      return `${days === 1 ? `Hace ${days} día` : `Hace ${days} días`}`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return notificationDate.toLocaleDateString(undefined, options);
    }
  };

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
          <Tab className={styles["label-second"]} label={t("Por Leer")} />
          <Tab className={styles["label-second"]} label={t("Leídos")} />
        </Tabs>

        {notificationsToRender.map((notification: any) => (
          <Card className={styles["card-noti"]}>
            <div key={notification.idNotificacion}>
              <Card.Header className={styles["card-noti-header"]}>
                <p>{notification.titulo}</p>
                <p>{formatDate(notification.createdAt)}</p>
              </Card.Header>
              <Card.Body className={styles["card-noti-body"]}>
                <p>{notification.descripcion}</p>
              </Card.Body>
              <Card.Footer className={styles["card-noti-footer"]}>
                {subTabValue === 0 && (
                  <Button
                    className={styles["button-footer"]}
                    onPress={() =>
                      handleMarkAsRead(notification.idNotificacion)
                    }
                  >
                    <p>{t("Marcar como leído")}</p>
                  </Button>
                )}
                <Button
                  color={"error"}
                  className={styles["button-footer"]}
                  onPress={() =>
                    handleDeleteNotification(notification.idNotificacion)
                  }
                >
                  <p>{t("Eliminar")}</p>
                </Button>
              </Card.Footer>
            </div>
          </Card>
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
          <Tab className={styles["label-second"]} label={t("Por Leer")} />
          <Tab className={styles["label-second"]} label={t("Leídos")} />
        </Tabs>

        {notificationsToRender.map((notification: any) => (
          <Card className={styles["card-noti"]}>
            <div key={notification.idNotificacion}>
              <Card.Header className={styles["card-noti-header"]}>
                <p>{notification.titulo}</p>
              </Card.Header>
              <Card.Body className={styles["card-noti-body"]}>
                <p>{notification.descripcion}</p>
              </Card.Body>
              <Card.Footer className={styles["card-noti-footer"]}>
                {subTabValue === 0 && (
                  <Button
                    className={styles["button-footer"]}
                    onPress={() =>
                      handleMarkAsRead(notification.idNotificacion)
                    }
                  >
                    <p>{t("Marcar como leído")}</p>
                  </Button>
                )}
                <Button
                  color={"error"}
                  className={styles["button-footer"]}
                  onPress={() =>
                    handleDeleteNotification(notification.idNotificacion)
                  }
                >
                  <p>{t("Eliminar")}</p>
                </Button>
              </Card.Footer>
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
          <Tab className={styles["label-second"]} label={t("Por Leer")} />
          <Tab className={styles["label-second"]} label={t("Leídos")} />
        </Tabs>
        {notificationsToRender.map((notification: any) => (
          <Card className={styles["card-noti"]}>
            <div key={notification.idNotificacion}>
              <Card.Header className={styles["card-noti-header"]}>
                <p>{notification.titulo}</p>
              </Card.Header>
              <Card.Body className={styles["card-noti-body"]}>
                <p>{notification.descripcion}</p>
              </Card.Body>
              <Card.Footer className={styles["card-noti-footer"]}>
                {subTabValue === 0 && (
                  <Button
                    className={styles["button-footer"]}
                    onPress={() =>
                      handleMarkAsRead(notification.idNotificacion)
                    }
                  >
                    <p>{t("Marcar como leído")}</p>
                  </Button>
                )}
                <Button
                  color={"error"}
                  className={styles["button-footer"]}
                  onPress={() =>
                    handleDeleteNotification(notification.idNotificacion)
                  }
                >
                  <p>{t("Eliminar")}</p>
                </Button>
              </Card.Footer>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <p className={styles["title"]}>{t("Notificaciones")}</p>
      <Card className={styles["card-main"]}>
        <div>
          <Tabs
            className={styles["tabs-main"]}
            centered
            value={tabValue}
            onChange={handleTabChange}
            style={{ marginLeft: "10px" }}
          >
            <Tab className={styles["label"]} label={t("Todas")} />
            <Tab className={styles["label"]} label={t("Prestamistas")} />
            <Tab className={styles["label"]} label={t("Afiliados")} />
          </Tabs>
          {tabValue === 0 ? renderAllTab() : null}
          {tabValue === 1 ? renderPrestamistaTab() : null}
          {tabValue === 2 ? renderAfiliadoTab() : null}
        </div>
      </Card>
    </div>
  );
};

export default ContentProfile;
