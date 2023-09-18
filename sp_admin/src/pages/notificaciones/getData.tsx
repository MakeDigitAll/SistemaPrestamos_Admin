import db from "../../services/service";
import { useState, useEffect, useCallback } from "react";
import { aesDecrypt } from "../../utils/encryption";

const useGetAllNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const decryptData = (data: any) => {
    return {
      idNotificacion: aesDecrypt(data.idNotificacion),
      idUsuarioNotification: aesDecrypt(data.idUsuarioNotification),
      titulo: aesDecrypt(data.titulo),
      descripcion: aesDecrypt(data.descripcion),
      isRead: aesDecrypt(data.isRead),
      isPrestamista: aesDecrypt(data.isPrestamista),
      createdAt: aesDecrypt(data.createdAt),
      updatedAt: aesDecrypt(data.updatedAt),
    };
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await db.getAllNotificaciones();
      // Desencriptar los datos recibidos
      const encryptedHistorialPagos = res.data;
      const decryptedHistorialPagos = encryptedHistorialPagos.map((data: any) =>
        decryptData(data)
      );

      // Establecer los datos desencriptados y mapeados en el estado
      setNotificaciones(decryptedHistorialPagos);
      setIsLoading(false);
    } catch (error: any) {
      if (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetchNotifications = () => {
    fetchData();
  };

  //si no hay prestamos
  if (isLoading) {
    return null;
  } else {
    return notificaciones;
  }
};

export { useGetAllNotificaciones };
