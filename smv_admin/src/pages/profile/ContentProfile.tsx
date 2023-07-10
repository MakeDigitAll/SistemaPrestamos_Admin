import React, { useRef } from "react";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import { Card, Avatar, Text, Badge, Grid } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const ContentProfile: React.FC = () => {
  const user = useGetAdmin();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    // Realiza las operaciones necesarias con la imagen seleccionada
    console.log(file);
  };

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
        <Card.Header>
          <Avatar
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png"
            zoomed
            css={{
              margin: "auto",
              height: "150px",
              width: "150px",
              marginTop: "2%",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
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
