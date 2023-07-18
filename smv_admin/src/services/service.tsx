import http from "../api/axios";

class AdminDataService {
  update(id: number, data: any) {
    return http.put(`/admin/${id}`, data);
  }

  // Comprobar si el administrador existe en la base de datos y si la contraseña es correcta sin credenciales
  login(correoElectronico: string, adminPassword: string) {
    return http.get(
      `/admin/login?correoElectronico=${correoElectronico}&adminPassword=${adminPassword}`,
      { withCredentials: false }
    );
  }
  // Refrescar el token de administrador
  refreshToken(refreshToken: any) {
    return http.get(`/admin/refreshToken?refreshToken=${refreshToken}`, {
      withCredentials: false,
    });
  }
  //obtener todos los usuarios prestamistas
  getAllUsuariosPrestamistas() {
    return http.get("/admin-allusuarios-prestamistas");
  }

  //obtener todos los usuarios prestamistas activos
  getAllUsuariosActivos() {
    return http.get("/admin-allusuarios-prestamistas-activos");
  }

  //obtener todos los usuarios prestamistas pendientes de activar suscripción
  getAllUsuariosInactivos() {
    return http.get("/admin-allusuarios-prestamistas-inactivos");
  }

  //obtener todos los usuarios prestamistas eliminados
  getAllUsuariosEliminados() {
    return http.get("/admin-allusuarios-prestamistas-eliminados");
  }

  //registrar un usuario
  createUsuarioPrestamista(data: any) {
    return http.post("/admin-new-usuario-prestamista", data);
  }

  //deleteUsuarioPresamista
  deleteUsuarioPrestamista(id: number) {
    return http.delete(`/admin-del-usuario-prestamista/${id}`);
  }

  //updateUsuarioPrestamista
  updateUsuarioPrestamista(id: number, data: any) {
    return http.put(`/admin-update-usuario-prestamista/${id}`, data);
  }

  //  controllerUsuarios.setImageUsuarioPrestamista(req, res, id, image);
  setImageAdmin(id: number, image: any) {
    return http.post(`/admin-update-image/${id}`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  //imagen prestamista
  uploadUsuarioPrestamistaImage(id: number, image: any) {
    return http.post(`/admin-upload-usuario-prestamista-image/${id}`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  //recibir imagen  de tipo blob
  getImageAdmin(id: number) {
    return http.get(`/admin-get-image/${id}`, {
      responseType: "blob",
    });
  }

  //recibir imagen  de tipo blob
  getImagenPrestamista(id: number) {
    return http.get(`/admin-get-image-usuario-prestamista/${id}`, {
      responseType: "blob",
    });
  }

  //obtener la tabla de niveles de fidelidad
  getNivelesFidelidad() {
    return http.get("/admin-get-niveles-fidelidad");
  }

  //Actualizar los datos de nivel de fidelidad
  updateNivelFidelidad(id: number, data: any) {
    return http.put(`/admin-update-nivel-fidelidad/${id}`, data);
  }

  //eliminar un nivel de fidelidad
  deleteNivelFidelidad(id: number) {
    return http.delete(`/admin-delete-nivel-fidelidad/${id}`);
  }

  //crear un nivel de fidelidad
  agregarNivelFidelidad(data: any) {
    return http.post("/admin-add-nivel-fidelidad", data);
  }

  //obtener los tipos de suscripción
  getTiposSuscripcion() {
    return http.get("/admin-get-tipos-suscripcion");
  }

  //actualizar los datos de un tipo de suscripción
  updateTipoSuscripcion(id: number, data: any) {
    return http.put(`/admin-update-tipo-suscripcion/${id}`, data);
  }

  //eliminar un tipo de suscripción
  deleteTipoSuscripcion(id: number) {
    return http.delete(`/admin-delete-tipo-suscripcion/${id}`);
  }

  //crear un tipo de suscripción
  agregarTipoSuscripcion(data: any) {
    return http.post("/admin-add-tipo-suscripcion", data);
  }

  //obtener los tipos de suscripciónes
  getTipoSuscripciones() {
    return http.get("/admin-get-all-tipos-suscripciones-activas");
  }
}

const adminDataServiceInstance = new AdminDataService();
export default adminDataServiceInstance;
