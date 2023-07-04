import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Text,
  Row,
  Tooltip,
  Col,
  Loading,
  Table,
  useCollator,
  SortDescriptor,
} from "@nextui-org/react";
import deleteUsuario from "../../../utils/deleteUser";
import EditUsuario from "./ModalEditUsuario";
import InfoUsuario from "./ModalInfoUsuario";
import { EditIcon } from "../../../resources/icons/EditIcon";
import { EyeIcon } from "../../../resources/icons/EyeIcon";
import { IconButton } from "../../../resources/icons/IconButton";
import { useGetUsuarios } from "../../../hooks/usegetUsuarios";
import { User as UserType } from "../../../types/types";
import { DeleteIcon } from "../../../resources/icons/DeleteIcon";

const ContentUsuariosInactivos: React.FC = () => {
  const collator = useCollator({ numeric: true });
  const getUsuarios = useGetUsuarios();
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });
  const usuarios = getUsuarios?.decodedToken?.usuarios;
  const [UsuariosInactivos, setUsuariosInactivos] = useState<UserType[]>([]);
  useEffect(() => {
    if (usuarios) {
      const filteredUsuarios = usuarios.filter(
        (usuario: UserType) =>
          usuario.isActive === false && usuario.isDeleted === false
      );
      setUsuariosInactivos(filteredUsuarios);
    }
  }, [usuarios]);

  const [modalEdit, setModalEditVisible] = useState(false);
  const [modalInfo, setModalInfoVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const openModalEdit = (usuario: UserType) => {
    setSelectedUser(usuario);
    setModalInfoVisible(false);
    setModalEditVisible(true);
  };

  const openModalInfo = (usuario: UserType) => {
    setSelectedUser(usuario);
    setModalEditVisible(false);
    setModalInfoVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalEditVisible(false);
  };

  const handleUpdateUsuarios = () => {
    getUsuarios?.refetch();
  };

  const deleteUser = async (usuario: UserType) => {
    try {
      const resp = await deleteUsuario(usuario.idUsuario);
      if (resp) {
        getUsuarios?.refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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

  if (UsuariosInactivos.length === 0) {
    return (
      <Grid.Container
        justify="center"
        alignContent="center"
        gap={2}
        style={{ height: "100vh" }}
      >
        <Text>No hay usuarios Inactivos.</Text>
      </Grid.Container>
    );
  }

  const columns = [
    { name: "NOMBRES", uid: "nombres" },
    { name: "APELLIDOS", uid: "apellidos" },
    { name: "TIPO DE SUSCRIPCIÓN", uid: "tipoSuscripcion" },
    { name: "FECHA DE PAGO", uid: "fechaPago" },
    { name: "CÓDIGO DE REFERENCIA", uid: "codigoReferencia" },
    { name: "ACCIONES", uid: "acciones" },
  ];

  const renderCell = (usuario: UserType, columnKey: React.Key) => {
    const cellValue = usuario[columnKey as keyof UserType];
    switch (columnKey) {
      case "nombres":
        return <Text>{usuario.nombres}</Text>;
      case "apellidos":
        return <Text>{usuario.apellidos}</Text>;
      case "tipoSuscripcion":
        return <Text>Tier 1</Text>;
      case "fechaPago":
        return (
          <Text>
            <strong style={{ color: "green" }}>10/10/2023</strong>
          </Text>
        );
      case "codigoReferencia":
        return <Text>{usuario.codigoReferencia}</Text>;
      case "acciones":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex", marginLeft: "20%" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => openModalInfo(usuario)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", marginLeft: "20%" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => openModalEdit(usuario)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", marginLeft: "20%" }}>
              <Tooltip content="Delete user">
                <IconButton onClick={() => deleteUser(usuario)}>
                  <DeleteIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const sortColumn = (descriptor: SortDescriptor) => {
    if (descriptor.column && descriptor.direction !== undefined) {
      let sortedData = [...UsuariosInactivos];

      sortedData.sort((a: UserType, b: UserType) => {
        const aValue = a[descriptor.column as keyof UserType];
        const bValue = b[descriptor.column as keyof UserType];

        if (descriptor.direction === "ascending") {
          return collator.compare(String(aValue), String(bValue));
        }
        return collator.compare(String(bValue), String(aValue));
      });

      setSortDescriptor(descriptor);
      setUsuariosInactivos(sortedData);
    }
  };
  return (
    <Card
      css={{
        height: "auto",
        maxWidth: "100%",
      }}
    >
      <Table
        lined
        onSortChange={sortColumn}
        sortDescriptor={sortDescriptor}
        bordered
        aria-label="Usuarios Inactivos"
        selectionMode="none"
        css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      >
        <Table.Header columns={columns}>
          {(column: any) => (
            <Table.Column
              isRowHeader
              key={column.uid}
              hideHeader={column.uid === "acciones"}
              align={column.uid === "acciones" ? "center" : "start"}
              allowsSorting
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={UsuariosInactivos}>
          {(item: UserType) => (
            <Table.Row key={item.idUsuario}>
              {(columnKey: any) => (
                <Table.Cell key={columnKey}>
                  {renderCell(item, columnKey)}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={13}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
      {modalInfo && selectedUser && (
        <InfoUsuario user={selectedUser} onClose={closeModal} />
      )}
      {modalEdit && selectedUser && (
        <EditUsuario
          user={selectedUser}
          onClose={closeModal}
          handleUpdate={handleUpdateUsuarios}
        />
      )}
    </Card>
  );
};

export default ContentUsuariosInactivos;
