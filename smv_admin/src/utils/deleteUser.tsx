import service from "../services/service";
import { toast } from "react-toastify";

const deleteUser = async (id: number) => {
  try {
    const response = await service.deleteUsuarioPrestamista(id);
    if (response.status === 200) {
      toast.success("Usuario Eliminado Correctamente", {
        position: "top-center",
        autoClose: 3000,
      });
      return response.data;
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
