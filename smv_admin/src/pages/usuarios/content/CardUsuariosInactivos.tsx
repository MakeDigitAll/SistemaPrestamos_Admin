import React from "react";
import {
  Card,
  Grid,
  Text,
  Row,
  Tooltip,
  Col,
  Loading,
} from "@nextui-org/react";
import { DeleteIcon } from "../../../resources/icons/DeleteIcon";
import { EditIcon } from "../../../resources/icons/EditIcon";
import { EyeIcon } from "../../../resources/icons/EyeIcon";
import { IconButton } from "../../../resources/icons/IconButton";
import { useGetUsuarios } from "../../../hooks/usegetUsuarios";
import { User } from "../../../types/types";

const CardUsuariosInactivos: React.FC = () => {
  const getUsuarios = useGetUsuarios();
  const usuarios = getUsuarios?.usuarios;

  if (!usuarios) {
    return (
      <Grid.Container
        justify="center"
        alignContent="center"
        gap={2}
        style={{ height: "100vh" }}
      >
        <Loading
          type="points-opacity"
          loadingCss={{
            $$loadingSize: "50px",
            $$loadingBorder: "10px",
          }}
        />
      </Grid.Container>
    );
  }

  return (
    <Grid.Container justify="flex-start" gap={2} css={{ marginLeft: "50px" }}>
      {usuarios.map((usuario: User) => (
        <Grid xs={6} sm={3.4} key={usuario.idUsuario}>
          <Card
            css={{
              p: "$2",
              mw: "400px",
              marginTop: "30px",
            }}
          >
            <Card.Header>
              <img
                alt="nextui logo"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width="60px"
                height="60px"
              />
              <Grid.Container css={{ pl: "$6" }}>
                <Grid xs={12}>
                  <Text h4 css={{ lineHeight: "$xs" }}>
                    {usuario.nombres} {usuario.apellidos}
                  </Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$4" }}>
              <Text>Tipo de Suscripcion: Tier 1</Text>
              <Text>
                Fecha de Pago:{" "}
                <strong style={{ color: "green" }}>30/07/2023</strong>
              </Text>

              <Text>
                Codigo de Referencia:{" "}
                <strong>{usuario.codigoReferencia}</strong>
              </Text>
            </Card.Body>

            <Card.Footer>
              <Row justify="center" align="center">
                <Col css={{ d: "flex", marginLeft: "50px" }}>
                  <Tooltip content="Details">
                    <IconButton onClick={() => console.log("View user")}>
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex", marginLeft: "70px" }}>
                  <Tooltip content="Edit user">
                    <IconButton onClick={() => console.log("Edit user")}>
                      <EditIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex", marginLeft: "70px" }}>
                  <Tooltip
                    content="Delete user"
                    color="error"
                    onClick={() => console.log("Delete user")}
                  >
                    <IconButton>
                      <DeleteIcon size={20} fill="#FF0080" />
                    </IconButton>
                  </Tooltip>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default CardUsuariosInactivos;
