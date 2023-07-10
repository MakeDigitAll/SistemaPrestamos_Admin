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
}

const adminDataServiceInstance = new AdminDataService();
export default adminDataServiceInstance;
