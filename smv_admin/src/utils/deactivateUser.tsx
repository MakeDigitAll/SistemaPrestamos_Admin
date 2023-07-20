import service from "../services/service";
import { toast } from "react-toastify";

const deactivateSuscripcionUsuario = async (
  idUsuario: number,
  idSuscripcion: number
) => {
  try {
    const response = await service.deactivateSuscripcionUsuario(
      idUsuario,
      idSuscripcion
    );
    if (response.status === 200) {
      toast.success("Usuario Desactivado");
      return response.data;
    } else {
      toast.error("Error al desactivar el usuario");
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      toast.error("Error al desactivar el usuario");
    }
  }
};

export default deactivateSuscripcionUsuario;
