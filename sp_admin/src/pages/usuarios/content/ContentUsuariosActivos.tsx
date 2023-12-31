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
  Button,
  User,
} from "@nextui-org/react";
import EditUsuario from "../modals/ModalEditUsuario";
import InfoUsuario from "../modals/ModalInfoUsuario";
import { EditIcon } from "../../../resources/icons/EditIcon";
import { IconButton } from "../../../resources/icons/IconButton";
import { useGetUsuariosActivos } from "../../../hooks/userPrestamistas/usegetActivos";
import { UserPrestamista as UserTypePrestamista } from "../../../types/UserPrestamista";
import { SearchContext } from "../../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../../assets/images/defaultProfile.png";
import useGetPrestamista from "../../../hooks/useGetImagenPrestamista";
import { useGetTipoSuscripciones } from "../../../hooks/useGetTipoSuscripciones";
import { FaUserTimes } from "react-icons/fa";
import ModalDeleteSuscripcion from "../modals/ModalDeleteSuscripcion";
import deactivateSuscripcionUsuario from "../../../utils/deactivateUser";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

//Componente funcional que recibe isActive y isDeleted como props
const ContentUsuariosActivos: React.FC = () => {
  //traducción
  const { t } = useTranslation();
  //Obtiene el navigate de react-router-dom
  const navigate = useNavigate();
  //Obtiene el searchTerm del contexto
  const { searchTerm } = useContext(SearchContext);
  //Obtiene el collator para ordenar los usuariosPrestamistas
  const collator = useCollator({ numeric: true });
  //Obtiene los usuariosPrestamistas del hook useGetUsuarios
  const getUsuarios = useGetUsuariosActivos();
  //Estado para definir el orden de los usuariosPrestamistas
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });
  //Obtiene los usuariosPrestamistas del token decodificado
  const usuariosPrestamistas = getUsuarios?.usuariosActivos;
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
  // Obtener los tipos de suscripciones
  const getTipoSuscripciones = useGetTipoSuscripciones();
  const tipoSuscripciones = getTipoSuscripciones?.decodedToken?.tipoSuscripcion;
  //Función para mostrar el modal de suscripciones
  const [modalSuscripciones, setModalSuscripciones] = useState(false);

  //Filtra los usuariosPrestamistas
  useEffect(() => {
    if (!usuariosPrestamistas) return;

    //Si no hay un término de búsqueda, muestra todos los usuariosPrestamistas
    if (!searchTerm) {
      setUsuarios(usuariosPrestamistas);
      return;
    }
    //Si hay un término de búsqueda, filtra los usuariosPrestamistas
    const filteredUsuarios = usuariosPrestamistas.filter(
      (usuario: UserTypePrestamista) => realizarBusqueda(usuario, searchTerm)
    );
    //Muestra los usuariosPrestamistas filtrados
    setUsuarios(filteredUsuarios);
  }, [searchTerm, usuariosPrestamistas]);

  //UseEffect para mostrar el mensaje de éxito
  useEffect(() => {
    const toastMessage = localStorage.getItem("toastMessageActivateUsuario");
    if (toastMessage) {
      toast.success(toastMessage);
      localStorage.removeItem("toastMessageActivateUsuario");
    }
  }, []);

  const UserImage = ({
    idUsuarioPrestamista,
    nombreUsuario,
  }: {
    idUsuarioPrestamista: number;
    nombreUsuario?: string;
  }) => {
    const imagenPerfil = useGetPrestamista(idUsuarioPrestamista);

    if (imagenPerfil) {
      return <User name={nombreUsuario} src={imagenPerfil}></User>;
    } else {
      return <User name={nombreUsuario} src={defaultImage}></User>;
    }
  };

  //Función para obtener el nombre de la suscripción del usuario a través del idTipoSuscripcion
  const getNombreSuscripcion = (idTipoSuscripcion: number) => {
    const suscripcion = tipoSuscripciones?.find(
      (suscripcion: any) => suscripcion.idTipoSuscripcion === idTipoSuscripcion
    );
    return suscripcion?.nombreSuscripcion;
  };

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

  //Al abrir el modal de editar usuario se cierra el modal de información de usuario
  const openModalEdit = (usuario: UserTypePrestamista) => {
    setSelectedUser(usuario);
    setModalInfoVisible(false);
    setModalEditVisible(true);
    setModalSuscripciones(false);
  };
  //Al abrir el modal de información de usuario se cierra el modal de editar usuario
  const openModalInfo = (usuario: UserTypePrestamista) => {
    setSelectedUser(usuario);
    setModalEditVisible(false);
    setModalInfoVisible(true);
    setModalSuscripciones(false);
  };
  //Cierra el modal de editar usuario
  const closeModal = () => {
    setSelectedUser(null);
    setModalEditVisible(false);
  };

  //Al abrir el modal de información de usuario se cierra el modal de editar usuario
  const openModalUnsuscribeUser = (usuario: UserTypePrestamista) => {
    setSelectedUser(usuario);
    setModalEditVisible(false);
    setModalInfoVisible(false);
    setModalSuscripciones(true);
  };

  //Función para actualizar los usuariosPrestamistas al eliminar un usuario o al editar un usuario
  const handleUpdateUsuarios = () => {
    getUsuarios?.refetch();
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

  const handleNav = () => {
    navigate("/admin-suscribir-usuario");
  };

  const formatDateFin = (date: Date | null | undefined) => {
    if (!date) {
      return ""; // o cualquier otro manejo apropiado para valores nulos o indefinidos
    }
    const fecha = new Date(date);
    const today = new Date();
    const differenceInDays = Math.floor(
      (fecha.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const year = fecha.getFullYear();

    let textColor = "green"; // color predeterminado

    if (differenceInDays < 0) {
      textColor = "black"; // fecha pasada, color negro
    } else if (differenceInDays <= 7) {
      textColor = "red"; // menos de 7 días, color rojo
    } else if (differenceInDays <= 14) {
      textColor = "yellow"; // entre 7 y 14 días, color amarillo
    } else if (differenceInDays <= 30) {
      textColor = "green"; // entre 15 y mas días, color verde
    }

    return <span style={{ color: textColor }}>{`${dia}/${mes}/${year}`}</span>;
  };

  //Función para eliminar un usuario
  const handleDeleteSuscripcion = async (usuario: UserTypePrestamista) => {
    try {
      const resp = await deactivateSuscripcionUsuario(
        usuario.idUsuarioPrestamista,
        //obtener la ultima suscripcion del usuario en la lista de suscripciones
        usuario.suscripciones[usuario.suscripciones.length - 1].idSuscripcion
      );
      if (resp) {
        getUsuarios?.refetch();
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
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

  //Si no hay usuarios
  if (Usuarios.length === 0 && !searchTerm) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "fixed",
          top: -100,
          left: 200,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <Card
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <Card.Header>
            <Text css={{ fontWeight: "normal" }} h3>
              {t("usuariosActivos.noUsersActive")}
            </Text>
          </Card.Header>
          <Card.Body>
            <Text h5 css={{ fontWeight: "normal" }}>
              {t("usuariosActivos.activateNewUser")}
            </Text>
          </Card.Body>
          <Card.Footer style={{ justifyContent: "center" }}>
            <Button onPress={handleNav}>
              {t("usuariosActivos.activateSubscription")}
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
  //Si no hay usuariosPrestamistas activos, inactivos o eliminados con la búsqueda entonces muestra un mensaje
  if (Usuarios.length === 0 && searchTerm) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "fixed",
          top: -100,
          left: 200,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <Card
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <Card.Body>
            <Text h3 css={{ fontWeight: "normal" }}>
              {t("usuariosActivos.noUserWithSearch")}
            </Text>
            <Text h5 css={{ fontWeight: "normal" }}>
              {searchTerm}
            </Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
  //Si hay usuariosPrestamistas entonces muestra la tabla de usuariosPrestamistas
  const columns = [
    { name: t("usuariosActivos.name"), uid: "nombres" },
    { name: t("usuariosActivos.lastName"), uid: "apellidos" },
    { name: t("usuariosActivos.referalCode"), uid: "codigoReferencia" },
    { name: t("usuariosActivos.suscriptionName"), uid: "tipoSuscripcion" },
    { name: t("usuariosActivos.startDate"), uid: "fechaInicio" },
    { name: t("usuariosActivos.endDate"), uid: "fechaFin" },
    { name: t("usuariosActivos.Actions"), uid: "acciones" },
  ];

  //Función para renderizar las celdas de la tabla
  const renderCell = (usuario: UserTypePrestamista, columnKey: React.Key) => {
    const cellValue = usuario[columnKey as keyof UserTypePrestamista];
    switch (columnKey) {
      case "nombres":
        return (
          <UserImage
            idUsuarioPrestamista={usuario.idUsuarioPrestamista}
            nombreUsuario={usuario.nombres}
          />
        );
      case "apellidos":
        return <Text>{usuario.apellidos}</Text>;
      case "codigoReferencia":
        return <Text>{usuario.codigoReferencia}</Text>;
      case "tipoSuscripcion":
        const idTipoSuscripcion =
          usuario.suscripciones && usuario.suscripciones.length > 0
            ? usuario.suscripciones[usuario.suscripciones.length - 1]
                .idTipoSuscripcion
            : null;

        const nombreSuscripcion = idTipoSuscripcion
          ? getNombreSuscripcion(idTipoSuscripcion)
          : null;

        return <Text>{nombreSuscripcion}</Text>;
      case "fechaInicio":
        return (
          <Text>
            {formatDate(
              usuario.suscripciones && usuario.suscripciones.length > 0
                ? usuario.suscripciones[usuario.suscripciones.length - 1]
                    .fechaInicio
                : null
            )}
          </Text>
        );
      case "fechaFin":
        return (
          <Text>
            {formatDateFin(
              usuario.suscripciones && usuario.suscripciones.length > 0
                ? usuario.suscripciones[usuario.suscripciones.length - 1]
                    .fechaFin
                : null
            )}
          </Text>
        );
      case "acciones":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex", marginLeft: "10%" }}>
              <Tooltip
                content={t("usuariosActivos.unsubscribe")}
                color={undefined}
                css={undefined}
                contentColor={undefined}
              >
                <IconButton onClick={() => openModalUnsuscribeUser(usuario)}>
                  <FaUserTimes size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>

            <Col css={{ d: "flex", marginLeft: "45%" }}>
              <Tooltip
                content={t("usuariosActivos.editUser")}
                color={undefined}
                css={undefined}
                contentColor={undefined}
              >
                <IconButton onClick={() => openModalEdit(usuario)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
    }
    return cellValue as React.ReactNode;
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

  const handleSelectionItem = (key: string, usuarios: any) => {
    // Obtener el usuario de la clave seleccionada
    const selectedUser = usuarios.find(
      (user: any) => user.idUsuarioPrestamista === Number(key)
    );

    //si el usuario existe entonces abre el modal de información de usuario
    if (selectedUser) {
      openModalInfo(selectedUser);
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
        aria-label={"Usuarios Activos"}
        selectionMode="single"
        onRowAction={(key: any) => {
          handleSelectionItem(key, Usuarios);
        }}
        css={{ minWidth: "100%", height: "calc($space$12 * 10)" }}
      >
        <Table.Header columns={columns}>
          {(column: any) => (
            <Table.Column
              key={column.uid}
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
        <Table.Pagination shadow noMargin align="center" rowsPerPage={13} />
      </Table>
      {modalSuscripciones && selectedUser && (
        <ModalDeleteSuscripcion
          user={selectedUser}
          onClose={closeModal}
          handleUpdate={handleDeleteSuscripcion}
        />
      )}
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

export default ContentUsuariosActivos;
