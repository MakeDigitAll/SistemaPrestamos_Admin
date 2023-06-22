import http from "../http-common";

class AdminDataService {
  getAll() {
    return http.get("/administradores");
  }

  get(id) {
    return http.get(`/admin/${id}`);
  }

  create(data) {
    return http.post("/admin", data);
  }

  update(id, data) {
    return http.put(`/admin/${id}`, data);
  }

  //comprobar si el administrador existe en la base de datos y si la contraseña es correcta
  login(correo_electronico, passwd) {
    return http.get(
      `/administradores/login?correo_electronico=${correo_electronico}&passwd=${passwd}`
    );
  }
}
export default new AdminDataService();
