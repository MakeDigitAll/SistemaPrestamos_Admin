import { Card, Text, Badge, Grid } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import useGetImagenAdmin from "../../hooks/useGetImagenAdmin";
import ProfileImageUpload from "../../utils/imagenProfileAdmin";

const ContentProfile = () => {
  const user = useGetAdmin();
  const { t } = useTranslation();
  const idAdmin = user?.id;
  const imagenPerfil = useGetImagenAdmin(idAdmin);

  if (!user) {
    return null;
  }

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
          {idAdmin && (
            <ProfileImageUpload idAdmin={idAdmin} imagenPerfil={imagenPerfil} />
          )}
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
