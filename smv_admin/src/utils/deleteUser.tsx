import service from "../services/service";

const deleteUser = async (id: number) => {
  try {
    const response = await service.deleteUsuarioPrestamista(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default deleteUser;
