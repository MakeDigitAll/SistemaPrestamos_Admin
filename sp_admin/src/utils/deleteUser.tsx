import service from "../services/service";
import { toast } from "react-toastify";

const deleteUser = async (id: number) => {
  try {
    const response = await service.deleteUsuarioPrestamista(id);
    if (response.status === 200) {
      toast.success("Usuario Eliminado Correctamente");
      return response.data;
    } else {
      toast.error("Error al eliminar el usuario");
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      toast.error("Error al eliminar el usuario", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }
};

export default deleteUser;
