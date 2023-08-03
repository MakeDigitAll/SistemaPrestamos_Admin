import { useContext } from "react";
import { Card, Text, Badge, Grid } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import ProfileImageUpload from "../../utils/imagenProfileAdmin";
import { ImageContext } from "../../context/ImageContext";
import jwtDecode from "jwt-decode";
import { aesDecrypt } from "../../utils/encryption";
import Cookies from "js-cookie";

const ContentProfile = () => {
  const { t } = useTranslation();
  var { profileImage } = useContext(ImageContext);

  //obtener el token de las cookies
  const userToken = Cookies.get("accessToken");
  if (!userToken) {
    return null;
  }

  const encryptedAdmin: any = jwtDecode(userToken);
  const idUser = JSON.parse(aesDecrypt(encryptedAdmin.id));
  const nombres = aesDecrypt(encryptedAdmin.nombres);
  const apellidos = aesDecrypt(encryptedAdmin.apellidos);
  const email = aesDecrypt(encryptedAdmin.correoElectronico);

  const user: any = {
    id: idUser,
    nombres: nombres,
    apellidos: apellidos,
    correoElectronico: email,
  };

  return (
    <div>
      <Card
        css={{
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
        }}
      >
        <Card.Header
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProfileImageUpload idAdmin={idUser} imagenPerfil={profileImage} />
        </Card.Header>

        <Card.Body>
          <Text h3 css={{ textAlign: "center" }}>
            {t("profile.idUsuario")}
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat" css={{ fontSize: "20px" }}>
              {user.id}
            </Badge>
          </Grid>
          <Text h3 css={{ textAlign: "center" }}>
            {t("profile.nombres")}
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat" css={{ fontSize: "20px" }}>
              {user.nombres}
            </Badge>
          </Grid>

          <Text h3 css={{ textAlign: "center" }}>
            {t("profile.apellidos")}
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat" css={{ fontSize: "20px" }}>
              {user.apellidos}
            </Badge>
          </Grid>
          <Text h3 css={{ textAlign: "center" }}>
            {t("profile.email")}
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat" css={{ fontSize: "20px" }}>
              {user.correoElectronico}
            </Badge>
          </Grid>
        </Card.Body>

        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
};

export default ContentProfile;
