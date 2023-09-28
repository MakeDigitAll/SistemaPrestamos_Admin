const enTranslation = {
  login: {
    bienvenido: "Welcome",
    login: "Login",
    password: "Password",
    email: "Email",
  },
  profile: {
    idUsuario: "Adminstrator ID",
    nombres: "First Name",
    apellidos: "Last Name",
    email: "Email",
    errorTipoArchivo: "The file must be a PNG or JPEG image",
    imagenActualizada: "Image updated",
    errorSolicitud: "Error in the request",
    errorTamanoArchivo: "The file must be less than 4 MB",
  },
  navbar: {
    logout: "Logout",
    search: "Search...",
    profile: "My Profile",
  },
  sidebar: {
    dashboard: "Dashboard",
    usuarios: "Users",
    settings: "Settings",
    usuariosActivos: "Active",
    suscribir: "Subscribe",
    usuariosInactivos: "Inactive",
    usuariosEliminados: "Deleted",
    addUsuario: "Add",
    suscripciones: "Subscriptions",
    fidelidad: "Fidelity Levels",
    administracion: "Administration",
  },
  dashboard: {
    usuariosActivos: "Active Users",
    usuariosInactivos: "Inactive Users",
    usuariosEliminados: "Deleted Users",
    usuariosPrestamistas: "Lender Users",
    activos: "Active",
    inactivos: "Inactive",
    porSuscribir: "To Subscribe",
    eliminados: "Deleted",
    noDatos: "No data",
  },
  usuariosInactivos: {
    usuarioActivado: "User activated",
    noUsersToSubscribe: "There are no users to subscribe",
    addNewUser: "Do you want to add a new user?",
    addUser: "Add user",
    noUserWithSearch: "No user found with the search",
    name: "Name",
    lastName: "Last Name",
    referalCode: "Referal Code",
    Phone: "Phone Number",
    Actions: "Actions",
    activateSubscription: "Activate subscription",
    editUser: "Edit user",
    deleteUser: "Delete user",
  },
  usuariosActivos: {
    noUsersActive: "There are no active users",
    noUserWithSearch: "No user found with the search",
    activateNewUser: "Do you want to activate a new user?",
    activateSubscription: "Activate subscription",
    name: "Name",
    lastName: "Last Name",
    referalCode: "Referal Code",
    suscriptionName: "Suscription Name",
    startDate: "Start Date",
    endDate: "End Date",
    Actions: "Actions",
    unsubscribe: "Unsubscribe",
    editUser: "Edit user",
  },
  usuariosEliminados: {
    noUsersDeleted: "There are no deleted users",
    noUserWithSearch: "No user found with the search",
    name: "Name",
    lastName: "Last Name",
    referalCode: "Referal Code",
    phone: "Phone Number",
    Actions: "Actions",
    enableUser: "Enable user",
    editUser: "Edit user",
    userEnabled: "User enabled",
  },
  modalConfirmDelete: {
    confirmDelete: "Are you sure you want to delete the user?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  modalConfirmSuscripcion: {
    confirmSuscripcion: "Are you sure you want to activate the user?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  modalDeleteSuscripcion: {
    confirmDelete: "Are you sure you want to delete the user's subscription?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  modalEditUser: {
    editUser: "Edit user",
    name: "Name",
    lastName: "Last Name",
    phone: "Phone Number",
    email: "Email",
    image: "Image",
    update: "Update",
    cancel: "Cancel",
    errorNombre: "The name is required",
    errorApellido: "The last name is required",
    errorTelefono: "The phone is required",
    errorTipoArchivo: "The file must be a PNG or JPEG image",
    imagenActualizada: "Image updated",
    errorSolicitud: "Error in the request",
    errorTamanoArchivo: "The file must be less than 4 MB",
    onlyDigits: "The phone must contain only digits",
    tenDigits: "The phone must contain 10 digits",
    negativeNumber: "The phone must be a positive number",
    onlyLettersName: "The name must contain only letters",
    onlyLettersLastName: "The last name must contain only letters",
    userEdited: "User edited successfully",
    nameUser: "User Name",
    lastNameUser: "User Last Name",
    phoneUser: "User Phone",
  },
  modalEnableUser: {
    confirmEnable: "Are you sure you want to enable the user?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  modalInfoUser: {
    infoUser: "User information",
    name: "Name",
    lastName: "Last Name",
    referalCode: "Referal Code",
    phone: "Phone Number",
    email: "Email",
    image: "Image",
    close: "Close",
  },
  contentSuscripcion: {
    suscripcion: "Subscription",
    noSuscripciones: "There are no subscriptions",
    addNewSuscripcion: "Do you want to add a new subscription?",
    addSuscripcion: "Add subscription",
    noSuscripcionWithSearch: "No subscription found with the search",
    name: "Subscription Name",
    maxUsers: "Maximum Users",
    montoMinimo: "Minimum Amount",
    montoMaximo: "Maximum Amount",
    costo: "Cost",
    Actions: "Actions",
    users: "Users",
    pesos: "Pesos",
    editSuscripcion: "Edit subscription",
    deleteSuscripcion: "Delete subscription",
    addSuscripcionType: "Add subscription type",
  },
  modalAddTipoSuscripcion: {
    onlyLettersName: "The name must contain only letters",
    onlyLettersLastName: "The last name must contain only letters",
    requiredName: "The name is required",
    requiredMaxUsers: "The maximum number of users is required",
    userBetween: "The number of users must be between 0 and 1000000",
    requiredMinAmount: "The minimum amount is required",
    amountZero: "The minimum amount must be greater or equal to 0",
    minAmountBetween: "The minimum amount must be between 0 and 1000000",
    requiredMaxAmount: "The maximum amount is required",
    maxAmountOne: "The maximum amount must be greater than 1",
    maxAmountThat: "The maximum amount must be greater than the minimum",
    requiredCost: "The cost is required",
    costZero: "The cost must be greater than 0",
    addedSuscripcion: "Subscription added successfully",
    suscripcionName: "Subscription Name",
    maxUsers: "Maximum Users",
    minAmount: "Minimum Amount",
    maxAmount: "Maximum Amount",
    cost: "Subscription Cost",
    addSuscripcion: "Add Subscription",
    cancel: "Cancel",
  },
  modalConfirmDeleteSuscripcion: {
    confirmDelete: "Are you sure you want to delete the subscription?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  modalEditTipoSuscripcion: {
    onlyLettersName: "The name must contain only letters",
    onlyLettersLastName: "The last name must contain only letters",
    requiredName: "The name is required",
    requiredMaxUsers: "The maximum number of users is required",
    userBetween: "The number of users must be between 0 and 1000000",
    requiredMinAmount: "The minimum amount is required",
    amountZero: "The minimum amount must be greater or equal to 0",
    minAmountBetween: "The minimum amount must be between 0 and 1000000",
    requiredMaxAmount: "The maximum amount is required",
    maxAmountOne: "The maximum amount must be greater than 1",
    maxAmountThat: "The maximum amount must be greater than the minimum",
    requiredCost: "The suscription cost is required",
    costZero: "The cost must be greater than 0",
    suscripcionName: "Subscription Name",
    maxUsers: "Maximum Users",
    minAmount: "Minimum Amount",
    maxAmount: "Maximum Amount",
    cost: "Subscription Cost",
    cancel: "Cancel",
    editSuscripcion: "Edit subscription",
    update: "Update",
    suscripcionEdited: "Subscription edited successfully",
  },
  modalInfoSuscripcion: {
    infoSuscripcion: "Subscription information",
    maxUsers: "Maximum Users ",
    users: "Users ",
    minAmount: "Minimum Amount ",
    maxAmount: "Maximum Amount ",
    cost: "Subscription Cost ",
    close: "Close",
    pesos: "Pesos",
  },
  contentFidelidad: {
    fidelidad: "Fidelity",
    noFidelidades: "There are no fidelities levels",
    addNewFidelidad: "Do you want to add a new fidelity level?",
    addFidelidad: "Add fidelity level",
    noFidelidadWithSearch: "No fidelity level found with the search",
    name: "Fidelity Name",
    discount: "Discount",
    minimoMeses: "Minimum Months",
    maximoMeses: "Maximum Months",
    Actions: "Actions",
    months: "Months",
    editFidelidad: "Edit fidelity level",
    deleteFidelidad: "Delete fidelity level",
    addFidelidadType: "Add fidelity level",
  },
  modalAddTipoFidelidad: {
    onlyLettersName: "The name must contain only letters",
    requiredName: "The name is required",
    requiredDiscount: "The discount is required",
    discountZero: "The discount must be greater than 0",
    discountBetween: "The discount must be between 0 and 100",
    requiredMinMonths: "The minimum number of months is required",
    minMonthsZero: "The minimum number of months must be greater than 0",
    minMonthsBetween: "The minimum number of months must be between 0 and 100",
    requiredMaxMonths: "The maximum number of months is required",
    maxMonthsOne: "The maximum number of months must be greater than 1",
    maxMonthsThat:
      "The maximum number of months must be greater than the minimum",
    addedFidelidad: "Fidelity level added successfully",
    fidelidadName: "Fidelity Name",
    discount: "Discount on %",
    minMonths: "Minimum Months",
    maxMonths: "Maximum Months",
    addFidelidad: "Add Fidelity",
    cancel: "Cancel",
  },
  modalConfirmDeleteFidelidad: {
    confirmDelete: "Are you sure you want to delete the fidelity level?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  modalEditTipoFidelidad: {
    onlyLettersName: "The name must contain only letters",
    requiredName: "The name is required",
    requiredDiscount: "The discount is required",
    discountZero: "The discount must be greater than 0",
    discountBetween: "The discount must be between 0 and 100",
    requiredMinMonths: "The minimum number of months is required",
    minMonthsZero: "The minimum number of months must be greater than 0",
    minMonthsBetween: "The minimum number of months must be between 0 and 100",
    requiredMaxMonths: "The maximum number of months is required",
    maxMonthsOne: "The maximum number of months must be greater than 1",
    maxMonthsThat:
      "The maximum number of months must be greater than the minimum",
    fidelidadName: "Fidelity Name",
    discount: "Discount on %",
    minMonths: "Minimum Months",
    maxMonths: "Maximum Months",
    cancel: "Cancel",
    editFidelidad: "Edit fidelity level",
    update: "Update",
    fidelidadEdited: "Fidelity level edited successfully",
    name: "Fidelity Name",
  },
  modalInfoFidelidad: {
    infoFidelidad: "Fidelity level information",
    discount: "Discount ",
    minMonths: "Minimum Months ",
    maxMonths: "Maximum Months ",
    close: "Close",
    months: "Months",
  },
  otros: {
    totalUsuarios: "Total Users",
    prestamista: "Lender",
    afiliados: "Affiliates",
    conPrestamo: "With loan",
    disponibles: "Available",
    eliminados: "Deleted",
    usuariosAfiliados: "Affiliate Users",
    correoNoVerificado: "Email not verified",
    sinSuscripcion: "Without subscription",
  },
};

export default enTranslation;
