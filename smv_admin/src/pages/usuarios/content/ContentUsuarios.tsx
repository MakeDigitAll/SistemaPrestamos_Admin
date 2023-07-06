import React, { useState, useEffect, useContext } from "react";
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
import EditUsuario from "../modals/ModalEditUsuario";
import InfoUsuario from "../modals/ModalInfoUsuario";
import { EditIcon } from "../../../resources/icons/EditIcon";
import { EyeIcon } from "../../../resources/icons/EyeIcon";
import { IconButton } from "../../../resources/icons/IconButton";
import { useGetUsuarios } from "../../../hooks/usegetUsuarios";
import { User as UserType } from "../../../types/types";
import { DeleteIcon } from "../../../resources/icons/DeleteIcon";
import { SearchContext } from "../../../context/SearchContext";

//Interface para definir las props que recibe el componente
interface ContentUsuariosProps {
  isActive: boolean;
  isDeleted: boolean;
}

//Componente funcional que recibe isActive y isDeleted como props
const ContentUsuarios: React.FC<ContentUsuariosProps> = ({
  isActive,
  isDeleted,
}) => {
  //Obtiene el searchTerm del contexto
  const { searchTerm } = useContext(SearchContext);
  //Obtiene el collator para ordenar los usuarios
  const collator = useCollator({ numeric: true });
  //Obtiene los usuarios del hook useGetUsuarios
  const getUsuarios = useGetUsuarios();
  //Estado para definir el orden de los usuarios
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });
  //Obtiene los usuarios del token decodificado
  const usuarios = getUsuarios?.decodedToken?.usuarios;
  //Estado para definir los usuarios a mostrar
  const [Usuarios, setUsuarios] = useState<UserType[]>([]);
  //Función para mostrar el modal de editar usuario
  const [modalEdit, setModalEditVisible] = useState(false);
  //Función para mostrar el modal de información de usuario
  const [modalInfo, setModalInfoVisible] = useState(false);
  //Estado para definir el usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  //Ordena los usuarios
  useEffect(() => {
    if (usuarios) {
      const filteredUsuarios = usuarios.filter(
        (usuario: UserType) =>
          usuario.isActive === isActive && usuario.isDeleted === isDeleted
      );
      setUsuarios(filteredUsuarios);
    }
  }, [usuarios, isActive, isDeleted]);

  //Función para realizar la búsqueda de usuarios
  function realizarBusqueda(usuario: UserType, searchTerm: string): boolean {
    const terminos = searchTerm.toLowerCase().split(" ");
    for (const termino of terminos) {
      if (
        !(
          usuario.nombres.toLowerCase().includes(termino) ||
          usuario.apellidos.toLowerCase().includes(termino)
        )
      ) {
        return false;
      }
    }

    return true;
  }

  //Filtra los usuarios
  useEffect(() => {
    //Si hay un término de búsqueda y hay usuarios en el estado Usuarios entonces filtra los usuarios
    if (searchTerm && usuarios) {
      const filteredUsuarios = usuarios.filter(
        (usuario: UserType) =>
          usuario.isActive === isActive &&
          usuario.isDeleted === isDeleted &&
          realizarBusqueda(usuario, searchTerm)
      );
      setUsuarios(filteredUsuarios);
      //Si no hay un término de búsqueda y hay usuarios en el estado Usuarios entonces  mostrar todos los usuarios
    } else if (!searchTerm && usuarios) {
      const filteredUsuarios = usuarios.filter(
        (usuario: UserType) =>
          usuario.isActive === isActive && usuario.isDeleted === isDeleted
      );
      setUsuarios(filteredUsuarios);
    }
  }, [searchTerm, usuarios, isActive, isDeleted]);

  //Al abrir el modal de editar usuario se cierra el modal de información de usuario
  const openModalEdit = (usuario: UserType) => {
    setSelectedUser(usuario);
    setModalInfoVisible(false);
    setModalEditVisible(true);
  };
  //Al abrir el modal de información de usuario se cierra el modal de editar usuario
  const openModalInfo = (usuario: UserType) => {
    setSelectedUser(usuario);
    setModalEditVisible(false);
    setModalInfoVisible(true);
  };
  //Cierra el modal de editar usuario
  const closeModal = () => {
    setSelectedUser(null);
    setModalEditVisible(false);
  };

  //Función para actualizar los usuarios al eliminar un usuario o al editar un usuario
  const handleUpdateUsuarios = () => {
    getUsuarios?.refetch();
  };

  //Función para eliminar un usuario
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

  //Si no hay usuarios entonces muestra un loading
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

  //Si no hay usuarios activos, inactivos o eliminados entonces muestra un mensaje
  if (Usuarios.length === 0 && !searchTerm) {
    return (
      <Grid.Container
        justify="center"
        alignContent="center"
        gap={2}
        style={{ height: "100vh" }}
      >
        <Text>
          {isDeleted
            ? "No hay usuarios eliminados."
            : `No hay usuarios ${isActive ? "activos" : "inactivos"}.`}
        </Text>
      </Grid.Container>
    );
  }
  //Si no hay usuarios activos, inactivos o eliminados con la búsqueda entonces muestra un mensaje
  if (Usuarios.length === 0 && searchTerm) {
    return (
      <Grid.Container
        justify="center"
        alignContent="center"
        gap={2}
        style={{ height: "100vh" }}
      >
        <Text>No hay usuarios con esa búsqueda.</Text>
      </Grid.Container>
    );
  }
  //Si hay usuarios entonces muestra la tabla de usuarios
  const columns = [
    { name: "NOMBRES", uid: "nombres" },
    { name: "APELLIDOS", uid: "apellidos" },
    //Si el usuario es activo entonces muestra el tipo de suscripción y la fecha de pago
    ...(isActive
      ? [
          { name: "TIPO DE SUSCRIPCIÓN", uid: "tipoSuscripcion" },
          { name: "FECHA DE PAGO", uid: "fechaPago" },
        ]
      : []),
    { name: "CÓDIGO DE REFERENCIA", uid: "codigoReferencia" },
    { name: "ACCIONES", uid: "acciones" },
  ];

  //Función para renderizar las celdas de la tabla
  const renderCell = (usuario: UserType, columnKey: React.Key) => {
    const cellValue = usuario[columnKey as keyof UserType];
    switch (columnKey) {
      case "nombres":
        return <Text>{usuario.nombres}</Text>;
      case "apellidos":
        return <Text>{usuario.apellidos}</Text>;
      case "tipoSuscripcion":
        return isActive ? <Text>Tier 1</Text> : null;
      case "fechaPago":
        return isActive ? (
          <Text>
            <strong style={{ color: "green" }}>10/10/2023</strong>
          </Text>
        ) : null;
      case "codigoReferencia":
        return <Text>{usuario.codigoReferencia}</Text>;
      case "acciones":
        //Si el usuario no esta activo o eliminado entonces muestra los botones de detalles, editar y eliminar
        if (!isActive && !isDeleted) {
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
        } else {
          //Si el usuario esta activo o eliminado entonces muestra solo los botones de detalles y editar
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
            </Row>
          );
        }
      default:
        return cellValue;
    }
  };

  //Función para ordenar las columnas de la tabla
  const sortColumn = (descriptor: SortDescriptor) => {
    if (descriptor.column && descriptor.direction !== undefined) {
      let sortedData = [...Usuarios];

      sortedData.sort((a: UserType, b: UserType) => {
        const aValue = a[descriptor.column as keyof UserType];
        const bValue = b[descriptor.column as keyof UserType];

        if (descriptor.direction === "ascending") {
          return collator.compare(String(aValue), String(bValue));
        }
        return collator.compare(String(bValue), String(aValue));
      });

      setSortDescriptor(descriptor);
      setUsuarios(sortedData);
    }
  };

  //Función para renderizar las tabla de usuarios dependiendo si esta activo, inactivo o eliminado
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
        aria-label={isActive ? "Usuarios Activos" : "Usuarios Inactivos"}
        selectionMode="none"
        css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      >
        <Table.Header columns={columns}>
          {(column: any) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "acciones"}
              align={column.uid === "acciones" ? "center" : "start"}
              allowsSorting
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={Usuarios}>
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

//Componentes para renderizar las tablas de usuarios activos, inactivos y eliminados
export const ContentUsuariosActivos: React.FC = () => {
  return <ContentUsuarios isActive={true} isDeleted={false} />;
};

export const ContentUsuariosInactivos: React.FC = () => {
  return <ContentUsuarios isActive={false} isDeleted={false} />;
};

export const ContentUsuariosEliminados: React.FC = () => {
  return <ContentUsuarios isActive={false} isDeleted={true} />;
};
