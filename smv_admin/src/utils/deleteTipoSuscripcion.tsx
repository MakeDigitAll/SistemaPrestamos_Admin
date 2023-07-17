import service from "../services/service";
import { toast } from "react-toastify";

const deleteTipoSuscripcion = async (id: number) => {
  try {
    const response = await service.deleteTipoSuscripcion(id);
    if (response.status === 200) {
      toast.success("Tipo de Suscripcion Eliminada Correctamente");
      return response.data;
    } else {
      toast.error("Error al eliminar el Tipo de Suscripcion");
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      toast.error("Error al eliminar el Tipo de Suscripcion", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }
};

export default deleteTipoSuscripcion;
