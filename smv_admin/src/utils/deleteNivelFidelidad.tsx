import service from "../services/service";
import { toast } from "react-toastify";

const deleteNivelFidelidad = async (id: number) => {
  try {
    const response = await service.deleteNivelFidelidad(id);
    if (response.status === 200) {
      toast.success("Nivel Eliminado Correctamente");
      return response.data;
    } else {
      toast.error("Error al eliminar el Nivel de Fidelidad");
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      toast.error("Error al eliminar el Nivel", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }
};

export default deleteNivelFidelidad;
