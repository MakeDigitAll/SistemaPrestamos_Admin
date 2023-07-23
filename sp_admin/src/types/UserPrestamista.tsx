export interface UserPrestamista {
  idUsuarioPrestamista: number;
  correoElectronico: string;
  nombres: string;
  apellidos: string;
  codigoReferencia: string | null;
  numeroTelefono: string | null;
  imagenPerfil: string | null;
  isActive: boolean;
  isDeleted: boolean;
  suscripciones: {
    idSuscripcion: number;
    fechaInicio: Date;
    fechaFin: Date;
    estadoSuscripcion: string;
    idNivelFidelidad: number;
    idTipoSuscripcion: number;
    idUsuarioPrestamista: number;
    isActive: boolean;
  }[];

  calidadPrestamista: {
    idCalidadPrestamista: number | null;
    montoDesde: number | null;
    montoHasta: number | null;
    numeroUsuarios: number | null;
    nombreNivel: string | null;
    costoMembresia: number | null;
  } | null;
}
