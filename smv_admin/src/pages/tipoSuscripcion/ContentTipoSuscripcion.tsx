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
} from "@nextui-org/react";
import deleteTipoSuscripcion from "../../utils/deleteTipoSuscripcion";
import EditTipoSuscripcion from "./modals/ModalEditTipoSuscripcion";
import InfoTipoSuscripcion from "./modals/ModalInfoTipoSuscripcion";
import ModalAgregarUsuario from "./modals/ModalAddTipoSuscripcion";
import { EditIcon } from "../../resources/icons/EditIcon";
import { IconButton } from "../../resources/icons/IconButton";
import { useGetTipoSuscripciones } from "../../hooks/useGetTipoSuscripciones";
import { TipoSuscripcion } from "../../types/TipoSuscripcion";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { SearchContext } from "../../context/SearchContext";
import ModalConfirmDelete from "./modals/ModalConfirmDelete";

//Componente funcional que recibe isActive y isDeleted como props
const ContentFidelidad: React.FC = () => {
  //Obtiene el searchTerm del contexto
  const { searchTerm } = useContext(SearchContext);
  //Obtiene el collator para ordenar los tipoSuscripciones
  const collator = useCollator({ numeric: true });
  //Obtiene los tipoSuscripciones del hook usegetTipoSuscripciones
  const getTipoSuscripciones = useGetTipoSuscripciones();
  //Estado para definir el orden de los tipoSuscripciones
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });
  //Obtiene los tipoSuscripciones del token decodificado
  const tipoSuscripciones = getTipoSuscripciones?.decodedToken?.tipoSuscripcion;
  console.log(tipoSuscripciones);
  //Estado para definir los tipoSuscripciones a mostrar
  const [Suscripciones, setSuscripciones] = useState<TipoSuscripcion[]>([]);
  //Función para mostrar el modal de editar tipoSuscripciones
  const [modalEdit, setModalEditVisible] = useState(false);
  //Función para mostrar el modal de agregar tipoSuscripciones
  const [modalAdd, setModalAddVisible] = useState(false);
  //Función para mostrar el modal de información de tipoSuscripciones
  const [modalInfo, setModalInfoVisible] = useState(false);
  //Función para mostrar el modal de confirmación de eliminación
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  //Estado para definir el tipoSuscripciones seleccionado
  const [selectedFidelidad, setSelectedFidelidad] =
    useState<TipoSuscripcion | null>(null);
  //Filtra los tipoSuscripciones
  useEffect(() => {
    if (!tipoSuscripciones) return;

    //Si no hay un término de búsqueda, muestra todos los tipoSuscripciones
    if (!searchTerm) {
      setSuscripciones(tipoSuscripciones);
      return;
    }
    //Si hay un término de búsqueda, filtra los tipoSuscripciones
    const filteredUsuarios = tipoSuscripciones.filter(
      (TipoSuscripcion: TipoSuscripcion) =>
        realizarBusqueda(TipoSuscripcion, searchTerm)
    );
    //Muestra los tipoSuscripciones filtrados
    setSuscripciones(filteredUsuarios);
  }, [searchTerm, tipoSuscripciones]);

  //Función para realizar la búsqueda de tipoSuscripciones
  function realizarBusqueda(
    tipoSuscripciones: TipoSuscripcion,
    searchTerm: string
  ): boolean {
    const terminos = searchTerm.toLowerCase().split(" ");
    for (const termino of terminos) {
      if (
        !tipoSuscripciones.nombreSuscripcion.toLowerCase().includes(termino)
      ) {
        return false;
      }
    }

    return true;
  }

  //Al abrir el modal de editar tipoSuscripciones se cierra el modal de información de tipoSuscripciones
  const openModalEdit = (tipoSuscripciones: TipoSuscripcion) => {
    setSelectedFidelidad(tipoSuscripciones);
    setModalInfoVisible(false);
    setModalEditVisible(true);
    setModalConfirmacion(false);
  };
  //Al abrir el modal de información de tipoSuscripciones se cierra el modal de editar tipoSuscripciones
  const openModalInfo = (tipoSuscripciones: TipoSuscripcion) => {
    setSelectedFidelidad(tipoSuscripciones);
    setModalEditVisible(false);
    setModalInfoVisible(true);
    setModalConfirmacion(false);
  };

  //Al abrir el modal de información de tipoSuscripciones se cierra el modal de editar tipoSuscripciones
  const openModalConfirmacion = (tipoSuscripciones: TipoSuscripcion) => {
    setSelectedFidelidad(tipoSuscripciones);
    setModalEditVisible(false);
    setModalInfoVisible(false);
    setModalConfirmacion(true);
  };

  //Al abrir el modal de agregar tipoSuscripciones se cierra el modal de editar tipoSuscripciones
  const openModalAdd = () => {
    setModalEditVisible(false);
    setModalInfoVisible(false);
    setModalAddVisible(true);
    setModalConfirmacion(false);
  };

  //Cierra el modal de editar tipoSuscripciones
  const closeModal = () => {
    setSelectedFidelidad(null);
    setModalEditVisible(false);
    setModalAddVisible(false);
    setModalInfoVisible(false);
  };

  //Función para actualizar los tipoSuscripciones al eliminar un tipoSuscripciones o al editar un tipoSuscripciones
  const handleUpdateSuscripciones = () => {
    getTipoSuscripciones?.refetch();
  };

  //Función para eliminar un tipoSuscripciones
  const handleDeleteFidelidad = async (tipoSuscripciones: TipoSuscripcion) => {
    try {
      const resp = await deleteTipoSuscripcion(
        tipoSuscripciones.idTipoSuscripcion
      );
      if (resp) {
        getTipoSuscripciones?.refetch();
      }
    } catch (error) {
      console.error("Error deleting fidelity level", error);
    }
  };

  const handleSelectionItem = (key: string, tipoSuscripciones: any) => {
    const selectedFidelidad = tipoSuscripciones.find(
      (tipoSuscripcion: any) =>
        tipoSuscripcion.idTipoSuscripcion === Number(key)
    );

    if (selectedFidelidad) {
      openModalInfo(selectedFidelidad);
    }
  };
  const handleAddSuscripciones = () => {
    openModalAdd();
  };

  //Si no hay tipoSuscripciones entonces muestra un loading
  if (!tipoSuscripciones) {
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

  //Si no hay Suscripciones entonces muestra un mensaje
  if (Suscripciones.length === 0 && !searchTerm) {
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
              No Hay Suscripciones
            </Text>
          </Card.Header>
          <Card.Body>
            <Text h5 css={{ fontWeight: "normal" }}>
              ¿Desea Registrar Una Nuevo?
            </Text>
          </Card.Body>
          <Card.Footer style={{ justifyContent: "center" }}>
            <Button onPress={handleAddSuscripciones}>Registrar</Button>
          </Card.Footer>
        </Card>
        {modalAdd && (
          <ModalAgregarUsuario
            onClose={closeModal}
            handleUpdate={handleUpdateSuscripciones}
          />
        )}
      </div>
    );
  }
  //Si no hay tipoSuscripciones activos, inactivos o eliminados con la búsqueda entonces muestra un mensaje
  if (Suscripciones.length === 0 && searchTerm) {
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
              No Hay Suscripciones Con El Nombre
            </Text>
            <Text h5 css={{ fontWeight: "normal" }}>
              {searchTerm}
            </Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
  //Si hay tipoSuscripciones entonces muestra la tabla de tipoSuscripciones
  const columns = [
    { name: "Nombre de la Suscripcion", uid: "nombreSuscripcion" },
    { name: "Maximo de Clientes", uid: "numeroUsuariosMax" },
    { name: "Monto Minimo", uid: "montoDesde" },
    { name: "Maximo Maximo", uid: "montoHasta" },
    { name: "Costo de Suscripcion", uid: "costoMembresia" },
    { name: "Acciones", uid: "acciones" },
  ];

  //Función para renderizar las celdas de la tabla
  const renderCell = (
    tipoSuscripciones: TipoSuscripcion,
    columnKey: React.Key
  ) => {
    const cellValue = tipoSuscripciones[columnKey as keyof TipoSuscripcion];
    switch (columnKey) {
      case "nombreSuscripcion":
        return <Text>{tipoSuscripciones.nombreSuscripcion}</Text>;
      case "numeroUsuariosMax":
        return (
          <Text style={{ marginLeft: "3%" }}>
            <Text>{tipoSuscripciones.numeroUsuariosMax} Usuarios</Text>
          </Text>
        );
      case "montoDesde":
        return (
          <Row style={{ marginLeft: "0%" }}>
            <Text>{tipoSuscripciones.montoDesde}</Text>
            <Text style={{ marginLeft: "4px" }}>Pesos</Text>
          </Row>
        );
      case "montoHasta":
        return (
          <Row style={{ marginLeft: "0%" }}>
            <Text>{tipoSuscripciones.montoHasta}</Text>
            <Text style={{ marginLeft: "4px" }}>Pesos</Text>
          </Row>
        );
      case "costoMembresia":
        return (
          <Row style={{ marginLeft: "8%" }}>
            <Text>{tipoSuscripciones.costoMembresia}</Text>
            <Text style={{ marginLeft: "4px" }}>Pesos</Text>
          </Row>
        );

      case "acciones":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex", marginLeft: "20%" }}>
              <Tooltip content="Editar Nivel">
                <IconButton onClick={() => openModalEdit(tipoSuscripciones)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", marginLeft: "20%" }}>
              <Tooltip content="Eliminar Tipo de Suscripcion">
                <IconButton
                  onClick={() => openModalConfirmacion(tipoSuscripciones)}
                >
                  <DeleteIcon size={20} fill="#979797" />
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
      let sortedData = [...Suscripciones];
      console.log(descriptor);
      sortedData.sort((a: TipoSuscripcion, b: TipoSuscripcion) => {
        const aValue = a[descriptor.column as keyof TipoSuscripcion];
        const bValue = b[descriptor.column as keyof TipoSuscripcion];
        if (descriptor.direction === "ascending") {
          return collator.compare(String(aValue), String(bValue));
        }
        return collator.compare(String(bValue), String(aValue));
      });

      setSortDescriptor(descriptor);
      setSuscripciones(sortedData);
    }
  };

  return (
    <div>
      <Row
        css={{
          marginBottom: "$space$5",
          marginTop: "-30px",
        }}
      >
        <Col css={{}}>
          <Button
            onPress={handleAddSuscripciones}
            css={{ marginLeft: "auto" }} // Alinear a la derecha
          >
            Agregar Tipo de Suscripcion
          </Button>
        </Col>
      </Row>

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
          aria-label={"Suscripciones Activos"}
          selectionMode="single"
          onRowAction={(key: any) => {
            handleSelectionItem(key, Suscripciones);
          }}
          css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
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
          <Table.Body items={Suscripciones}>
            {(item: TipoSuscripcion) => (
              <Table.Row key={item.idTipoSuscripcion}>
                {(columnKey: any) => (
                  <Table.Cell key={columnKey} css={{}}>
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
        {modalAdd && (
          <ModalAgregarUsuario
            onClose={closeModal}
            handleUpdate={handleUpdateSuscripciones}
          />
        )}

        {modalInfo && selectedFidelidad && (
          <InfoTipoSuscripcion
            tipoSuscripcion={selectedFidelidad}
            onClose={closeModal}
          />
        )}
        {modalEdit && selectedFidelidad && (
          <EditTipoSuscripcion
            tipoSuscripcion={selectedFidelidad}
            onClose={closeModal}
            handleUpdate={handleUpdateSuscripciones}
          />
        )}
        {modalConfirmacion && selectedFidelidad && (
          <ModalConfirmDelete
            tipoSuscripcion={selectedFidelidad}
            onClose={closeModal}
            handleDeleteFidelidad={handleDeleteFidelidad}
          />
        )}
      </Card>
    </div>
  );
};

export default ContentFidelidad;
