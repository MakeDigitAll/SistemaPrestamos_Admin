import http from "../api/axios";

class AdminDataService {
  update(id: number, data: any) {
    return http.put(`/administradores/${id}`, data);
  }

  // Comprobar si el administrador existe en la base de datos y si la contraseña es correcta sin credenciales
  login(correoElectronico: string, adminPassword: string) {
    return http.get(
      `/administradores/login?correoElectronico=${correoElectronico}&adminPassword=${adminPassword}`,
      { withCredentials: false }
    );
  }
  // Refrescar el token de administrador
  refreshToken(refreshToken: any) {
    return http.get(
      `/administradores/refreshToken?refreshToken=${refreshToken}`,
      { withCredentials: false }
    );
  }
  //obtener todos los usuarios
  getAllUsuarios() {
    return http.get("/usuarios-prestamistas");
  }

  //registrar un usuario
  createUsuarioPrestamista(data: any) {
    return http.post("/new-usuario-prestamista", data);
  }
}

const adminDataServiceInstance = new AdminDataService();
export default adminDataServiceInstance;
