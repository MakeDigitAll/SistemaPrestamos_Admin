import React from "react";
import { useGetUsuariosPrestamistas } from "../../hooks/usegetUsuariosPrestamistas";

const ContentSuscripciones: React.FC = () => {
  //Obtiene los usuariosPrestamistas del hook useGetUsuarios
  const getUsuarios = useGetUsuariosPrestamistas();
  const usuariosPrestamistas = getUsuarios?.decodedToken?.usuariosPrestamistas;
  console.log(usuariosPrestamistas);
  return (
    <div>
      <h1>Suscripciones</h1>
    </div>
  );
};

export default ContentSuscripciones;
