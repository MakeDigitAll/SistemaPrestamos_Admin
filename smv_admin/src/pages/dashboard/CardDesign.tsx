import React from "react";
import { Card, Grid, Text, Row, Tooltip, Col } from "@nextui-org/react";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { EditIcon } from "../../resources/icons/EditIcon";
import { EyeIcon } from "../../resources/icons/EyeIcon";
import { IconButton } from "../../resources/icons/IconButton";

const CardDesign: React.FC = ({}) => {
  return (
    <Card css={{ p: "$2", mw: "300px", marginTop: "50px", marginLeft: "50px" }}>
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
              Pablo Javier Alvarez Ramos
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
          Tipo de Suscripcion: <b>Tier 1</b>
        </Text>
        <Text>
          Fecha de Pago: <strong style={{ color: "green" }}>01/01/2021</strong>
        </Text>
      </Card.Body>

      <Card.Footer>
        <Row justify="center" align="center">
          <Col css={{ d: "flex", marginRight: "10px" }}>
            <Tooltip content="Details">
              <IconButton onClick={() => console.log("View user")}>
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex", marginRight: "10px" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => console.log("Edit user")}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex", marginRight: "10px" }}>
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
  );
};

export default CardDesign;
