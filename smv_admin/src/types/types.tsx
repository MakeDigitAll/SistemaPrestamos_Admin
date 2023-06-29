export interface User {
  idUsuario: number;
  correoElectronico: string;
  nombres: string;
  apellidos: string;
  codigoReferencia: string | null;
  tipoUsuario: string;
  isActive: boolean;
  isDeleted: boolean;
}
