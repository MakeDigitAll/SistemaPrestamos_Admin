// ModalInfoUsuaio.tsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Avatar, Card, Text } from "@nextui-org/react";
import { UserPrestamista } from "../../../types/UserPrestamista";
import useGetPrestamista from "../../../hooks/useGetImagenPrestamista";
import { useTranslation } from "react-i18next";
interface InformacionUsuarioProps {
  user: UserPrestamista;
  onClose: () => void;
}

const ModalInfoUsuaio: React.FC<InformacionUsuarioProps> = ({
  user,
  onClose,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [nombre] = useState(user.nombres);
  const [apellidos] = useState(user.apellidos);
  const [correoElectronico] = useState(user.correoElectronico);
  const [codigoReferencia] = useState(user.codigoReferencia);
  const [telefono] = useState(user.numeroTelefono);
  const [idUsuarioPrestamista] = useState(user.idUsuarioPrestamista);
  //const [imagenPerfil] = useState(user.imagenPerfil);

  const imagenPerfil = useGetPrestamista(idUsuarioPrestamista);

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
      width="35%"
    >
      <Modal.Body>
        <Card
          variant="flat"
          css={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Avatar
            src={imagenPerfil}
            css={{
              marginRight: "10%",
              width: "150px",
              height: "150px",
            }}
          />
          <div>
            <Text h4 css={{ lineHeight: "$2xl" }}>
              {nombre} {apellidos}
            </Text>
            <Text h5 css={{ lineHeight: "$xs" }}>
              {correoElectronico}
            </Text>
            <Text h5 css={{ lineHeight: "$xs" }}>
              <span>{t("modalInfoUser.referalCode")}: </span>
              <span style={{ fontWeight: "bold" }}>{codigoReferencia}</span>
            </Text>
            <Text h5 css={{ lineHeight: "$xs" }}>
              <span>{t("modalInfoUser.phone")} </span>
              <span style={{ fontWeight: "bold" }}>{telefono}</span>
            </Text>
          </div>
        </Card>
      </Modal.Body>
      <Modal.Footer css={{ alignSelf: "center" }}>
        <Button auto color="error" onPress={closeHandler}>
          {t("modalInfoUser.close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfoUsuaio;
