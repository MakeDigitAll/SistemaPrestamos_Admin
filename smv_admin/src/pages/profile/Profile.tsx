import React from "react";
import { useGetAdmin } from "../../hooks/useGetAdmin";
import useTokenRenewal from "../../hooks/useTokenRenewal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Card, Avatar, Text, Badge, Grid } from "@nextui-org/react";

const Profile: React.FC = () => {
  const user = useGetAdmin();
  useTokenRenewal();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
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
            ID Usuario
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat">
              {user.id}
            </Badge>
          </Grid>
          <Text h3 css={{ textAlign: "center" }}>
            Nombre
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat">
              {user.nombres}
            </Badge>
          </Grid>

          <Text h3 css={{ textAlign: "center" }}>
            Apellidos
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat">
              {user.apellidos}
            </Badge>
          </Grid>
          <Text h3 css={{ textAlign: "center" }}>
            Correo Electronico
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat">
              {user.correoElectronico}
            </Badge>
          </Grid>
        </Card.Body>

        <Card.Footer></Card.Footer>
      </Card>

      <Footer />
    </div>
  );
};

export default Profile;
