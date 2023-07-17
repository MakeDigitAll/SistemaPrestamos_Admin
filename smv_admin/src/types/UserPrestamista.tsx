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
  suscripcion: {
    idSuscripcion: number | null;
    tipoSuscripcion: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    estadoSuscripcion: string | null;
  } | null;
  calidadPrestamista: {
    idCalidadPrestamista: number | null;
    montoDesde: number | null;
    montoHasta: number | null;
    numeroUsuarios: number | null;
    nombreNivel: string | null;
    costoMembresia: number | null;
  } | null;
}
