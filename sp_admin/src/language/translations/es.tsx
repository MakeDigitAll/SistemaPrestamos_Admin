const esTranslation = {
  login: {
    bienvenido: "Bienvenido",
    login: "Iniciar sesión",
    password: "Contraseña",
    email: "Correo electrónico",
  },
  profile: {
    idUsuario: "ID del Administrador",
    nombres: "Nombres",
    apellidos: "Apellidos",
    email: "Correo electrónico",
    errorTipoArchivo: "El archivo debe ser una imagen PNG o JPEG",
    imagenActualizada: "Imagen actualizada",
    errorSolicitud: "Error en la solicitud",
    errorTamanoArchivo: "El archivo debe pesar menos de 4 MB",
  },
  navbar: {
    logout: "Cerrar sesión",
    search: "Buscar...",
    profile: "Mi Perfil",
  },
  sidebar: {
    dashboard: "Dashboard",
    usuarios: "Usuarios",
    settings: "Configuración",
    usuariosActivos: "Activos",
    suscribir: "Suscribir",
    usuariosInactivos: "Inactivos",
    usuariosEliminados: "Eliminados",
    addUsuario: "Agregar",
    suscripciones: "Suscripciones",
    fidelidad: "Niveles de fidelidad",
    administracion: "Administración",
  },
  dashboard: {
    usuariosActivos: "Usuarios activos",
    usuariosInactivos: "Usuarios inactivos",
    usuariosEliminados: "Usuarios eliminados",
    usuariosPrestamistas: "Usuarios Prestamistas",
    activos: "Activos",
    inactivos: "Inactivos",
    porSuscribir: "Por suscribir",
    eliminados: "Eliminados",
    noDatos: "No hay datos",
  },
  usuariosInactivos: {
    usuarioActivado: "Usuario activado",
    noUsersToSubscribe: "No hay usuarios para suscribirse",
    addNewUser: "¿Deseas agregar un nuevo usuario?",
    addUser: "Agregar usuario",
    noUserWithSearch: "Ningún usuario encontrado con la búsqueda",
    name: "Nombre",
    lastName: "Apellido",
    referalCode: "Código de referencia",
    Phone: "Teléfono",
    Actions: "Acciones",
    activateSubscription: "Activar suscripción",
    editUser: "Editar usuario",
    deleteUser: "Eliminar usuario",
  },
  usuariosActivos: {
    noUsersActive: "No hay usuarios activos",
    noUserWithSearch: "Ningún usuario encontrado con la búsqueda",
    activateNewUser: "¿Deseas activar a un nuevo usuario?",
    activateSubscription: "Activar suscripción",
    name: "Nombre",
    lastName: "Apellido",
    referalCode: "Código de referencia",
    suscriptionName: "Nombre de suscripción",
    startDate: "Fecha de inicio",
    endDate: "Fecha de finalización",
    Actions: "Acciones",
    unsubscribe: "Cancelar suscripción",
    editUser: "Editar usuario",
  },
  usuariosEliminados: {
    noUsersDeleted: "No hay usuarios eliminados",
    noUserWithSearch: "Ningún usuario encontrado con la búsqueda",
    name: "Nombre",
    lastName: "Apellido",
    referalCode: "Código de referencia",
    phone: "Teléfono",
    Actions: "Acciones",
    enableUser: "Habilitar usuario",
    editUser: "Editar usuario",
    userEnabled: "Usuario habilitado",
  },
  modalConfirmDelete: {
    confirmDelete: "¿Estás seguro de que deseas eliminar al usuario?",
    confirm: "Confirmar",
    cancel: "Cancelar",
  },
  modalConfirmSuscripcion: {
    confirmSuscripcion: "¿Estás seguro de que deseas activar al usuario?",
    confirm: "Confirmar",
    cancel: "Cancelar",
  },
  modalDeleteSuscripcion: {
    confirmDelete:
      "¿Estás seguro de que deseas eliminar la suscripción del usuario?",
    confirm: "Confirmar",
    cancel: "Cancelar",
  },
  modalEditUser: {
    editUser: "Editar usuario",
    name: "Nombre",
    lastName: "Apellido",
    phone: "Número de teléfono",
    email: "Email",
    image: "Imagen",
    update: "Actualizar",
    cancel: "Cancelar",
    errorNombre: "El nombre es obligatorio",
    errorApellido: "El apellido es obligatorio",
    errorTelefono: "El teléfono es obligatorio",
    errorTipoArchivo: "El archivo debe ser una imagen PNG o JPEG",
    imagenActualizada: "Imagen actualizada",
    errorSolicitud: "Error en la solicitud",
    errorTamanoArchivo: "El archivo debe tener menos de 4 MB",
    onlyDigits: "El teléfono debe contener solo dígitos",
    tenDigits: "El teléfono debe contener 10 dígitos",
    negativeNumber: "El teléfono debe ser un número positivo",
    onlyLettersName: "El nombre debe contener solo letras",
    onlyLettersLastName: "El apellido debe contener solo letras",
    userEdited: "Usuario editado exitosamente",
    nameUser: "Nombre del usuario",
    lastNameUser: "Apellido del usuario",
    phoneUser: "Teléfono del usuario",
  },
  modalEnableUser: {
    confirmEnable: "¿Estás seguro de que deseas habilitar al usuario?",
    confirm: "Confirmar",
    cancel: "Cancelar",
  },
  modalInfoUser: {
    infoUser: "Información del usuario",
    name: "Nombre",
    lastName: "Apellido",
    referalCode: "Código de referencia",
    phone: "Número de teléfono",
    email: "Email",
    image: "Imagen",
    close: "Cerrar",
  },
  contentSuscripcion: {
    suscripcion: "Suscripción",
    noSuscripciones: "No hay suscripciones",
    addNewSuscripcion: "¿Deseas agregar una nueva suscripción?",
    addSuscripcion: "Agregar suscripción",
    noSuscripcionWithSearch:
      "No se encontró ninguna suscripción con la búsqueda",
    name: "Nombre de la suscripción",
    maxUsers: "Usuarios máximos",
    montoMinimo: "Monto mínimo",
    montoMaximo: "Monto máximo",
    costo: "Costo",
    Actions: "Acciones",
    users: "Usuarios",
    pesos: "Pesos",
    editSuscripcion: "Editar suscripción",
    deleteSuscripcion: "Eliminar suscripción",
    addSuscripcionType: "Agregar tipo de suscripción",
  },

  modalAddTipoSuscripcion: {
    onlyLettersName: "El nombre debe contener solo letras",
    onlyLettersLastName: "El apellido debe contener solo letras",
    requiredName: "El nombre es obligatorio",
    requiredMaxUsers: "El número máximo de usuarios es obligatorio",
    userBetween: "El número de usuarios debe estar entre 0 y 1000000",
    requiredMinAmount: "El monto mínimo es obligatorio",
    amountZero: "El monto mínimo debe ser mayor o igual a 0",
    minAmountBetween: "El monto mínimo debe estar entre 0 y 1000000",
    requiredMaxAmount: "El monto máximo es obligatorio",
    maxAmountOne: "El monto máximo debe ser mayor que 1",
    maxAmountThat: "El monto máximo debe ser mayor que el mínimo",
    requiredCost: "El costo de la suscripción es obligatorio",
    costZero: "El costo debe ser mayor que 0",
    addedSuscripcion: "Suscripción agregada exitosamente",
    suscripcionName: "Nombre de la suscripción",
    maxUsers: "Usuarios máximos",
    minAmount: "Monto mínimo",
    maxAmount: "Monto máximo",
    cost: "Costo de la suscripción",
    addSuscripcion: "Agregar suscripción",
    cancel: "Cancelar",
  },

  modalConfirmDeleteSuscripcion: {
    confirmDelete: "¿Estás seguro de que deseas eliminar la suscripción?",
    confirm: "Confirmar",
    cancel: "Cancelar",
  },

  modalEditTipoSuscripcion: {
    onlyLettersName: "El nombre debe contener solo letras",
    onlyLettersLastName: "El apellido debe contener solo letras",
    requiredName: "El nombre es obligatorio",
    requiredMaxUsers: "El número máximo de usuarios es obligatorio",
    userBetween: "El número de usuarios debe estar entre 0 y 1000000",
    requiredMinAmount: "El monto mínimo es obligatorio",
    amountZero: "El monto mínimo debe ser mayor o igual a 0",
    minAmountBetween: "El monto mínimo debe estar entre 0 y 1000000",
    requiredMaxAmount: "El monto máximo es obligatorio",
    maxAmountOne: "El monto máximo debe ser mayor que 1",
    maxAmountThat: "El monto máximo debe ser mayor que el mínimo",
    requiredCost: "El costo de la suscripción es obligatorio",
    costZero: "El costo debe ser mayor que 0",
    suscripcionName: "Nombre de la suscripción",
    maxUsers: "Usuarios máximos",
    minAmount: "Monto mínimo",
    maxAmount: "Monto máximo",
    cost: "Costo de la suscripción",
    cancel: "Cancelar",
    editSuscripcion: "Editar suscripción",
    update: "Actualizar",
    suscripcionEdited: "Suscripción editada exitosamente",
  },

  modalInfoSuscripcion: {
    infoSuscripcion: "Información de la suscripción",
    maxUsers: "Usuarios máximos ",
    users: "Usuarios ",
    minAmount: "Monto mínimo ",
    maxAmount: "Monto máximo ",
    cost: "Costo de la suscripción ",
    close: "Cerrar",
    pesos: "Pesos",
  },
  contentFidelidad: {
    fidelidad: "Fidelidad",
    noFidelidades: "No hay niveles de fidelidad",
    addNewFidelidad: "¿Deseas agregar un nuevo nivel de fidelidad?",
    addFidelidad: "Agregar nivel de fidelidad",
    noFidelidadWithSearch:
      "No se encontró ningún nivel de fidelidad con la búsqueda",
    name: "Nombre de fidelidad",
    discount: "Descuento",
    minimoMeses: "Mínimo de meses",
    maximoMeses: "Máximo de meses",
    Actions: "Acciones",
    months: "Meses",
    editFidelidad: "Editar nivel de fidelidad",
    deleteFidelidad: "Eliminar nivel de fidelidad",
    addFidelidadType: "Agregar nivel de fidelidad",
  },

  modalAddTipoFidelidad: {
    onlyLettersName: "El nombre debe contener solo letras",
    requiredName: "El nombre es obligatorio",
    requiredDiscount: "El descuento es obligatorio",
    discountZero: "El descuento debe ser mayor que 0",
    discountBetween: "El descuento debe estar entre 0 y 100",
    requiredMinMonths: "El número mínimo de meses es obligatorio",
    minMonthsZero: "El número mínimo de meses debe ser mayor que 0",
    minMonthsBetween: "El número mínimo de meses debe estar entre 0 y 100",
    requiredMaxMonths: "El número máximo de meses es obligatorio",
    maxMonthsOne: "El número máximo de meses debe ser mayor que 1",
    maxMonthsThat: "El número máximo de meses debe ser mayor que el mínimo",
    addedFidelidad: "Nivel de fidelidad agregado exitosamente",
    fidelidadName: "Nombre de fidelidad",
    discount: "Descuento en %",
    minMonths: "Mínimo de meses",
    maxMonths: "Máximo de meses",
    addFidelidad: "Agregar fidelidad",
    cancel: "Cancelar",
  },

  modalConfirmDeleteFidelidad: {
    confirmDelete:
      "¿Estás seguro de que deseas eliminar el nivel de fidelidad?",
    confirm: "Confirmar",
    cancel: "Cancelar",
  },

  modalEditTipoFidelidad: {
    onlyLettersName: "El nombre debe contener solo letras",
    requiredName: "El nombre es obligatorio",
    requiredDiscount: "El descuento es obligatorio",
    discountZero: "El descuento debe ser mayor que 0",
    discountBetween: "El descuento debe estar entre 0 y 100",
    requiredMinMonths: "El número mínimo de meses es obligatorio",
    minMonthsZero: "El número mínimo de meses debe ser mayor que 0",
    minMonthsBetween: "El número mínimo de meses debe estar entre 0 y 100",
    requiredMaxMonths: "El número máximo de meses es obligatorio",
    maxMonthsOne: "El número máximo de meses debe ser mayor que 1",
    maxMonthsThat: "El número máximo de meses debe ser mayor que el mínimo",
    fidelidadName: "Nombre de fidelidad",
    discount: "Descuento en %",
    minMonths: "Mínimo de meses",
    maxMonths: "Máximo de meses",
    cancel: "Cancelar",
    editFidelidad: "Editar nivel de fidelidad",
    update: "Actualizar",
    fidelidadEdited: "Nivel de fidelidad editado exitosamente",
    name: "Nombre de fidelidad",
  },

  modalInfoFidelidad: {
    infoFidelidad: "Información del nivel de fidelidad",
    discount: "Descuento ",
    minMonths: "Mínimo de meses ",
    maxMonths: "Máximo de meses ",
    close: "Cerrar",
    months: "Meses",
  },
  otros: {
    totalUsuarios: "Total de usuarios",
    prestamista: "Prestamista",
    afiliados: "Afiliados",
  },
};

export default esTranslation;
