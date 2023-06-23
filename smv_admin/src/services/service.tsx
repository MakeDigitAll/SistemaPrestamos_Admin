import http from "../api/axios";

class AdminDataService {
  getAll() {
    return http.get("/administradores");
  }

  get(id: number) {
    return http.get(`/admin/${id}`);
  }

  create(data: any) {
    return http.post("/admin", data);
  }

  update(id: number, data: any) {
    return http.put(`/admin/${id}`, data);
  }

  // Comprobar si el administrador existe en la base de datos y si la contraseña es correcta sin credenciales
  login(correo_electronico: string, passwd: string) {
    return http.get(
      `/administradores/login?correo_electronico=${correo_electronico}&passwd=${passwd}`,
      { withCredentials: false }
    );
  }

  refreshToken(refreshToken: any) {
    return http.get(
      `/administradores/refreshToken?refreshToken=${refreshToken}`,
      { withCredentials: false }
    );
  }
}

const adminDataServiceInstance = new AdminDataService();
export default adminDataServiceInstance;
