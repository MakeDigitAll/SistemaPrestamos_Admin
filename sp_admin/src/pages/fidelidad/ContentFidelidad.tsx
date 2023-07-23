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
import deleteNivelFidelidad from "../../utils/deleteNivelFidelidad";
import EditNivelFidelidad from "./modals/ModalEditNivelFidelidad";
import InfoNivelFidelidad from "./modals/ModalInfoNivelFidelidad";
import ModalAgregarUsuario from "./modals/ModalAddNivelFidelidad";

import { EditIcon } from "../../resources/icons/EditIcon";
import { IconButton } from "../../resources/icons/IconButton";
import { useGetFidelidad } from "../../hooks/useGetFidelidad";
import { NivelesFidelidad as NivelesFidelidadType } from "../../types/NivelesFidelidad";
import { DeleteIcon } from "../../resources/icons/DeleteIcon";
import { SearchContext } from "../../context/SearchContext";
import ModalConfirmDelete from "./modals/ModalConfirmDelete";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

//Componente funcional que recibe isActive y isDeleted como props
const ContentFidelidad: React.FC = () => {
  //Traducciones
  const { t } = useTranslation();
  //Obtiene el searchTerm del contexto
  const { searchTerm } = useContext(SearchContext);
  //Obtiene el collator para ordenar los nivelesFidelidad
  const collator = useCollator({ numeric: true });
  //Obtiene los nivelesFidelidad del hook usegetFidelidad
  const getFidelidad = useGetFidelidad();
  //Estado para definir el orden de los nivelesFidelidad
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: undefined,
    direction: undefined,
  });
  //Obtiene los nivelesFidelidad del token decodificado
  const nivelesFidelidad = getFidelidad?.decodedToken?.nivelesFidelidad;
  //Estado para definir los nivelesFidelidad a mostrar
  const [Niveles, setNiveles] = useState<NivelesFidelidadType[]>([]);
  //Función para mostrar el modal de editar niveles
  const [modalEdit, setModalEditVisible] = useState(false);
  //Función para mostrar el modal de agregar niveles
  const [modalAdd, setModalAddVisible] = useState(false);
  //Función para mostrar el modal de información de niveles
  const [modalInfo, setModalInfoVisible] = useState(false);
  //Función para mostrar el modal de confirmación de eliminación
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  //Estado para definir el niveles seleccionado
  const [selectedFidelidad, setSelectedFidelidad] =
    useState<NivelesFidelidadType | null>(null);
  //Filtra los nivelesFidelidad
  useEffect(() => {
    if (!nivelesFidelidad) return;

    //Si no hay un término de búsqueda, muestra todos los nivelesFidelidad
    if (!searchTerm) {
      setNiveles(nivelesFidelidad);
      return;
    }
    //Si hay un término de búsqueda, filtra los nivelesFidelidad
    const filteredUsuarios = nivelesFidelidad.filter(
      (NivelesFidelidad: NivelesFidelidadType) =>
        realizarBusqueda(NivelesFidelidad, searchTerm)
    );
    //Muestra los nivelesFidelidad filtrados
    setNiveles(filteredUsuarios);
  }, [searchTerm, nivelesFidelidad]);

  //UseEffect para mostrar el mensaje de éxito al agregar un usuario
  useEffect(() => {
    const toastMessage = localStorage.getItem("toastMessageAddNivelFidelidad");
    if (toastMessage) {
      toast.success(toastMessage);
      localStorage.removeItem("toastMessageAddNivelFidelidad");
    }
  }, []);

  //Función para realizar la búsqueda de nivelesFidelidad
  function realizarBusqueda(
    niveles: NivelesFidelidadType,
    searchTerm: string
  ): boolean {
    const terminos = searchTerm.toLowerCase().split(" ");
    for (const termino of terminos) {
      if (!niveles.nombreNivelFidelidad.toLowerCase().includes(termino)) {
        return false;
      }
    }

    return true;
  }

  //Al abrir el modal de editar niveles se cierra el modal de información de niveles
  const openModalEdit = (niveles: NivelesFidelidadType) => {
    setSelectedFidelidad(niveles);
    setModalInfoVisible(false);
    setModalEditVisible(true);
    setModalConfirmacion(false);
  };
  //Al abrir el modal de información de niveles se cierra el modal de editar niveles
  const openModalInfo = (niveles: NivelesFidelidadType) => {
    setSelectedFidelidad(niveles);
    setModalEditVisible(false);
    setModalInfoVisible(true);
    setModalConfirmacion(false);
  };

  //Al abrir el modal de información de niveles se cierra el modal de editar niveles
  const openModalConfirmacion = (niveles: NivelesFidelidadType) => {
    setSelectedFidelidad(niveles);
    setModalEditVisible(false);
    setModalInfoVisible(false);
    setModalConfirmacion(true);
  };

  //Al abrir el modal de agregar niveles se cierra el modal de editar niveles
  const openModalAdd = () => {
    setModalEditVisible(false);
    setModalInfoVisible(false);
    setModalAddVisible(true);
    setModalConfirmacion(false);
  };

  //Cierra el modal de editar niveles
  const closeModal = () => {
    setSelectedFidelidad(null);
    setModalEditVisible(false);
    setModalAddVisible(false);
    setModalInfoVisible(false);
  };

  //Función para actualizar los nivelesFidelidad al eliminar un niveles o al editar un niveles
  const handleUpdateNiveles = () => {
    getFidelidad?.refetch();
  };

  //Función para eliminar un niveles
  const handleDeleteFidelidad = async (niveles: NivelesFidelidadType) => {
    try {
      const resp = await deleteNivelFidelidad(niveles.idNivelFidelidad);
      if (resp) {
        getFidelidad?.refetch();
      }
    } catch (error) {
      console.error("Error deleting fidelity level", error);
    }
  };

  const handleSelectionItem = (key: string, niveles: any) => {
    const selectedFidelidad = niveles.find(
      (nivel: any) => nivel.idNivelFidelidad === Number(key)
    );

    if (selectedFidelidad) {
      openModalInfo(selectedFidelidad);
    }
  };
  const handleAddNiveles = () => {
    openModalAdd();
  };

  //Si no hay nivelesFidelidad entonces muestra un loading
  if (!nivelesFidelidad) {
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

  //Si no hay Niveles entonces muestra un mensaje
  if (Niveles.length === 0 && !searchTerm) {
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
              {t("contentFidelidad.noFidelidades")}
            </Text>
          </Card.Header>
          <Card.Body>
            <Text h5 css={{ fontWeight: "normal" }}>
              {t("contentFidelidad.addNewFidelidad")}.
            </Text>
          </Card.Body>
          <Card.Footer style={{ justifyContent: "center" }}>
            <Button onPress={handleAddNiveles}>
              {t("contentFidelidad.addSuscripcion")}
            </Button>
          </Card.Footer>
        </Card>
        {modalAdd && (
          <ModalAgregarUsuario
            onClose={closeModal}
            handleUpdate={handleUpdateNiveles}
          />
        )}
      </div>
    );
  }
  //Si no hay nivelesFidelidad activos, inactivos o eliminados con la búsqueda entonces muestra un mensaje
  if (Niveles.length === 0 && searchTerm) {
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
              {t("contentFidelidad.noFidelidadWithSearch")}
            </Text>
            <Text h5 css={{ fontWeight: "normal" }}>
              {searchTerm}
            </Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
  //Si hay nivelesFidelidad entonces muestra la tabla de nivelesFidelidad
  const columns = [
    { name: t("contentFidelidad.name"), uid: "nombreNivelFidelidad" },
    { name: t("contentFidelidad.discount"), uid: "descuento" },
    { name: t("contentFidelidad.minimoMeses"), uid: "numeroMesesMinimo" },
    { name: t("contentFidelidad.maximoMeses"), uid: "numeroMesesMaximo" },
    { name: t("contentFidelidad.Actions"), uid: "acciones" },
  ];

  //Función para renderizar las celdas de la tabla
  const renderCell = (niveles: NivelesFidelidadType, columnKey: React.Key) => {
    const cellValue = niveles[columnKey as keyof NivelesFidelidadType];
    switch (columnKey) {
      case "nombreNivelFidelidad":
        return <Text>{niveles.nombreNivelFidelidad}</Text>;
      case "descuento":
        return (
          <Text style={{ marginLeft: "9%" }}>
            <Text>{niveles.descuento}%</Text>
          </Text>
        );
      case "numeroMesesMinimo":
        return (
          <Row style={{ marginLeft: "8%" }}>
            <Text>{niveles.numeroMesesMinimo}</Text>
            <Text style={{ marginLeft: "4px" }}>
              {t("contentFidelidad.months")}
            </Text>
          </Row>
        );
      case "numeroMesesMaximo":
        return (
          <Row style={{ marginLeft: "8%" }}>
            <Text>{niveles.numeroMesesMaximo}</Text>
            <Text style={{ marginLeft: "4px" }}>
              {t("contentFidelidad.months")}
            </Text>
          </Row>
        );

      case "acciones":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex", marginLeft: "20%" }}>
              <Tooltip content={t("contentFidelidad.editFidelidad")}>
                <IconButton onClick={() => openModalEdit(niveles)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex", marginLeft: "20%" }}>
              <Tooltip content={t("contentFidelidad.deleteFidelidad")}>
                <IconButton onClick={() => openModalConfirmacion(niveles)}>
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
      let sortedData = [...Niveles];
      console.log(descriptor);
      sortedData.sort((a: NivelesFidelidadType, b: NivelesFidelidadType) => {
        const aValue = a[descriptor.column as keyof NivelesFidelidadType];
        const bValue = b[descriptor.column as keyof NivelesFidelidadType];
        if (descriptor.direction === "ascending") {
          return collator.compare(String(aValue), String(bValue));
        }
        return collator.compare(String(bValue), String(aValue));
      });

      setSortDescriptor(descriptor);
      setNiveles(sortedData);
    }
  };

  return (
    <div style={{ marginTop: "3%" }}>
      <Row
        css={{
          marginBottom: "$space$5",
          marginTop: "-30px",
        }}
      >
        <Col css={{}}>
          <Button
            onPress={handleAddNiveles}
            css={{ marginLeft: "auto" }} // Alinear a la derecha
          >
            {t("contentFidelidad.addFidelidad")}
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
          aria-label={"Niveles Activos"}
          selectionMode="single"
          onRowAction={(key: any) => {
            handleSelectionItem(key, Niveles);
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
          <Table.Body items={Niveles}>
            {(item: NivelesFidelidadType) => (
              <Table.Row key={item.idNivelFidelidad}>
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
            handleUpdate={handleUpdateNiveles}
          />
        )}

        {modalInfo && selectedFidelidad && (
          <InfoNivelFidelidad nivel={selectedFidelidad} onClose={closeModal} />
        )}
        {modalEdit && selectedFidelidad && (
          <EditNivelFidelidad
            nivel={selectedFidelidad}
            onClose={closeModal}
            handleUpdate={handleUpdateNiveles}
          />
        )}
        {modalConfirmacion && selectedFidelidad && (
          <ModalConfirmDelete
            nivel={selectedFidelidad}
            onClose={closeModal}
            handleDeleteFidelidad={handleDeleteFidelidad}
          />
        )}
      </Card>
    </div>
  );
};

export default ContentFidelidad;
