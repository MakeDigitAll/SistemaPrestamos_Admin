import React from "react";
import { Card, Avatar, Text, Badge, Grid } from "@nextui-org/react";

const ContentAddUsuario: React.FC = () => {
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
            Nombre
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat"></Badge>
          </Grid>

          <Text h3 css={{ textAlign: "center" }}>
            Apellidos
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat"></Badge>
          </Grid>
          <Text h3 css={{ textAlign: "center" }}>
            Correo Electronico
          </Text>
          <Grid css={{ justifyContent: "center", alignSelf: "center" }}>
            <Badge disableOutline variant="flat"></Badge>
          </Grid>
        </Card.Body>

        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
};

export default ContentAddUsuario;
