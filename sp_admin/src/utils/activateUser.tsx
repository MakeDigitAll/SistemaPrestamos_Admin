import service from "../services/service";
import { toast } from "react-toastify";

const activateSuscripcionUsuario = async (
  idUsuario: number,
  idSuscripcion: number
) => {
  try {
    const response = await service.activateSuscripcionUsuario(
      idUsuario,
      idSuscripcion
    );
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Error al activar el usuario");
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      toast.error("Error al activar el usuario");
    }
  }
};

export default activateSuscripcionUsuario;
