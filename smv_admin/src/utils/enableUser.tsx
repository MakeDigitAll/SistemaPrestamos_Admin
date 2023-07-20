import service from "../services/service";
import { toast } from "react-toastify";

const enableUser = async (idUsuario: number) => {
  try {
    const response = await service.enableUser(idUsuario);
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Error al Habilitar el usuario");
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      toast.error("Error al Habilitar el usuario");
    }
  }
};

export default enableUser;
