import { useEffect, useState, useCallback } from "react";
import services from "../../services/service";
import { aesDecrypt } from "../../utils/encryption";

export const useGetUsuariosPrestamistas = () => {
  const [usuariosPrestamistas, setUsuariosPrestamistas] = useState<any>([]);

  const desencriptarUsuario = (usuario: any) => {
    return {
      idUsuarioPrestamista: JSON.parse(
        aesDecrypt(usuario.idUsuarioPrestamista)
      ),
      correoElectronico: aesDecrypt(usuario.correoElectronico),
      nombres: aesDecrypt(usuario.nombres),
      apellidos: aesDecrypt(usuario.apellidos),
      codigoReferencia: aesDecrypt(usuario.codigoReferencia),
      isActive: JSON.parse(aesDecrypt(usuario.isActive)),
      isDeleted: JSON.parse(aesDecrypt(usuario.isDeleted)),
      numeroTelefono: aesDecrypt(usuario.numeroTelefono),
      suscripciones: usuario.suscripciones.map((suscripcion: any) => {
        return {
          idSuscripcion: JSON.parse(aesDecrypt(suscripcion.idSuscripcion)),
          idUsuarioPrestamista: JSON.parse(
            aesDecrypt(suscripcion.idUsuarioPrestamista)
          ),
          idNivelFidelidad: JSON.parse(
            aesDecrypt(suscripcion.idNivelFidelidad)
          ),
          idTipoSuscripcion: JSON.parse(
            aesDecrypt(suscripcion.idTipoSuscripcion)
          ),
          fechaInicio: aesDecrypt(suscripcion.fechaInicio),
          fechaFin: aesDecrypt(suscripcion.fechaFin),
          isActive: JSON.parse(aesDecrypt(suscripcion.isActive)),
        };
      }),
    };
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await services.getAllUsuariosPrestamistas();
      const usuariosDesencriptados = await Promise.all(
        response.data.usuariosPrestamistas.map((usuario: any) =>
          desencriptarUsuario(usuario)
        )
      );
      setUsuariosPrestamistas(usuariosDesencriptados);
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching active users:", error);
    }
  };
  return { usuariosPrestamistas, refetch };
};
