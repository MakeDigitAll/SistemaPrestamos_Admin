import { useEffect, useState, useCallback } from "react";
import services from "../../services/service";
import { aesDecrypt, aesEncrypt } from "../../utils/encryption";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const useGetUsuariosPrestamistas = () => {
  const [usuariosPrestamistas, setUsuariosPrestamistas] = useState<any>([]);
  const [usuariosAfiliados, setUsuariosAfiliados] = useState<any>([]);

  const decryptDataPrestamista = (data: any) => {
    return {
      idUsuarioPrestamista: aesDecrypt(data.idUsuarioPrestamista),
      correoElectronico: aesDecrypt(data.correoElectronico),
      nombres: aesDecrypt(data.nombres),
      apellidos: aesDecrypt(data.apellidos),
      numeroTelefono: aesDecrypt(data.numeroTelefono),
      isActive: JSON.parse(aesDecrypt(data.isActive)),
      codigoReferencia: aesDecrypt(data.codigoReferencia),
      isCompletedSuscription: JSON.parse(
        aesDecrypt(data.isCompletedSuscription)
      ),
      isDeleted: JSON.parse(aesDecrypt(data.isDeleted)),
      isEmailConfirmed: JSON.parse(aesDecrypt(data.isEmailConfirmed)),

      //si hay suscripcion
      suscripcion:
        data.suscripcion === null ||
        data.suscripcion === undefined ||
        data.suscripcion === ""
          ? null
          : {
              idSuscripcion: aesDecrypt(data.suscripcion.idSuscripcion),
              idUsuarioPrestamista: aesDecrypt(
                data.suscripcion.idUsuarioPrestamista
              ),
              idNivelFidelidad: aesDecrypt(data.suscripcion.idNivelFidelidad),
              idTipoSuscripcion: aesDecrypt(data.suscripcion.idTipoSuscripcion),
              fechaInicio: aesDecrypt(data.suscripcion.fechaInicio),
              fechaFin: aesDecrypt(data.suscripcion.fechaFin),
              tiempoMeses: aesDecrypt(data.suscripcion.tiempoMeses),
              pagosAlCorriente: aesDecrypt(data.suscripcion.pagosAlCorriente),
              isActive: JSON.parse(aesDecrypt(data.suscripcion.isActive)),
            },

      //si hay nivel de fidelidad
      usuariosAfiliados:
        data.usuariosAfiliados === null ||
        data.usuariosAfiliados === undefined ||
        data.usuariosAfiliados === ""
          ? null
          : {
              usuariosAfiliados: data.usuariosAfiliados.map(
                (usuarioAfiliado: any) => {
                  return {
                    idUsuarioAfiliado: aesDecrypt(
                      usuarioAfiliado.idUsuarioAfiliado
                    ),
                    nombres: aesDecrypt(usuarioAfiliado.nombres),
                    apellidos: aesDecrypt(usuarioAfiliado.apellidos),
                    correoElectronico: aesDecrypt(
                      usuarioAfiliado.correoElectronico
                    ),
                    numeroTelefono: aesDecrypt(usuarioAfiliado.numeroTelefono),

                    //si hay prestamos
                    prestamos:
                      usuarioAfiliado.prestamos === null ||
                      usuarioAfiliado.prestamos === undefined ||
                      usuarioAfiliado.prestamos === ""
                        ? null
                        : {
                            prestamos: usuarioAfiliado.prestamos.map(
                              (prestamo: any) => {
                                return {
                                  idPrestamo: aesDecrypt(prestamo.idPrestamo),
                                  idUsuarioPrestamista: aesDecrypt(
                                    prestamo.idUsuarioPrestamista
                                  ),
                                  idUsuarioAfiliado: aesDecrypt(
                                    prestamo.idUsuarioAfiliado
                                  ),
                                  montoPorPagar: aesDecrypt(
                                    prestamo.montoPorPagar
                                  ),
                                  fechaProximoPago: aesDecrypt(
                                    prestamo.fechaProximoPago
                                  ),
                                  montoPrestado: aesDecrypt(
                                    prestamo.montoPrestado
                                  ),
                                  tiempoPrestamo: aesDecrypt(
                                    prestamo.tiempoPrestamo
                                  ),
                                  fechaPrestamo: aesDecrypt(
                                    prestamo.fechaPrestamo
                                  ),
                                  fechaFinPago: aesDecrypt(
                                    prestamo.fechaFinPago
                                  ),
                                  mesesRestantes: aesDecrypt(
                                    prestamo.mesesRestantes
                                  ),
                                  tasaInteresGeneral: aesDecrypt(
                                    prestamo.tasaInteresGeneral
                                  ),
                                  tasaInteresVencido: aesDecrypt(
                                    prestamo.tasaInteresVencido
                                  ),
                                  estadoPrestamo: aesDecrypt(
                                    prestamo.estadoPrestamo
                                  ),
                                  isActive: JSON.parse(
                                    aesDecrypt(prestamo.isActive)
                                  ),

                                  //si hay historial de pagos
                                  historialPagos:
                                    prestamo.historialPagos === null ||
                                    prestamo.historialPagos === undefined ||
                                    prestamo.historialPagos === ""
                                      ? null
                                      : prestamo.historialPagos.map(
                                          (pago: any) => {
                                            return {
                                              idHistorialPago: aesDecrypt(
                                                pago.idHistorialPago
                                              ),
                                              idPrestamo: aesDecrypt(
                                                pago.idPrestamo
                                              ),
                                              idUsuarioPrestamista: aesDecrypt(
                                                pago.idUsuarioPrestamista
                                              ),
                                              idUsuarioAfiliado: aesDecrypt(
                                                pago.idUsuarioAfiliado
                                              ),
                                              fechaPago: aesDecrypt(
                                                pago.fechaPago
                                              ),
                                              montoPagado: aesDecrypt(
                                                pago.montoPagado
                                              ),
                                              montoRestante: aesDecrypt(
                                                pago.montoRestante
                                              ),
                                              intereses: aesDecrypt(
                                                pago.intereses
                                              ),
                                              tipoPago: aesDecrypt(
                                                pago.tipoPago
                                              ),
                                              estadoPago: aesDecrypt(
                                                pago.estadoPago
                                              ),
                                            };
                                          }
                                        ),
                                };
                              }
                            ),
                          },
                  };
                }
              ),
            },
    };
  };

  const decryptDataAfiliado = (data: any) => {
    return {
      idUsuarioAfiliado: aesDecrypt(data.idUsuarioAfiliado),
      nombres: aesDecrypt(data.nombres),
      apellidos: aesDecrypt(data.apellidos),
      correoElectronico: aesDecrypt(data.correoElectronico),
      numeroTelefono: aesDecrypt(data.numeroTelefono),
      isOnPrestamo: JSON.parse(aesDecrypt(data.isOnPrestamo)),
      isDeleted: JSON.parse(aesDecrypt(data.isDeleted)),
      isEmailConfirmed: JSON.parse(aesDecrypt(data.isEmailConfirmed)),
      createdAt: aesDecrypt(data.createdAt),
    };
  };

  const fetchData = useCallback(async () => {
    try {
      //obtener la cookie accessToken
      const accessToken = Cookies.get("accessToken");
      //decodificar el token para obtener el idUsuarioAdministrador
      const encryptedAdmin: any = jwtDecode(accessToken as string);
      const idUser = JSON.parse(aesDecrypt(encryptedAdmin.id));

      const response = await services.getDashboardData(
        aesEncrypt(idUser.toString())
      );
      const usuariosDesencriptados = await Promise.all(
        response.data.usuarioPrestamista.map((usuario: any) =>
          decryptDataPrestamista(usuario.usuarioPrestamista)
        )
      );
      setUsuariosPrestamistas(usuariosDesencriptados);

      const usuariosAfiliadosDesencriptados = await Promise.all(
        response.data.usuariosAfiliados.map((usuario: any) =>
          decryptDataAfiliado(usuario)
        )
      );
      setUsuariosAfiliados(usuariosAfiliadosDesencriptados);
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
  return { usuariosPrestamistas, usuariosAfiliados, refetch };
};
