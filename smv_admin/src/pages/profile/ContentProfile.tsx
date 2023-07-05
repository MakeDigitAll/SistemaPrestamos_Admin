import React from "react";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import { Card, Avatar, Text, Badge, Grid } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const ContentProfile: React.FC = () => {
  const user = useGetAdmin();
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Card
        css={{
          width: "450px",
          height: "600px",
          margin: "auto",
          marginTop: "3%",
        }}
      >
        <Card.Header>
          <Avatar
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png"
            zoomed
            css={{
              margin: "auto",
              height: "150px",
              width: "150px",
              marginTop: "2%",
            }}
          />
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
