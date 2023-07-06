export interface User {
  idUsuario: number;
  correoElectronico: string;
  nombres: string;
  apellidos: string;
  codigoReferencia: string | null;
  tipoUsuario: string;
  isActive: boolean;
  isDeleted: boolean;
  suscripcion: {
    idSuscripcion: number | null;
    tipoSuscripcion: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    estadoSuscripcion: string | null;
  } | null;
}
