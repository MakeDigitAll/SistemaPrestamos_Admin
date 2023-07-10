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
import { useGetUsuariosPrestamistas } from "../../../hooks/usegetUsuariosPrestamistas";
import { UserPrestamista as UserTypePrestamista } from "../../../types/types";
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
  //Obtiene el collator para ordenar los usuariosPrestamistas
  const collator = useCollator({ numeric: true });
  //Obtiene los usuariosPrestamistas del hook useGetUsuarios
  const getUsuarios = useGetUsuariosPrestamistas();
  //Estado para definir el orden de los usuariosPrestamistas
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });
  //Obtiene los usuariosPrestamistas del token decodificado
  const usuariosPrestamistas = getUsuarios?.decodedToken?.usuariosPrestamistas;
  //Estado para definir los usuariosPrestamistas a mostrar
  const [Usuarios, setUsuarios] = useState<UserTypePrestamista[]>([]);
  //Función para mostrar el modal de editar usuario
  const [modalEdit, setModalEditVisible] = useState(false);
  //Función para mostrar el modal de información de usuario
  const [modalInfo, setModalInfoVisible] = useState(false);
  //Estado para definir el usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<UserTypePrestamista | null>(
    null
  );

  //Ordena los usuariosPrestamistas
  useEffect(() => {
    if (usuariosPrestamistas) {
      const filteredUsuarios = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isActive === isActive && usuario.isDeleted === isDeleted
      );
      setUsuarios(filteredUsuarios);
    }
  }, [usuariosPrestamistas, isActive, isDeleted]);

  //Función para realizar la búsqueda de usuariosPrestamistas
  function realizarBusqueda(
    usuario: UserTypePrestamista,
    searchTerm: string
  ): boolean {
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

  //Filtra los usuariosPrestamistas
  useEffect(() => {
    //Si hay un término de búsqueda y hay usuariosPrestamistas en el estado Usuarios entonces filtra los usuariosPrestamistas
    if (searchTerm && usuariosPrestamistas) {
      const filteredUsuarios = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isActive === isActive &&
          usuario.isDeleted === isDeleted &&
          realizarBusqueda(usuario, searchTerm)
      );
      setUsuarios(filteredUsuarios);
      //Si no hay un término de búsqueda y hay usuariosPrestamistas en el estado Usuarios entonces  mostrar todos los usuariosPrestamistas
    } else if (!searchTerm && usuariosPrestamistas) {
      const filteredUsuarios = usuariosPrestamistas.filter(
        (usuario: UserTypePrestamista) =>
          usuario.isActive === isActive && usuario.isDeleted === isDeleted
      );
      setUsuarios(filteredUsuarios);
    }
  }, [searchTerm, usuariosPrestamistas, isActive, isDeleted]);

  //Al abrir el modal de editar usuario se cierra el modal de información de usuario
  const openModalEdit = (usuario: UserTypePrestamista) => {
    setSelectedUser(usuario);
    setModalInfoVisible(false);
    setModalEditVisible(true);
  };
  //Al abrir el modal de información de usuario se cierra el modal de editar usuario
  const openModalInfo = (usuario: UserTypePrestamista) => {
    setSelectedUser(usuario);
    setModalEditVisible(false);
    setModalInfoVisible(true);
  };
  //Cierra el modal de editar usuario
  const closeModal = () => {
    setSelectedUser(null);
    setModalEditVisible(false);
  };

  //Función para actualizar los usuariosPrestamistas al eliminar un usuario o al editar un usuario
  const handleUpdateUsuarios = () => {
    getUsuarios?.refetch();
  };

  //Función para eliminar un usuario
  const deleteUser = async (usuario: UserTypePrestamista) => {
    try {
      const resp = await deleteUsuario(usuario.idUsuarioPrestamista);
      if (resp) {
        getUsuarios?.refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  //Formatea las fechas 2023-12-31T06:00:00.000Z,
  const formatDate = (date: Date | null | undefined) => {
    if (!date) {
      return ""; // or any other appropriate handling for null or undefined values
    }

    const fecha = new Date(date);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return `${dia}/${mes}/${year}`;
  };

  const formatDateFin = (date: Date | null | undefined) => {
    if (!date) {
      return ""; // o cualquier otro manejo apropiado para valores nulos o indefinidos
    }
    const fecha = new Date(date);
    const today = new Date();
    const differenceInDays = Math.floor(
      (today.getTime() - fecha.getTime()) / (1000 * 3600 * 24)
    );

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const year = fecha.getFullYear();

    let textColor = "black"; // color predeterminado

    if (differenceInDays < 0) {
      textColor = "black"; // fecha pasada, color negro
    } else if (differenceInDays <= 7) {
      textColor = "red"; // menos de 7 días, color rojo
    } else if (differenceInDays <= 14) {
      textColor = "yellow"; // entre 7 y 14 días, color amarillo
    } else if (differenceInDays <= 30) {
      textColor = "green"; // entre 15 y mas días, color verde
    }
    console.log(differenceInDays);

    return <span style={{ color: textColor }}>{`${dia}/${mes}/${year}`}</span>;
  };

  //Si no hay usuariosPrestamistas entonces muestra un loading
  if (!usuariosPrestamistas) {
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

  //Si no hay usuariosPrestamistas activos, inactivos o eliminados entonces muestra un mensaje
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
            ? "No hay usuariosPrestamistas eliminados."
            : `No hay usuariosPrestamistas ${
                isActive ? "activos" : "inactivos"
              }.`}
        </Text>
      </Grid.Container>
    );
  }
  //Si no hay usuariosPrestamistas activos, inactivos o eliminados con la búsqueda entonces muestra un mensaje
  if (Usuarios.length === 0 && searchTerm) {
    return (
      <Grid.Container
        justify="center"
        alignContent="center"
        gap={2}
        style={{ height: "100vh" }}
      >
        <Text>No hay usuariosPrestamistas con esa búsqueda.</Text>
      </Grid.Container>
    );
  }
  //Si hay usuariosPrestamistas entonces muestra la tabla de usuariosPrestamistas
  const columns = [
    { name: "NOMBRES", uid: "nombres" },
    { name: "APELLIDOS", uid: "apellidos" },
    //Si el usuario es activo entonces muestra el tipo de suscripción y la fecha de pago
    ...(isActive
      ? [
          { name: "TIPO DE SUSCRIPCIÓN", uid: "tipoSuscripcion" },
          { name: "FECHA DE INICIO", uid: "fechaInicio" },
          { name: "FECHA DE PAGO", uid: "fechaFin" },
        ]
      : []),
    { name: "CÓDIGO DE REFERENCIA", uid: "codigoReferencia" },
    { name: "ACCIONES", uid: "acciones" },
  ];

  //Función para renderizar las celdas de la tabla
  const renderCell = (usuario: UserTypePrestamista, columnKey: React.Key) => {
    const cellValue = usuario[columnKey as keyof UserTypePrestamista];
    switch (columnKey) {
      case "nombres":
        return <Text>{usuario.nombres}</Text>;
      case "apellidos":
        return <Text>{usuario.apellidos}</Text>;
      case "tipoSuscripcion":
        return isActive ? (
          <Text>{usuario.suscripcion?.tipoSuscripcion}</Text>
        ) : null;
      case "fechaInicio":
        return isActive ? (
          <Text>{formatDate(usuario.suscripcion?.fechaInicio)}</Text>
        ) : null;
      case "fechaFin":
        return isActive ? (
          <Text>
            <strong>{formatDateFin(usuario.suscripcion?.fechaFin)}</strong>
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
        return cellValue as React.ReactNode;
    }
  };

  //Función para ordenar las columnas de la tabla
  const sortColumn = (descriptor: SortDescriptor) => {
    if (descriptor.column && descriptor.direction !== undefined) {
      let sortedData = [...Usuarios];

      sortedData.sort((a: UserTypePrestamista, b: UserTypePrestamista) => {
        const aValue = a[descriptor.column as keyof UserTypePrestamista];
        const bValue = b[descriptor.column as keyof UserTypePrestamista];

        if (descriptor.direction === "ascending") {
          return collator.compare(String(aValue), String(bValue));
        }
        return collator.compare(String(bValue), String(aValue));
      });

      setSortDescriptor(descriptor);
      setUsuarios(sortedData);
    }
  };

  //Función para renderizar las tabla de usuariosPrestamistas dependiendo si esta activo, inactivo o eliminado
  return (
    <Card
      css={{
        height: "fit-content",
        width: "100%",
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
          {(item: UserTypePrestamista) => (
            <Table.Row key={item.idUsuarioPrestamista}>
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

//Componentes para renderizar las tablas de usuariosPrestamistas activos, inactivos y eliminados
export const ContentUsuariosActivos: React.FC = () => {
  return <ContentUsuarios isActive={true} isDeleted={false} />;
};

export const ContentSuscripciones: React.FC = () => {
  return <ContentUsuarios isActive={false} isDeleted={false} />;
};

export const ContentUsuariosEliminados: React.FC = () => {
  return <ContentUsuarios isActive={false} isDeleted={true} />;
};
