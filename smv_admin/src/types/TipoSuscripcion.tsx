export interface TipoSuscripcion {
  idTipoSuscripcion: number;
  nombreSuscripcion: string;
  montoDesde: number;
  montoHasta: number;
  numeroUsuariosMax: number;
  costoMembresia: number;
  isDeleted: boolean;
  isUpdated: boolean;
}
