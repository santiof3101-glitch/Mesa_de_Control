const STORAGE_KEY = "autocor-control-legal";
const APP_BUILD_VERSION = "20260722-commercial-start-process";
const TASK_RECONCILE_VERSION_KEY = "autocor-task-reconcile-version";
const SUPABASE_URL = "https://evblnxgeyelatdmloydl.supabase.co/rest/v1";
const SUPABASE_KEY = "sb_publishable_lFsurzFERQn1kQlfSsz1rA_588-DHwk";
const SUPABASE_AUTO_RESTORE = false;
const SUPABASE_MODULE_SYNC = true;
const SUPABASE_FULL_STATE_SYNC = false;
const SUPABASE_FOCUS_REFRESH_MIN_MS = 2 * 60 * 1000;
const SUPABASE_HEAVY_MODULE_REFRESH_MIN_MS = 10 * 60 * 1000;
const OLD_STORAGE_KEY = "autocor-saneamiento";
const STATE_SCHEMA_VERSION = 20260520;
const REMEMBER_ACCESS_KEY = "autocor-remembered-access";
const SESSION_STORAGE_KEY = "autocor-active-session";
const FORCE_LOGOUT_ACK_KEY = "autocor-force-logout-ack";
const VIEW_STORAGE_KEY = "autocor-active-view";
const AUTH_STORAGE_KEY = "autocor-access-users";
const COMMERCIAL_NOTIFICATIONS_SEEN_KEY = "autocor-commercial-notifications-seen";
const TASK_SYNC_CURSOR_KEY = "autocor-task-sync-cursor";
const TASK_DELETE_CURSOR_KEY = "autocor-task-delete-cursor";
const BACKUP_DB_NAME = "autocor-control-legal-backups";
const BACKUP_STORE_NAME = "snapshots";
const FILE_PAYLOAD_STORE_NAME = "filePayloads";
const BACKUP_RECORD_ID = "latest";
const CORPORATE_LOGO_SRC = "autocor-logo.svg.webp";
const SHARED_PC_STATE_URL = location.protocol === "file:"
  ? "http://127.0.0.1:8787/api/state"
  : `${location.origin}/api/state`;
const SHARED_PC_BACKUPS_URL = location.protocol === "file:"
  ? "http://127.0.0.1:8787/api/backups"
  : `${location.origin}/api/backups`;
const ADMIN_PASSWORD = "Autocor2026!";
const SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000;
const MAX_FILE_LIBRARY_SIZE = 50 * 1024 * 1024;
const MAX_PROVIDER_REASONABLE_AMOUNT = 100000;
const LEGAL_MAILBOXES = [
  { id: "saneamientos", label: "Saneamientos", description: "Compra, saneamiento y consultas de placa" },
  { id: "contratos", label: "Contratos", description: "Tracking de contratos de compraventa" },
  { id: "firmas", label: "Firmas", description: "Envio a firma y contratos firmados en Pilot" },
  { id: "cuv", label: "CUV", description: "Solicitudes y carga de certificado unico vehicular" }
];

const CUV_STATUS_OPTIONS = [
  "SOLICITADO",
  "EN PROCESO",
  "ENVIADO ASESOR",
  "OBSERVADO"
];

const SIGNATURE_STATUS = {
  requested: "firma solicitada",
  sent: "enviado a firmar exitoso",
  pilotRequested: "subida de contratos firmados solicitada",
  completed: "contratos firmados subidos a pilot"
};

const COMMERCIAL_TRACKING_STEPS = [
  { id: "enviado", label: "Solicitud enviada" },
  { id: "recibido", label: "Recibida por mesa" },
  { id: "tomado", label: "Tomada por legal" },
  { id: "gestion", label: "Gestion legal" },
  { id: "pilot", label: "Saneamiento en Pilot" },
  { id: "firma-solicitada", label: "Firma solicitada" },
  { id: "firma-enviada", label: "Enviado a firmar" },
  { id: "pilot-firmados", label: "Subir firmados a Pilot" },
  { id: "final", label: "Proceso finalizado" }
];

const SIGNATURE_COUNTRY_CODES = [
  { iso: "EC", name: "Ecuador", code: "+593", min: 9, max: 9 },
  { iso: "US", name: "Estados Unidos", code: "+1", min: 10, max: 10 },
  { iso: "CA", name: "Canada", code: "+1", min: 10, max: 10 },
  { iso: "CO", name: "Colombia", code: "+57", min: 10, max: 10 },
  { iso: "PE", name: "Peru", code: "+51", min: 9, max: 9 },
  { iso: "CL", name: "Chile", code: "+56", min: 9, max: 9 },
  { iso: "AR", name: "Argentina", code: "+54", min: 10, max: 11 },
  { iso: "BR", name: "Brasil", code: "+55", min: 10, max: 11 },
  { iso: "MX", name: "Mexico", code: "+52", min: 10, max: 10 },
  { iso: "ES", name: "Espana", code: "+34", min: 9, max: 9 },
  { iso: "VE", name: "Venezuela", code: "+58", min: 10, max: 10 },
  { iso: "BO", name: "Bolivia", code: "+591", min: 8, max: 8 },
  { iso: "PY", name: "Paraguay", code: "+595", min: 9, max: 9 },
  { iso: "UY", name: "Uruguay", code: "+598", min: 8, max: 9 },
  { iso: "PA", name: "Panama", code: "+507", min: 7, max: 8 },
  { iso: "CR", name: "Costa Rica", code: "+506", min: 8, max: 8 },
  { iso: "GT", name: "Guatemala", code: "+502", min: 8, max: 8 },
  { iso: "HN", name: "Honduras", code: "+504", min: 8, max: 8 },
  { iso: "SV", name: "El Salvador", code: "+503", min: 8, max: 8 },
  { iso: "NI", name: "Nicaragua", code: "+505", min: 8, max: 8 },
  { iso: "DO", name: "Republica Dominicana", code: "+1", min: 10, max: 10 },
  { iso: "PR", name: "Puerto Rico", code: "+1", min: 10, max: 10 },
  { iso: "GB", name: "Reino Unido", code: "+44", min: 10, max: 10 },
  { iso: "FR", name: "Francia", code: "+33", min: 9, max: 9 },
  { iso: "DE", name: "Alemania", code: "+49", min: 10, max: 11 },
  { iso: "IT", name: "Italia", code: "+39", min: 9, max: 10 },
  { iso: "PT", name: "Portugal", code: "+351", min: 9, max: 9 },
  { iso: "NL", name: "Paises Bajos", code: "+31", min: 9, max: 9 },
  { iso: "BE", name: "Belgica", code: "+32", min: 8, max: 9 },
  { iso: "CH", name: "Suiza", code: "+41", min: 9, max: 9 },
  { iso: "CN", name: "China", code: "+86", min: 11, max: 11 },
  { iso: "JP", name: "Japon", code: "+81", min: 10, max: 10 },
  { iso: "IN", name: "India", code: "+91", min: 10, max: 10 },
  { iso: "AU", name: "Australia", code: "+61", min: 9, max: 9 },
  { iso: "DEFAULT", name: "Otro pais", code: "+", min: 6, max: 15 }
];

const PURCHASE_COLUMNS = [
  "NO.",
  "FECHA DE SOLICITUD",
  "FECHA REVISION",
  "PLACA",
  "AGENCIA",
  "ASESOR",
  "FIGURA LEGAL",
  "AUTO PAGADO",
  "COORDINADOR LEGAL",
  "GRAVAMEN",
  "VALIDACION PN",
  "OBSERVACIONES",
  "MES DE MATRICULACION",
  "CONTRATO DE PRESTACION",
  "BUSQUEDA",
  "DATA",
  "SOLICITUD"
];

const PURCHASE_STATUS_OPTIONS = [
  "PAGO APROBADO",
  "PAGO RECHAZADO",
  "SALIDA APROBADA",
  "SALIDA RECHAZADA",
  "PAGADO SIN VALIDACION",
  "PENDIENTE",
  "REPROCESO",
  "REPROCESO APROBADO",
  "REPROCESO RECHAZADO",
  "RIESGO MEDIO",
  "RIESGO ALTO"
];

const CONTRACT_COLUMNS = [
  "ID",
  "HORA DE INICIO",
  "HORA DE FINALIZACION",
  "CORREO ELECTRONICO",
  "COLUMN",
  "NOMBRE COMPLETO CLIENTE",
  "CEDULA DE IDENTIDAD",
  "PLACAS",
  "VALOR DE VENTA",
  "MARCA Y MODELO (MATRICULA )",
  "DIRECCION EXACTA DE VIVIENDA",
  "CELULAR",
  "CORREO ELECTRONICO CLIENTE",
  "AGENCIA DE VENTA",
  "NOMBRE DEL ASESOR",
  "OBSERVACIONES",
  "ESTADO CIVIL COMPRADOR",
  "ASISTENTE LEGAL",
  "ESTATUS",
  "FECHA DE ACTA",
  "FECHA DE CONTRATO CERRADO",
  "OBSERVACIONES 2"
];

const CONTRACT_STATUS_OPTIONS = [
  "ACTAS ENVIADAS ASESOR",
  "ACTAS SOLICITADAS",
  "ANULADO / ERRONEO",
  "BLOQUEADO / NO GENERAR",
  "FIDEVAL / VALIDACION",
  "GESTIONADO / OK",
  "OBSERVADO / DOCUMENTOS",
  "PENDIENTE / POR CONFIRMAR",
  "SIN ESTATUS"
];

const PROVIDER_COLUMNS = [
  "CUV",
  "CODIGO",
  "FECHA",
  "VALOR",
  "PLACA",
  "PILOT COMPRA",
  "PILOT VENTA",
  "ASESOR COMPRA",
  "ASESOR VENTA",
  "AGENCIA COMPRA",
  "AGENCIA VENTA",
  "MES COMPRA",
  "MES VENTA",
  "OBSERVACIONES"
];

const DEFAULT_PROVIDER_PROFILES = [
  {
    id: "provider-profile-mg",
    name: "MG",
    columns: PROVIDER_COLUMNS,
    isDefault: true
  },
  {
    id: "provider-profile-notaria",
    name: "Notaria",
    columns: ["CUV", "CODIGO", "FECHA", "VALOR", "PLACA", "TRAMITE", "NOTARIA", "ASESOR", "AGENCIA", "MES", "OBSERVACIONES"],
    isDefault: true
  }
];

const FORM_FIELD_TYPES = ["text", "number", "date", "email", "textarea", "select"];

const DEFAULT_FORM_CONFIG = {
  compra: [
    ["cliente", "Nombre del cliente completo", "text", true],
    ["cedula", "Numero de cedula del titular", "text", true],
    ["placa", "Placa", "text", true],
    ["valorToma", "Valor de toma", "number", true],
    ["kilometraje", "Kilometraje", "number", true],
    ["agencia", "Agencia", "select", true],
    ["ciudad", "Ciudad", "text", true],
    ["asesor", "Nombre del asesor", "select", true],
    ["tipoCompra", "Tipo de compra - solo Guayaquil", "select", true],
    ["tipoSaneamiento", "Tipo de saneamiento", "select", true],
    ["observaciones", "Observaciones", "textarea", true]
  ].map(([name, label, type, required]) => ({ id: `base-compra-${name}`, name, label, type, required, visible: true, isBase: true, placeholder: "" })),
  venta: [
    ["placa", "Placa", "text", true],
    ["agencia", "Agencia", "select", true],
    ["vendedor", "Vendedor", "text", true],
    ["precioContrato", "Precio de contrato", "number", true],
    ["cedulaVendedor", "Cedula del vendedor", "text", true],
    ["telefono", "Telefono", "text", true],
    ["direccion", "Direccion", "text", true],
    ["correo", "Correo", "email", true]
  ].map(([name, label, type, required]) => ({ id: `base-venta-${name}`, name, label, type, required, visible: true, isBase: true, placeholder: "" }))
};

const BASE_FORM_FIELD_TYPE_RULES = {
  compra: {
    cliente: ["text"],
    cedula: ["text"],
    placa: ["text"],
    valorToma: ["number"],
    kilometraje: ["number"],
    agencia: ["select"],
    ciudad: ["text", "select"],
    asesor: ["select"],
    tipoCompra: ["select"],
    tipoSaneamiento: ["select"],
    observaciones: ["textarea"]
  },
  venta: {
    placa: ["text"],
    agencia: ["select"],
    vendedor: ["text"],
    precioContrato: ["number"],
    cedulaVendedor: ["text"],
    telefono: ["text"],
    direccion: ["text"],
    correo: ["email"]
  }
};

const defaultState = {
  schemaVersion: STATE_SCHEMA_VERSION,
  logoDataUrl: "",
  theme: {
    primary: "#ef3d35",
    dark: "#15171d",
    font: "'Roboto Condensed', 'Arial Narrow', Arial, sans-serif"
  },
  copy: {
    heroEyebrow: "Bienvenido a Autocor",
    heroTitle: "Centro operativo de mesa de control legal",
    heroSubtitle: "Gestiona leads, tiempos de respuesta, duplicados y carga legal desde una sola bandeja.",
    commercialTitle: "Acceso comercial",
    commercialText: "Formulario de solicitudes y dashboard personal de saneamientos.",
    legalTitle: "Acceso mesa de control",
    legalText: "Bandeja legal para tomar, gestionar y cerrar saneamientos.",
    adminTitle: "Acceso administrador",
    adminText: "Configuracion de usuarios, agencias, estados, diseno y comunicados.",
    announcementsTitle: "Acceso a comunicados",
    announcementsText: "Cartelera completa de anuncios, novedades y procesos internos.",
    managerTitle: "Acceso consulta de saneamientos",
    managerText: "Dashboard gerencial con filtros, graficos e indicadores de operacion.",
    supportTitle: "Soporte",
    supportQuestion: "\u00BFNecesitas ayuda?",
    supportButton: "Consultar",
    supportMessage: "Tienes problemas con tu sistema? Contactate con soporte.",
    supportEmail: "sortiz@autocor.com.ec",
    supportWhatsapp: "0996387526"
  },
  announcements: [
    { id: "com-1", title: "Bandeja legal activa", body: "Los asistentes legales pueden tomar leads disponibles por orden de prioridad.", createdAt: new Date().toISOString() }
  ],
  announcementDeletions: [],
  forceLogoutRequests: [],
  purchaseTypes: ["Compra directa", "Consignacion", "Retoma"],
  sanitationTypes: ["Levantamiento de gravamen", "Cambio de propietario", "Revision documental"],
  statusOptions: [
    { id: "status-por-asignar", label: "Por asignar", value: "por asignar", color: "#64748b", closes: false, isDefault: true },
    { id: "status-pendiente", label: "Pendiente", value: "pendiente", color: "#8d8d92", closes: false, isDefault: true },
    { id: "status-tomado", label: "Tomado", value: "tomado", color: "#d98612", closes: false, isDefault: true },
    { id: "status-rechazado", label: "Rechazado por saneamiento", value: "rechazado por saneamiento", color: "#c92520", closes: true, isDefault: false },
    { id: "status-pilot", label: "Saneamiento realizado y subido a Pilot", value: "saneamiento realizado y subido a pilot", color: "#23865d", closes: true, isDefault: false }
  ],
  formConfig: structuredClone(DEFAULT_FORM_CONFIG),
  agencies: ["Matriz Guayaquil", "Sucursal Norte", "Sucursal Sur", "Via Daule", "Samborondon", "Duran", "Quito", "Cuenca", "Manta"],
  commercialAdvisors: [
    { id: "comercial-1", name: "Asesor comercial 1", agency: "Matriz Guayaquil", username: "comercial1", password: "Comercial123" },
    { id: "comercial-2", name: "Asesor comercial 2", agency: "Sucursal Norte", username: "comercial2", password: "Comercial123" },
    { id: "comercial-3", name: "Asesor comercial 3", agency: "Sucursal Sur", username: "comercial3", password: "Comercial123" }
  ],
  legalUsers: [
    { id: "legal-1", name: "Asistente legal 1", username: "legal1", password: "Legal123", mailboxes: ["saneamientos"], legalAvailable: true },
    { id: "legal-2", name: "Asistente legal 2", username: "legal2", password: "Legal123", mailboxes: ["saneamientos", "contratos"], legalAvailable: true }
  ],
  managerUsers: [
    { id: "gerente-1", name: "Gerente general", username: "gerente1", password: "Gerente123" }
  ],
  processingUsers: [
    { id: "datos-1", name: "Mesa de Datos", username: "datos1", password: "Datos123" }
  ],
  dataProcessing: {
    compras: [],
    loads: [],
    purchaseDuplicateApprovals: {},
    purchaseFilterPresets: [],
    contratos: [],
    contractLoads: [],
    proveedores: [],
    providerLoads: [],
    providerProfiles: DEFAULT_PROVIDER_PROFILES,
    providerDuplicateApprovals: {},
    files: [],
    folders: [
      { id: "folder-general", name: "General", createdAt: new Date().toISOString(), isDefault: true },
      { id: "folder-contratos", name: "Contratos", createdAt: new Date().toISOString(), isDefault: true },
      { id: "folder-compras", name: "Compras", createdAt: new Date().toISOString(), isDefault: true },
      { id: "folder-saneamientos", name: "Saneamientos", createdAt: new Date().toISOString(), isDefault: true }
    ]
  },
  taskDeletions: [],
  legalChatMessages: [],
  tasks: []
};

let sharedPcStorageAvailable = false;
let stateLoadedFromPc = false;
let supabaseSyncTimer = null;
let supabaseModuleSyncTimer = null;
let restoringSupabaseModules = false;
let supabaseModulesReady = false;
let pollingSupabaseModules = false;
let supabasePollingTimer = null;
const supabaseModuleVersions = {};
const supabaseRemoteVersions = {};
const supabasePublishedHashes = {};
const supabaseProtectedRemoteCounts = {};
const supabaseIntentionalSmallerPublishes = {};
let supabaseTaskCursor = localStorage.getItem(TASK_SYNC_CURSOR_KEY) || "";
let supabaseTaskDeleteCursor = localStorage.getItem(TASK_DELETE_CURSOR_KEY) || "";
let supabaseLastRefreshAt = 0;
const state = loadState();
hydrateCommercialOwners();
persistAccessUsers(state);
let lastActivityAt = Date.now();
let lastSessionPersistAt = 0;
let sessionAnnouncementShownKey = "";
let session = loadPersistedSession();
let currentViewId = loadPersistedView();
document.body.dataset.session = session.role;
let activeFilter = "todos";
let searchTerm = "";
let taskDateFrom = "";
let taskDateTo = "";
let adminFilters = {
  legal: "",
  commercial: "",
  agency: "",
  status: "",
  from: "",
  to: ""
};
let managerDetailFilters = {
  from: "",
  to: "",
  plate: "",
  advisor: "",
  agency: ""
};
let purchaseFilters = {
  month: "",
  loadId: "",
  date: "",
  agency: "",
  advisor: [],
  coordinator: [],
  status: "",
  plate: ""
};
let contractFilters = {
  month: "",
  loadId: "",
  date: "",
  agency: "",
  advisor: "",
  legal: "",
  status: "",
  search: ""
};
let providerFilters = {
  provider: "",
  month: "",
  plate: "",
  loadId: ""
};
let pendingProviderRecords = [];
let providerDuplicateView = "pending";
let providerDuplicatePage = 1;
let backupRestoreChecked = false;
let currentPurchaseDetailReport = { title: "", html: "" };
let activeCommercialProcess = "compra";
let activeCommercialArea = "process";
let activeCommercialRequestFilter = "todos";
let commercialTrackingFilter = "todos";
let commercialTrackingSearch = "";
let commercialTrackingDateFrom = "";
let commercialTrackingDateTo = "";
let commercialTrackingPage = 1;
let commercialTrackingSearchTimer = null;
const COMMERCIAL_TRACKING_PAGE_SIZE = 6;

const views = document.querySelectorAll(".view");
const tabs = document.querySelectorAll("[data-view]");
const navTabs = document.querySelectorAll(".nav-tabs .tab[data-view]");
const adminModuleButtons = document.querySelectorAll("[data-admin-module]");
const adminModuleSections = document.querySelectorAll("[data-admin-section]");
const commercialModuleButtons = document.querySelectorAll("[data-commercial-module]");
const commercialModuleSections = document.querySelectorAll("[data-commercial-section]");
const commercialProcessButtons = document.querySelectorAll("[data-commercial-process]");
const commercialProcessSections = document.querySelectorAll("[data-commercial-process-section]");
const commercialStartButtons = document.querySelectorAll("[data-commercial-start]");
const commercialAreaButtons = document.querySelectorAll("[data-commercial-area]");
const commercialAreaSections = document.querySelectorAll("[data-commercial-area-section]");
const processingTabButtons = document.querySelectorAll("[data-processing-tab]");
const processingPanels = document.querySelectorAll("[data-processing-panel]");
const logoutBtn = document.querySelector("#logoutBtn");
const form = document.querySelector("#requestForm");
const saleContractForm = document.querySelector("#saleContractForm");
const cuvRequestForm = document.querySelector("#cuvRequestForm");
const commercialCuvList = document.querySelector("#commercialCuvList");
const taskList = document.querySelector("#taskList");
const toast = document.querySelector("#toast");
const queueCount = document.querySelector("#queueCount");
const filterButtons = document.querySelectorAll("[data-filter]");
const legalLoginForm = document.querySelector("#legalLoginForm");
const commercialLoginForm = document.querySelector("#commercialLoginForm");
const adminLoginForm = document.querySelector("#adminLoginForm");
const managerLoginForm = document.querySelector("#managerLoginForm");
const processingLoginForm = document.querySelector("#processingLoginForm");
const commercialPasswordForm = document.querySelector("#commercialPasswordForm");
const legalPasswordForm = document.querySelector("#legalPasswordForm");
const legalAvailabilityToggle = document.querySelector("#legalAvailabilityToggle");
const legalAvailabilityStatus = document.querySelector("#legalAvailabilityStatus");
const legalChatForm = document.querySelector("#legalChatForm");
const legalChatInput = document.querySelector("#legalChatInput");
const legalChatList = document.querySelector("#legalChatList");
const legalChatRecipientSearch = document.querySelector("#legalChatRecipientSearch");
const legalChatRecipientSelect = document.querySelector("#legalChatRecipientSelect");
const legalChatPanel = document.querySelector("#legalChatPanel");
const legalChatOpenBtn = document.querySelector("#legalChatOpenBtn");
const legalChatCloseBtn = document.querySelector("#legalChatCloseBtn");
const legalSidebarFilterButtons = document.querySelectorAll("[data-legal-sidebar-filter]");
const legalSidebarNavButtons = document.querySelectorAll("[data-legal-scroll]");
const userForm = document.querySelector("#userForm");
const managerUserForm = document.querySelector("#managerUserForm");
const processingUserForm = document.querySelector("#processingUserForm");
const logoInput = document.querySelector("#logoInput");
const resetLogoBtn = document.querySelector("#resetLogoBtn");
const logoSlot = document.querySelector("#logoSlot");
const legalSessionLabel = document.querySelector("#legalSessionLabel");
const duplicateAlert = document.querySelector("#duplicateAlert");
const taskSearch = document.querySelector("#taskSearch");
const taskDateFromInput = document.querySelector("#taskDateFrom");
const taskDateToInput = document.querySelector("#taskDateTo");
const statusLookupForm = document.querySelector("#statusLookupForm");
const statusSearch = document.querySelector("#statusSearch");
const statusDateFrom = document.querySelector("#statusDateFrom");
const statusDateTo = document.querySelector("#statusDateTo");
const statusResults = document.querySelector("#statusResults");
const statusAdvisorFilter = document.querySelector("#statusAdvisorFilter");
const statusAgencyFilter = document.querySelector("#statusAgencyFilter");
const statusStateFilter = document.querySelector("#statusStateFilter");
const statusLookupKpis = document.querySelector("#statusLookupKpis");
const heroSearchForm = document.querySelector("#heroSearchForm");
const heroSearchInput = document.querySelector("#heroSearchInput");
const agenciaSelect = document.querySelector("#agenciaSelect");
const asesorSelect = document.querySelector("#asesorSelect");
const saleAgencySelect = document.querySelector("#saleAgencySelect");
const advisorAgencyInput = document.querySelector("#advisorAgencyInput");
const commercialAdvisorForm = document.querySelector("#commercialAdvisorForm");
const adminFormProcessSelect = document.querySelector("#adminFormProcessSelect");
const adminFormFieldsList = document.querySelector("#adminFormFieldsList");
const customFormFieldForm = document.querySelector("#customFormFieldForm");
const purchaseCustomFields = document.querySelector("#purchaseCustomFields");
const saleCustomFields = document.querySelector("#saleCustomFields");
const announcementForm = document.querySelector("#announcementForm");
const announcementAudience = document.querySelector("#announcementAudience");
const announcementRecipientSearch = document.querySelector("#announcementRecipientSearch");
const announcementRecipients = document.querySelector("#announcementRecipients");
const forceLogoutAudience = document.querySelector("#forceLogoutAudience");
const forceLogoutRecipientSearch = document.querySelector("#forceLogoutRecipientSearch");
const forceLogoutRecipients = document.querySelector("#forceLogoutRecipients");
const forceLogoutMessage = document.querySelector("#forceLogoutMessage");
const forceLogoutBtn = document.querySelector("#forceLogoutBtn");
const sessionAnnouncementModal = document.querySelector("#sessionAnnouncementModal");
const sessionAnnouncementList = document.querySelector("#sessionAnnouncementList");
const adminLegalFilter = document.querySelector("#adminLegalFilter");
const adminCommercialFilter = document.querySelector("#adminCommercialFilter");
const adminAgencyFilter = document.querySelector("#adminAgencyFilter");
const adminStatusFilter = document.querySelector("#adminStatusFilter");
const adminDateFrom = document.querySelector("#adminDateFrom");
const adminDateTo = document.querySelector("#adminDateTo");
const clearAdminFilters = document.querySelector("#clearAdminFilters");
const adminLeadsList = document.querySelector("#adminLeadsList");
const adminLeadCount = document.querySelector("#adminLeadCount");
const reconcileAdminLeadsBtn = document.querySelector("#reconcileAdminLeadsBtn");
const adminLeadModal = document.querySelector("#adminLeadModal");
const adminLeadForm = document.querySelector("#adminLeadForm");
const adminLeadModalTitle = document.querySelector("#adminLeadModalTitle");
const adminLeadTimeInfo = document.querySelector("#adminLeadTimeInfo");
const legalTaskModal = document.querySelector("#legalTaskModal");
const legalTaskModalTitle = document.querySelector("#legalTaskModalTitle");
const legalTaskModalContent = document.querySelector("#legalTaskModalContent");
const exportDataBtn = document.querySelector("#exportDataBtn");
const importDataInput = document.querySelector("#importDataInput");
const restoreInternalBackupBtn = document.querySelector("#restoreInternalBackupBtn");
const createPcBackupBtn = document.querySelector("#createPcBackupBtn");
const pcBackupList = document.querySelector("#pcBackupList");
const internalBackupStatus = document.querySelector("#internalBackupStatus");
const managerDateFrom = document.querySelector("#managerDateFrom");
const managerDateTo = document.querySelector("#managerDateTo");
const managerPlateFilter = document.querySelector("#managerPlateFilter");
const managerAdvisorFilter = document.querySelector("#managerAdvisorFilter");
const managerAgencyFilter = document.querySelector("#managerAgencyFilter");
const clearManagerFilters = document.querySelector("#clearManagerFilters");
const themeForm = document.querySelector("#themeForm");
const resetThemeBtn = document.querySelector("#resetThemeBtn");
const copyForm = document.querySelector("#copyForm");
const resetCopyBtn = document.querySelector("#resetCopyBtn");
const commercialSupportBtn = document.querySelector("#commercialSupportBtn");
const supportModal = document.querySelector("#supportModal");
const supportBubbleMessage = document.querySelector("#supportBubbleMessage");
const supportEmailLink = document.querySelector("#supportEmailLink");
const supportWhatsappLink = document.querySelector("#supportWhatsappLink");
const commercialConstructionModal = document.querySelector("#commercialConstructionModal");
const commercialLeadModal = document.querySelector("#commercialLeadModal");
const commercialLeadFichaContent = document.querySelector("#commercialLeadFichaContent");
const commercialNotificationsModal = document.querySelector("#commercialNotificationsModal");
const commercialNotificationsContent = document.querySelector("#commercialNotificationsContent");
const commercialSidebarModal = document.querySelector("#commercialSidebarModal");
const commercialSidebarModalTitle = document.querySelector("#commercialSidebarModalTitle");
const commercialSidebarModalEyebrow = document.querySelector("#commercialSidebarModalEyebrow");
const commercialSidebarModalSubtitle = document.querySelector("#commercialSidebarModalSubtitle");
const commercialSidebarModalContent = document.querySelector("#commercialSidebarModalContent");
const commercialPilotModal = document.querySelector("#commercialPilotModal");
const pilotConfirmBtn = document.querySelector("#pilotConfirmBtn");
const pilotCancelBtn = document.querySelector("#pilotCancelBtn");
const commercialSignatureModal = document.querySelector("#commercialSignatureModal");
const commercialSignatureForm = document.querySelector("#commercialSignatureForm");
const signatureTaskIdInput = document.querySelector("#signatureTaskId");
const signatureSpouseToggle = document.querySelector("#signatureSpouseToggle");
const signatureSpouseFields = document.querySelector("#signatureSpouseFields");
const signatureHeirsToggle = document.querySelector("#signatureHeirsToggle");
const signatureHeirsFields = document.querySelector("#signatureHeirsFields");
const signatureValidationMessage = document.querySelector("#signatureValidationMessage");
const commercialDuplicateModal = document.querySelector("#commercialDuplicateModal");
const duplicateConflictContent = document.querySelector("#duplicateConflictContent");
const duplicateContinueBtn = document.querySelector("#duplicateContinueBtn");
const duplicateCancelBtn = document.querySelector("#duplicateCancelBtn");
const commercialNotificationCount = document.querySelector("#commercialNotificationCount");
const statusOptionForm = document.querySelector("#statusOptionForm");
const statusFilterButtons = document.querySelector("#statusFilterButtons");
const imageModal = document.querySelector("#imageModal");
const imageModalImg = document.querySelector("#imageModalImg");
const filePreviewModal = document.querySelector("#filePreviewModal");
const filePreviewTitle = document.querySelector("#filePreviewTitle");
const filePreviewContent = document.querySelector("#filePreviewContent");
const purchaseMonthInput = document.querySelector("#purchaseMonthInput");
const purchaseFileInput = document.querySelector("#purchaseFileInput");
const purchaseBulkInput = document.querySelector("#purchaseBulkInput");
const processPurchasePasteBtn = document.querySelector("#processPurchasePasteBtn");
const exportPurchasesBtn = document.querySelector("#exportPurchasesBtn");
const clearPurchasesBtn = document.querySelector("#clearPurchasesBtn");
const purchaseMonthHint = document.querySelector("#purchaseMonthHint");
const purchaseLoadReport = document.querySelector("#purchaseLoadReport");
const purchaseLoadCount = document.querySelector("#purchaseLoadCount");
const togglePurchaseLoadsBtn = document.querySelector("#togglePurchaseLoadsBtn");
const purchaseMonthFilter = document.querySelector("#purchaseMonthFilter");
const purchaseLoadFilter = document.querySelector("#purchaseLoadFilter");
const purchaseDateFilter = document.querySelector("#purchaseDateFilter");
const purchaseAgencyFilter = document.querySelector("#purchaseAgencyFilter");
const purchaseAdvisorFilter = document.querySelector("#purchaseAdvisorFilter");
const purchaseAdvisorFilterBtn = document.querySelector("#purchaseAdvisorFilterBtn");
const purchaseAdvisorFilterPanel = document.querySelector("#purchaseAdvisorFilterPanel");
const purchaseCoordinatorFilter = document.querySelector("#purchaseCoordinatorFilter");
const purchaseCoordinatorFilterBtn = document.querySelector("#purchaseCoordinatorFilterBtn");
const purchaseCoordinatorFilterPanel = document.querySelector("#purchaseCoordinatorFilterPanel");
const purchaseStatusFilter = document.querySelector("#purchaseStatusFilter");
const purchasePlateFilter = document.querySelector("#purchasePlateFilter");
const clearPurchaseFiltersBtn = document.querySelector("#clearPurchaseFiltersBtn");
const savePurchaseFilterPresetBtn = document.querySelector("#savePurchaseFilterPresetBtn");
const purchaseFilterPresetSelect = document.querySelector("#purchaseFilterPresetSelect");
const exportPurchasePdfBtn = document.querySelector("#exportPurchasePdfBtn");
const printPurchaseDetailBtn = document.querySelector("#printPurchaseDetailBtn");
const purchaseExecutiveDashboard = document.querySelector("#purchaseExecutiveDashboard");
const contractMonthInput = document.querySelector("#contractMonthInput");
const contractFileInput = document.querySelector("#contractFileInput");
const contractBulkInput = document.querySelector("#contractBulkInput");
const processContractPasteBtn = document.querySelector("#processContractPasteBtn");
const exportContractsBtn = document.querySelector("#exportContractsBtn");
const clearContractsBtn = document.querySelector("#clearContractsBtn");
const contractMonthHint = document.querySelector("#contractMonthHint");
const contractLoadReport = document.querySelector("#contractLoadReport");
const contractLoadCount = document.querySelector("#contractLoadCount");
const toggleContractLoadsBtn = document.querySelector("#toggleContractLoadsBtn");
const contractMonthFilter = document.querySelector("#contractMonthFilter");
const contractLoadFilter = document.querySelector("#contractLoadFilter");
const contractDateFilter = document.querySelector("#contractDateFilter");
const contractAgencyFilter = document.querySelector("#contractAgencyFilter");
const contractAdvisorFilter = document.querySelector("#contractAdvisorFilter");
const contractLegalFilter = document.querySelector("#contractLegalFilter");
const contractStatusFilter = document.querySelector("#contractStatusFilter");
const contractSearchFilter = document.querySelector("#contractSearchFilter");
const clearContractFiltersBtn = document.querySelector("#clearContractFiltersBtn");
const exportContractPdfBtn = document.querySelector("#exportContractPdfBtn");
const openContractBaseBtn = document.querySelector("#openContractBaseBtn");
const providerNameInput = document.querySelector("#providerNameInput");
const providerProfileSelect = document.querySelector("#providerProfileSelect");
const providerProfileBox = document.querySelector("#providerProfileBox");
const providerProfileForm = document.querySelector("#providerProfileForm");
const providerProfileIdInput = document.querySelector("#providerProfileIdInput");
const providerProfileNameInput = document.querySelector("#providerProfileNameInput");
const providerProfileColumnsInput = document.querySelector("#providerProfileColumnsInput");
const providerProfileSummary = document.querySelector("#providerProfileSummary");
const toggleProviderProfileManagerBtn = document.querySelector("#toggleProviderProfileManagerBtn");
const showProviderCellsBtn = document.querySelector("#showProviderCellsBtn");
const editProviderProfileBtn = document.querySelector("#editProviderProfileBtn");
const deleteProviderProfileBtn = document.querySelector("#deleteProviderProfileBtn");
const providerMonthInput = document.querySelector("#providerMonthInput");
const providerFileInput = document.querySelector("#providerFileInput");
const providerBulkInput = document.querySelector("#providerBulkInput");
const processProviderPasteBtn = document.querySelector("#processProviderPasteBtn");
const clearProvidersBtn = document.querySelector("#clearProvidersBtn");
const restoreProviderTrashBtn = document.querySelector("#restoreProviderTrashBtn");
const providerRecordCount = document.querySelector("#providerRecordCount");
const providerHeroRecords = document.querySelector("#providerHeroRecords");
const providerHeroProviders = document.querySelector("#providerHeroProviders");
const providerHeroPending = document.querySelector("#providerHeroPending");
const providerHeroMonth = document.querySelector("#providerHeroMonth");
const providerFilterSelect = document.querySelector("#providerFilterSelect");
const providerMonthFilter = document.querySelector("#providerMonthFilter");
const providerLoadFilter = document.querySelector("#providerLoadFilter");
const providerPlateFilter = document.querySelector("#providerPlateFilter");
const deleteProviderLoadBtn = document.querySelector("#deleteProviderLoadBtn");
const clearProviderFiltersBtn = document.querySelector("#clearProviderFiltersBtn");
const exportProviderPdfBtn = document.querySelector("#exportProviderPdfBtn");
const providerKpis = document.querySelector("#providerKpis");
const providerExecutiveDashboard = document.querySelector("#providerExecutiveDashboard");
const providerDuplicateReport = document.querySelector("#providerDuplicateReport");
const providerTable = document.querySelector("#providerTable");
const providerPastePreview = document.querySelector("#providerPastePreview");
const providerDetailModal = document.querySelector("#providerDetailModal");
const providerDetailTitle = document.querySelector("#providerDetailTitle");
const providerDetailContent = document.querySelector("#providerDetailContent");
const fileLibraryForm = document.querySelector("#fileLibraryForm");
const fileLibraryInput = document.querySelector("#fileLibraryInput");
const fileLibraryPickerText = document.querySelector("#fileLibraryPickerText");
const fileLibraryList = document.querySelector("#fileLibraryList");
const fileLibraryCount = document.querySelector("#fileLibraryCount");
const fileCategoryFilter = document.querySelector("#fileCategoryFilter");
const fileFolderFilter = document.querySelector("#fileFolderFilter");
const fileUploadFolderSelect = document.querySelector("#fileUploadFolderSelect");
const fileFolderForm = document.querySelector("#fileFolderForm");
const fileFolderParentSelect = document.querySelector("#fileFolderParentSelect");
const fileFolderList = document.querySelector("#fileFolderList");
const fileFolderSearchInput = document.querySelector("#fileFolderSearchInput");
const fileSearchInput = document.querySelector("#fileSearchInput");
const clearFileLibraryBtn = document.querySelector("#clearFileLibraryBtn");
const filePanelButtons = document.querySelectorAll("[data-file-panel-open]");
const fileVaultPanels = document.querySelectorAll("[data-file-panel]");

function loadState() {
  const shared = readSharedPcState();
  const browserState = readBrowserStoredState();
  if (shared?.state) {
    try {
      stateLoadedFromPc = true;
      const sharedState = normalizeImportedState(shared.state);
      const mergedState = browserState ? mergePcStates(sharedState, browserState) : sharedState;
      applyCachedAccessUsers(mergedState);
      if (browserState && getStateScore(mergedState) > getStateScore(sharedState)) {
        requestAnimationFrame(() => saveState());
      }
      return mergedState;
    } catch {
      stateLoadedFromPc = false;
    }
  }
  if (sharedPcStorageAvailable && browserState) {
    applyCachedAccessUsers(browserState);
    requestAnimationFrame(() => saveState());
    return browserState;
  }
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
  if (!saved) {
    const initialState = structuredClone(defaultState);
    applyCachedAccessUsers(initialState);
    return initialState;
  }

  try {
    const parsed = JSON.parse(saved);
    const merged = { ...structuredClone(defaultState), ...parsed };
    if (!parsed.legalUsers && parsed.legalAdvisors) {
      merged.legalUsers = parsed.legalAdvisors.map((name, index) => ({
        id: crypto.randomUUID(),
        name,
        username: `legal${index + 1}`,
        password: "Legal123",
        mailboxes: ["saneamientos"],
        legalAvailable: true
      }));
    }
    merged.commercialAdvisors = normalizeCommercialAdvisors(merged.commercialAdvisors || []);
    merged.legalUsers = normalizeLegalUsers(merged.legalUsers || []);
    merged.managerUsers = Array.isArray(merged.managerUsers) ? merged.managerUsers : [];
    merged.processingUsers = Array.isArray(merged.processingUsers) ? merged.processingUsers : structuredClone(defaultState.processingUsers);
    merged.announcements = (merged.announcements || []).map(normalizeAnnouncement);
    merged.announcementDeletions = (merged.announcementDeletions || []).map(normalizeAnnouncementDeletion);
    applyAnnouncementDeletions(merged);
    merged.forceLogoutRequests = (merged.forceLogoutRequests || []).map(normalizeForceLogoutRequest);
    merged.legalChatMessages = normalizeLegalChatMessages(merged.legalChatMessages || []);
    merged.theme = { ...structuredClone(defaultState.theme), ...(merged.theme || {}) };
    merged.copy = { ...structuredClone(defaultState.copy), ...(merged.copy || {}) };
    sanitizeStateVisuals(merged);
    migrateVisualDefaults(merged, parsed);
    merged.dataProcessing = { ...structuredClone(defaultState.dataProcessing), ...(merged.dataProcessing || {}) };
    merged.dataProcessing.compras = (merged.dataProcessing.compras || []).map(normalizePurchaseRecord);
    merged.dataProcessing.loads = (merged.dataProcessing.loads || []).map(normalizePurchaseLoad);
    merged.dataProcessing.purchaseDuplicateApprovals = merged.dataProcessing.purchaseDuplicateApprovals || {};
    merged.dataProcessing.purchaseFilterPresets = merged.dataProcessing.purchaseFilterPresets || [];
    merged.dataProcessing.contratos = (merged.dataProcessing.contratos || []).map(normalizeContractRecord);
    merged.dataProcessing.contractLoads = (merged.dataProcessing.contractLoads || []).map(normalizeContractLoad);
    merged.dataProcessing.providerProfiles = buildProviderProfilesFromHistory(merged.dataProcessing.providerProfiles || [], merged.dataProcessing);
    merged.dataProcessing.proveedores = (merged.dataProcessing.proveedores || []).map(normalizeProviderRecord);
    merged.dataProcessing.providerLoads = (merged.dataProcessing.providerLoads || []).map(normalizeProviderLoad);
    merged.dataProcessing.providerDuplicateApprovals = merged.dataProcessing.providerDuplicateApprovals || {};
    merged.dataProcessing.folders = normalizeFileFolders(merged.dataProcessing.folders || []);
    merged.dataProcessing.files = (merged.dataProcessing.files || []).map(normalizeStoredFile);
    merged.statusOptions = normalizeStatusOptions(merged.statusOptions || defaultState.statusOptions);
    merged.formConfig = normalizeFormConfig(merged.formConfig);
    merged.taskDeletions = Array.isArray(merged.taskDeletions) ? merged.taskDeletions.filter((item) => item?.id) : [];
    merged.tasks = (merged.tasks || [])
      .map(normalizeTask)
      .filter((task) => !merged.taskDeletions.some((deletion) => deletion.id === task.id));
    merged.schemaVersion = STATE_SCHEMA_VERSION;
    applyCachedAccessUsers(merged);
    if (parsed.schemaVersion !== STATE_SCHEMA_VERSION || (sharedPcStorageAvailable && !stateLoadedFromPc)) {
      requestAnimationFrame(() => saveState());
    }
    return merged;
  } catch {
    const fallbackState = structuredClone(defaultState);
    applyCachedAccessUsers(fallbackState);
    return fallbackState;
  }
}

function readCachedAccessUsers() {
  try {
    const cached = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
    return cached && typeof cached === "object" ? cached : null;
  } catch {
    return null;
  }
}

function applyCachedAccessUsers(snapshot) {
  const cached = readCachedAccessUsers();
  if (!cached || !snapshot) return snapshot;
  if (Array.isArray(cached.commercialAdvisors) && cached.commercialAdvisors.length) {
    snapshot.commercialAdvisors = normalizeCommercialAdvisors(cached.commercialAdvisors);
  }
  if (Array.isArray(cached.legalUsers) && cached.legalUsers.length) {
    snapshot.legalUsers = normalizeLegalUsers(cached.legalUsers);
  }
  if (Array.isArray(cached.managerUsers) && cached.managerUsers.length) {
    snapshot.managerUsers = cached.managerUsers;
  }
  if (Array.isArray(cached.processingUsers) && cached.processingUsers.length) {
    snapshot.processingUsers = cached.processingUsers;
  }
  return snapshot;
}

function persistAccessUsers(snapshot = state) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      commercialAdvisors: snapshot.commercialAdvisors || [],
      legalUsers: snapshot.legalUsers || [],
      managerUsers: snapshot.managerUsers || [],
      processingUsers: snapshot.processingUsers || [],
      updatedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.warn("No se pudo guardar la copia local de accesos:", error);
  }
}

function readBrowserStoredState() {
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
  if (!saved) return null;
  try {
    return normalizeImportedState(JSON.parse(saved));
  } catch {
    return null;
  }
}

function readSharedPcState() {
  try {
    const request = new XMLHttpRequest();
    request.open("GET", SHARED_PC_STATE_URL, false);
    request.setRequestHeader("Accept", "application/json");
    request.send();
    if (request.status === 204 || request.status === 404) {
      sharedPcStorageAvailable = true;
      return { state: null };
    }
    if (request.status >= 200 && request.status < 300) {
      sharedPcStorageAvailable = true;
      const payload = JSON.parse(request.responseText || "{}");
      return { state: payload?.state || null };
    }
  } catch {
    sharedPcStorageAvailable = false;
  }
  return null;
}

async function leerUltimoEstadoSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  try {
    const response = await fetch(`${SUPABASE_URL}/REGISTROS?modulo=eq.sistema&tipo=eq.estado_completo&select=datos,created_at&order=created_at.desc&limit=1`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return null;
    const rows = await response.json();
    if (Array.isArray(rows) && rows.length && rows[0].datos) {
      return rows[0].datos;
    }
  } catch (error) {
    console.warn("No se pudo leer Supabase:", error);
  }
  return null;
}

async function leerUltimoBrandingSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  try {
    const response = await fetch(`${SUPABASE_URL}/REGISTROS?modulo=eq.sistema&tipo=eq.branding&select=datos,created_at&order=created_at.desc&limit=1`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return null;
    const rows = await response.json();
    return Array.isArray(rows) && rows.length ? rows[0].datos : null;
  } catch (error) {
    console.warn("No se pudo leer branding de Supabase:", error);
    return null;
  }
}

async function leerUltimoModuloSupabase(modulo, tipo = "base") {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  const query = `${SUPABASE_URL}/REGISTROS?modulo=eq.${encodeURIComponent(modulo)}&tipo=eq.${encodeURIComponent(tipo)}&select=datos,created_at&order=created_at.desc&limit=1`;
  try {
    const response = await fetch(query, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return null;
    const rows = await response.json();
    return Array.isArray(rows) && rows.length ? rows[0].datos : null;
  } catch (error) {
    console.warn(`No se pudo leer modulo ${modulo} de Supabase:`, error);
    return null;
  }
}

async function leerVersionModuloSupabase(modulo, tipo = "base") {
  if (!SUPABASE_URL || !SUPABASE_KEY) return "";
  const query = `${SUPABASE_URL}/REGISTROS?modulo=eq.${encodeURIComponent(modulo)}&tipo=eq.${encodeURIComponent(tipo)}&select=created_at&order=created_at.desc&limit=1`;
  try {
    const response = await fetch(query, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return "";
    const rows = await response.json();
    return Array.isArray(rows) && rows.length ? String(rows[0].created_at || "") : "";
  } catch (error) {
    console.warn(`No se pudo revisar la version de ${modulo}:`, error);
    return "";
  }
}

async function leerVersionesModulosSupabase(modules = ["usuarios", "catalogos", "saneamientos", "compras", "contratos", "proveedores", "archivos"]) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return {};
  if (!modules.length) return {};
  const query = `${SUPABASE_URL}/REGISTROS?modulo=in.(${modules.join(",")})&tipo=eq.base&select=modulo,created_at&order=created_at.desc&limit=100`;
  try {
    const response = await fetch(query, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return {};
    const rows = await response.json();
    return (Array.isArray(rows) ? rows : []).reduce((versions, row) => {
      if (row?.modulo && !versions[row.modulo]) versions[row.modulo] = String(row.created_at || "");
      return versions;
    }, {});
  } catch (error) {
    console.warn("No se pudieron revisar las versiones de Supabase:", error);
    return {};
  }
}

async function leerModuloSupabaseSiCambio(modulo, remoteVersions, tipo = "base") {
  const remoteVersion = remoteVersions?.[modulo] || "";
  if (!remoteVersion) return { snapshot: null, exists: false, changed: false };
  if (supabaseRemoteVersions[modulo] === remoteVersion) {
    return { snapshot: null, exists: true, changed: false };
  }
  const snapshot = await leerUltimoModuloSupabase(modulo, tipo);
  if (!snapshot) return { snapshot: null, exists: true, changed: false };
  supabaseRemoteVersions[modulo] = remoteVersion;
  supabasePublishedHashes[modulo] = getSupabaseSnapshotHash(snapshot);
  return { snapshot, exists: true, changed: true };
}

async function leerTareasSupabase(forceFull = false) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const incremental = Boolean(supabaseTaskCursor) && !forceFull;
  const cursorFilter = incremental
    ? `&created_at=gt.${encodeURIComponent(supabaseTaskCursor)}`
    : "";
  const order = incremental ? "asc" : "desc";
  const query = `${SUPABASE_URL}/REGISTROS?modulo=eq.saneamientos&tipo=eq.tarea${cursorFilter}&select=datos,created_at&order=created_at.${order}&limit=3000`;
  try {
    const response = await fetch(query, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return [];
    const rows = await response.json();
    if (!Array.isArray(rows)) return [];
    const orderedRows = incremental ? rows : [...rows].reverse();
    if (orderedRows.length) {
      supabaseTaskCursor = String(orderedRows[orderedRows.length - 1].created_at || supabaseTaskCursor);
      localStorage.setItem(TASK_SYNC_CURSOR_KEY, supabaseTaskCursor);
    }
    return orderedRows
      .map((row) => parseMaybeJson(row.datos))
      .filter(Boolean)
      .map((task) => normalizeTask({ ...task, syncStatus: "synced" }));
  } catch (error) {
    console.warn("No se pudieron leer tareas individuales de Supabase:", error);
    return [];
  }
}

async function leerEliminacionesTareasSupabase(forceFull = false) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const cursorFilter = supabaseTaskDeleteCursor && !forceFull
    ? `&created_at=gt.${encodeURIComponent(supabaseTaskDeleteCursor)}`
    : "";
  const query = `${SUPABASE_URL}/REGISTROS?modulo=eq.saneamientos&tipo=eq.tarea&datos-%3E%3Edeleted=eq.true${cursorFilter}&select=datos,created_at&order=created_at.asc&limit=1000`;
  try {
    const response = await fetch(query, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return [];
    const rows = await response.json();
    if (!Array.isArray(rows)) return [];
    if (rows.length) {
      supabaseTaskDeleteCursor = String(rows[rows.length - 1].created_at || supabaseTaskDeleteCursor);
      localStorage.setItem(TASK_DELETE_CURSOR_KEY, supabaseTaskDeleteCursor);
    }
    return rows
      .map((row) => parseMaybeJson(row.datos))
      .filter(Boolean)
      .map((deletion) => ({ ...deletion, syncStatus: "synced" }));
  } catch (error) {
    console.warn("No se pudieron leer eliminaciones de tareas:", error);
    return [];
  }
}

async function obtenerEliminacionRemotaTarea(taskId) {
  if (!taskId || !SUPABASE_URL || !SUPABASE_KEY) return null;
  const query = `${SUPABASE_URL}/REGISTROS?modulo=eq.saneamientos&tipo=eq.tarea&datos-%3E%3Eid=eq.${encodeURIComponent(taskId)}&datos-%3E%3Edeleted=eq.true&select=datos,created_at&order=created_at.desc&limit=1`;
  try {
    const response = await fetch(query, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return null;
    const rows = await response.json();
    return Array.isArray(rows) && rows.length ? parseMaybeJson(rows[0].datos) : null;
  } catch {
    return null;
  }
}

async function obtenerUltimaTareaRemota(taskId) {
  if (!taskId || !SUPABASE_URL || !SUPABASE_KEY) return null;
  const query = `${SUPABASE_URL}/REGISTROS?modulo=eq.saneamientos&tipo=eq.tarea&datos-%3E%3Eid=eq.${encodeURIComponent(taskId)}&select=datos,created_at&order=created_at.desc&limit=1`;
  try {
    const response = await fetch(query, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!response.ok) return null;
    const rows = await response.json();
    if (!Array.isArray(rows) || !rows.length) return null;
    return {
      ...parseMaybeJson(rows[0].datos),
      syncStatus: "synced",
      remoteCreatedAt: rows[0].created_at
    };
  } catch {
    return null;
  }
}

function getTaskLifecycleRank(task = {}) {
  if (task.deleted) return 100;
  if (isClosedStatus(task.status)) return 80;
  if (task.completedAt) return 75;
  if (task.takenAt || task.legalUserId || task.status === "tomado") return 60;
  if (task.status && !["pendiente", "por asignar"].includes(task.status)) return 40;
  return 10;
}

function shouldRemoteTaskReplacePendingLocal(remote, local) {
  if (!remote) return false;
  const remoteRank = getTaskLifecycleRank(remote);
  const localRank = getTaskLifecycleRank(local);
  if (remoteRank !== localRank) return remoteRank > localRank;
  const remoteTime = new Date(remote.updatedAt || remote.remoteCreatedAt || 0).getTime() || 0;
  const localTime = new Date(local.updatedAt || 0).getTime() || 0;
  return remoteTime >= localTime;
}

function collapseTaskHistoryByLifecycle(items = []) {
  const selected = new Map();
  items.filter((item) => item?.id).forEach((item) => {
    const normalized = normalizeTask(item);
    const current = selected.get(normalized.id);
    if (!current) {
      selected.set(normalized.id, normalized);
      return;
    }
    const rankDifference = getTaskLifecycleRank(normalized) - getTaskLifecycleRank(current);
    if (rankDifference > 0 || (rankDifference === 0 && getTaskFreshness(normalized) >= getTaskFreshness(current))) {
      selected.set(normalized.id, normalized);
    }
  });
  return [...selected.values()];
}

async function reconcileTasksForCurrentBuild() {
  if (session.role === "public" || !navigator.onLine) return;
  if (localStorage.getItem(TASK_RECONCILE_VERSION_KEY) === APP_BUILD_VERSION) return;
  try {
    const [remoteHistory, remoteDeletions] = await Promise.all([
      leerTareasSupabase(true),
      leerEliminacionesTareasSupabase(true)
    ]);
    const authoritativeTasks = collapseTaskHistoryByLifecycle(remoteHistory);
    const authoritativeIds = new Set(authoritativeTasks.map((task) => task.id));
    const localWithoutRemoteHistory = (state.tasks || []).filter((task) => !authoritativeIds.has(task.id));
    const mergedChanges = mergeTaskChanges(
      localWithoutRemoteHistory,
      [...authoritativeTasks, ...remoteDeletions],
      state.taskDeletions || []
    );
    state.tasks = mergedChanges.tasks;
    state.taskDeletions = mergedChanges.deletions;
    saveState();
    safeRenderAll();
    localStorage.setItem(TASK_RECONCILE_VERSION_KEY, APP_BUILD_VERSION);
  } catch (error) {
    console.warn("No se pudo realizar la conciliacion completa de tareas:", error);
  }
}

async function reconcileAdminLeadsFromSupabase() {
  if (session.role !== "admin" || !reconcileAdminLeadsBtn) return;
  const previousText = reconcileAdminLeadsBtn.textContent;
  reconcileAdminLeadsBtn.disabled = true;
  reconcileAdminLeadsBtn.textContent = "Conciliando...";
  try {
    const beforeIds = new Set((state.tasks || []).map((task) => task.id));
    const remoteChanges = await leerTareasSupabase(true);
    if (!remoteChanges.length) {
      showToast("Supabase no devolvio leads para conciliar.");
      return;
    }
    const mergedChanges = mergeTaskChanges(state.tasks || [], remoteChanges, state.taskDeletions || []);
    state.tasks = mergedChanges.tasks;
    state.taskDeletions = mergedChanges.deletions;
    const recovered = state.tasks.filter((task) => !beforeIds.has(task.id)).length;
    saveState();
    renderAll();
    showToast(recovered
      ? `${recovered} lead(s) remoto(s) recuperado(s). Ya puede revisarlos y borrarlos.`
      : "La lista ya estaba conciliada con Supabase.");
  } catch (error) {
    console.warn("No se pudieron conciliar los leads:", error);
    showToast("No se pudo conciliar. Revise la conexion e intente nuevamente.");
  } finally {
    reconcileAdminLeadsBtn.disabled = false;
    reconcileAdminLeadsBtn.textContent = previousText;
  }
}

async function guardarRegistroSupabase(modulo, tipo, datos, usuario = "sistema") {
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;
  try {
    const response = await fetch(`${SUPABASE_URL}/REGISTROS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ modulo, tipo, datos, usuario })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn("Supabase rechazo el guardado:", response.status, detail);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("No se pudo guardar en Supabase:", error);
    return false;
  }
}

async function guardarTareaSupabase(task, action = "guardar") {
  if (!task?.id) return false;
  const snapshot = normalizeTask({
    ...task,
    updatedAt: new Date().toISOString(),
    syncAction: action,
    syncStatus: "synced"
  });
  const ok = await guardarRegistroSupabase("saneamientos", "tarea", snapshot, session?.name || session?.role || "sistema");
  if (ok) {
    const local = state.tasks.find((item) => item.id === task.id);
    if (local) {
      local.updatedAt = snapshot.updatedAt;
      local.syncStatus = "synced";
    }
  } else {
    const local = state.tasks.find((item) => item.id === task.id);
    if (local) {
      local.syncStatus = "pending";
      local.syncErrorAt = new Date().toISOString();
    }
  }
  return ok;
}

async function sincronizarTareasPendientesSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY || !supabaseModulesReady) return;
  const pendingTasks = (state.tasks || []).filter((task) => task.syncStatus === "pending");
  const pendingDeletions = (state.taskDeletions || []).filter((task) => task.syncStatus === "pending");
  if (!pendingTasks.length && !pendingDeletions.length) return;
  let synced = 0;
  for (const task of pendingTasks.slice(0, 10)) {
    const remoteTask = await obtenerUltimaTareaRemota(task.id);
    if (shouldRemoteTaskReplacePendingLocal(remoteTask, task)) {
      const mergedChanges = mergeTaskChanges(state.tasks || [], [remoteTask], state.taskDeletions || []);
      state.tasks = mergedChanges.tasks;
      state.taskDeletions = mergedChanges.deletions;
      synced += 1;
      continue;
    }
    const ok = await guardarTareaSupabase(task, task.syncAction || "reintento");
    if (ok) synced += 1;
  }
  for (const deletion of pendingDeletions.slice(0, Math.max(0, 10 - synced))) {
    const ok = await guardarEliminacionTareaSupabase(deletion);
    if (ok) synced += 1;
  }
  if (synced) {
    saveState();
    safeRenderAll();
    showToast(`${synced} tarea(s) pendiente(s) sincronizada(s).`);
  }
}

async function guardarEliminacionTareaSupabase(deletion) {
  if (!deletion?.id) return false;
  const snapshot = {
    ...deletion,
    deleted: true,
    deletedAt: deletion.deletedAt || new Date().toISOString(),
    updatedAt: deletion.updatedAt || deletion.deletedAt || new Date().toISOString(),
    syncAction: "eliminar",
    syncStatus: "synced"
  };
  const ok = await guardarRegistroSupabase(
    "saneamientos",
    "tarea",
    snapshot,
    session?.name || session?.role || "sistema"
  );
  const local = (state.taskDeletions || []).find((item) => item.id === deletion.id);
  if (local) local.syncStatus = ok ? "synced" : "pending";
  return ok;
}

function getSupabaseModuleSnapshots() {
  const processing = state.dataProcessing || {};
  return {
    usuarios: {
      commercialAdvisors: structuredClone(state.commercialAdvisors || []),
      legalUsers: structuredClone(normalizeLegalUsers(state.legalUsers || [])),
      managerUsers: structuredClone(state.managerUsers || []),
      processingUsers: structuredClone(state.processingUsers || [])
    },
    catalogos: {
      agencies: structuredClone(state.agencies || []),
      purchaseTypes: structuredClone(state.purchaseTypes || []),
      sanitationTypes: structuredClone(state.sanitationTypes || []),
      statusOptions: structuredClone(state.statusOptions || []),
      formConfig: structuredClone(state.formConfig || DEFAULT_FORM_CONFIG)
    },
    saneamientos: {
      announcements: structuredClone(getActiveAnnouncements()),
      announcementDeletions: structuredClone(state.announcementDeletions || []),
      forceLogoutRequests: structuredClone(state.forceLogoutRequests || []),
      legalChatMessages: structuredClone(normalizeLegalChatMessages(state.legalChatMessages || []))
    },
    compras: {
      compras: structuredClone(processing.compras || []),
      loads: structuredClone(processing.loads || []),
      purchaseDuplicateApprovals: structuredClone(processing.purchaseDuplicateApprovals || {}),
      purchaseFilterPresets: structuredClone(processing.purchaseFilterPresets || [])
    },
    contratos: {
      contratos: structuredClone(processing.contratos || []),
      contractLoads: structuredClone(processing.contractLoads || [])
    },
    proveedores: {
      proveedores: structuredClone(processing.proveedores || []),
      providerLoads: structuredClone(processing.providerLoads || []),
      providerProfiles: structuredClone(processing.providerProfiles || []),
      providerDuplicateApprovals: structuredClone(processing.providerDuplicateApprovals || {})
    },
    archivos: {
      files: structuredClone(processing.files || []),
      folders: structuredClone(processing.folders || [])
    }
  };
}

function scheduleSupabaseModuleSync() {
  if (!SUPABASE_MODULE_SYNC || restoringSupabaseModules || !supabaseModulesReady) return;
  if (supabaseModuleSyncTimer) window.clearTimeout(supabaseModuleSyncTimer);
  supabaseModuleSyncTimer = window.setTimeout(() => {
    guardarModulosSupabase();
  }, 2500);
}

function getProtectedSupabaseModuleCount(modulo, snapshot = {}) {
  if (!snapshot || typeof snapshot !== "object") return 0;
  if (modulo === "proveedores") {
    const records = Array.isArray(snapshot.proveedores) ? snapshot.proveedores.length : 0;
    const profiles = Array.isArray(snapshot.providerProfiles) ? snapshot.providerProfiles.length : 0;
    return records * 1000 + profiles;
  }
  return 0;
}

function shouldProtectSupabaseModule(modulo) {
  return modulo === "proveedores";
}

function allowIntentionalSmallerModulePublish(modulo) {
  supabaseIntentionalSmallerPublishes[modulo] = Date.now() + 60000;
}

function hasIntentionalSmallerModulePublish(modulo) {
  const expiresAt = supabaseIntentionalSmallerPublishes[modulo] || 0;
  if (expiresAt > Date.now()) return true;
  delete supabaseIntentionalSmallerPublishes[modulo];
  return false;
}

async function shouldSkipUnsafeModulePublish(modulo, datos) {
  if (!shouldProtectSupabaseModule(modulo)) return false;
  if (hasIntentionalSmallerModulePublish(modulo)) return false;
  const localCount = getProtectedSupabaseModuleCount(modulo, datos);
  const knownRemoteCount = supabaseProtectedRemoteCounts[modulo] || 0;
  if (knownRemoteCount && localCount >= knownRemoteCount) return false;
  const remoteSnapshot = await leerUltimoModuloSupabase(modulo);
  const remoteCount = getProtectedSupabaseModuleCount(modulo, remoteSnapshot);
  if (!remoteCount) return false;
  supabaseProtectedRemoteCounts[modulo] = Math.max(knownRemoteCount, remoteCount);
  if (remoteCount > localCount) {
    applySupabaseModuleSnapshot(modulo, remoteSnapshot, { allowOlderVersion: true, reason: "protect-larger-remote" });
    saveState();
    safeRenderAll();
    showToast("Proveedores recuperado desde Supabase: se evito publicar una copia incompleta.");
    return true;
  }
  return false;
}

async function guardarModulosSupabase() {
  if (!SUPABASE_MODULE_SYNC || !SUPABASE_URL || !SUPABASE_KEY) return;
  const snapshots = getSupabaseModuleSnapshots();
  const usuario = session?.name || session?.role || "sistema";
  for (const [modulo, datos] of Object.entries(snapshots)) {
    const hash = getSupabaseSnapshotHash(datos);
    if (supabasePublishedHashes[modulo] === hash) continue;
    if (await shouldSkipUnsafeModulePublish(modulo, datos)) continue;
    const ok = await guardarRegistroSupabase(modulo, "base", { ...datos, updatedAt: new Date().toISOString() }, usuario);
    if (ok) {
      supabasePublishedHashes[modulo] = hash;
      const count = getProtectedSupabaseModuleCount(modulo, datos);
      if (count) supabaseProtectedRemoteCounts[modulo] = Math.max(supabaseProtectedRemoteCounts[modulo] || 0, count);
    }
  }
}

async function guardarUsuariosSupabaseAhora() {
  if (!SUPABASE_MODULE_SYNC || !SUPABASE_URL || !SUPABASE_KEY) return false;
  const datos = getSupabaseModuleSnapshots().usuarios;
  const hash = getSupabaseSnapshotHash(datos);
  const ok = await guardarRegistroSupabase(
    "usuarios",
    "base",
    { ...datos, updatedAt: new Date().toISOString() },
    session?.name || session?.role || "sistema"
  );
  if (ok) supabasePublishedHashes.usuarios = hash;
  return ok;
}

async function actualizarUsuariosDesdeSupabaseParaLogin() {
  const snapshot = await leerUltimoModuloSupabase("usuarios");
  if (!snapshot || typeof snapshot !== "object") return false;
  applySupabaseModuleSnapshot("usuarios", snapshot);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, schemaVersion: STATE_SCHEMA_VERSION }));
  } catch {
    // La copia ligera de accesos ya fue guardada aunque el estado general sea demasiado grande.
  }
  return true;
}

function getActiveProcessingTab() {
  return document.querySelector("[data-processing-tab].is-active")?.dataset.processingTab || "";
}

function getSupabaseModulesForCurrentView() {
  const modules = new Set(["usuarios", "catalogos", "saneamientos"]);
  if (currentViewId === "procesamiento") {
    const tab = getActiveProcessingTab();
    if (tab === "compras") modules.add("compras");
    if (tab === "contratos") modules.add("contratos");
    if (tab === "proveedores") modules.add("proveedores");
    if (tab === "archivos") modules.add("archivos");
  }
  if (session.role === "admin") {
    modules.add("compras");
    modules.add("contratos");
    modules.add("proveedores");
  }
  return [...modules];
}

async function restoreModulesFromSupabaseIfNeeded() {
  if (!SUPABASE_MODULE_SYNC || pollingSupabaseModules || !canSyncCurrentView()) return;
  pollingSupabaseModules = true;
  restoringSupabaseModules = true;
  try {
    const modulesToSync = getSupabaseModulesForCurrentView();
    const remoteVersions = await leerVersionesModulosSupabase(modulesToSync);
    const [usuariosResult, catalogosResult, saneamientosResult, tareasIndividuales, eliminacionesIndividuales, comprasResult, contratosResult, proveedoresResult, archivosResult] = await Promise.all([
      modulesToSync.includes("usuarios") ? leerModuloSupabaseSiCambio("usuarios", remoteVersions) : Promise.resolve({ snapshot: null, exists: false, changed: false }),
      modulesToSync.includes("catalogos") ? leerModuloSupabaseSiCambio("catalogos", remoteVersions) : Promise.resolve({ snapshot: null, exists: false, changed: false }),
      modulesToSync.includes("saneamientos") ? leerModuloSupabaseSiCambio("saneamientos", remoteVersions) : Promise.resolve({ snapshot: null, exists: false, changed: false }),
      leerTareasSupabase(),
      leerEliminacionesTareasSupabase(),
      modulesToSync.includes("compras") ? leerModuloSupabaseSiCambio("compras", remoteVersions) : Promise.resolve({ snapshot: null, exists: false, changed: false }),
      modulesToSync.includes("contratos") ? leerModuloSupabaseSiCambio("contratos", remoteVersions) : Promise.resolve({ snapshot: null, exists: false, changed: false }),
      modulesToSync.includes("proveedores") ? leerModuloSupabaseSiCambio("proveedores", remoteVersions) : Promise.resolve({ snapshot: null, exists: false, changed: false }),
      modulesToSync.includes("archivos") ? leerModuloSupabaseSiCambio("archivos", remoteVersions) : Promise.resolve({ snapshot: null, exists: false, changed: false })
    ]);
    const usuarios = usuariosResult.snapshot;
    const catalogos = catalogosResult.snapshot;
    const saneamientos = saneamientosResult.snapshot;
    const compras = comprasResult.snapshot;
    const contratos = contratosResult.snapshot;
    const proveedores = proveedoresResult.snapshot;
    const archivos = archivosResult.snapshot;
    const anyRemoteModule = [
      usuariosResult,
      catalogosResult,
      saneamientosResult,
      comprasResult,
      contratosResult,
      proveedoresResult,
      archivosResult
    ].some((result) => result.exists) || tareasIndividuales.length || eliminacionesIndividuales.length;
    let changed = false;
    changed = applySupabaseModuleSnapshot("usuarios", usuarios) || changed;
    changed = applySupabaseModuleSnapshot("catalogos", catalogos) || changed;
    changed = applySupabaseModuleSnapshot("saneamientos", saneamientos) || changed;
    if (tareasIndividuales.length || eliminacionesIndividuales.length) {
      const before = JSON.stringify({
        tasks: (state.tasks || []).map((task) => [task.id, task.updatedAt, task.status, task.legalUserId, task.completedAt]),
        deletions: (state.taskDeletions || []).map((item) => [item.id, item.deletedAt, item.updatedAt])
      });
      const mergedChanges = mergeTaskChanges(
        state.tasks || [],
        [...tareasIndividuales, ...eliminacionesIndividuales],
        state.taskDeletions || []
      );
      state.tasks = mergedChanges.tasks;
      state.taskDeletions = mergedChanges.deletions;
      const after = JSON.stringify({
        tasks: (state.tasks || []).map((task) => [task.id, task.updatedAt, task.status, task.legalUserId, task.completedAt]),
        deletions: (state.taskDeletions || []).map((item) => [item.id, item.deletedAt, item.updatedAt])
      });
      changed = before !== after || changed;
    }
    changed = applySupabaseModuleSnapshot("compras", compras) || changed;
    changed = applySupabaseModuleSnapshot("contratos", contratos) || changed;
    changed = applySupabaseModuleSnapshot("proveedores", proveedores) || changed;
    changed = applySupabaseModuleSnapshot("archivos", archivos) || changed;
    if (changed) {
      hydrateCommercialOwners();
      autoAssignOpenSaneamientos();
      if (session.role !== "public" && !isPersistedSessionValid(session)) {
        setSession(getPublicSession());
        currentViewId = "acceso";
      }
      saveState();
      safeRenderAll();
      showToast("Datos sincronizados desde Supabase.");
    }
    if (!anyRemoteModule && getOperationalScore(state) > 0) {
      await guardarModulosSupabase();
      showToast("Datos iniciales publicados en Supabase.");
    }
    supabaseLastRefreshAt = Date.now();
  } catch (error) {
    console.warn("No se pudieron sincronizar modulos desde Supabase:", error);
  } finally {
    restoringSupabaseModules = false;
    supabaseModulesReady = true;
    pollingSupabaseModules = false;
  }
}

function startSupabaseModulePolling() {
  if (!SUPABASE_MODULE_SYNC) return;
  if (supabasePollingTimer) window.clearTimeout(supabasePollingTimer);
  supabasePollingTimer = null;
  const interval = getSupabasePollInterval();
  if (!interval) return;
  supabasePollingTimer = window.setTimeout(async () => {
    if (!document.hidden && navigator.onLine && canSyncCurrentView()) {
      await restoreModulesFromSupabaseIfNeeded();
      await sincronizarTareasPendientesSupabase();
    }
    startSupabaseModulePolling();
  }, interval);
}

function getSupabasePollInterval() {
  if (session.role === "legal") return 2 * 60 * 1000;
  if (session.role === "admin") return 5 * 60 * 1000;
  if (session.role === "commercial") return 5 * 60 * 1000;
  if (session.role === "manager") return 8 * 60 * 1000;
  if (session.role === "processing") return 10 * 60 * 1000;
  return 0;
}

function canSyncCurrentView() {
  return session.role !== "public";
}

function applySupabaseModuleSnapshot(modulo, snapshot, options = {}) {
  snapshot = parseMaybeJson(snapshot);
  if (!snapshot || typeof snapshot !== "object") return false;
  const version = getSupabaseSnapshotVersion(snapshot);
  if (!options.allowOlderVersion && version && supabaseModuleVersions[modulo] === version) return false;
  const processing = state.dataProcessing || (state.dataProcessing = structuredClone(defaultState.dataProcessing));
  supabaseModuleVersions[modulo] = version || new Date().toISOString();
  switch (modulo) {
    case "usuarios":
      state.commercialAdvisors = normalizeCommercialAdvisors(snapshot.commercialAdvisors || state.commercialAdvisors || []);
      state.legalUsers = normalizeLegalUsers(Array.isArray(snapshot.legalUsers) ? snapshot.legalUsers : (state.legalUsers || []));
      state.managerUsers = Array.isArray(snapshot.managerUsers) ? snapshot.managerUsers : (state.managerUsers || []);
      state.processingUsers = Array.isArray(snapshot.processingUsers) ? snapshot.processingUsers : (state.processingUsers || structuredClone(defaultState.processingUsers));
      persistAccessUsers(state);
      return true;
    case "catalogos":
      state.agencies = Array.isArray(snapshot.agencies) ? snapshot.agencies : (state.agencies || []);
      state.purchaseTypes = Array.isArray(snapshot.purchaseTypes) ? snapshot.purchaseTypes : (state.purchaseTypes || []);
      state.sanitationTypes = Array.isArray(snapshot.sanitationTypes) ? snapshot.sanitationTypes : (state.sanitationTypes || []);
      state.statusOptions = normalizeStatusOptions(snapshot.statusOptions || state.statusOptions || []);
      state.formConfig = normalizeFormConfig(snapshot.formConfig || state.formConfig);
      return true;
    case "saneamientos":
      {
        const remoteTasks = (snapshot.tasks || []).map((task) => ({ ...task, syncStatus: "synced" }));
        const mergedChanges = mergeTaskChanges(state.tasks || [], remoteTasks, state.taskDeletions || []);
        state.tasks = mergedChanges.tasks;
        state.taskDeletions = mergedChanges.deletions;
      }
      state.announcementDeletions = mergeByKey(
        (state.announcementDeletions || []).map(normalizeAnnouncementDeletion),
        (Array.isArray(snapshot.announcementDeletions) ? snapshot.announcementDeletions : []).map(normalizeAnnouncementDeletion),
        "announcementId"
      ).slice(0, 200);
      state.announcements = (Array.isArray(snapshot.announcements) ? snapshot.announcements : (state.announcements || [])).map(normalizeAnnouncement);
      applyAnnouncementDeletions(state);
      state.forceLogoutRequests = mergeByKey(
        (state.forceLogoutRequests || []).map(normalizeForceLogoutRequest),
        (Array.isArray(snapshot.forceLogoutRequests) ? snapshot.forceLogoutRequests : []).map(normalizeForceLogoutRequest),
        "id"
      ).slice(0, 80);
      state.legalChatMessages = mergeLegalChatMessages(state.legalChatMessages || [], snapshot.legalChatMessages || []);
      checkForcedLogoutRequests();
      return true;
    case "compras":
      processing.compras = (snapshot.compras || []).map(normalizePurchaseRecord);
      processing.loads = (snapshot.loads || []).map(normalizePurchaseLoad);
      processing.purchaseDuplicateApprovals = snapshot.purchaseDuplicateApprovals || {};
      processing.purchaseFilterPresets = snapshot.purchaseFilterPresets || [];
      return true;
    case "contratos":
      processing.contratos = (snapshot.contratos || []).map(normalizeContractRecord);
      processing.contractLoads = (snapshot.contractLoads || []).map(normalizeContractLoad);
      return true;
    case "proveedores":
      {
        const remoteCount = getProtectedSupabaseModuleCount("proveedores", snapshot);
        const localCount = (processing.proveedores || []).length;
        supabaseProtectedRemoteCounts.proveedores = Math.max(supabaseProtectedRemoteCounts.proveedores || 0, remoteCount);
        if (!options.allowSmaller && localCount > remoteCount && remoteCount > 0) {
          showToast("Supabase tenia una copia menor de proveedores; se mantuvo la base local completa.");
          return false;
        }
      }
      processing.providerProfiles = buildProviderProfilesFromHistory([
        ...(processing.providerProfiles || []),
        ...(snapshot.providerProfiles || [])
      ], {
        ...processing,
        proveedores: snapshot.proveedores || [],
        providerLoads: snapshot.providerLoads || []
      });
      processing.proveedores = (snapshot.proveedores || []).map(normalizeProviderRecord);
      processing.providerLoads = (snapshot.providerLoads || []).map(normalizeProviderLoad);
      processing.providerProfiles = buildProviderProfilesFromHistory(processing.providerProfiles || [], processing);
      processing.providerDuplicateApprovals = snapshot.providerDuplicateApprovals || {};
      return true;
    case "archivos":
      processing.files = (snapshot.files || []).map(normalizeStoredFile);
      processing.folders = normalizeFileFolders(snapshot.folders || []);
      return true;
    default:
      return false;
  }
}

function getSupabaseSnapshotVersion(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return "";
  return snapshot.updatedAt || snapshot.savedAt || "";
}

function getSupabaseSnapshotHash(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return "";
  const content = { ...snapshot };
  delete content.updatedAt;
  delete content.savedAt;
  return JSON.stringify(content);
}

function getBrandingSnapshot() {
  return {
    logoDataUrl: state.logoDataUrl || "",
    theme: structuredClone(state.theme || defaultState.theme),
    copy: structuredClone(state.copy || defaultState.copy),
    updatedAt: new Date().toISOString()
  };
}

async function guardarBrandingSupabase() {
  await guardarRegistroSupabase("sistema", "branding", getBrandingSnapshot(), session?.name || session?.role || "sistema");
}

async function restoreBrandingFromSupabaseIfNeeded() {
  const branding = await leerUltimoBrandingSupabase();
  if (!branding || typeof branding !== "object") return;
  try {
    const nextBranding = {
      logoDataUrl: branding.logoDataUrl || "",
      theme: { ...structuredClone(defaultState.theme), ...(branding.theme || {}) },
      copy: { ...structuredClone(defaultState.copy), ...(branding.copy || {}) }
    };
    sanitizeStateVisuals(nextBranding);
    state.logoDataUrl = nextBranding.logoDataUrl || "";
    state.theme = nextBranding.theme;
    state.copy = nextBranding.copy;
    saveState();
    safeRenderAll();
  } catch (error) {
    console.warn("No se pudo aplicar branding de Supabase:", error);
  }
}

async function restoreStateFromSupabaseIfNeeded() {
  if (!SUPABASE_AUTO_RESTORE) return;
  const remoteState = await leerUltimoEstadoSupabase();
  if (!remoteState) return;
  try {
    const normalizedRemote = normalizeImportedState(remoteState);
    const currentScore = getStateScore(state);
    const remoteScore = getStateScore(normalizedRemote);
    if (remoteScore <= currentScore) return;
    const merged = mergePcStates(normalizedRemote, state);
    Object.assign(state, merged);
    saveState();
    safeRenderAll();
    showToast("Datos restaurados desde el respaldo en linea.");
  } catch (error) {
    console.warn("No se pudo restaurar Supabase:", error);
  }
}

function mergePcStates(baseState, extraState) {
  const merged = normalizeImportedState({ ...baseState });
  const baseProcessing = merged.dataProcessing || {};
  const extraProcessing = extraState.dataProcessing || {};
  merged.tasks = mergeByKey(merged.tasks || [], extraState.tasks || [], "id");
  merged.announcements = mergeByKey(merged.announcements || [], extraState.announcements || [], "id").map(normalizeAnnouncement);
  merged.announcementDeletions = mergeByKey(merged.announcementDeletions || [], extraState.announcementDeletions || [], "announcementId").map(normalizeAnnouncementDeletion);
  applyAnnouncementDeletions(merged);
  merged.forceLogoutRequests = mergeByKey(merged.forceLogoutRequests || [], extraState.forceLogoutRequests || [], "id").map(normalizeForceLogoutRequest);
  merged.legalChatMessages = mergeLegalChatMessages(merged.legalChatMessages || [], extraState.legalChatMessages || []);
  merged.commercialAdvisors = mergeByKey(merged.commercialAdvisors || [], extraState.commercialAdvisors || [], "id");
  merged.legalUsers = normalizeLegalUsers(mergeByKey(merged.legalUsers || [], extraState.legalUsers || [], "id"));
  merged.managerUsers = mergeByKey(merged.managerUsers || [], extraState.managerUsers || [], "id");
  merged.processingUsers = mergeByKey(merged.processingUsers || [], extraState.processingUsers || [], "id");
  merged.taskDeletions = mergeByKey(merged.taskDeletions || [], extraState.taskDeletions || [], "id");
  merged.tasks = (merged.tasks || []).filter((task) =>
    !merged.taskDeletions.some((deletion) => deletion.id === task.id)
  );
  baseProcessing.compras = mergeByKey(baseProcessing.compras || [], extraProcessing.compras || [], "id");
  baseProcessing.loads = mergeByKey(baseProcessing.loads || [], extraProcessing.loads || [], "id");
  baseProcessing.contratos = mergeByKey(baseProcessing.contratos || [], extraProcessing.contratos || [], "id");
  baseProcessing.contractLoads = mergeByKey(baseProcessing.contractLoads || [], extraProcessing.contractLoads || [], "id");
  baseProcessing.proveedores = mergeByKey(baseProcessing.proveedores || [], extraProcessing.proveedores || [], "id");
  baseProcessing.providerLoads = mergeByKey(baseProcessing.providerLoads || [], extraProcessing.providerLoads || [], "id");
  baseProcessing.files = mergeByKey(baseProcessing.files || [], extraProcessing.files || [], "id");
  baseProcessing.folders = normalizeFileFolders(mergeByKey(baseProcessing.folders || [], extraProcessing.folders || [], "id"));
  baseProcessing.providerProfiles = buildProviderProfilesFromHistory(
    mergeByKey(baseProcessing.providerProfiles || [], extraProcessing.providerProfiles || [], "id"),
    baseProcessing
  );
  baseProcessing.purchaseFilterPresets = mergeByKey(baseProcessing.purchaseFilterPresets || [], extraProcessing.purchaseFilterPresets || [], "id");
  baseProcessing.purchaseDuplicateApprovals = {
    ...(extraProcessing.purchaseDuplicateApprovals || {}),
    ...(baseProcessing.purchaseDuplicateApprovals || {})
  };
  baseProcessing.providerDuplicateApprovals = {
    ...(extraProcessing.providerDuplicateApprovals || {}),
    ...(baseProcessing.providerDuplicateApprovals || {})
  };
  merged.dataProcessing = baseProcessing;
  return normalizeImportedState(merged);
}

function mergeByKey(baseItems = [], extraItems = [], key = "id") {
  const map = new Map();
  [...baseItems, ...extraItems].forEach((item) => {
    if (!item) return;
    const itemKey = item[key] || JSON.stringify(item);
    map.set(itemKey, { ...(map.get(itemKey) || {}), ...item });
  });
  return [...map.values()];
}

function getTaskFreshness(task = {}) {
  return new Date(task.updatedAt || task.completedAt || task.takenAt || task.createdAt || 0).getTime() || 0;
}

function shouldTaskVersionReplace(candidate, current) {
  if (!candidate) return false;
  if (!current) return true;
  const candidateRank = getTaskLifecycleRank(candidate);
  const currentRank = getTaskLifecycleRank(current);
  if (candidateRank !== currentRank) return candidateRank > currentRank;
  return getTaskFreshness(candidate) >= getTaskFreshness(current);
}

function mergeTasksByFreshness(baseItems = [], extraItems = []) {
  const map = new Map();
  [...baseItems, ...extraItems].forEach((item) => {
    if (!item) return;
    const normalized = normalizeTask(item);
    const current = map.get(normalized.id);
    if (shouldTaskVersionReplace(normalized, current)) {
      map.set(normalized.id, { ...(current || {}), ...normalized });
    }
  });
  return [...map.values()].map(normalizeTask);
}

function mergeTaskChanges(baseItems = [], extraItems = [], existingDeletions = []) {
  const deletionMap = new Map(
    (existingDeletions || [])
      .filter((item) => item?.id)
      .map((item) => [item.id, { ...item, deleted: true }])
  );
  (extraItems || []).filter((item) => item?.id && item.deleted).forEach((item) => {
    const current = deletionMap.get(item.id);
    if (!current || getTaskFreshness(item) >= getTaskFreshness(current)) {
      deletionMap.set(item.id, { ...item, deleted: true, syncStatus: "synced" });
    }
  });
  const activeExtraItems = (extraItems || []).filter((item) => item && !item.deleted);
  const tasks = mergeTasksByFreshness(baseItems, activeExtraItems)
    .filter((task) => !deletionMap.has(task.id));
  return {
    tasks,
    deletions: [...deletionMap.values()]
  };
}

function writeSharedPcState(snapshot) {
  try {
    const request = new XMLHttpRequest();
    request.open("POST", SHARED_PC_STATE_URL, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ state: snapshot, reason: "auto" }));
    sharedPcStorageAvailable = true;
  } catch {
    sharedPcStorageAvailable = false;
  }
}

function createPcBackup(reason = "manual") {
  if (!sharedPcStorageAvailable) {
    showToast("Abra iniciar-autocor.bat para activar respaldos del PC.");
    return;
  }
  try {
    const request = new XMLHttpRequest();
    request.open("POST", SHARED_PC_BACKUPS_URL, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = () => {
      renderPcBackups();
      if (request.status >= 200 && request.status < 300) showToast("Respaldo del PC creado.");
      else showToast("No se pudo crear el respaldo del PC.");
    };
    request.send(JSON.stringify({ state: structuredClone(state), reason }));
  } catch {
    showToast("No se pudo crear el respaldo del PC.");
  }
}

function readPcBackups() {
  try {
    const request = new XMLHttpRequest();
    request.open("GET", SHARED_PC_BACKUPS_URL, false);
    request.send();
    if (request.status >= 200 && request.status < 300) {
      return JSON.parse(request.responseText || "{}").backups || [];
    }
  } catch {}
  return [];
}

function renderPcBackups() {
  if (!pcBackupList) return;
  const backups = readPcBackups().slice(0, 8);
  if (!backups.length) {
    pcBackupList.innerHTML = `<span class="mini-muted">Sin respaldos del PC aun.</span>`;
    return;
  }
  pcBackupList.innerHTML = backups.map((backup) => `
    <button type="button" data-restore-pc-backup="${escapeHtml(backup.name)}">
      <span>${escapeHtml(formatDateTime(backup.savedAt))}</span>
      <small>${escapeHtml(backup.name)}</small>
    </button>
  `).join("");
  pcBackupList.querySelectorAll("[data-restore-pc-backup]").forEach((button) => {
    button.addEventListener("click", () => restorePcBackup(button.dataset.restorePcBackup));
  });
}

function restorePcBackup(name) {
  const confirmed = window.confirm(`Desea restaurar el respaldo ${name}? Se creara una copia del estado actual antes de restaurar.`);
  if (!confirmed) return;
  try {
    const request = new XMLHttpRequest();
    request.open("PUT", `${SHARED_PC_BACKUPS_URL}/restore`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        showToast("Respaldo restaurado. Recargando informacion.");
        window.location.reload();
      } else {
        showToast("No se pudo restaurar el respaldo.");
      }
    };
    request.send(JSON.stringify({ name }));
  } catch {
    showToast("No se pudo restaurar el respaldo.");
  }
}

function normalizeStatusOptions(options) {
  const normalized = options.map((option) => {
    const label = option.label || option;
    return {
      id: option.id || crypto.randomUUID(),
      label,
      value: option.value || normalizeStatusValue(label),
      color: option.color || "#8d8d92",
      closes: Boolean(option.closes),
      isDefault: Boolean(option.isDefault)
    };
  });
  if (!normalized.some((option) => option.value === "por asignar")) {
    normalized.unshift({ id: "status-por-asignar", label: "Por asignar", value: "por asignar", color: "#64748b", closes: false, isDefault: true });
  }
  return normalized;
}

function normalizeCommercialAdvisors(advisors) {
  return advisors.map((advisor, index) => {
    if (typeof advisor === "string") {
      return { id: `advisor-${index}-${advisor}`, name: advisor, agency: "", username: `comercial${index + 1}`, password: "Comercial123" };
    }
    return {
      id: advisor.id || crypto.randomUUID(),
      name: advisor.name || "",
      agency: advisor.agency || "",
      username: advisor.username || `comercial${index + 1}`,
      password: advisor.password || "Comercial123"
    };
  }).filter((advisor) => advisor.name);
}

function normalizeLegalMailboxes(mailboxes = []) {
  const valid = new Set(LEGAL_MAILBOXES.map((item) => item.id));
  const normalized = (Array.isArray(mailboxes) ? mailboxes : String(mailboxes || "").split(","))
    .map((item) => String(item || "").trim().toLowerCase())
    .filter((item) => valid.has(item));
  return normalized.length ? [...new Set(normalized)] : ["saneamientos"];
}

function normalizeLegalUsers(users = []) {
  return users.map((user, index) => {
    if (typeof user === "string") {
      return {
        id: `legal-${index + 1}`,
        name: user,
        username: `legal${index + 1}`,
        password: "Legal123",
        mailboxes: ["saneamientos"],
        legalAvailable: true
      };
    }
    return {
      id: user.id || crypto.randomUUID(),
      name: user.name || `Asistente legal ${index + 1}`,
      username: user.username || `legal${index + 1}`,
      password: user.password || "Legal123",
      mailboxes: normalizeLegalMailboxes(user.mailboxes || user.profiles || user.buzones || user.profile),
      legalAvailable: user.legalAvailable !== false
    };
  }).filter((user) => user.name && user.username);
}

function normalizeFormConfig(config) {
  const source = config && typeof config === "object" ? config : {};
  return ["compra", "venta"].reduce((result, process) => {
    const saved = Array.isArray(source[process]) ? source[process] : [];
    const savedMap = new Map();
    saved.forEach((field) => {
      if (field?.name && !savedMap.has(field.name)) savedMap.set(field.name, field);
    });
    const seenCustomNames = new Set(DEFAULT_FORM_CONFIG[process].map((baseField) => baseField.name));
    const base = DEFAULT_FORM_CONFIG[process].map((field) =>
      normalizeBaseFormField(process, normalizeFormField(savedMap.get(field.name), field, true))
    );
    const custom = saved
      .filter((field) => {
        if (!field || seenCustomNames.has(field.name)) return false;
        seenCustomNames.add(field.name);
        return true;
      })
      .map((field) => normalizeFormField(field, {}, false));
    result[process] = [...base, ...custom];
    return result;
  }, {});
}

function getDefaultBaseFormField(process, name) {
  return (DEFAULT_FORM_CONFIG[process] || []).find((field) => field.name === name) || {};
}

function getSafeBaseFieldType(process, name, requestedType) {
  const allowed = BASE_FORM_FIELD_TYPE_RULES[process]?.[name];
  if (!allowed) return FORM_FIELD_TYPES.includes(requestedType) ? requestedType : "text";
  if (allowed.includes(requestedType)) return requestedType;
  return getDefaultBaseFormField(process, name).type || allowed[0] || "text";
}

function normalizeBaseFormField(process, field) {
  if (!field?.isBase) return field;
  const defaultField = getDefaultBaseFormField(process, field.name);
  return {
    ...field,
    type: getSafeBaseFieldType(process, field.name, field.type),
    options: field.name === "ciudad" && field.type === "select" ? field.options : field.options || defaultField.options || []
  };
}

function parseFormOptions(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeFormField(field = {}, fallback = {}, isBase = false) {
  const source = field && typeof field === "object" ? field : {};
  const type = FORM_FIELD_TYPES.includes(source.type) ? source.type : fallback.type || "text";
  return {
    id: source.id || fallback.id || crypto.randomUUID(),
    name: source.name || fallback.name || `custom_${crypto.randomUUID().slice(0, 8)}`,
    label: source.label || fallback.label || "Campo personalizado",
    type,
    required: typeof source.required === "boolean" ? source.required : Boolean(fallback.required),
    visible: source.visible !== false,
    isBase,
    placeholder: source.placeholder || fallback.placeholder || "",
    options: parseFormOptions(source.options || fallback.options)
  };
}

function normalizeAnnouncement(announcement = {}) {
  return {
    id: announcement.id || crypto.randomUUID(),
    title: announcement.title || "Comunicado",
    body: announcement.body || "",
    imageDataUrl: announcement.imageDataUrl || "",
    createdAt: announcement.createdAt || new Date().toISOString(),
    popupEnabled: announcement.popupEnabled !== false,
    audience: ["all", "commercial", "legal", "specific"].includes(announcement.audience) ? announcement.audience : "all",
    targetUsers: Array.isArray(announcement.targetUsers) ? announcement.targetUsers : []
  };
}

function normalizeAnnouncementDeletion(deletion = {}) {
  return {
    id: deletion.id || deletion.announcementId || "",
    announcementId: deletion.announcementId || deletion.id || "",
    deletedAt: deletion.deletedAt || new Date().toISOString(),
    deletedBy: deletion.deletedBy || "Administrador"
  };
}

function getDeletedAnnouncementIds(sourceState = state) {
  return new Set((sourceState.announcementDeletions || [])
    .map(normalizeAnnouncementDeletion)
    .map((item) => item.announcementId || item.id)
    .filter(Boolean));
}

function getActiveAnnouncements(sourceState = state) {
  const deletedIds = getDeletedAnnouncementIds(sourceState);
  return (sourceState.announcements || [])
    .map(normalizeAnnouncement)
    .filter((announcement) => !deletedIds.has(announcement.id));
}

function applyAnnouncementDeletions(sourceState = state) {
  const deletedIds = getDeletedAnnouncementIds(sourceState);
  sourceState.announcementDeletions = (sourceState.announcementDeletions || [])
    .map(normalizeAnnouncementDeletion)
    .filter((item) => item.announcementId);
  sourceState.announcements = (sourceState.announcements || [])
    .map(normalizeAnnouncement)
    .filter((announcement) => !deletedIds.has(announcement.id));
}

function normalizeForceLogoutRequest(request = {}) {
  return {
    id: request.id || crypto.randomUUID(),
    audience: ["all", "commercial", "legal", "specific"].includes(request.audience) ? request.audience : "all",
    targetUsers: Array.isArray(request.targetUsers) ? request.targetUsers : [],
    message: request.message || "El administrador cerro tu sesion para aplicar un comunicado urgente.",
    createdAt: request.createdAt || new Date().toISOString(),
    createdBy: request.createdBy || "Administrador"
  };
}

function normalizeTask(task) {
  const migratedStatus = task.status === "en proceso" ? "tomado" : task.status === "completado" ? "saneamiento realizado y subido a pilot" : task.status || "pendiente";
  const processType = task.processType || (task.tipoSaneamiento === "Tracking contrato compraventa" ? "venta" : "");
  const isSignature = processType === "firma";
  return {
    ...task,
    id: task.id || crypto.randomUUID(),
    createdAt: task.createdAt || new Date().toISOString(),
    updatedAt: task.updatedAt || task.completedAt || task.takenAt || task.createdAt || new Date().toISOString(),
    takenAt: task.takenAt || "",
    completedAt: task.completedAt || "",
    status: migratedStatus,
    processType,
    legalUserId: isSignature ? task.legalUserId || "" : task.takenAt ? task.legalUserId || "" : migratedStatus === "pendiente" ? "" : task.legalUserId || "",
    legalAdvisor: isSignature ? task.legalAdvisor || "" : task.takenAt ? task.legalAdvisor || "Sin asignar" : migratedStatus === "pendiente" ? "" : task.legalAdvisor || "",
    commercialUserId: task.commercialUserId || "",
    commercialUserName: task.commercialUserName || task.asesor || "",
    commercialAgency: task.commercialAgency || task.agencia || "",
    duplicateWarnings: task.duplicateWarnings || [],
    lastResentRejectionKey: task.lastResentRejectionKey || "",
    lastResentAt: task.lastResentAt || "",
    statusLockedAt: task.statusLockedAt || "",
    statusLockedBy: task.statusLockedBy || "",
    statusLockedByName: task.statusLockedByName || "",
    legalObservations: Array.isArray(task.legalObservations) ? task.legalObservations : [],
    signatureStage: task.signatureStage || "",
    signatureStatus: task.signatureStatus || "",
    signatureRequestTaskId: task.signatureRequestTaskId || "",
    signaturePilotTaskId: task.signaturePilotTaskId || "",
    signaturePayload: task.signaturePayload || null,
    fechaSolicitud: task.fechaSolicitud || "",
    cuvOrderNumber: task.cuvOrderNumber || "",
    cuvStatus: task.cuvStatus || (processType === "cuv" ? "SOLICITADO" : ""),
    cuvHour: task.cuvHour || "",
    cuvValue: task.cuvValue || "",
    cuvObservations: task.cuvObservations || "",
    cuvDeposits: task.cuvDeposits || "",
    cuvPdfName: task.cuvPdfName || "",
    cuvPdfDataUrl: task.cuvPdfDataUrl || "",
    cuvPdfUploadedAt: task.cuvPdfUploadedAt || "",
    sourceTaskId: task.sourceTaskId || ""
  };
}

function normalizePurchaseRecord(record) {
  const normalized = {
    id: record.id || crypto.randomUUID(),
    importedAt: record.importedAt || new Date().toISOString(),
    importMonth: normalizeLooseText(record.importMonth || ""),
    source: record.source || "MANUAL",
    loadId: record.loadId || "",
    loadLabel: record.loadLabel || ""
  };
  PURCHASE_COLUMNS.forEach((column) => {
    const value = record[column] ?? record[normalizeHeaderKey(column)] ?? "";
    normalized[column] = column === "PLACA" ? normalizePlate(value) : normalizeLooseText(value);
  });
  return normalized;
}

function normalizePurchaseLoad(load) {
  return {
    id: load.id || crypto.randomUUID(),
    month: normalizeLooseText(load.month || ""),
    source: load.source || "MANUAL",
    importedAt: load.importedAt || new Date().toISOString(),
    recordCount: Number(load.recordCount || 0)
  };
}

function normalizeContractRecord(record) {
  const normalized = {
    id: record.id || crypto.randomUUID(),
    importedAt: record.importedAt || new Date().toISOString(),
    importMonth: normalizeLooseText(record.importMonth || ""),
    source: record.source || "MANUAL",
    loadId: record.loadId || "",
    loadLabel: record.loadLabel || ""
  };
  CONTRACT_COLUMNS.forEach((column) => {
    const aliases = getContractColumnAliases(column);
    const value = [record[column], record[normalizeHeaderKey(column)], ...aliases.map((alias) => record[alias] ?? record[normalizeHeaderKey(alias)])]
      .find((item) => item !== undefined && item !== null) ?? "";
    if (column === "PLACAS") normalized[column] = normalizePlate(value);
    else if (column === "CEDULA DE IDENTIDAD" || column === "CELULAR") normalized[column] = normalizeId(value);
    else if (column === "VALOR DE VENTA") normalized[column] = normalizeContractSaleValue(value);
    else if (column.includes("FECHA") || column.includes("HORA")) normalized[column] = normalizeContractDateTimeValue(value);
    else normalized[column] = normalizeLooseText(value);
  });
  normalized.ESTATUS = normalizeContractStatus(normalized.ESTATUS);
  return normalized;
}

function normalizeContractLoad(load) {
  return {
    id: load.id || crypto.randomUUID(),
    month: normalizeLooseText(load.month || ""),
    source: load.source || "MANUAL",
    importedAt: load.importedAt || new Date().toISOString(),
    recordCount: Number(load.recordCount || 0)
  };
}

function getContractColumnAliases(column) {
  const aliases = {
    "HORA DE FINALIZACION": ["Hora de finalizacion", "Hora de finalizacion"],
    "CORREO ELECTRONICO": ["Correo electronico", "Correo electronico"],
    "NOMBRE COMPLETO CLIENTE": ["Nombre completo cliente", "Cliente"],
    "CEDULA DE IDENTIDAD": ["Cedula de identidad", "Cedula", "Cedula de identidad"],
    "PLACAS": ["Placa", "Placas"],
    "VALOR DE VENTA": [" Valor de venta: ", "Valor de venta:", "Valor venta"],
    "MARCA Y MODELO (MATRICULA )": ["Marca y modelo (matricula )", "Marca y modelo", "Matricula"],
    "DIRECCION EXACTA DE VIVIENDA": ["Direccion exacta de vivienda", "Direccion exacta de vivienda"],
    "CORREO ELECTRONICO CLIENTE": ["Correo electronico cliente", "Correo electronico cliente"],
    "AGENCIA DE VENTA": ["Agencia de venta", "Agencia"],
    "NOMBRE DEL ASESOR": ["Nombre del asesor", "Asesor"],
    "ESTADO CIVIL COMPRADOR": ["Estado civil comprador"],
    "ASISTENTE LEGAL": ["Asistente legal"],
    "FECHA DE ACTA": ["Fecha de acta"],
    "FECHA DE CONTRATO CERRADO": ["Fecha de contrato cerrado"],
    "OBSERVACIONES 2": ["Observaciones 2"]
  };
  return aliases[column] || [];
}

function normalizeContractSaleValue(value) {
  const rawNumber = Number(String(value ?? "").replace(/\$/g, "").replace(/\s+/g, "").replace(",", ".").replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(rawNumber) || rawNumber <= 0) return "";
  let amount = rawNumber;
  if (amount > 0 && amount < 1000) amount *= 1000;
  else if (amount >= 1000000) amount /= 100;
  else if (amount >= 100000 && amount < 1000000) amount /= 10;
  return amount > 0 && amount < 150000 ? amount.toFixed(2) : "";
}

function normalizeContractDateTimeValue(value) {
  const raw = String(value ?? "").trim();
  const excelSerial = Number(raw);
  if (Number.isFinite(excelSerial) && excelSerial > 20000 && excelSerial < 80000) {
    const date = new Date(Math.round((excelSerial - 25569) * 86400000));
    return new Intl.DateTimeFormat("es-EC", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }
  return normalizeLooseText(value);
}

function normalizeSearchText(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeContractStatus(value = "") {
  const text = normalizeLooseText(value);
  if (!text || text === "NONE" || text === "NULL") return "SIN ESTATUS";
  if (text.includes("ACTAS") && (text.includes("ENVIAD") || text.includes("EVIAD"))) return "ACTAS ENVIADAS ASESOR";
  if (text.includes("ACTAS") && text.includes("SOLICIT")) return "ACTAS SOLICITADAS";
  if (text.includes("ANULAD") || text.includes("ANIULAD") || text.includes("CANCELAD") || text.includes("ERRONE") || text.includes("DUPLIC")) return "ANULADO / ERRONEO";
  if (text.includes("BLOQUE") || text.includes("NO GENERAR") || text.includes("PATIERO")) return "BLOQUEADO / NO GENERAR";
  if (text.includes("FIDEVAL") || text.includes("VALIDACION") || text.includes("VALIDACIO") || text.includes("GRAVAMEN")) return "FIDEVAL / VALIDACION";
  if (text === "OK" || text.includes("GESTIONAD") || text.includes("CERRAD") || text.includes("FIRMAD")) return "GESTIONADO / OK";
  if (text.includes("OBSERV") || text.includes("FALTA") || text.includes("DOCUMENT") || text.includes("PAPELETA") || text.includes("CUV") || text.includes("CSC") || text.includes("CARTA")) return "OBSERVADO / DOCUMENTOS";
  if (text.includes("PENDIENTE") || text.includes("CONFIRMAR") || text.includes("ESPERA") || text.includes("AUTORIZACION") || text.includes("PROCESO")) return "PENDIENTE / POR CONFIRMAR";
  return "OBSERVADO / DOCUMENTOS";
}

function normalizeProviderRecord(record) {
  const profile = getProviderProfile(record.profileId);
  const columns = getProviderColumns(profile);
  const normalized = {
    id: record.id || crypto.randomUUID(),
    profileId: record.profileId || profile.id,
    profileName: record.profileName || profile.name,
    provider: normalizeLooseText(record.provider || record.PROVEEDOR || ""),
    importMonth: normalizeLooseText(record.importMonth || ""),
    source: record.source || "MANUAL",
    loadId: record.loadId || "",
    importedAt: record.importedAt || new Date().toISOString(),
    _RAW: String(record._RAW || record.RAW || "").trim(),
    _WARNINGS: Array.isArray(record._WARNINGS) ? record._WARNINGS : []
  };
  columns.forEach((column) => {
    const value = record[column] ?? record[normalizeHeaderKey(column)] ?? "";
    if (column === "PLACA") normalized[column] = normalizeProviderPlateValue(value);
    else if (column === "VALOR") normalized[column] = normalizeProviderAmountValue(value);
    else if (column === "FECHA" || column === "FECHA DE SOLICITUD") normalized[column] = normalizeProviderDateValue(value);
    else normalized[column] = normalizeLooseText(value);
  });
  if (!normalized.PLACA) {
    const detected = findProviderPlateInRecord({ ...record, ...normalized });
    normalized.PLACA = detected.plate;
    if (detected.plate && ["ASESOR", "ASESOR COMPRA", "ASESOR VENTA"].includes(detected.key) && normalized[detected.key] === detected.plate) {
      normalized[detected.key] = "";
    }
  }
  if (!normalized.VALOR) normalized.VALOR = inferProviderAmountFromRecord({ ...record, ...normalized });
  return normalized;
}

function normalizeProviderLoad(load) {
  const profile = getProviderProfile(load.profileId);
  return {
    id: load.id || crypto.randomUUID(),
    profileId: load.profileId || profile.id,
    profileName: load.profileName || profile.name,
    provider: normalizeLooseText(load.provider || ""),
    month: normalizeLooseText(load.month || ""),
    source: load.source || "MANUAL",
    importedAt: load.importedAt || new Date().toISOString(),
    recordCount: Number(load.recordCount || 0),
    total: Number(load.total || 0)
  };
}

function normalizeProviderProfiles(profiles = []) {
  const sourceProfiles = profiles.length ? profiles : DEFAULT_PROVIDER_PROFILES;
  const map = new Map();
  sourceProfiles.forEach((profile) => {
    const name = normalizeLooseText(profile.name || "");
    const columns = parseProviderColumns(profile.columns || profile.columnsText || "");
    if (!name || !columns.length) return;
    const id = profile.id || `provider-profile-${normalizeHeaderKey(name).toLowerCase()}`;
    map.set(id, {
      id,
      name,
      columns,
      isDefault: Boolean(DEFAULT_PROVIDER_PROFILES.some((defaultProfile) => defaultProfile.id === id))
    });
  });
  return [...map.values()];
}

function getProviderProfileColumnsFromRecord(record = {}) {
  const excluded = new Set([
    "id",
    "profileId",
    "profileName",
    "provider",
    "importMonth",
    "source",
    "loadId",
    "importedAt",
    "remoteCreatedAt",
    "syncStatus"
  ]);
  return Object.keys(record || {})
    .filter((key) => key && !key.startsWith("_"))
    .filter((key) => !excluded.has(key))
    .filter((key) => !/^custom/i.test(key))
    .map(normalizeLooseText)
    .filter(Boolean);
}

function buildProviderProfilesFromHistory(existingProfiles = [], processing = state.dataProcessing || {}) {
  const map = new Map();
  normalizeProviderProfiles(existingProfiles || []).forEach((profile) => {
    map.set(profile.id, { ...profile, columns: parseProviderColumns(profile.columns || []) });
  });
  const addProfile = (id, name, columns = []) => {
    const cleanName = normalizeLooseText(name || "");
    if (!cleanName) return;
    const cleanId = id || `provider-profile-${normalizeHeaderKey(cleanName).toLowerCase()}`;
    const cleanColumns = parseProviderColumns(columns);
    const existing = map.get(cleanId) || [...map.values()].find((profile) => profile.name === cleanName);
    if (existing) {
      existing.columns = parseProviderColumns([...existing.columns, ...cleanColumns]);
      return;
    }
    map.set(cleanId, {
      id: cleanId,
      name: cleanName,
      columns: cleanColumns.length ? cleanColumns : PROVIDER_COLUMNS,
      isDefault: Boolean(DEFAULT_PROVIDER_PROFILES.some((profile) => profile.id === cleanId))
    });
  };
  (processing.providerLoads || []).forEach((load) => {
    const relatedRecords = (processing.proveedores || []).filter((record) =>
      record.loadId === load.id || record.profileId === load.profileId || record.profileName === load.profileName
    );
    const columns = relatedRecords.flatMap(getProviderProfileColumnsFromRecord);
    addProfile(load.profileId, load.profileName || load.provider, columns);
  });
  (processing.proveedores || []).forEach((record) => {
    addProfile(record.profileId, record.profileName || record.provider, getProviderProfileColumnsFromRecord(record));
  });
  const profiles = [...map.values()].map((profile) => ({
    ...profile,
    columns: parseProviderColumns(profile.columns || PROVIDER_COLUMNS)
  })).filter((profile) => profile.name && profile.columns.length);
  return profiles.length ? profiles : normalizeProviderProfiles(DEFAULT_PROVIDER_PROFILES);
}

function normalizeStoredFile(file) {
  const folderId = file.folderId || guessFolderIdFromCategory(file.category);
  return {
    id: file.id || crypto.randomUUID(),
    name: normalizeLooseText(file.name || "ARCHIVO SIN NOMBRE"),
    category: normalizeLooseText(file.category || "OTROS"),
    folderId,
    notes: normalizeLooseText(file.notes || ""),
    type: file.type || "application/octet-stream",
    size: Number(file.size || 0),
    storageKey: file.storageKey || file.id || "",
    dataUrl: file.dataUrl || "",
    uploadedAt: file.uploadedAt || new Date().toISOString(),
    uploadedBy: file.uploadedBy || "USUARIO LOCAL"
  };
}

function normalizeFileFolders(folders = []) {
  const defaultFolders = structuredClone(defaultState.dataProcessing.folders);
  const map = new Map(defaultFolders.map((folder) => [folder.id, folder]));
  folders.forEach((folder) => {
    const normalized = {
      id: folder.id || crypto.randomUUID(),
      name: normalizeLooseText(folder.name || "CARPETA"),
      parentId: folder.isDefault ? "" : (folder.parentId || "folder-general"),
      createdAt: folder.createdAt || new Date().toISOString(),
      isDefault: Boolean(folder.isDefault)
    };
    map.set(normalized.id, normalized);
  });
  return [...map.values()].sort((a, b) => getFolderPath(a.id, map).localeCompare(getFolderPath(b.id, map)));
}

function guessFolderIdFromCategory(category = "") {
  const text = normalizeLooseText(category);
  if (text.includes("CONTRATO")) return "folder-contratos";
  if (text.includes("COMPRA")) return "folder-compras";
  if (text.includes("SANEAMIENTO")) return "folder-saneamientos";
  return "folder-general";
}

function hydrateCommercialOwners() {
  state.tasks = state.tasks.map((task) => {
    if (task.commercialUserId) return task;
    const matchedCommercial = state.commercialAdvisors.find((advisor) => advisor.name === task.asesor && advisor.agency === task.agencia);
    return {
      ...task,
      commercialUserId: matchedCommercial?.id || "",
      commercialUserName: task.commercialUserName || task.asesor || matchedCommercial?.name || "",
      commercialAgency: task.commercialAgency || task.agencia || matchedCommercial?.agency || ""
    };
  });
}

function migrateVisualDefaults(merged, source = {}) {
  const oldHeroTitles = new Set([
    "CENTRO OPERATIVO DE SANEAMIENTO",
    "CENTRO OPERATIVO DE MESA DE CONTROL",
    "OPERACION DE SANEAMIENTO",
    "OPERACION DE SANEAMIENTO"
  ]);
  const currentTitle = normalizeLooseText(source.copy?.heroTitle || merged.copy?.heroTitle);
  if (!source.schemaVersion || source.schemaVersion < STATE_SCHEMA_VERSION || oldHeroTitles.has(currentTitle)) {
    merged.copy = {
      ...merged.copy,
      heroEyebrow: defaultState.copy.heroEyebrow,
      heroTitle: defaultState.copy.heroTitle,
      heroSubtitle: defaultState.copy.heroSubtitle
    };
  }
}

function saveState() {
  const snapshot = structuredClone(state);
  snapshot.schemaVersion = STATE_SCHEMA_VERSION;
  persistAccessUsers(snapshot);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // IndexedDB queda como respaldo cuando localStorage se llena o el navegador lo bloquea.
  }
  writeSharedPcState(snapshot);
  persistStateBackup(snapshot);
  scheduleSupabaseStateSync(snapshot);
  scheduleSupabaseModuleSync();
}

function scheduleSupabaseStateSync(snapshot) {
  if (!SUPABASE_FULL_STATE_SYNC) return;
  if (supabaseSyncTimer) window.clearTimeout(supabaseSyncTimer);
  supabaseSyncTimer = window.setTimeout(() => {
    guardarRegistroSupabase("sistema", "estado_completo", snapshot, session?.name || session?.role || "sistema");
  }, 1500);
}

function openBackupDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB no disponible"));
      return;
    }
    const request = indexedDB.open(BACKUP_DB_NAME, 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(BACKUP_STORE_NAME)) {
        db.createObjectStore(BACKUP_STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(FILE_PAYLOAD_STORE_NAME)) {
        db.createObjectStore(FILE_PAYLOAD_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function withBackupStore(mode, callback) {
  return openBackupDb().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(BACKUP_STORE_NAME, mode);
    const store = tx.objectStore(BACKUP_STORE_NAME);
    const result = callback(store);
    tx.oncomplete = () => {
      db.close();
      resolve(result);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  }));
}

function withFilePayloadStore(mode, callback) {
  return openBackupDb().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(FILE_PAYLOAD_STORE_NAME, mode);
    const store = tx.objectStore(FILE_PAYLOAD_STORE_NAME);
    const result = callback(store);
    tx.oncomplete = () => {
      db.close();
      resolve(result);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  }));
}

function putFilePayload(id, dataUrl) {
  return withFilePayloadStore("readwrite", (store) => {
    store.put({ id, dataUrl, storedAt: new Date().toISOString() });
  });
}

function getFilePayload(id) {
  return withFilePayloadStore("readonly", (store) => {
    const request = store.get(id);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result?.dataUrl || "");
      request.onerror = () => reject(request.error);
    });
  });
}

function deleteFilePayload(id) {
  return withFilePayloadStore("readwrite", (store) => {
    store.delete(id);
  });
}

function persistStateBackup(snapshot) {
  withBackupStore("readwrite", (store) => {
    const request = store.get(BACKUP_RECORD_ID);
    request.onsuccess = () => {
      const existing = request.result;
      const existingScore = existing?.score || getStateScore(existing?.state || {});
      const nextScore = getStateScore(snapshot);
      const existingFiles = existing?.state?.dataProcessing?.files?.length || 0;
      const nextFiles = snapshot?.dataProcessing?.files?.length || 0;
      if (existing && existingScore > nextScore && existingFiles > nextFiles) return;
      store.put({
        id: BACKUP_RECORD_ID,
        exportedAt: new Date().toISOString(),
        score: nextScore,
        state: structuredClone(snapshot)
      });
    };
  })
    .then(renderInternalBackupStatus)
    .catch(() => {
      if (internalBackupStatus) internalBackupStatus.textContent = "No se pudo activar la copia interna automatica en este navegador.";
    });
}

function getInternalBackup() {
  return withBackupStore("readonly", (store) => {
    const request = store.get(BACKUP_RECORD_ID);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  });
}

function getStateScore(snapshot = state) {
  return [
    snapshot.tasks?.length || 0,
    snapshot.dataProcessing?.compras?.length || 0,
    snapshot.dataProcessing?.loads?.length || 0,
    snapshot.dataProcessing?.contratos?.length || 0,
    snapshot.dataProcessing?.contractLoads?.length || 0,
    snapshot.dataProcessing?.proveedores?.length || 0,
    snapshot.dataProcessing?.providerLoads?.length || 0,
    snapshot.dataProcessing?.files?.length || 0,
    getActiveAnnouncements(snapshot).length || 0,
    snapshot.commercialAdvisors?.length || 0,
    snapshot.legalUsers?.length || 0,
    snapshot.managerUsers?.length || 0
  ].reduce((sum, value) => sum + value, 0);
}

function getOperationalScore(snapshot = state) {
  return [
    snapshot.tasks?.length || 0,
    snapshot.dataProcessing?.compras?.length || 0,
    snapshot.dataProcessing?.loads?.length || 0,
    snapshot.dataProcessing?.contratos?.length || 0,
    snapshot.dataProcessing?.contractLoads?.length || 0,
    snapshot.dataProcessing?.proveedores?.length || 0,
    snapshot.dataProcessing?.providerLoads?.length || 0,
    snapshot.dataProcessing?.files?.length || 0
  ].reduce((sum, value) => sum + value, 0);
}

async function restoreStateFromInternalBackupIfNeeded() {
  if (backupRestoreChecked) return;
  backupRestoreChecked = true;
  try {
    const backup = await getInternalBackup();
    if (!backup?.state) {
      if (getOperationalScore(state) > 0) persistStateBackup(state);
      renderInternalBackupStatus();
      return;
    }
    const currentOperational = getOperationalScore(state);
    const backupOperational = getOperationalScore(backup.state);
    if (backupOperational > currentOperational && currentOperational === 0) {
      replaceState(backup.state);
      showToast("Se recupero automaticamente una copia interna de tus datos.");
      return;
    }
    if (restoreMissingDataProcessingFromBackup(backup.state)) {
      saveState();
      renderAll();
      showToast("Se recuperaron archivos guardados desde la copia interna.");
      return;
    }
    if (currentOperational > backupOperational) persistStateBackup(state);
    renderInternalBackupStatus(backup);
  } catch {
    renderInternalBackupStatus();
  }
}

async function migrateIndexedDbFilesToSharedPc() {
  if (!sharedPcStorageAvailable) return;
  const files = state.dataProcessing?.files || [];
  const pendingFiles = files.filter((file) => file.storageKey && !file.dataUrl);
  if (!pendingFiles.length) return;
  let migrated = 0;
  for (const file of pendingFiles) {
    const payload = await getStoredFileDataUrl(file);
    if (payload) {
      file.dataUrl = payload;
      migrated += 1;
    }
  }
  if (migrated) {
    saveState();
    renderFileLibrary();
    showToast(`${migrated} archivo(s) migrado(s) al guardado compartido del PC.`);
  }
}

function restoreMissingDataProcessingFromBackup(backupState) {
  const backupProcessing = backupState?.dataProcessing || {};
  const currentProcessing = state.dataProcessing || {};
  let restored = false;

  if (!(currentProcessing.files || []).length && (backupProcessing.files || []).length) {
    state.dataProcessing.files = backupProcessing.files.map(normalizeStoredFile);
    state.dataProcessing.folders = normalizeFileFolders(backupProcessing.folders || []);
    restored = true;
  }

  if (!(currentProcessing.compras || []).length && (backupProcessing.compras || []).length) {
    state.dataProcessing.compras = backupProcessing.compras.map(normalizePurchaseRecord);
    state.dataProcessing.loads = (backupProcessing.loads || []).map(normalizePurchaseLoad);
    restored = true;
  }

  if (!(currentProcessing.proveedores || []).length && (backupProcessing.proveedores || []).length) {
    state.dataProcessing.proveedores = backupProcessing.proveedores.map(normalizeProviderRecord);
    state.dataProcessing.providerLoads = (backupProcessing.providerLoads || []).map(normalizeProviderLoad);
    restored = true;
  }

  return restored;
}

async function restoreInternalBackupManually() {
  try {
    const backup = await getInternalBackup();
    if (!backup?.state) {
      showToast("No hay copia interna para recuperar.");
      return;
    }
    const confirmed = window.confirm(`Se recuperara la copia interna del ${formatDateTime(backup.exportedAt)}. Esto reemplaza la informacion actual. Desea continuar?`);
    if (!confirmed) return;
    replaceState(backup.state);
    showToast("Copia interna recuperada.");
  } catch {
    showToast("No se pudo recuperar la copia interna.");
  }
}

async function renderInternalBackupStatus(knownBackup = null) {
  if (!internalBackupStatus) return;
  try {
    const backup = knownBackup || await getInternalBackup();
    if (!backup?.state) {
      internalBackupStatus.textContent = "Aun no existe copia interna. Se creara automaticamente al guardar nuevos datos.";
      return;
    }
    const compras = backup.state.dataProcessing?.compras?.length || 0;
    const proveedores = backup.state.dataProcessing?.proveedores?.length || 0;
    const tasks = backup.state.tasks?.length || 0;
    const files = backup.state.dataProcessing?.files?.length || 0;
    internalBackupStatus.textContent = `Ultima copia interna: ${formatDateTime(backup.exportedAt)} | ${compras} compras, ${proveedores} proveedores, ${tasks} saneamientos, ${files} archivos.`;
  } catch {
    internalBackupStatus.textContent = "No se pudo leer el estado de la copia interna.";
  }
}

function normalizeImportedState(importedState) {
  importedState = parseMaybeJson(importedState) || {};
  importedState.copy = parseMaybeJson(importedState.copy) || importedState.copy;
  importedState.theme = parseMaybeJson(importedState.theme) || importedState.theme;
  importedState.dataProcessing = parseMaybeJson(importedState.dataProcessing) || importedState.dataProcessing;
  importedState.statusOptions = parseMaybeJson(importedState.statusOptions) || importedState.statusOptions;
  importedState.tasks = parseMaybeJson(importedState.tasks) || importedState.tasks;
  if (!isPlainObject(importedState.copy)) importedState.copy = {};
  if (!isPlainObject(importedState.theme)) importedState.theme = {};
  if (!isPlainObject(importedState.dataProcessing)) importedState.dataProcessing = {};
  if (!Array.isArray(importedState.statusOptions)) importedState.statusOptions = [];
  if (!Array.isArray(importedState.tasks)) importedState.tasks = [];
  const merged = { ...structuredClone(defaultState), ...importedState };
  merged.commercialAdvisors = normalizeCommercialAdvisors(merged.commercialAdvisors || []);
  merged.legalUsers = normalizeLegalUsers(merged.legalUsers || []);
  merged.managerUsers = Array.isArray(merged.managerUsers) ? merged.managerUsers : [];
  merged.processingUsers = Array.isArray(merged.processingUsers) ? merged.processingUsers : structuredClone(defaultState.processingUsers);
  merged.announcements = (merged.announcements || []).map(normalizeAnnouncement);
  merged.announcementDeletions = (merged.announcementDeletions || []).map(normalizeAnnouncementDeletion);
  applyAnnouncementDeletions(merged);
  merged.forceLogoutRequests = (merged.forceLogoutRequests || []).map(normalizeForceLogoutRequest);
  merged.legalChatMessages = normalizeLegalChatMessages(merged.legalChatMessages || []);
  merged.theme = { ...structuredClone(defaultState.theme), ...(merged.theme || {}) };
  merged.copy = { ...structuredClone(defaultState.copy), ...(merged.copy || {}) };
  sanitizeStateVisuals(merged);
  migrateVisualDefaults(merged, importedState || {});
  merged.dataProcessing = { ...structuredClone(defaultState.dataProcessing), ...(merged.dataProcessing || {}) };
  merged.dataProcessing.compras = (merged.dataProcessing.compras || []).map(normalizePurchaseRecord);
  merged.dataProcessing.loads = (merged.dataProcessing.loads || []).map(normalizePurchaseLoad);
  merged.dataProcessing.purchaseDuplicateApprovals = merged.dataProcessing.purchaseDuplicateApprovals || {};
  merged.dataProcessing.purchaseFilterPresets = merged.dataProcessing.purchaseFilterPresets || [];
  merged.dataProcessing.contratos = (merged.dataProcessing.contratos || []).map(normalizeContractRecord);
  merged.dataProcessing.contractLoads = (merged.dataProcessing.contractLoads || []).map(normalizeContractLoad);
  merged.dataProcessing.providerProfiles = buildProviderProfilesFromHistory(merged.dataProcessing.providerProfiles || [], merged.dataProcessing);
  merged.dataProcessing.proveedores = (merged.dataProcessing.proveedores || []).map(normalizeProviderRecord);
  merged.dataProcessing.providerLoads = (merged.dataProcessing.providerLoads || []).map(normalizeProviderLoad);
  merged.dataProcessing.providerDuplicateApprovals = merged.dataProcessing.providerDuplicateApprovals || {};
  merged.dataProcessing.folders = normalizeFileFolders(merged.dataProcessing.folders || []);
  merged.dataProcessing.files = (merged.dataProcessing.files || []).map(normalizeStoredFile);
  merged.statusOptions = normalizeStatusOptions(merged.statusOptions || defaultState.statusOptions);
  merged.formConfig = normalizeFormConfig(merged.formConfig);
  merged.taskDeletions = Array.isArray(merged.taskDeletions) ? merged.taskDeletions.filter((item) => item?.id) : [];
  merged.tasks = (merged.tasks || [])
    .map(normalizeTask)
    .filter((task) => !merged.taskDeletions.some((deletion) => deletion.id === task.id));
  merged.schemaVersion = STATE_SCHEMA_VERSION;
  return merged;
}

function sanitizeStateVisuals(snapshot) {
  const sourceCopy = isPlainObject(snapshot.copy) ? snapshot.copy : {};
  snapshot.copy = Object.fromEntries(
    Object.entries({ ...structuredClone(defaultState.copy), ...sourceCopy })
      .map(([key, value]) => [key, normalizeCopyText(key, value)])
  );
  if (snapshot.logoDataUrl && !String(snapshot.logoDataUrl).startsWith("data:image/")) {
    snapshot.logoDataUrl = "";
  }
  if (snapshot.logoDataUrl && hasBrokenEncoding(snapshot.logoDataUrl.slice(0, 120))) {
    snapshot.logoDataUrl = "";
  }
}

function hasBrokenEncoding(value = "") {
  return /ÃƒÂ°|ÃƒÆ’|Ãƒâ€š|ÃƒÂ¢|ÃƒÂ¯Ã‚Â¸|Ã¯Â¿Â½/.test(String(value));
}

function repairBrokenEncoding(value = "") {
  if (typeof value !== "string" || !hasBrokenEncoding(value)) return value;
  const replacements = [
    ["Ãƒâ€šÃ‚Â¿", "\u00BF"],
    ["Ãƒâ€šÃ‚Â¡", "\u00A1"],
    ["ÃƒÆ’Ã‚Â±", "\u00F1"],
    ["ÃƒÆ’Ã¢â‚¬Ëœ", "\u00D1"],
    ["ÃƒÆ’Ã‚Â¡", "\u00E1"],
    ["ÃƒÆ’Ã‚Â©", "\u00E9"],
    ["ÃƒÆ’Ã‚Â­", "\u00ED"],
    ["ÃƒÆ’Ã‚Â³", "\u00F3"],
    ["ÃƒÆ’Ã‚Âº", "\u00FA"],
    ["ÃƒÆ’ÃƒÂ", "\u00C1"],
    ["ÃƒÆ’Ã¢â‚¬Â°", "\u00C9"],
    ["ÃƒÆ’ÃƒÂ", "\u00CD"],
    ["ÃƒÆ’Ã¢â‚¬Å“", "\u00D3"],
    ["ÃƒÆ’Ã…Â¡", "\u00DA"],
    ["Ãƒâ€š", ""]
  ];
  return replacements.reduce(
    (text, [broken, fixed]) => text.split(broken).join(fixed),
    value
  );
}

function normalizeCopyText(key, value) {
  const repaired = repairBrokenEncoding(value);
  if (
    key === "supportQuestion"
    && String(repaired || "").trim().toLowerCase() === "necesitas ayuda?"
  ) {
    return defaultState.copy.supportQuestion;
  }
  return repaired;
}

function parseMaybeJson(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed || (!trimmed.startsWith("{") && !trimmed.startsWith("["))) return value;
  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function replaceState(nextState) {
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, normalizeImportedState(nextState));
  hydrateCommercialOwners();
  saveState();
  renderAll();
}

function loadRememberedAccess() {
  try {
    return JSON.parse(localStorage.getItem(REMEMBER_ACCESS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveRememberedAccess(area, values) {
  const remembered = loadRememberedAccess();
  remembered[area] = values;
  localStorage.setItem(REMEMBER_ACCESS_KEY, JSON.stringify(remembered));
}

function clearRememberedAccess(area) {
  const remembered = loadRememberedAccess();
  delete remembered[area];
  localStorage.setItem(REMEMBER_ACCESS_KEY, JSON.stringify(remembered));
}

function getPublicSession() {
  return { role: "public", userId: null, name: "", agency: "", loginAt: "" };
}

function loadPersistedSession() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem(SESSION_STORAGE_KEY) || "null");
    if (!saved || !saved.session || !saved.savedAt) return getPublicSession();
    if (Date.now() - new Date(saved.savedAt).getTime() > SESSION_TIMEOUT_MS) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return getPublicSession();
    }
    lastActivityAt = new Date(saved.savedAt).getTime();
    return sanitizePersistedSession(saved.session);
  } catch {
    return getPublicSession();
  }
}

function sanitizePersistedSession(savedSession) {
  if (!savedSession || savedSession.role === "public") return getPublicSession();
  const allowedRoles = new Set(["admin", "legal", "commercial", "manager", "processing"]);
  if (!allowedRoles.has(savedSession.role)) return getPublicSession();
  return {
    role: savedSession.role,
    userId: savedSession.userId || null,
    name: savedSession.name || "",
    agency: savedSession.agency || "",
    loginAt: savedSession.loginAt || savedSession.savedAt || new Date().toISOString()
  };
}

function isPersistedSessionValid(savedSession) {
  if (!savedSession || savedSession.role === "public") return false;
  if (savedSession.role === "admin") return savedSession.userId === "admin";
  if (savedSession.role === "legal") return state.legalUsers.some((user) => user.id === savedSession.userId);
  if (savedSession.role === "commercial") return state.commercialAdvisors.some((user) => user.id === savedSession.userId);
  if (savedSession.role === "manager") return state.managerUsers.some((user) => user.id === savedSession.userId);
  if (savedSession.role === "processing") return state.processingUsers.some((user) => user.id === savedSession.userId);
  return false;
}

function persistSession() {
  if (!session || session.role === "public") {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }
  const payload = JSON.stringify({
    session,
    savedAt: new Date(lastActivityAt).toISOString()
  });
  localStorage.setItem(SESSION_STORAGE_KEY, payload);
  sessionStorage.setItem(SESSION_STORAGE_KEY, payload);
}

function loadPersistedView() {
  try {
    return localStorage.getItem(VIEW_STORAGE_KEY) || "acceso";
  } catch {
    return "acceso";
  }
}

function persistView(viewId) {
  try {
    localStorage.setItem(VIEW_STORAGE_KEY, viewId || "acceso");
  } catch {}
}

function restorePersistedViewAfterLoad() {
  if (!currentViewId || currentViewId === "acceso") return;
  window.setTimeout(() => forceRestoreView(currentViewId), 50);
  window.setTimeout(() => forceRestoreView(currentViewId), 800);
}

function forceRestoreView(viewId) {
  if (!viewId) return;
  const protectedViews = {
    formulario: ["commercial", "admin"],
    commercial: ["commercial", "admin"],
    tareas: ["legal", "admin"],
    admin: ["admin"],
    gerencial: ["manager", "admin"],
    procesamiento: ["processing", "admin"]
  };
  const allowedRoles = protectedViews[viewId];
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    setView("acceso");
    return;
  }
  views.forEach((view) => view.classList.toggle("is-active", view.id === viewId));
  navTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewId));
  currentViewId = viewId;
  persistView(viewId);
  safeRenderAll();
}

function rememberAccessFromLogin(area, formElement, data) {
  if (!formElement?.elements.rememberAccess) return;
  if (!formElement.elements.rememberAccess.checked) {
    clearRememberedAccess(area);
    return;
  }
  saveRememberedAccess(area, {
    username: data.username || "",
    password: data.password || ""
  });
}

function applyRememberedLogins() {
  const remembered = loadRememberedAccess();
  fillRememberedLogin(commercialLoginForm, remembered.commercial);
  fillRememberedLogin(legalLoginForm, remembered.legal);
  fillRememberedLogin(managerLoginForm, remembered.manager);
  fillRememberedLogin(processingLoginForm, remembered.processing);
  fillRememberedLogin(adminLoginForm, remembered.admin);
}

function fillRememberedLogin(formElement, data) {
  if (!formElement || !data) return;
  if (formElement.elements.username && data.username) formElement.elements.username.value = data.username;
  if (formElement.elements.password && data.password) formElement.elements.password.value = data.password;
  if (formElement.elements.rememberAccess) formElement.elements.rememberAccess.checked = true;
}

function initPasswordToggles(root = document) {
  root.querySelectorAll('input[type="password"]').forEach((input) => {
    if (input.closest(".password-field")) return;
    const wrapper = document.createElement("span");
    wrapper.className = "password-field";
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    const button = document.createElement("button");
    button.className = "password-toggle";
    button.type = "button";
    button.textContent = "Ver";
    button.setAttribute("aria-label", "Mostrar contrasena");
    button.addEventListener("click", () => {
      const visible = input.type === "text";
      input.type = visible ? "password" : "text";
      button.textContent = visible ? "Ver" : "Ocultar";
      button.setAttribute("aria-label", visible ? "Mostrar contrasena" : "Ocultar contrasena");
    });
    wrapper.appendChild(button);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

function getWhatsappUrl(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `593${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

function openSupportModal() {
  if (!supportModal) return;
  const copy = state.copy || defaultState.copy;
  const email = copy.supportEmail || defaultState.copy.supportEmail;
  const whatsapp = copy.supportWhatsapp || defaultState.copy.supportWhatsapp;
  supportBubbleMessage.textContent = copy.supportMessage || defaultState.copy.supportMessage;
  supportEmailLink.textContent = `Correo: ${email}`;
  supportEmailLink.href = `mailto:${email}`;
  supportWhatsappLink.textContent = `WhatsApp: ${whatsapp}`;
  supportWhatsappLink.href = getWhatsappUrl(whatsapp);
  supportModal.hidden = false;
  document.body.classList.add("has-modal");
}

function closeSupportModal() {
  if (!supportModal) return;
  supportModal.hidden = true;
  document.body.classList.remove("has-modal");
}

function openCommercialModal(modal) {
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("has-modal");
}

function closeCommercialModals() {
  [commercialConstructionModal, commercialLeadModal, commercialNotificationsModal, commercialSidebarModal, commercialPilotModal, commercialDuplicateModal, commercialSignatureModal].forEach((modal) => {
    if (modal) modal.hidden = true;
  });
  document.body.classList.remove("has-modal");
}

function openConstructionModal(moduleName = "este modulo") {
  const title = commercialConstructionModal?.querySelector("#constructionTitle");
  if (title) title.textContent = `Estamos trabajando en ${moduleName}`;
  openCommercialModal(commercialConstructionModal);
}

function confirmPilotDocuments() {
  return new Promise((resolve) => {
    if (!commercialPilotModal || !pilotConfirmBtn || !pilotCancelBtn) {
      resolve(true);
      return;
    }
    const cleanup = (answer) => {
      pilotConfirmBtn.removeEventListener("click", onConfirm);
      pilotCancelBtn.removeEventListener("click", onCancel);
      closeCommercialModals();
      resolve(answer);
    };
    const onConfirm = () => cleanup(true);
    const onCancel = () => cleanup(false);
    pilotConfirmBtn.addEventListener("click", onConfirm, { once: true });
    pilotCancelBtn.addEventListener("click", onCancel, { once: true });
    openCommercialModal(commercialPilotModal);
  });
}

function getDuplicateConflicts(data, excludeId = "") {
  const placa = normalizePlate(data.placa);
  const cedula = normalizeId(data.cedula);
  const cliente = normalizeLooseText(data.cliente || data.vendedor || "");
  const conflicts = [];
  state.tasks.forEach((task) => {
    if (task.id === excludeId) return;
    const taskPlate = normalizePlate(task.placa);
    const taskId = normalizeId(task.cedula || task.cedulaVendedor);
    const taskClient = normalizeLooseText(task.cliente || task.vendedor || "");
    let reason = "";
    if (placa && taskPlate === placa) reason = "Placa duplicada";
    else if (cedula && taskId === cedula) reason = taskPlate && taskPlate !== placa ? "Cliente duplicado con placa distinta" : "Cedula duplicada";
    else if (cliente && taskClient && taskClient === cliente) reason = taskPlate && taskPlate !== placa ? "Nombre duplicado con placa distinta" : "Nombre duplicado";
    if (!reason) return;
    conflicts.push({ reason, task });
  });
  return conflicts;
}

function renderDuplicateConflict(conflict) {
  const task = conflict.task || {};
  const advisor = task.commercialUserName || task.asesor || "asesor no registrado";
  const date = task.createdAt ? formatDateTime(task.createdAt) : "fecha no registrada";
  const value = task.valorToma || task.precioContrato || "sin valor";
  return `
    <article class="duplicate-conflict-card">
      <strong>${escapeHtml(conflict.reason)}</strong>
      <p>Este saneamiento ya fue solicitado por el asesor <b>${escapeHtml(advisor)}</b> el <b>${escapeHtml(date)}</b>.</p>
      <dl>
        <div><dt>Placa</dt><dd>${escapeHtml(task.placa || "Sin placa")}</dd></div>
        <div><dt>Cliente</dt><dd>${escapeHtml(task.cliente || task.vendedor || "Sin cliente")}</dd></div>
        <div><dt>Valor de toma</dt><dd>${escapeHtml(value)}</dd></div>
        <div><dt>Estatus</dt><dd>${escapeHtml(task.status || "Sin estatus")}</dd></div>
      </dl>
      <span>Accion sugerida: contactar al asesor ${escapeHtml(advisor)} antes de continuar.</span>
    </article>
  `;
}

function confirmDuplicateConflict(data) {
  const conflicts = getDuplicateConflicts(data);
  if (!conflicts.length) return Promise.resolve(true);
  return new Promise((resolve) => {
    if (!commercialDuplicateModal || !duplicateConflictContent || !duplicateContinueBtn || !duplicateCancelBtn) {
      resolve(window.confirm("Posible caso duplicado. Desea continuar bajo su responsabilidad?"));
      return;
    }
    duplicateConflictContent.innerHTML = conflicts.slice(0, 3).map(renderDuplicateConflict).join("");
    const cleanup = (answer) => {
      duplicateContinueBtn.removeEventListener("click", onContinue);
      duplicateCancelBtn.removeEventListener("click", onCancel);
      closeCommercialModals();
      resolve(answer);
    };
    const onContinue = () => cleanup(true);
    const onCancel = () => cleanup(false);
    duplicateContinueBtn.addEventListener("click", onContinue, { once: true });
    duplicateCancelBtn.addEventListener("click", onCancel, { once: true });
    openCommercialModal(commercialDuplicateModal);
  });
}

function openCommercialLeadFicha(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task || !commercialLeadFichaContent) return;
  const latestLegalObservation = getLatestLegalObservation(task);
  const isCuv = isCuvTask(task);
  const fields = [
    ["Proceso", getCommercialProcessLabel(getTaskProcess(task))],
    ...(isCuv ? [
      ["Fecha de solicitud", task.fechaSolicitud],
      ["No. de orden", task.cuvOrderNumber],
      ["Estatus CUV", task.cuvStatus],
      ["Hora", task.cuvHour],
      ["Valor CUV", task.cuvValue ? formatCurrencyValue(task.cuvValue) : ""],
      ["Depositos", task.cuvDeposits],
      ["Observaciones CUV", task.cuvObservations],
      ["Archivo PDF", task.cuvPdfName]
    ] : []),
    ["Placa", task.placa],
    ["Cliente / vendedor", task.cliente || task.vendedor],
    ["Cedula", task.cedula || task.cedulaVendedor],
    ["Agencia", task.agencia],
    ["Asesor comercial", task.asesor || task.commercialUserName],
    ["Valor", task.valorToma || task.precioContrato],
    ["Kilometraje", task.kilometraje],
    ["Tipo de compra", task.tipoCompra],
    ["Tipo de saneamiento", task.tipoSaneamiento],
    ["Estatus", task.status],
    ["Firma / Pilot", getSignatureDisplayStatus(task)],
    ["Asesor legal", task.legalAdvisor],
    ["Fecha de envio", task.createdAt ? formatDateTime(task.createdAt) : ""],
    ["Observaciones", task.observaciones],
    ["Observacion de mesa de control", latestLegalObservation ? `${latestLegalObservation.note} (${latestLegalObservation.statusLabel})` : ""]
  ];
  commercialLeadFichaContent.innerHTML = fields.map(([label, value]) => `
    <div class="lead-ficha-item ${label === "Observaciones" || label === "Observaciones CUV" || label === "Observacion de mesa de control" ? "span-2" : ""}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value || "Sin registro")}</strong>
    </div>
  `).join("") + `
    <div class="lead-ficha-actions span-2">
      ${isCuv && task.cuvPdfDataUrl ? `<button class="btn primary" type="button" data-pdf-download="${escapeHtml(task.id)}">Descargar PDF CUV</button>` : ""}
      ${buildSignatureActionButtons(task)}
    </div>
  `;
  openCommercialModal(commercialLeadModal);
}

function getLatestLegalObservation(task = {}) {
  const observations = Array.isArray(task.legalObservations) ? task.legalObservations : [];
  return observations[0] || null;
}

function renderLegalObservationList(task = {}) {
  const observations = Array.isArray(task.legalObservations) ? task.legalObservations : [];
  if (!observations.length) return "";
  return `
    <section class="legal-observation-panel">
      <p class="eyebrow">Observaciones de mesa de control</p>
      <div class="legal-observation-list">
        ${observations.map((item) => `
          <article>
            <div>
              <strong>${escapeHtml(item.statusLabel || item.status || "Estatus actualizado")}</strong>
              <span>${escapeHtml(formatDateTime(item.createdAt) || "Sin fecha")} | ${escapeHtml(item.userName || "Mesa de control")}</span>
            </div>
            <p>${escapeHtml(item.note || "Sin observacion")}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function askLegalStatusObservation(task = {}, status = "") {
  if (!task || isSignatureTask(task)) return "";
  if (!["legal", "admin"].includes(session.role)) return "";
  const label = getStatusOption(status)?.label || status || "nuevo estatus";
  const note = window.prompt(`Observacion opcional para "${label}". Puede dejarla en blanco si no aplica.`, "");
  return note === null ? "" : note.trim();
}

function appendLegalStatusObservation(task, status, note) {
  const cleanNote = String(note || "").trim();
  if (!cleanNote) return;
  task.legalObservations = Array.isArray(task.legalObservations) ? task.legalObservations : [];
  task.legalObservations.unshift({
    id: crypto.randomUUID(),
    status,
    statusLabel: getStatusOption(status)?.label || status,
    note: cleanNote,
    createdAt: new Date().toISOString(),
    userId: session.userId || "",
    userName: session.name || "Mesa de control"
  });
}

function renderSignatureRecipientCard(title, recipient = {}, type = "titular") {
  const email = recipient.email || "";
  const whatsapp = recipient.whatsapp || "";
  if (!email && !whatsapp) return "";
  return `
    <article class="signature-recipient-card is-${escapeHtml(type)}">
      <span>${escapeHtml(title)}</span>
      <strong>${escapeHtml(email || "Sin correo")}</strong>
      <small>${escapeHtml(whatsapp || "Sin WhatsApp")}</small>
    </article>
  `;
}

function renderSignatureRecipientCards(task = {}) {
  if (!isSignatureTask(task)) return "";
  const payload = task.signaturePayload || {};
  const heirs = Array.isArray(payload.herederos) ? payload.herederos.filter((item) => item?.email || item?.whatsapp) : [];
  const cards = [
    renderSignatureRecipientCard("Titular", payload.titular, "titular"),
    renderSignatureRecipientCard("Conyuge", payload.conyuge, "conyuge"),
    ...heirs.map((heir, index) => renderSignatureRecipientCard(`Heredero ${heir.index || index + 1}`, heir, "heredero"))
  ].filter(Boolean);
  if (!cards.length) return "";
  return `
    <section class="signature-recipient-panel">
      <p class="eyebrow">Datos para firma</p>
      <div class="signature-recipient-grid">${cards.join("")}</div>
    </section>
  `;
}

async function checkForAppUpdate() {
  if (!navigator.onLine) return;
  try {
    const response = await fetch(`index.html?version-check=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const html = await response.text();
    const match = html.match(/data-app-version=["']([^"']+)["']/i);
    const remoteVersion = match?.[1] || "";
    if (!remoteVersion || remoteVersion === APP_BUILD_VERSION) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("build") === remoteVersion) return;
    url.searchParams.set("build", remoteVersion);
    window.location.replace(url.toString());
  } catch {
    // The current version remains usable while offline.
  }
}

function setView(viewId) {
  if (!viewId) return;
  checkSessionExpiry();
  if (viewId === "formulario" && !canOpenCommercialTools()) {
    showToast("Ingrese como asesor comercial para abrir el formulario.");
    viewId = "acceso";
    window.setTimeout(() => commercialLoginForm.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  }

  if (viewId === "tareas" && !canOpenTasks()) {
    showToast("Ingrese como asistente legal o administrador para ver tareas.");
    viewId = "acceso";
  }

  if (viewId === "admin" && session.role !== "admin") {
    showToast("Ingrese la clave de administrador.");
    viewId = "acceso";
  }

  if (viewId === "procesamiento" && !canOpenProcessingTools()) {
    showToast("Ingrese con usuario de procesamiento de datos.");
    viewId = "login-procesamiento";
  }

  if (viewId === "gerencial" && !canOpenManagerDashboard()) {
    showToast("Ingrese con usuario gerencial para consultar saneamientos.");
    viewId = "login-gerencial";
  }

  views.forEach((view) => view.classList.toggle("is-active", view.id === viewId));
  navTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewId));
  currentViewId = viewId;
  persistView(viewId);
  startSupabaseModulePolling();
  if (canSyncCurrentView() && navigator.onLine) restoreModulesFromSupabaseIfNeeded();
  window.scrollTo({ top: 0, behavior: "smooth" });
  safeRenderAll();
}

function applyTheme() {
  const oldMonoFont = "'Aptos Mono', 'Cascadia Mono', Consolas, monospace";
  const oldCorporateFont = "'Montserrat', 'Century Gothic', 'Avenir Next', Avenir, Arial, sans-serif";
  const oldCenturyFont = "'Century Gothic', 'Avenir Next', Avenir, Arial, sans-serif";
  if (!state.theme.font || state.theme.font === "Arial, Helvetica, sans-serif" || state.theme.font === oldMonoFont || state.theme.font === oldCorporateFont || state.theme.font === oldCenturyFont) {
    state.theme.font = defaultState.theme.font;
  }
  document.documentElement.style.setProperty("--red", state.theme.primary);
  document.documentElement.style.setProperty("--red-dark", shadeColor(state.theme.primary, -18));
  document.documentElement.style.setProperty("--night", state.theme.dark);
  document.body.style.fontFamily = state.theme.font;
  themeForm.elements.primary.value = state.theme.primary;
  themeForm.elements.dark.value = state.theme.dark;
  themeForm.elements.font.value = state.theme.font;
}

function applyCopy() {
  const repairedCopy = Object.fromEntries(
    Object.entries(state.copy || {}).map(([key, value]) => [key, normalizeCopyText(key, value)])
  );
  const copyChanged = JSON.stringify(repairedCopy) !== JSON.stringify(state.copy || {});
  state.copy = { ...structuredClone(defaultState.copy), ...repairedCopy };
  document.querySelector("#heroEyebrow").textContent = state.copy.heroEyebrow;
  document.querySelector("#access-title").textContent = state.copy.heroTitle;
  document.querySelector("#heroSubtitle").textContent = state.copy.heroSubtitle;
  document.querySelector("#commercialAccessTitle").textContent = state.copy.commercialTitle;
  document.querySelector("#commercialAccessText").textContent = state.copy.commercialText;
  document.querySelector("#legalAccessTitle").textContent = state.copy.legalTitle;
  document.querySelector("#legalAccessText").textContent = state.copy.legalText;
  document.querySelector("#adminAccessTitle").textContent = state.copy.adminTitle;
  document.querySelector("#adminAccessText").textContent = state.copy.adminText;
  document.querySelector("#announcementsAccessTitle").textContent = state.copy.announcementsTitle;
  document.querySelector("#announcementsAccessText").textContent = state.copy.announcementsText;
  document.querySelector("#managerAccessTitle").textContent = state.copy.managerTitle;
  document.querySelector("#managerAccessText").textContent = state.copy.managerText;
  const supportTitle = document.querySelector("#commercialSupportTitle");
  const supportQuestion = document.querySelector("#commercialSupportQuestion");
  const supportButton = document.querySelector("#commercialSupportBtn");
  if (supportTitle) supportTitle.textContent = state.copy.supportTitle || defaultState.copy.supportTitle;
  if (supportQuestion) supportQuestion.textContent = state.copy.supportQuestion || defaultState.copy.supportQuestion;
  if (supportButton) supportButton.textContent = state.copy.supportButton || defaultState.copy.supportButton;

  Object.entries(state.copy).forEach(([key, value]) => {
    if (copyForm.elements[key]) copyForm.elements[key].value = value;
  });
  if (copyChanged) saveState();
}

function canOpenTasks() {
  return session.role === "legal" || session.role === "admin";
}

function canOpenCommercialTools() {
  return session.role === "commercial" || session.role === "admin";
}

function canOpenManagerDashboard() {
  return session.role === "manager" || session.role === "admin";
}

function canOpenProcessingTools() {
  return session.role === "processing" || session.role === "admin";
}

function setSession(nextSession) {
  session = nextSession.role === "public" ? nextSession : { ...nextSession, loginAt: nextSession.loginAt || new Date().toISOString() };
  lastActivityAt = Date.now();
  if (session.role === "public") sessionAnnouncementShownKey = "";
  logoutBtn.hidden = session.role === "public";
  document.body.dataset.session = session.role;
  persistSession();
  safeRenderAll();
  if (session.role !== "public") {
    window.setTimeout(maybeShowSessionAnnouncements, 450);
  }
  startSupabaseModulePolling();
  if (session.role !== "public" && navigator.onLine) {
    restoreModulesFromSupabaseIfNeeded();
    sincronizarTareasPendientesSupabase();
    reconcileTasksForCurrentBuild();
  }
}

function touchSession() {
  if (session.role === "public") return;
  lastActivityAt = Date.now();
  if (Date.now() - lastSessionPersistAt > 30000) {
    lastSessionPersistAt = Date.now();
    persistSession();
  }
}

function checkSessionExpiry() {
  if (session.role === "public") return;
  if (Date.now() - lastActivityAt <= SESSION_TIMEOUT_MS) return;
  setSession(getPublicSession());
  setView("acceso");
  showToast("Sesion caducada por inactividad.");
}

function renderLogo() {
  if (state.logoDataUrl) {
    logoSlot.innerHTML = `<img src="${state.logoDataUrl}" alt="Logo Autocor" onerror="this.src='${CORPORATE_LOGO_SRC}'">`;
    return;
  }

  logoSlot.innerHTML = `<img src="${CORPORATE_LOGO_SRC}" alt="Logo Autocor">`;
}

function renderSelects() {
  renderSelect("tipoCompraSelect", state.purchaseTypes);
  renderSelect("tipoSaneamientoSelect", state.sanitationTypes);
  renderSelect("agenciaSelect", state.agencies);
  renderSelect("saleAgencySelect", state.agencies);
  renderAgencySelect("advisorAgencyInput");
  renderAgencySelect("adminAgencyFilter", true);
  renderLegalFilter();
  renderCommercialFilter();
  renderAdminStatusFilter();
  renderStatusLookupFilters();
  renderManagerDetailFilters();
  renderAdvisorSelect();
}

function renderSelect(id, options) {
  const select = document.querySelector(`#${id}`);
  const current = select.value;
  select.innerHTML = `<option value="">Seleccione una opcion</option>`;
  options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    item.textContent = option;
    select.appendChild(item);
  });
  select.value = current && [...select.options].some((option) => option.value === current) ? current : "";
}

function renderAgencySelect(id, includeAll = false) {
  const select = document.querySelector(`#${id}`);
  if (!select) return;
  const current = select.value;
  select.innerHTML = includeAll ? `<option value="">Todas</option>` : `<option value="">Seleccione una agencia</option>`;
  state.agencies.forEach((agency) => {
    const item = document.createElement("option");
    item.value = agency;
    item.textContent = agency;
    select.appendChild(item);
  });
  select.value = current && [...select.options].some((option) => option.value === current) ? current : "";
}

function renderAdvisorSelect() {
  const agencyControl = document.querySelector("#agenciaSelect") || form?.elements?.agencia || agenciaSelect;
  const advisorControl = document.querySelector("#asesorSelect") || form?.elements?.asesor || asesorSelect;
  if (!agencyControl || !advisorControl) return;
  const current = advisorControl.value;
  const agency = agencyControl.value;
  const advisors = getCommercialAdvisorsByAgency(agency);
  advisorControl.innerHTML = `<option value="">${agency ? "Seleccione un asesor" : "Primero seleccione agencia"}</option>`;
  advisors.forEach((advisor) => {
    const item = document.createElement("option");
    item.value = advisor.name;
    item.textContent = advisor.name;
    advisorControl.appendChild(item);
  });
  advisorControl.value = current && advisors.some((advisor) => advisor.name === current) ? current : "";
}

function getCommercialAdvisorsByAgency(agency) {
  if (!agency) return [];
  return state.commercialAdvisors.filter((advisor) => advisor.agency === agency);
}

function applyCommercialSessionToForm() {
  if (session.role !== "commercial") return;
  const agencyControl = document.querySelector("#agenciaSelect") || form?.elements?.agencia || agenciaSelect;
  const advisorControl = document.querySelector("#asesorSelect") || form?.elements?.asesor || asesorSelect;
  const saleAgencyControl = document.querySelector("#saleAgencySelect") || saleContractForm?.elements?.agencia || saleAgencySelect;
  if (agencyControl) {
    ensureSelectHasOption(agencyControl, session.agency || "");
    agencyControl.value = session.agency || "";
  }
  if (saleAgencyControl) {
    ensureSelectHasOption(saleAgencyControl, session.agency || "");
    saleAgencyControl.value = session.agency || "";
  }
  const welcomeTitle = document.querySelector("#commercialWelcomeTitle");
  if (welcomeTitle) { welcomeTitle.innerHTML = `Bienvenido,<br><span>${escapeHtml(session.name || "Asesor comercial")}</span>`; }
  renderAdvisorSelect();
  if (advisorControl) {
    ensureSelectHasOption(advisorControl, session.name || "");
    advisorControl.value = session.name || "";
  }
}

function ensureSelectHasOption(select, value) {
  if (!select || select.tagName !== "SELECT" || !value) return;
  if ([...select.options].some((option) => option.value === value)) return;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  select.appendChild(option);
}

function renderLegalFilter() {
  const current = adminLegalFilter.value;
  adminLegalFilter.innerHTML = `<option value="">Todos</option>`;
  state.legalUsers.forEach((user) => {
    const item = document.createElement("option");
    item.value = user.id;
    item.textContent = user.name;
    adminLegalFilter.appendChild(item);
  });
  adminLegalFilter.value = current && [...adminLegalFilter.options].some((option) => option.value === current) ? current : "";
}

function renderCommercialFilter() {
  const current = adminCommercialFilter.value;
  adminCommercialFilter.innerHTML = `<option value="">Todos</option>`;
  state.commercialAdvisors.forEach((advisor) => {
    const item = document.createElement("option");
    item.value = advisor.name;
    item.textContent = advisor.agency ? `${advisor.name} - ${advisor.agency}` : advisor.name;
    adminCommercialFilter.appendChild(item);
  });
  adminCommercialFilter.value = current && [...adminCommercialFilter.options].some((option) => option.value === current) ? current : "";
}

function renderAdminStatusFilter() {
  const current = adminStatusFilter.value;
  adminStatusFilter.innerHTML = `<option value="">Todos</option>`;
  state.statusOptions.forEach((status) => {
    const item = document.createElement("option");
    item.value = status.value;
    item.textContent = status.label;
    adminStatusFilter.appendChild(item);
  });
  adminStatusFilter.value = current && [...adminStatusFilter.options].some((option) => option.value === current) ? current : "";
}

function renderStatusLookupFilters() {
  const currentAdvisor = statusAdvisorFilter.value;
  const currentAgency = statusAgencyFilter.value;
  const currentStatus = statusStateFilter.value;

  statusAdvisorFilter.innerHTML = `<option value="">Todos los asesores</option>`;
  state.commercialAdvisors.forEach((advisor) => {
    const item = document.createElement("option");
    item.value = advisor.name;
    item.textContent = advisor.agency ? `${advisor.name} - ${advisor.agency}` : advisor.name;
    statusAdvisorFilter.appendChild(item);
  });

  statusAgencyFilter.innerHTML = `<option value="">Todas las agencias</option>`;
  state.agencies.forEach((agency) => {
    const item = document.createElement("option");
    item.value = agency;
    item.textContent = agency;
    statusAgencyFilter.appendChild(item);
  });

  statusStateFilter.innerHTML = `<option value="">Todos los estatus</option>`;
  state.statusOptions.forEach((status) => {
    const item = document.createElement("option");
    item.value = status.value;
    item.textContent = status.label;
    statusStateFilter.appendChild(item);
  });

  statusAdvisorFilter.value = currentAdvisor && [...statusAdvisorFilter.options].some((option) => option.value === currentAdvisor) ? currentAdvisor : "";
  statusAgencyFilter.value = currentAgency && [...statusAgencyFilter.options].some((option) => option.value === currentAgency) ? currentAgency : "";
  statusStateFilter.value = currentStatus && [...statusStateFilter.options].some((option) => option.value === currentStatus) ? currentStatus : "";
}

function renderManagerDetailFilters() {
  if (!managerAdvisorFilter || !managerAgencyFilter) return;
  const currentAdvisor = managerAdvisorFilter.value;
  const currentAgency = managerAgencyFilter.value;

  managerAdvisorFilter.innerHTML = `<option value="">Todos los asesores</option>`;
  state.commercialAdvisors.forEach((advisor) => {
    const item = document.createElement("option");
    item.value = advisor.name;
    item.textContent = advisor.agency ? `${advisor.name} - ${advisor.agency}` : advisor.name;
    managerAdvisorFilter.appendChild(item);
  });

  managerAgencyFilter.innerHTML = `<option value="">Todas las agencias</option>`;
  state.agencies.forEach((agency) => {
    const item = document.createElement("option");
    item.value = agency;
    item.textContent = agency;
    managerAgencyFilter.appendChild(item);
  });

  managerAdvisorFilter.value = currentAdvisor && [...managerAdvisorFilter.options].some((option) => option.value === currentAdvisor) ? currentAdvisor : "";
  managerAgencyFilter.value = currentAgency && [...managerAgencyFilter.options].some((option) => option.value === currentAgency) ? currentAgency : "";
}

function renderOptions() {
  renderOptionList("purchaseTypesList", "purchaseTypes");
  renderOptionList("sanitationTypesList", "sanitationTypes");
  renderOptionList("agenciesList", "agencies");
  renderCommercialAdvisors();
  renderStatusOptions();
  renderStatusFilters();
  renderFormAdministration();
  applyFormConfiguration();
}

function getFormFields(process) {
  state.formConfig = normalizeFormConfig(state.formConfig);
  return state.formConfig[process] || [];
}

function applyFormConfiguration() {
  applyBaseFormFields(form, getFormFields("compra"), "compra");
  applyBaseFormFields(saleContractForm, getFormFields("venta"), "venta");
  renderCustomFormFields("compra", purchaseCustomFields);
  renderCustomFormFields("venta", saleCustomFields);
}

function getBusinessOptionsForBaseField(process, field, formElement) {
  if (field.name === "agencia") return state.agencies;
  if (process === "compra" && field.name === "asesor") {
    const agency = formElement?.elements?.agencia?.value || (session.role === "commercial" ? session.agency : "");
    return getCommercialAdvisorsByAgency(agency).map((advisor) => advisor.name);
  }
  if (process === "compra" && field.name === "tipoCompra") return state.purchaseTypes;
  if (process === "compra" && field.name === "tipoSaneamiento") return state.sanitationTypes;
  return field.options || [];
}

function applyBaseFormFields(formElement, fields, process = "compra") {
  if (!formElement) return;
  fields.filter((field) => field.isBase).forEach((field) => {
    let control = formElement.elements[field.name];
    const label = control?.closest("label");
    if (!control || !label) return;
    label.hidden = field.visible === false;
    control = ensureBaseFieldControl(label, control, field);
    control.required = field.visible !== false && Boolean(field.required);
    if (control.tagName === "SELECT") {
      const current = control.value;
      const options = getBusinessOptionsForBaseField(process, field, formElement);
      const placeholder = process === "compra" && field.name === "asesor" && !formElement.elements.agencia?.value
        ? "Primero seleccione agencia"
        : "Seleccione una opcion";
      control.innerHTML = `<option value="">${placeholder}</option>${options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}`;
      control.value = current && [...control.options].some((option) => option.value === current) ? current : "";
    }
    if ("placeholder" in control) control.placeholder = field.placeholder || "";
    const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (textNode) textNode.nodeValue = `\n            ${field.label}\n            `;
  });
}

function ensureBaseFieldControl(label, control, field) {
  const currentValue = control.value || "";
  const attrs = {
    name: field.name,
    placeholder: field.placeholder || ""
  };
  const desiredTag = field.type === "select" ? "SELECT" : field.type === "textarea" ? "TEXTAREA" : "INPUT";
  const sameKind = control.tagName === desiredTag && (desiredTag !== "INPUT" || control.type === field.type);
  if (sameKind) return control;
  let next;
  if (field.type === "select") {
    next = document.createElement("select");
  } else if (field.type === "textarea") {
    next = document.createElement("textarea");
    next.rows = 3;
  } else {
    next = document.createElement("input");
    next.type = ["text", "number", "date", "email"].includes(field.type) ? field.type : "text";
  }
  next.name = attrs.name;
  if ("placeholder" in next) next.placeholder = attrs.placeholder;
  next.value = currentValue;
  if (control.id) next.id = control.id;
  if (control.className) next.className = control.className;
  if (control.getAttribute("autocomplete")) next.setAttribute("autocomplete", control.getAttribute("autocomplete"));
  if (control.getAttribute("inputmode")) next.setAttribute("inputmode", control.getAttribute("inputmode"));
  if (control.getAttribute("min")) next.setAttribute("min", control.getAttribute("min"));
  if (control.getAttribute("max")) next.setAttribute("max", control.getAttribute("max"));
  if (control.getAttribute("step")) next.setAttribute("step", control.getAttribute("step"));
  control.replaceWith(next);
  return next;
}

function renderCustomFormFields(process, container) {
  if (!container) return;
  const fields = getFormFields(process).filter((field) => !field.isBase && field.visible !== false);
  container.innerHTML = fields.map((field) => {
    const name = `custom__${field.id}`;
    const required = field.required ? "required" : "";
    const placeholder = field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : "";
    let control = `<input name="${escapeHtml(name)}" type="${escapeHtml(field.type === "select" || field.type === "textarea" ? "text" : field.type)}" ${placeholder} ${required}>`;
    if (field.type === "textarea") {
      control = `<textarea name="${escapeHtml(name)}" rows="3" ${placeholder} ${required}></textarea>`;
    } else if (field.type === "select") {
      control = `<select name="${escapeHtml(name)}" ${required}><option value="">Seleccione</option>${(field.options || []).map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}</select>`;
    }
    return `<label class="${field.type === "textarea" ? "span-2" : ""}">${escapeHtml(field.label)}${control}</label>`;
  }).join("");
}

function renderFormAdministration() {
  if (!adminFormFieldsList || !adminFormProcessSelect) return;
  const process = adminFormProcessSelect.value || "compra";
  adminFormFieldsList.innerHTML = getFormFields(process).map((field) => `
    <article class="form-builder-row" data-form-field="${escapeHtml(field.id)}" data-form-field-name="${escapeHtml(field.name)}" data-form-field-label="${escapeHtml(field.label)}">
      <div>
        <strong>${escapeHtml(field.label)}</strong>
        <span>${field.isBase ? "Pregunta base" : "Pregunta personalizada"} | Nombre tecnico: ${escapeHtml(field.name)}</span>
      </div>
      <input data-field-label value="${escapeHtml(field.label)}" aria-label="Etiqueta">
      <select data-field-type aria-label="Tipo de respuesta">
        ${renderFieldTypeOptions(field.type)}
      </select>
      <input data-field-placeholder value="${escapeHtml(field.placeholder || "")}" placeholder="Texto de ayuda" aria-label="Texto de ayuda">
      <input data-field-options value="${escapeHtml((field.options || []).join(", "))}" placeholder="Opciones de lista separadas por coma" aria-label="Opciones de lista">
      <label class="check-row"><input data-field-required type="checkbox" ${field.required ? "checked" : ""}> Obligatorio</label>
      <label class="check-row"><input data-field-visible type="checkbox" ${field.visible !== false ? "checked" : ""}> Visible</label>
      <button class="btn secondary" type="button" data-save-form-field>Guardar</button>
      ${field.isBase ? `<button class="btn danger" type="button" data-hide-base-field>Ocultar</button>` : `<button class="btn danger" type="button" data-delete-form-field>Eliminar</button>`}
    </article>
  `).join("");
}

function saveFormFieldConfiguration(row) {
  const process = adminFormProcessSelect?.value || "compra";
  const field = getFormFields(process).find((item) => item.id === row.dataset.formField);
  if (!field) return;
  field.label = row.querySelector("[data-field-label]").value.trim() || field.label;
  const requestedType = FORM_FIELD_TYPES.includes(row.querySelector("[data-field-type]").value) ? row.querySelector("[data-field-type]").value : "text";
  field.type = field.isBase ? getSafeBaseFieldType(process, field.name, requestedType) : requestedType;
  field.placeholder = row.querySelector("[data-field-placeholder]").value.trim();
  field.options = parseFormOptions(row.querySelector("[data-field-options]").value);
  field.required = row.querySelector("[data-field-required]").checked;
  field.visible = row.querySelector("[data-field-visible]").checked;
  saveState();
  renderAll();
  showToast("Campo actualizado.");
}

function hideBaseFormField(id) {
  const process = adminFormProcessSelect?.value || "compra";
  const field = getFormFields(process).find((item) => item.id === id);
  if (!field) return;
  if (!field.isBase) {
    deleteCustomFormField(id);
    return;
  }
  field.visible = false;
  saveState();
  renderAll();
  showToast("Pregunta base oculta en el formulario.");
}

function renderFieldTypeOptions(currentType = "text") {
  const labels = {
    text: "Texto corto",
    number: "Numero",
    date: "Fecha",
    email: "Correo",
    textarea: "Texto largo",
    select: "Lista de opciones"
  };
  return FORM_FIELD_TYPES.map((type) => `<option value="${type}" ${type === currentType ? "selected" : ""}>${labels[type] || type}</option>`).join("");
}

function deleteCustomFormField(id) {
  const process = adminFormProcessSelect?.value || "compra";
  const fields = getFormFields(process);
  const target = fields.find((field) => field.id === id) || {};
  const row = [...(adminFormFieldsList?.querySelectorAll("[data-form-field]") || [])].find((item) => item.dataset.formField === id);
  const targetName = target.name || row?.dataset.formFieldName || "";
  const targetLabel = target.label || row?.dataset.formFieldLabel || "";
  const normalizeFieldKey = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  const before = fields.length;
  state.formConfig[process] = fields.filter((field) => {
    if (field.isBase) return true;
    if (field.id === id) return false;
    if (targetName && field.name === targetName) return false;
    if (targetLabel && normalizeFieldKey(field.label) === normalizeFieldKey(targetLabel)) return false;
    return true;
  });
  const removed = before - state.formConfig[process].length;
  saveState();
  renderAll();
  guardarModulosSupabase();
  showToast(removed > 1 ? `${removed} campos personalizados eliminados.` : "Campo personalizado eliminado.");
}

function addCustomFormField(data) {
  const process = adminFormProcessSelect?.value || "compra";
  const label = String(data.label || "").trim();
  if (!label) return;
  const normalizeFieldKey = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  const normalizedLabel = normalizeFieldKey(label);
  const duplicated = getFormFields(process).some((field) =>
    normalizeFieldKey(field.label) === normalizedLabel ||
    normalizeFieldKey(field.name) === normalizedLabel
  );
  if (duplicated) {
    showToast("Ese campo ya existe. Edita la pregunta existente en lugar de duplicarla.");
    return;
  }
  getFormFields(process).push({
    id: crypto.randomUUID(),
    name: `custom_${Date.now()}`,
    label,
    type: FORM_FIELD_TYPES.includes(data.type) ? data.type : "text",
    required: data.required === "on",
    visible: true,
    isBase: false,
    placeholder: "",
    options: parseFormOptions(data.options)
  });
  saveState();
  renderAll();
  showToast("Campo agregado al formulario.");
}

function extractCustomFields(data, process) {
  return getFormFields(process).filter((field) => !field.isBase).reduce((result, field) => {
    const value = data[`custom__${field.id}`];
    if (value !== undefined && String(value).trim() !== "") {
      result[field.id] = { label: field.label, value: String(value).trim() };
    }
    return result;
  }, {});
}

function renderOptionList(containerId, key) {
  const container = document.querySelector(`#${containerId}`);
  container.innerHTML = "";

  state[key].forEach((value) => {
    const item = document.createElement("span");
    item.className = "option-item";
    item.innerHTML = `<span>${escapeHtml(value)}</span><button class="remove-option" type="button" aria-label="Eliminar ${escapeHtml(value)}">x</button>`;
    item.querySelector("button").addEventListener("click", () => removeOption(key, value));
    container.appendChild(item);
  });
}

function renderCommercialAdvisors() {
  const container = document.querySelector("#commercialAdvisorsList");
  container.innerHTML = "";
  state.commercialAdvisors.forEach((advisor) => {
    const item = document.createElement("span");
    item.className = "option-item";
    item.innerHTML = `<span>${escapeHtml(advisor.name)} <small>${escapeHtml(advisor.agency || "Sin agencia")} | Usuario: ${escapeHtml(advisor.username || "")}</small></span><input type="password" placeholder="Nueva contrasena"><button class="btn secondary change-password" type="button">Cambiar</button><button class="remove-option" type="button" aria-label="Eliminar ${escapeHtml(advisor.name)}">x</button>`;
    item.querySelector(".remove-option").addEventListener("click", () => removeCommercialAdvisor(advisor.id));
    item.querySelector(".change-password").addEventListener("click", () => {
      changePassword("commercialAdvisors", advisor.id, item.querySelector("input").value);
      item.querySelector("input").value = "";
    });
    container.appendChild(item);
  });
  initPasswordToggles(container);
}

function renderStatusOptions() {
  const container = document.querySelector("#statusOptionsList");
  container.innerHTML = "";
  state.statusOptions.forEach((status) => {
    const item = document.createElement("article");
    item.className = "option-item status-admin-item";
    item.dataset.statusOptionId = status.id;
    item.innerHTML = `
      <i style="background:${escapeHtml(status.color)}"></i>
      <input data-status-label value="${escapeHtml(status.label)}" aria-label="Nombre del estatus">
      <input data-status-color type="color" value="${escapeHtml(status.color || "#8d8d92")}" aria-label="Color del estatus ${escapeHtml(status.label)}">
      <label class="check-row"><input data-status-closes type="checkbox" ${status.closes ? "checked" : ""}> Cierra tarea</label>
      <button class="btn secondary tiny" type="button" data-save-status-option>Guardar</button>
      ${status.isDefault ? "" : `<button class="remove-option" type="button" aria-label="Eliminar ${escapeHtml(status.label)}">x</button>`}
    `;
    item.querySelector("[data-status-color]")?.addEventListener("input", (event) => {
      item.querySelector("i").style.background = event.target.value;
    });
    item.querySelector("[data-save-status-option]")?.addEventListener("click", () => updateStatusOption(status.id, item));
    const button = item.querySelector(".remove-option");
    if (button) button.addEventListener("click", () => removeStatusOption(status.id));
    container.appendChild(item);
  });
}

function renderStatusFilters() {
  statusFilterButtons.innerHTML = `<button class="chip ${activeFilter === "todos" ? "is-active" : ""}" data-filter="todos">Todos</button>`;
  state.statusOptions.forEach((status) => {
    const button = document.createElement("button");
    button.className = `chip ${activeFilter === status.value ? "is-active" : ""}`;
    button.dataset.filter = status.value;
    button.type = "button";
    button.textContent = status.label;
    statusFilterButtons.appendChild(button);
  });

  statusFilterButtons.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderTasks();
      renderStatusFilters();
    });
  });
}

function addOption(key, value) {
  const cleanValue = value.trim();
  if (!cleanValue) return;

  const exists = state[key].some((item) => item.toLowerCase() === cleanValue.toLowerCase());
  if (exists) {
    showToast("Esa opcion ya existe.");
    return;
  }

  state[key].push(cleanValue);
  saveState();
  renderAll();
  showToast("Opcion agregada.");
}

function removeOption(key, value) {
  state[key] = state[key].filter((item) => item !== value);
  if (key === "agencies") {
    state.commercialAdvisors = state.commercialAdvisors.filter((advisor) => advisor.agency !== value);
  }
  saveState();
  renderAll();
  showToast("Opcion eliminada.");
}

function addStatusOption(data) {
  const label = data.label.trim();
  if (!label) return;
  const value = normalizeStatusValue(label);
  const exists = state.statusOptions.some((status) => status.value === value);
  if (exists) {
    showToast("Ese estatus ya existe.");
    return;
  }
  state.statusOptions.push({
    id: crypto.randomUUID(),
    label,
    value,
    color: data.color || "#8d8d92",
    closes: data.closes === "on",
    isDefault: false
  });
  saveState();
  renderAll();
  showToast("Estatus agregado.");
}

function updateStatusOption(id, row) {
  const status = state.statusOptions.find((item) => item.id === id);
  if (!status || !row) return;
  const oldValue = status.value;
  const label = row.querySelector("[data-status-label]")?.value.trim() || status.label;
  const value = normalizeStatusValue(label);
  const duplicated = state.statusOptions.some((item) => item.id !== id && item.value === value);
  if (duplicated) {
    showToast("Ya existe otro estatus con ese nombre.");
    return;
  }
  status.label = label;
  status.value = value;
  status.color = row.querySelector("[data-status-color]")?.value || status.color || "#8d8d92";
  status.closes = Boolean(row.querySelector("[data-status-closes]")?.checked);
  if (oldValue !== value) {
    state.tasks.forEach((task) => {
      if (normalizeStatusValue(task.status) === oldValue) {
        task.status = value;
        task.updatedAt = new Date().toISOString();
        task.syncStatus = "pending";
        task.syncAction = "actualizar-estatus-admin";
      }
    });
    if (activeFilter === oldValue) activeFilter = value;
  }
  saveState();
  renderAll();
  guardarModulosSupabase();
  const changedTasks = state.tasks.filter((task) => task.syncAction === "actualizar-estatus-admin");
  changedTasks.slice(0, 30).forEach((task) => guardarTareaSupabase(task, "actualizar-estatus-admin"));
  showToast("Estatus actualizado.");
}

function removeStatusOption(id) {
  const status = state.statusOptions.find((item) => item.id === id);
  if (!status || status.isDefault) return;
  state.statusOptions = state.statusOptions.filter((item) => item.id !== id);
  state.tasks.forEach((task) => {
    if (task.status === status.value) {
      task.status = "pendiente";
      task.completedAt = "";
    }
  });
  if (activeFilter === status.value) activeFilter = "todos";
  saveState();
  renderAll();
  showToast("Estatus eliminado.");
}

function addCommercialAdvisor(data) {
  const name = data.name.trim();
  const agency = data.agency.trim();
  const username = data.username.trim();
  const password = cleanPasswordValue(data.password);
  if (!name || !agency || !username || !password) return;

  const exists = state.commercialAdvisors.some((advisor) =>
    advisor.username?.toLowerCase() === username.toLowerCase()
  );
  if (exists) {
    showToast("Ese usuario comercial ya existe.");
    return;
  }

  state.commercialAdvisors.push({ id: crypto.randomUUID(), name, agency, username, password });
  saveState();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Asesor comercial agregado.");
}

function removeCommercialAdvisor(id) {
  state.commercialAdvisors = state.commercialAdvisors.filter((advisor) => advisor.id !== id);
  saveState();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Asesor comercial eliminado.");
}

function getAnnouncementUserOptions() {
  const commercial = normalizeCommercialAdvisors(state.commercialAdvisors || []).map((user) => ({
    key: `commercial:${user.id}`,
    role: "commercial",
    label: `${user.name} | Comercial`,
    agency: user.agency || ""
  }));
  const legal = normalizeLegalUsers(state.legalUsers || []).map((user) => ({
    key: `legal:${user.id}`,
    role: "legal",
    label: `${user.name} | Mesa de control`,
    agency: (user.mailboxes || []).join(", ")
  }));
  return [...commercial, ...legal].sort((a, b) => a.label.localeCompare(b.label, "es"));
}

function getAnnouncementTargetKey(currentSession = session) {
  if (!currentSession || !["commercial", "legal"].includes(currentSession.role)) return "";
  return `${currentSession.role}:${currentSession.userId}`;
}

function isAnnouncementForSession(announcement = {}, currentSession = session) {
  const item = normalizeAnnouncement(announcement);
  if (!item.popupEnabled || !currentSession || currentSession.role === "public") return false;
  if (currentSession.role === "admin") return item.audience === "all";
  if (item.audience === "all") return ["commercial", "legal"].includes(currentSession.role);
  if (item.audience === currentSession.role) return true;
  if (item.audience === "specific") return item.targetUsers.includes(getAnnouncementTargetKey(currentSession));
  return false;
}

function renderUserTargetSelector(container, searchInput, audienceSelect, inputName) {
  if (!container || !audienceSelect) return;
  const showSpecific = audienceSelect.value === "specific";
  container.hidden = !showSpecific;
  if (searchInput) searchInput.hidden = !showSpecific;
  if (!showSpecific) {
    container.innerHTML = "";
    return;
  }
  const selected = new Set([...container.querySelectorAll(`input[name='${inputName}']:checked`)].map((input) => input.value));
  const term = normalizeSearchText(searchInput?.value || "");
  const options = getAnnouncementUserOptions().filter((item) =>
    !term || normalizeSearchText(`${item.label} ${item.agency} ${item.key}`).includes(term)
  );
  container.innerHTML = options.length ? options.map((item) => `
    <label class="announcement-recipient-chip">
      <input type="checkbox" name="${escapeHtml(inputName)}" value="${escapeHtml(item.key)}" ${selected.has(item.key) ? "checked" : ""}>
      <span>${escapeHtml(item.label.replace(" | ", " · "))}</span>
      <small>${escapeHtml(item.agency || item.role)}</small>
    </label>
  `).join("") : `<div class="empty compact-empty">Sin coincidencias.</div>`;
}

function renderAnnouncementRecipients() {
  renderUserTargetSelector(announcementRecipients, announcementRecipientSearch, announcementAudience, "targetUsers");
}

function renderForceLogoutRecipients() {
  renderUserTargetSelector(forceLogoutRecipients, forceLogoutRecipientSearch, forceLogoutAudience, "forceTargetUsers");
}

function getAnnouncementFormTargets(formElement) {
  const audience = formElement.elements.audience?.value || "all";
  const targetUsers = audience === "specific"
    ? [...formElement.querySelectorAll("input[name='targetUsers']:checked")].map((input) => input.value)
    : [];
  return { audience, targetUsers };
}

function getForceLogoutTargets() {
  const audience = forceLogoutAudience?.value || "all";
  const targetUsers = audience === "specific"
    ? [...document.querySelectorAll("input[name='forceTargetUsers']:checked")].map((input) => input.value)
    : [];
  return { audience, targetUsers };
}

function createForceLogoutRequest() {
  if (session.role !== "admin") return;
  const targets = getForceLogoutTargets();
  if (targets.audience === "specific" && !targets.targetUsers.length) {
    showToast("Selecciona al menos un usuario para cerrar sesion.");
    return;
  }
  const request = normalizeForceLogoutRequest({
    id: crypto.randomUUID(),
    audience: targets.audience,
    targetUsers: targets.targetUsers,
    message: forceLogoutMessage?.value?.trim() || "El administrador cerro tu sesion para aplicar un comunicado urgente.",
    createdAt: new Date().toISOString(),
    createdBy: session.name || "Administrador"
  });
  state.forceLogoutRequests = [request, ...(state.forceLogoutRequests || [])].slice(0, 80);
  saveState();
  guardarModulosSupabase();
  renderAll();
  showToast("Orden de cierre de sesion enviada.");
}

function isForceLogoutForSession(request = {}, currentSession = session) {
  const item = normalizeForceLogoutRequest(request);
  if (!currentSession || currentSession.role === "public" || currentSession.role === "admin") return false;
  if (!["commercial", "legal", "manager", "processing"].includes(currentSession.role)) return false;
  const loginAt = new Date(currentSession.loginAt || currentSession.savedAt || 0).getTime();
  const requestAt = new Date(item.createdAt).getTime();
  if (!requestAt || loginAt >= requestAt) return false;
  if (item.audience === "all") return true;
  if (item.audience === currentSession.role) return true;
  if (item.audience === "specific") return item.targetUsers.includes(getAnnouncementTargetKey(currentSession));
  return false;
}

function getForceLogoutAckSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(FORCE_LOGOUT_ACK_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveForceLogoutAckSet(set) {
  localStorage.setItem(FORCE_LOGOUT_ACK_KEY, JSON.stringify([...set].slice(-120)));
}

function checkForcedLogoutRequests() {
  if (!session || session.role === "public" || session.role === "admin") return;
  const ack = getForceLogoutAckSet();
  const request = (state.forceLogoutRequests || [])
    .map(normalizeForceLogoutRequest)
    .find((item) => !ack.has(item.id) && isForceLogoutForSession(item, session));
  if (!request) return;
  ack.add(request.id);
  saveForceLogoutAckSet(ack);
  showToast(request.message || "Sesion cerrada por administracion.");
  setSession(getPublicSession());
  setView("acceso");
}

function addAnnouncement(data, imageDataUrl = "") {
  const targets = getAnnouncementFormTargets(announcementForm);
  state.announcements.unshift(normalizeAnnouncement({
    id: crypto.randomUUID(),
    title: data.title.trim(),
    body: data.body.trim(),
    imageDataUrl,
    popupEnabled: data.popupEnabled === "on",
    audience: targets.audience,
    targetUsers: targets.targetUsers,
    createdAt: new Date().toISOString()
  }));
  saveState();
  renderAll();
  showToast("Comunicado publicado.");
}

function removeAnnouncement(id) {
  const announcement = (state.announcements || []).find((item) => item.id === id);
  state.announcementDeletions = [
    normalizeAnnouncementDeletion({
      announcementId: id,
      deletedAt: new Date().toISOString(),
      deletedBy: session?.name || "Administrador"
    }),
    ...(state.announcementDeletions || [])
  ].filter((item, index, arr) => arr.findIndex((other) => other.announcementId === item.announcementId) === index).slice(0, 200);
  state.announcements = state.announcements.filter((announcement) => announcement.id !== id);
  saveState();
  guardarModulosSupabase();
  renderAll();
  showToast(`Comunicado eliminado${announcement?.title ? `: ${announcement.title}` : ""}.`);
}

function createUser(data) {
  const username = data.username.trim();
  const password = cleanPasswordValue(data.password);
  const mailboxes = normalizeLegalMailboxes(data.mailboxes);
  const exists = state.legalUsers.some((user) => user.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    showToast("Ese usuario ya existe.");
    return;
  }

  state.legalUsers.push({
    id: crypto.randomUUID(),
    name: data.name.trim(),
    username,
    password,
    mailboxes,
    legalAvailable: true
  });
  saveState();
  autoAssignOpenSaneamientos();
  sincronizarTareasPendientesSupabase();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Usuario creado.");
}

function removeUser(id) {
  if (state.legalUsers.length === 1) {
    showToast("Debe quedar al menos un asistente legal.");
    return;
  }

  state.tasks = (state.tasks || []).map((task) => {
    if (task.legalUserId !== id || isClosedStatus(task.status)) return task;
    return {
      ...task,
      legalUserId: "",
      legalAdvisor: "",
      takenAt: "",
      status: ["contratos", "cuv", "firmas"].includes(getTaskMailbox(task)) ? "por asignar" : "pendiente",
      updatedAt: new Date().toISOString(),
      syncStatus: "pending",
      syncAction: "reasignar-usuario-eliminado"
    };
  });
  state.legalUsers = state.legalUsers.filter((user) => user.id !== id);
  saveState();
  autoAssignOpenSaneamientos();
  sincronizarTareasPendientesSupabase();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Usuario eliminado.");
}

function renderUsers() {
  const container = document.querySelector("#usersList");
  container.innerHTML = "";

  state.legalUsers = normalizeLegalUsers(state.legalUsers || []);
  state.legalUsers.forEach((user) => {
    const mailboxes = normalizeLegalMailboxes(user.mailboxes);
    const item = document.createElement("article");
    item.className = "user-row";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(user.name)}</strong>
        <span>Usuario: ${escapeHtml(user.username)}</span>
        <small>Buzones: ${mailboxes.map((mailbox) => LEGAL_MAILBOXES.find((entry) => entry.id === mailbox)?.label || mailbox).join(", ")}</small>
        <small class="availability-badge ${user.legalAvailable === false ? "is-off" : "is-on"}">${user.legalAvailable === false ? "No disponible para nuevas tareas" : "Disponible para nuevas tareas"}</small>
      </div>
      <div class="row-actions">
        <div class="mailbox-picker is-inline">
          ${LEGAL_MAILBOXES.map((mailbox) => `
            <label>
              <input type="checkbox" value="${escapeHtml(mailbox.id)}" ${mailboxes.includes(mailbox.id) ? "checked" : ""}>
              ${escapeHtml(mailbox.label)}
            </label>
          `).join("")}
        </div>
        <button class="btn secondary save-mailboxes" type="button">Guardar buzones</button>
        <button class="btn secondary toggle-legal-availability" type="button">${user.legalAvailable === false ? "Poner disponible" : "Marcar no disponible"}</button>
        <input type="password" placeholder="Nueva contrasena">
        <button class="btn secondary change-password" type="button">Cambiar</button>
        <button class="btn secondary delete-user" type="button">Eliminar</button>
      </div>
    `;
    item.querySelector(".delete-user").addEventListener("click", () => removeUser(user.id));
    item.querySelector(".change-password").addEventListener("click", () => {
      const passwordInput = item.querySelector("input[type='password']");
      changePassword("legalUsers", user.id, passwordInput.value);
      passwordInput.value = "";
    });
    item.querySelector(".save-mailboxes").addEventListener("click", () => {
      const selected = [...item.querySelectorAll(".mailbox-picker input:checked")].map((input) => input.value);
      updateLegalUserMailboxes(user.id, selected);
    });
    item.querySelector(".toggle-legal-availability").addEventListener("click", () => {
      setLegalUserAvailability(user.id, user.legalAvailable === false);
    });
    container.appendChild(item);
  });
  initPasswordToggles(container);
}

function setLegalUserAvailability(id, available) {
  const user = state.legalUsers.find((item) => item.id === id);
  if (!user) return;
  user.legalAvailable = Boolean(available);
  saveState();
  if (user.legalAvailable !== false) autoAssignOpenSaneamientos();
  sincronizarTareasPendientesSupabase();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast(user.legalAvailable === false
    ? "Asesor marcado como no disponible. No recibira nuevas tareas."
    : "Asesor marcado como disponible. Puede recibir nuevas tareas."
  );
}

function updateLegalUserMailboxes(id, mailboxes) {
  const user = state.legalUsers.find((item) => item.id === id);
  if (!user) return;
  const nextMailboxes = normalizeLegalMailboxes(mailboxes);
  user.mailboxes = nextMailboxes;
  state.tasks = (state.tasks || []).map((task) => {
    if (task.legalUserId !== id || isClosedStatus(task.status) || nextMailboxes.includes(getTaskMailbox(task))) return task;
    return {
      ...task,
      legalUserId: "",
      legalAdvisor: "",
      takenAt: "",
      status: ["contratos", "cuv", "firmas"].includes(getTaskMailbox(task)) ? "por asignar" : "pendiente",
      updatedAt: new Date().toISOString(),
      syncStatus: "pending",
      syncAction: "reasignar-buzon"
    };
  });
  saveState();
  autoAssignOpenSaneamientos();
  sincronizarTareasPendientesSupabase();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Buzones del asistente actualizados.");
}

function normalizeLegalChatMessages(messages = []) {
  return (Array.isArray(messages) ? messages : [])
    .filter((message) => message && (message.text || message.message))
    .map((message) => ({
      id: message.id || crypto.randomUUID(),
      text: String(message.text || message.message || "").trim().slice(0, 280),
      userId: message.userId || "",
      userName: message.userName || message.author || "Mesa de control",
      recipientUserId: message.recipientUserId || "",
      recipientUserName: message.recipientUserName || "",
      conversationKey: message.conversationKey || buildLegalChatConversationKey(message.userId || "", message.recipientUserId || ""),
      createdAt: message.createdAt || new Date().toISOString(),
      updatedAt: message.updatedAt || message.createdAt || new Date().toISOString(),
      deleted: Boolean(message.deleted),
      deletedAt: message.deletedAt || "",
      deletedBy: message.deletedBy || ""
    }))
    .filter((message) => message.text)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-240);
}

function mergeLegalChatMessages(local = [], remote = []) {
  const map = new Map();
  [...normalizeLegalChatMessages(local), ...normalizeLegalChatMessages(remote)].forEach((message) => {
    const existing = map.get(message.id);
    if (!existing || new Date(message.updatedAt || message.createdAt) >= new Date(existing.updatedAt || existing.createdAt)) {
      map.set(message.id, message);
    }
  });
  return [...map.values()]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-240);
}

function getCurrentChatUser() {
  if (session.role === "legal") {
    return { id: session.userId || "", name: session.name || "Asistente legal", role: "legal" };
  }
  if (session.role === "commercial") {
    return { id: `commercial:${session.userId || ""}`, name: session.name || "Asesor comercial", role: "commercial" };
  }
  if (session.role === "admin") {
    return { id: "admin", name: "Administrador", role: "admin" };
  }
  return { id: "", name: "", role: session.role || "public" };
}

function getLegalChatUsers() {
  const legalUsers = normalizeLegalUsers(state.legalUsers || []).map((user) => ({
    id: user.id,
    name: user.name,
    role: "legal",
    label: "Mesa de control",
    searchText: `${user.name} mesa control legal ${user.mailbox || ""}`
  }));
  const commercialUsers = normalizeCommercialAdvisors(state.commercialAdvisors || []).map((advisor) => ({
    id: `commercial:${advisor.id}`,
    name: advisor.name,
    role: "commercial",
    label: advisor.agency ? `Asesor comercial | ${advisor.agency}` : "Asesor comercial",
    searchText: `${advisor.name} asesor comercial ${advisor.agency || ""}`
  }));
  return [
    { id: "admin", name: "Administrador", role: "admin", label: "Administrador", searchText: "administrador admin" },
    ...legalUsers,
    ...commercialUsers
  ].sort((a, b) => {
    const order = { admin: 0, legal: 1, commercial: 2 };
    return (order[a.role] ?? 9) - (order[b.role] ?? 9) || a.name.localeCompare(b.name);
  });
}

function buildLegalChatConversationKey(userA = "", userB = "") {
  return [String(userA || ""), String(userB || "")].sort().join("::");
}

function getSelectedLegalChatRecipient() {
  const current = getCurrentChatUser();
  const users = getLegalChatUsers().filter((user) => user.id !== current.id);
  const selectedId = legalChatRecipientSelect?.value || "";
  return users.find((user) => user.id === selectedId) || users[0] || null;
}

function renderLegalChatRecipients() {
  if (!legalChatRecipientSelect) return;
  const current = getCurrentChatUser();
  const search = (legalChatRecipientSearch?.value || "").trim().toLowerCase();
  const previous = legalChatRecipientSelect.value;
  const users = getLegalChatUsers()
    .filter((user) => user.id !== current.id)
    .filter((user) => !search || `${user.searchText || user.name} ${user.role}`.toLowerCase().includes(search));
  legalChatRecipientSelect.innerHTML = users.length
    ? users.map((user) => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)} | ${escapeHtml(user.label || user.role)}</option>`).join("")
    : `<option value="">Sin usuarios</option>`;
  legalChatRecipientSelect.value = users.some((user) => user.id === previous) ? previous : users[0]?.id || "";
}

function deleteLegalChatMessage(id) {
  const message = (state.legalChatMessages || []).find((item) => item.id === id);
  if (!message) return;
  const current = getCurrentChatUser();
  const canDelete = session.role === "admin" || message.userId === current.id;
  if (!canDelete) {
    showToast("Solo puede eliminar sus mensajes. El administrador puede borrar cualquier mensaje.");
    return;
  }
  message.deleted = true;
  message.deletedAt = new Date().toISOString();
  message.deletedBy = current.name || session.role || "Sistema";
  message.updatedAt = message.deletedAt;
  saveState();
  scheduleSupabaseModuleSync();
  renderLegalChat();
  showToast("Mensaje eliminado.");
}

function renderLegalAvailability() {
  const user = currentLegalUser();
  if (!legalAvailabilityStatus || !legalAvailabilityToggle) return;
  if (session.role !== "legal" || !user) {
    legalAvailabilityStatus.textContent = session.role === "admin" ? "Vista administrador" : "Sin sesion legal";
    legalAvailabilityToggle.hidden = true;
    return;
  }
  const available = user.legalAvailable !== false;
  legalAvailabilityToggle.hidden = false;
  legalAvailabilityStatus.textContent = available ? "Disponible para recibir saneamientos" : "No disponible";
  legalAvailabilityStatus.className = available ? "is-available" : "is-unavailable";
  legalAvailabilityToggle.textContent = available ? "Ponerme no disponible" : "Ponerme disponible";
  legalAvailabilityToggle.classList.toggle("danger-soft", available);
}

function renderLegalChat() {
  if (!legalChatList) return;
  state.legalChatMessages = normalizeLegalChatMessages(state.legalChatMessages || []);
  if (!canOpenTasks()) {
    legalChatList.innerHTML = `<div class="empty compact-empty">Ingrese como mesa de control para ver el chat.</div>`;
    return;
  }
  renderLegalChatRecipients();
  const current = getCurrentChatUser();
  const recipient = getSelectedLegalChatRecipient();
  if (!recipient) {
    legalChatList.innerHTML = `<div class="empty compact-empty">No hay usuarios disponibles para chatear.</div>`;
    return;
  }
  const conversationKey = buildLegalChatConversationKey(current.id, recipient.id);
  const previousConversationKey = legalChatList.dataset.conversationKey || "";
  const wasNearBottom = !previousConversationKey ||
    previousConversationKey !== conversationKey ||
    (legalChatList.scrollHeight - legalChatList.scrollTop - legalChatList.clientHeight < 96);
  const messages = state.legalChatMessages
    .filter((message) => !message.deleted)
    .filter((message) => message.conversationKey === conversationKey)
    .slice(-80);
  if (!messages.length) {
    legalChatList.innerHTML = `<div class="empty compact-empty">Aun no hay mensajes con ${escapeHtml(recipient.name)}.</div>`;
    return;
  }
  legalChatList.dataset.conversationKey = conversationKey;
  legalChatList.innerHTML = messages.map((message) => {
    const mine = message.userId === current.id;
    const canDelete = session.role === "admin" || mine;
    const author = message.userName || "Mesa de control";
    const initials = author.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "MC";
    return `
      <article class="legal-chat-message ${mine ? "is-mine" : ""}" data-chat-message="${escapeHtml(message.id)}">
        <span class="chat-avatar">${escapeHtml(initials)}</span>
        <div class="chat-bubble">
          <div class="chat-meta">
            <strong>${escapeHtml(author)}</strong>
            <span>${formatDateTime(message.createdAt)}</span>
          </div>
          <p>${escapeHtml(message.text)}</p>
          ${canDelete ? `<button class="chat-delete-btn" type="button" data-delete-chat-message="${escapeHtml(message.id)}">Eliminar</button>` : ""}
        </div>
      </article>
    `;
  }).join("");
  if (wasNearBottom) {
    legalChatList.scrollTop = legalChatList.scrollHeight;
  }
}

function setLegalChatOpen(open) {
  if (!legalChatPanel) return;
  legalChatPanel.hidden = !open;
  document.body.classList.toggle("legal-chat-is-open", Boolean(open));
}

function sendLegalChatMessage(text) {
  if (!canOpenTasks()) return;
  const clean = String(text || "").trim();
  if (!clean) return;
  const current = getCurrentChatUser();
  const recipient = getSelectedLegalChatRecipient();
  if (!recipient) {
    showToast("Seleccione un usuario para enviar el mensaje.");
    return;
  }
  const now = new Date().toISOString();
  state.legalChatMessages = normalizeLegalChatMessages([
    ...(state.legalChatMessages || []),
    {
      id: crypto.randomUUID(),
      text: clean,
      userId: current.id,
      userName: current.name,
      recipientUserId: recipient.id,
      recipientUserName: recipient.name,
      conversationKey: buildLegalChatConversationKey(current.id, recipient.id),
      createdAt: now,
      updatedAt: now
    }
  ]);
  saveState();
  scheduleSupabaseModuleSync();
  renderLegalChat();
}

function toggleLegalAvailability() {
  const user = currentLegalUser();
  if (!user) return;
  user.legalAvailable = user.legalAvailable === false;
  saveState();
  if (user.legalAvailable !== false) autoAssignOpenSaneamientos();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast(user.legalAvailable === false
    ? "Quedaste no disponible. No se te asignaran nuevos saneamientos."
    : "Quedaste disponible. Podras recibir nuevos saneamientos."
  );
}

function changePassword(collection, id, password) {
  const cleanPassword = cleanPasswordValue(password);
  if (!cleanPassword) {
    showToast("Ingrese una nueva contrasena.");
    return;
  }
  const user = state[collection].find((item) => item.id === id);
  if (!user) return;
  user.password = cleanPassword;
  saveState();
  guardarUsuariosSupabaseAhora().then((ok) => {
    if (!ok) showToast("Clave guardada en este equipo. Supabase no esta disponible para compartirla todavia.");
  });
  showToast("Contrasena actualizada.");
}

function createManagerUser(data) {
  const username = data.username.trim();
  const password = cleanPasswordValue(data.password);
  const exists = state.managerUsers.some((user) => user.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    showToast("Ese usuario gerencial ya existe.");
    return;
  }
  state.managerUsers.push({
    id: crypto.randomUUID(),
    name: data.name.trim(),
    username,
    password
  });
  saveState();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Usuario gerencial creado.");
}

function removeManagerUser(id) {
  if (state.managerUsers.length === 1) {
    showToast("Debe quedar al menos un gerente.");
    return;
  }
  state.managerUsers = state.managerUsers.filter((user) => user.id !== id);
  saveState();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Usuario gerencial eliminado.");
}

function renderManagerUsers() {
  const container = document.querySelector("#managerUsersList");
  if (!container) return;
  container.innerHTML = "";
  state.managerUsers.forEach((user) => {
    const item = document.createElement("article");
    item.className = "user-row";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(user.name)}</strong>
        <span>Usuario: ${escapeHtml(user.username)}</span>
      </div>
      <div class="row-actions">
        <input type="password" placeholder="Nueva contrasena">
        <button class="btn secondary change-password" type="button">Cambiar</button>
        <button class="btn secondary delete-user" type="button">Eliminar</button>
      </div>
    `;
    item.querySelector(".delete-user").addEventListener("click", () => removeManagerUser(user.id));
    item.querySelector(".change-password").addEventListener("click", () => {
      changePassword("managerUsers", user.id, item.querySelector("input").value);
      item.querySelector("input").value = "";
    });
    container.appendChild(item);
  });
}

function createProcessingUser(data) {
  const name = String(data.name || "").trim();
  const username = String(data.username || "").trim();
  const password = cleanPasswordValue(data.password);
  if (!name || !username || !password) {
    showToast("Complete nombre, usuario y contrasena para crear el usuario de datos.");
    return;
  }
  state.processingUsers = Array.isArray(state.processingUsers) && state.processingUsers.length
    ? state.processingUsers
    : structuredClone(defaultState.processingUsers);
  const exists = state.processingUsers.some((user) => user.username?.toLowerCase() === username.toLowerCase());
  if (exists) {
    showToast("Ese usuario de procesamiento ya existe.");
    return;
  }
  state.processingUsers.push({
    id: crypto.randomUUID(),
    name,
    username,
    password
  });
  saveState();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Usuario de procesamiento creado.");
}

function removeProcessingUser(id) {
  state.processingUsers = Array.isArray(state.processingUsers) ? state.processingUsers : [];
  if (state.processingUsers.length === 1) {
    showToast("Debe quedar al menos un usuario de procesamiento.");
    return;
  }
  state.processingUsers = state.processingUsers.filter((user) => user.id !== id);
  if (session.role === "processing" && session.userId === id) {
    setSession(getPublicSession());
    setView("acceso");
  }
  saveState();
  guardarUsuariosSupabaseAhora();
  renderAll();
  showToast("Usuario de procesamiento eliminado.");
}

function renderProcessingUsers() {
  const container = document.querySelector("#processingUsersList");
  if (!container) return;
  container.innerHTML = "";
  state.processingUsers = Array.isArray(state.processingUsers) && state.processingUsers.length
    ? state.processingUsers
    : structuredClone(defaultState.processingUsers);
  state.processingUsers.forEach((user) => {
    const item = document.createElement("article");
    item.className = "user-row";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(user.name)}</strong>
        <span>Usuario: ${escapeHtml(user.username)}</span>
        <small>Acceso: Procesamiento de datos, proveedores, compras, contratos y archivos.</small>
      </div>
      <div class="row-actions">
        <input type="password" placeholder="Nueva contrasena">
        <button class="btn secondary change-password" type="button">Cambiar</button>
        <button class="btn secondary delete-user" type="button">Eliminar</button>
      </div>
    `;
    item.querySelector(".delete-user").addEventListener("click", () => removeProcessingUser(user.id));
    item.querySelector(".change-password").addEventListener("click", () => {
      changePassword("processingUsers", user.id, item.querySelector("input").value);
      item.querySelector("input").value = "";
    });
    container.appendChild(item);
  });
  initPasswordToggles(container);
}

async function createTask(data) {
  const duplicateWarnings = getDuplicateWarnings(data);
  const createdAt = new Date().toISOString();
  const commercialOwner = session.role === "commercial"
    ? { id: session.userId, name: session.name, agency: session.agency }
    : state.commercialAdvisors.find((advisor) => advisor.name === data.asesor && advisor.agency === data.agencia) || { id: "", name: data.asesor, agency: data.agencia };

  const task = {
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
    takenAt: "",
    completedAt: "",
    status: "pendiente",
    legalUserId: "",
    legalAdvisor: "",
    duplicateWarnings,
    ...data,
    processType: "compra",
    customFields: extractCustomFields(data, "compra"),
    commercialUserId: commercialOwner.id,
    commercialUserName: commercialOwner.name,
    commercialAgency: commercialOwner.agency,
    agencyAdvisorKey: `${data.agencia}::${data.asesor}`,
    placa: normalizePlate(data.placa),
    cedula: normalizeId(data.cedula),
    syncStatus: "pending"
  };

  autoAssignSaneamientoTask(task);
  state.tasks.push(task);

  saveState();
  renderAll();
  if (duplicateWarnings.length) {
    showToast(duplicateWarnings[0]);
  } else {
    showToast("Solicitud creada. Guardando en linea...");
  }
  const onlineSaved = await guardarTareaSupabase(task, "crear");
  saveState();
  renderAll();
  showToast(onlineSaved
    ? "Solicitud guardada en linea y enviada a mesa de control."
    : "Solicitud guardada en este equipo. Quedo pendiente de sincronizar con Supabase."
  );
}

async function createSaleContractTask(data) {
  const createdAt = new Date().toISOString();
  const commercialOwner = session.role === "commercial"
    ? { id: session.userId, name: session.name, agency: session.agency }
    : { id: "", name: "", agency: data.agencia };
  const task = {
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
    takenAt: "",
    completedAt: "",
    status: "por asignar",
    legalUserId: "",
    legalAdvisor: "",
    processType: "venta",
    tipoSaneamiento: "Tracking contrato compraventa",
    tipoCompra: "Venta",
    cliente: normalizeLooseText(data.vendedor),
    vendedor: normalizeLooseText(data.vendedor),
    placa: normalizePlate(data.placa),
    agencia: data.agencia,
    asesor: commercialOwner.name || session.name || "",
    cedula: normalizeId(data.cedulaVendedor),
    cedulaVendedor: normalizeId(data.cedulaVendedor),
    precioContrato: String(data.precioContrato || "").trim(),
    direccion: normalizeLooseText(data.direccion),
    telefono: String(data.telefono || "").trim(),
    correo: String(data.correo || "").trim().toLowerCase(),
    ciudad: "",
    valorToma: data.precioContrato,
    customFields: extractCustomFields(data, "venta"),
    kilometraje: "",
    observaciones: `CONTRATO COMPRAVENTA | Vendedor: ${normalizeLooseText(data.vendedor)} | Direccion: ${normalizeLooseText(data.direccion)} | Telefono: ${String(data.telefono || "").trim()} | Correo: ${String(data.correo || "").trim().toLowerCase()}`,
    duplicateWarnings: getDuplicateWarnings({ placa: data.placa, cedula: data.cedulaVendedor }),
    commercialUserId: commercialOwner.id,
    commercialUserName: commercialOwner.name,
    commercialAgency: commercialOwner.agency || data.agencia,
    agencyAdvisorKey: `${data.agencia}::${commercialOwner.name || ""}`,
    syncStatus: "pending"
  };

  state.tasks.push(task);
  saveState();
  renderAll();
  showToast("Contrato de compraventa creado. Guardando en linea...");
  const onlineSaved = await guardarTareaSupabase(task, "crear-venta");
  saveState();
  renderAll();
  showToast(onlineSaved
    ? "Contrato enviado a mesa de control con estatus Por asignar."
    : "Contrato guardado en este equipo. Quedo pendiente de sincronizar con Supabase."
  );
}

function getDuplicateWarnings(data, excludeId = "") {
  return getDuplicateConflicts(data, excludeId).map((conflict) => {
    const task = conflict.task || {};
    const advisor = task.commercialUserName || task.asesor || "otro asesor";
    const date = task.createdAt ? formatDateTime(task.createdAt) : "fecha no registrada";
    return `${conflict.reason}. Ya existe una solicitud de ${advisor} registrada el ${date}.`;
  });
}

function updateDuplicatePreview() {
  const data = Object.fromEntries(new FormData(form).entries());
  const conflicts = getDuplicateConflicts(data);
  duplicateAlert.hidden = !conflicts.length;
  duplicateAlert.innerHTML = conflicts.slice(0, 2).map((conflict) => {
    const task = conflict.task || {};
    const advisor = task.commercialUserName || task.asesor || "otro asesor";
    const date = task.createdAt ? formatDateTime(task.createdAt) : "fecha no registrada";
    return `<strong>${escapeHtml(conflict.reason)}</strong><span>Solicitado por ${escapeHtml(advisor)} el ${escapeHtml(date)}. Valor: ${escapeHtml(task.valorToma || task.precioContrato || "sin valor")}.</span>`;
  }).join("");
}

function normalizePlate(value = "") {
  return String(value).trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeProviderPlateValue(value = "") {
  const raw = String(value ?? "").trim();
  const compact = normalizePlate(raw);
  return /^[A-Z]{3}[0-9]{3,4}$/.test(compact) && compact === raw.toUpperCase().replace(/[^A-Z0-9]/g, "") ? compact : "";
}

function findProviderPlateInRecord(record = {}) {
  const priorityKeys = ["PLACA", "ASESOR", "ASESOR COMPRA", "ASESOR VENTA", "CODIGO", "CUV", "PILOT COMPRA", "PILOT VENTA"];
  for (const key of priorityKeys) {
    const plate = normalizeProviderPlateValue(record[key]);
    if (plate) return { plate, key };
  }
  for (const [key, value] of Object.entries(record || {})) {
    if (/^(id|profileId|loadId|importedAt|source|importMonth|VALOR|FECHA)$/i.test(key)) continue;
    const plate = normalizeProviderPlateValue(value);
    if (plate) return { plate, key };
  }
  return { plate: "", key: "" };
}

function normalizeId(value = "") {
  return String(value).trim().replace(/\D/g, "");
}

function normalizeLooseText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function normalizeHeaderKey(value = "") {
  return normalizeLooseText(value).replace(/[^A-Z0-9]/g, "");
}

function normalizeStatusValue(value = "") {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function getStatusOption(value) {
  const normalized = normalizeStatusValue(value);
  return state.statusOptions.find((status) => status.value === normalized) || state.statusOptions[0];
}

function isClosedStatus(value) {
  return Boolean(getStatusOption(value)?.closes);
}

function getVisibleTasks() {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  return state.tasks
    .filter((task) => canLegalUserSeeTask(task))
    .filter((task) => {
      if (activeFilter === "firmas") return isSignatureTask(task);
      if (activeFilter === "cuv") return isCuvTask(task);
      if (activeFilter === "todos") return !isSignatureTask(task) && !isCuvTask(task);
      return !isSignatureTask(task) && !isCuvTask(task) && task.status === activeFilter;
    })
    .filter((task) => isInsideDateRange(task.createdAt, taskDateFrom, taskDateTo))
    .filter((task) => {
      if (!normalizedSearch) return true;
      const haystack = [
        task.placa,
        task.cedula,
        task.cliente,
        task.asesor,
        task.legalAdvisor,
        task.ciudad,
        task.agencia,
        task.tipoSaneamiento,
        task.tipoCompra,
        task.vendedor,
        task.telefono,
        task.correo,
        task.requestedByName,
        task.requestedByAgency,
        task.sourceCliente,
        task.sourceAsesor,
        task.sourceAgencia,
        task.signaturePayload?.titular?.email,
        task.signaturePayload?.titular?.whatsapp,
        task.signaturePayload?.conyuge?.email,
        task.signaturePayload?.conyuge?.whatsapp,
        task.cuvOrderNumber,
        task.cuvStatus,
        task.cuvObservations,
        task.cuvDeposits,
        ...(Array.isArray(task.signaturePayload?.herederos) ? task.signaturePayload.herederos.flatMap((heir) => [heir.email, heir.whatsapp]) : [])
      ].join(" ").toLowerCase();
      return haystack.includes(normalizedSearch);
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function isInsideDateRange(value, from, to) {
  if (!value) return false;
  const date = new Date(value);
  if (from) {
    const start = new Date(`${from}T00:00:00`);
    if (date < start) return false;
  }
  if (to) {
    const end = new Date(`${to}T23:59:59`);
    if (date > end) return false;
  }
  return true;
}

function renderTasks() {
  syncLegalSidebarFilters();
  if (repairMissingSignatureTasks()) {
    saveState();
    sincronizarTareasPendientesSupabase();
  }
  const visiblePool = state.tasks.filter((task) => canLegalUserSeeTask(task)).filter((task) => {
    if (activeFilter === "firmas") return isSignatureTask(task);
    if (activeFilter === "cuv") return isCuvTask(task);
    return !isSignatureTask(task) && !isCuvTask(task);
  });
  const pendingTasks = visiblePool.filter((task) => !isClosedStatus(task.status));
  if (queueCount) queueCount.textContent = pendingTasks.length;
  const user = currentLegalUser();
  const mailboxLabel = user
    ? normalizeLegalMailboxes(user.mailboxes).map((mailbox) => LEGAL_MAILBOXES.find((item) => item.id === mailbox)?.label || mailbox).join(" + ")
    : "";
  legalSessionLabel.textContent = session.role === "admin" ? "Administrador" : `Asistente: ${session.name || ""}${mailboxLabel ? ` | Buzon: ${mailboxLabel}` : ""}`;
  taskList.innerHTML = "";

  if (!canOpenTasks()) {
    taskList.innerHTML = `<div class="empty">Ingrese como asistente legal para ver tareas.</div>`;
    return;
  }

  const filteredTasks = getVisibleTasks();
  document.querySelector("#visibleTaskCount").textContent = filteredTasks.length;
  document.querySelector("#unassignedTaskCount").textContent = visiblePool.filter((task) => !task.legalUserId && !isClosedStatus(task.status)).length;
  document.querySelector("#avgLeadTime").textContent = formatMinutes(getAverageCompletionMinutes(visiblePool));

  if (!filteredTasks.length) {
    taskList.innerHTML = `<div class="empty">No hay tareas para este filtro.</div>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    if (isInfoRequestTask(task)) {
      taskList.appendChild(renderInfoRequestTaskCard(task, index));
      return;
    }
    const assignedToAnother = task.legalUserId && task.legalUserId !== session.userId && session.role !== "admin";
    const canTake = canLegalUserTakeTask(task);
    const lockedForLegal = isTaskStatusLockedForLegal(task);
    const canEdit = session.role === "admin" || (task.legalUserId === session.userId && !lockedForLegal);
    const canEditStatus = canEdit && !isSignatureTask(task) && !isCuvTask(task);
    const status = getStatusOption(task.status);
    const warnings = task.duplicateWarnings?.length ? task.duplicateWarnings : getDuplicateWarnings(task, task.id);
    const card = document.createElement("article");
    card.className = `task-card task-row-card ${warnings.length ? "has-warning" : ""}`;
    card.innerHTML = `
      <div class="task-row-index">${index + 1}</div>
      <div class="task-row-main">
        <h3>${escapeHtml(isSignatureTask(task) ? getSignatureTaskTitle(task) : isCuvTask(task) ? "Solicitud CUV" : (task.cliente || task.vendedor || "Solicitud sin nombre"))}</h3>
        <p class="task-meta">
          <span>Placa: ${escapeHtml(task.placa || "Sin placa")}</span>
          <span>Cliente: ${escapeHtml(task.cliente || task.vendedor || "Sin registro")}</span>
          <span>Asesor: ${escapeHtml(task.asesor || task.commercialUserName || "Sin asesor")}</span>
        </p>
        ${warnings.length ? `<span class="task-row-alert">Duplicado / revisar</span>` : ""}
      </div>
      <div class="task-row-assignee">
        <span>Asignado</span>
        <strong>${escapeHtml(task.legalAdvisor || "Disponible")}</strong>
        <small>Creado: ${formatDateTime(task.createdAt)}</small>
      </div>
      <div class="task-row-status">
        ${renderStatusPill(task.status)}
        <span class="time-chip">${formatLeadDuration(task)}</span>
      </div>
      <div class="task-row-actions">
        <button class="btn secondary tiny view-task-btn" type="button" data-legal-task="${escapeHtml(task.id)}">Ver ficha</button>
        ${canTake ? `<button class="btn primary tiny take-btn" type="button">Tomar</button>` : ""}
        ${isSignatureTask(task) && canEdit ? `<button class="btn primary tiny" type="button" data-complete-signature-task="${escapeHtml(task.id)}">${task.signatureStage === "subir-pilot" ? "Subido a Pilot" : "Enviado a firmar"}</button>` : ""}
        ${isCuvTask(task) && canEdit ? `<button class="btn primary tiny" type="button" data-open-cuv-task="${escapeHtml(task.id)}">Gestionar CUV</button>` : ""}
        ${assignedToAnother ? `<small class="locked-note">Tomado por otro asistente</small>` : ""}
        ${lockedForLegal ? `<small class="locked-note">Estatus bloqueado</small>` : ""}
        ${canEditStatus ? `<select aria-label="Estatus del saneamiento">
          ${state.statusOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}
        </select>` : ""}
      </div>
    `;

    const takeBtn = card.querySelector(".take-btn");
    if (takeBtn) takeBtn.addEventListener("click", () => takeTask(task.id));
    card.querySelector(".view-task-btn")?.addEventListener("click", () => openLegalTaskModal(task.id));

    const statusSelect = card.querySelector("select");
    if (statusSelect) {
      statusSelect.value = task.status;
      statusSelect.addEventListener("change", () => {
        const note = askLegalStatusObservation(task, statusSelect.value);
        updateTaskStatus(task.id, statusSelect.value, note);
      });
    }
    taskList.appendChild(card);
  });
}

function syncLegalSidebarFilters() {
  const user = currentLegalUser();
  legalSidebarFilterButtons.forEach((button) => {
    const mailbox = button.dataset.mailboxFilter;
    if (mailbox) {
      button.hidden = session.role !== "admin" && !userHasMailbox(user || {}, mailbox);
      if (button.hidden && activeFilter === button.dataset.legalSidebarFilter) activeFilter = "todos";
    }
    button.classList.toggle("is-active", button.dataset.legalSidebarFilter === activeFilter);
  });
}

function renderLegalTaskFullDetails(task) {
  if (isCuvTask(task)) {
    const fields = [
      ["Proceso", "Solicitud CUV"],
      ["Fecha de solicitud", task.fechaSolicitud || (task.createdAt ? task.createdAt.slice(0, 10) : "")],
      ["Placa", task.placa],
      ["Cedula del titular", task.cedula],
      ["Nombre del titular", task.cliente],
      ["Usuario solicitante", task.commercialUserName || task.asesor],
      ["Agencia solicitante", task.commercialAgency || task.agencia],
      ["No. de orden", task.cuvOrderNumber],
      ["Estatus CUV", task.cuvStatus],
      ["Hora", task.cuvHour],
      ["Valor", task.cuvValue ? formatCurrencyValue(task.cuvValue) : ""],
      ["Depositos", task.cuvDeposits],
      ["Observaciones", task.cuvObservations],
      ["PDF CUV", task.cuvPdfName]
    ];
    return `
      <div class="legal-task-detail-grid">
        ${fields.map(([label, value]) => `
          <div class="${["Observaciones", "PDF CUV"].includes(label) ? "is-wide" : ""}">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value || "Sin informacion")}</strong>
          </div>
        `).join("")}
      </div>
      ${task.cuvPdfDataUrl ? `<div class="legal-modal-download"><button class="btn primary" type="button" data-pdf-download="${escapeHtml(task.id)}">Descargar PDF CUV</button></div>` : ""}
    `;
  }
  if (isSignatureTask(task)) {
    const payload = task.signaturePayload || {};
    const heirs = Array.isArray(payload.herederos) ? payload.herederos : [];
    const sourceTask = state.tasks.find((item) => item.id === task.sourceTaskId) || {};
    const fields = [
      ["Proceso", getSignatureTaskTitle(task)],
      ["Placa", task.placa || sourceTask.placa],
      ["Cliente", task.cliente || sourceTask.cliente],
      ["Cedula", task.cedula || sourceTask.cedula],
      ["Agencia", task.agencia || sourceTask.agencia],
      ["Asesor comercial", task.asesor || task.commercialUserName || sourceTask.asesor],
      ["Correo titular", payload.titular?.email],
      ["WhatsApp titular", payload.titular?.whatsapp],
      ["Correo conyuge", payload.conyuge?.email],
      ["WhatsApp conyuge", payload.conyuge?.whatsapp],
      ["Herederos", heirs.length ? heirs.map((heir) => `Heredero ${heir.index}: ${heir.email} | ${heir.whatsapp}`).join(" / ") : ""],
      ["Estatus de firma", task.signatureStage === "subir-pilot" ? "Contratos firmados para subir a Pilot" : "Pendiente envio a firma"],
      ["Fecha de solicitud", formatDateTime(task.createdAt)],
      ["Solicitado por", task.commercialUserName || task.asesor],
      ["ID de tarea", task.id]
    ];
    return `
      ${renderSignatureRecipientCards(task)}
      <div class="legal-task-detail-grid">
        ${fields.map(([label, value]) => `
          <div class="${label === "Herederos" ? "is-wide" : ""}">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value || "Sin informacion")}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }
  const isSale = getTaskProcess(task) === "venta";
  const fields = isSale
    ? [
        ["Proceso", "Contrato de compraventa"],
        ["Placa", task.placa],
        ["Agencia", task.agencia],
        ["Vendedor", task.vendedor || task.cliente],
        ["Precio del contrato", formatCurrencyValue(task.precioContrato)],
        ["Cedula del vendedor", task.cedulaVendedor || task.cedula],
        ["Direccion", task.direccion],
        ["Telefono", task.telefono],
        ["Correo", task.correo],
        ["Asesor comercial", task.asesor || task.commercialUserName],
        ["Estatus", getStatusOption(task.status)?.label || task.status],
        ["Observaciones", task.observaciones]
      ]
    : [
        ["Proceso", "Compra y saneamiento"],
        ["Nombre completo del cliente", task.cliente],
        ["Cedula del titular", task.cedula],
        ["Placa", task.placa],
        ["Valor de toma", formatCurrencyValue(task.valorToma)],
        ["Kilometraje", formatIntegerValue(task.kilometraje)],
        ["Agencia", task.agencia],
        ["Ciudad", task.ciudad],
        ["Asesor comercial", task.asesor || task.commercialUserName],
        ["Tipo de compra", task.tipoCompra],
        ["Tipo de saneamiento", task.tipoSaneamiento],
        ["Estatus", getStatusOption(task.status)?.label || task.status],
        ["Observaciones", task.observaciones]
      ];
  const operationalFields = [
    ["Fecha y hora de solicitud", formatDateTime(task.createdAt)],
    ["Fecha y hora de toma", formatDateTime(task.takenAt)],
    ["Fecha y hora de cierre", formatDateTime(task.completedAt)],
    ["Asistente legal", task.legalAdvisor || "Sin asignar"],
    ["ID de tarea", task.id]
  ];
  const customFields = Object.values(task.customFields || {}).map((field) => [
    field.label || "Campo personalizado",
    field.value
  ]);
  return `
    <div class="legal-task-detail-grid">
      ${[...fields, ...customFields, ...operationalFields].map(([label, value]) => `
        <div class="${label === "Observaciones" || label === "Direccion" ? "is-wide" : ""}">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value || "Sin informacion")}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function formatCurrencyValue(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? `$ ${amount.toLocaleString("es-EC", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "";
}

function formatIntegerValue(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount.toLocaleString("es-EC") : "";
}

function renderInfoRequestTaskCard(task, index) {
  const assignedToAnother = task.legalUserId && task.legalUserId !== session.userId && session.role !== "admin";
  const canTake = canLegalUserTakeTask(task);
  const canAuthorize = session.role === "admin" || session.role === "legal" && (!task.legalUserId || task.legalUserId === session.userId);
  const sourceTask = state.tasks.find((item) => item.id === task.sourceTaskId);
  const card = document.createElement("article");
  card.className = "task-card task-row-card info-request-card";
  card.innerHTML = `
    <div class="task-row-index">${index + 1}</div>
    <div class="task-row-main">
      <h3>Solicitud de informacion de placa</h3>
      <p class="task-meta">
        <span>Placa: ${escapeHtml(task.placa || "Sin placa")}</span>
        <span>Solicitante: ${escapeHtml(task.requestedByName || task.asesor || task.commercialUserName || "Sin solicitante")}</span>
        <span>Asesor original: ${escapeHtml(task.sourceAsesor || sourceTask?.asesor || "Sin registro")}</span>
      </p>
    </div>
    <div class="task-row-assignee">
      <span>Asignado</span>
      <strong>${escapeHtml(task.legalAdvisor || "Disponible")}</strong>
      <small>Creado: ${formatDateTime(task.createdAt)}</small>
    </div>
    <div class="task-row-status">
      ${renderStatusPill(task.infoAccessStatus === "approved" ? "saneamiento realizado y subido a pilot" : task.status)}
      <span class="time-chip">${task.infoAccessStatus === "approved" ? "Informacion autorizada" : "Pendiente de autorizacion"}</span>
    </div>
    <div class="task-row-actions">
      <button class="btn secondary tiny view-task-btn" type="button" data-legal-task="${escapeHtml(task.id)}">Ver ficha</button>
      ${canTake ? `<button class="btn primary take-btn" type="button">Tomar solicitud</button>` : ""}
      ${canAuthorize && task.infoAccessStatus !== "approved" ? `<button class="btn primary approve-info-btn" type="button">Autorizar informacion</button>` : ""}
      ${assignedToAnother ? `<small class="locked-note">Tomado por otro asistente</small>` : ""}
    </div>
  `;

  const takeBtn = card.querySelector(".take-btn");
  if (takeBtn) takeBtn.addEventListener("click", () => takeTask(task.id));
  const approveBtn = card.querySelector(".approve-info-btn");
  if (approveBtn) approveBtn.addEventListener("click", () => approvePlateInfoRequest(task.id));
  card.querySelector(".view-task-btn")?.addEventListener("click", () => openLegalTaskModal(task.id));
  return card;
}

function renderCuvLegalForm(task = {}) {
  return `
    <form class="legal-cuv-form" data-cuv-legal-form="${escapeHtml(task.id)}">
      <div class="panel-title-row">
        <div>
          <p class="eyebrow">Gestion CUV</p>
          <h3>Completar respuesta para el asesor comercial</h3>
        </div>
      </div>
      <div class="form-grid">
        <label>
          No. de orden
          <input name="cuvOrderNumber" value="${escapeHtml(task.cuvOrderNumber || "")}" required>
        </label>
        <label>
          Estatus
          <select name="cuvStatus" required>
            ${CUV_STATUS_OPTIONS.map((status) => `<option value="${escapeHtml(status)}" ${status === (task.cuvStatus || "SOLICITADO") ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}
          </select>
        </label>
        <label>
          Hora
          <input name="cuvHour" type="time" value="${escapeHtml(task.cuvHour || "")}">
        </label>
        <label>
          Valor
          <input name="cuvValue" type="number" min="0" step="0.01" value="${escapeHtml(task.cuvValue || "")}">
        </label>
        <label>
          Depositos
          <input name="cuvDeposits" value="${escapeHtml(task.cuvDeposits || "")}">
        </label>
        <label>
          PDF CUV
          <input name="cuvPdf" type="file" accept="application/pdf">
        </label>
        <label class="span-2">
          Observaciones
          <textarea name="cuvObservations" rows="3">${escapeHtml(task.cuvObservations || "")}</textarea>
        </label>
      </div>
      <div class="form-actions">
        <button class="btn primary" type="submit">Guardar gestion CUV</button>
      </div>
    </form>
  `;
}

function readSmallPdfAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    if (file.type && file.type !== "application/pdf") {
      reject(new Error("Solo se permite subir PDF."));
      return;
    }
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      reject(new Error(`El PDF pesa ${formatFileSize(file.size)}. Maximo permitido: ${formatFileSize(maxSize)}.`));
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error || new Error("No se pudo leer el PDF.")));
    reader.readAsDataURL(file);
  });
}

async function saveCuvLegalTask(formElement) {
  const taskId = formElement?.dataset?.cuvLegalForm;
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task || !isCuvTask(task)) return;
  if (session.role === "legal" && task.legalUserId && task.legalUserId !== session.userId) {
    showToast("Solo puede gestionar el CUV asignado a su usuario.");
    return;
  }
  const data = Object.fromEntries(new FormData(formElement).entries());
  const file = formElement.elements.cuvPdf?.files?.[0] || null;
  try {
    const pdfDataUrl = await readSmallPdfAsDataUrl(file);
    const now = new Date().toISOString();
    if (session.role === "legal" && !task.legalUserId) {
      task.legalUserId = session.userId;
      task.legalAdvisor = session.name;
      task.takenAt = now;
    }
    task.cuvOrderNumber = normalizeLooseText(data.cuvOrderNumber);
    task.cuvStatus = normalizeLooseText(data.cuvStatus || "SOLICITADO");
    task.cuvHour = String(data.cuvHour || "").trim();
    task.cuvValue = String(data.cuvValue || "").trim();
    task.cuvObservations = normalizeLooseText(data.cuvObservations);
    task.cuvDeposits = normalizeLooseText(data.cuvDeposits);
    if (pdfDataUrl) {
      task.cuvPdfDataUrl = pdfDataUrl;
      task.cuvPdfName = file.name || `${task.placa || "CUV"}.pdf`;
      task.cuvPdfUploadedAt = now;
      task.cuvStatus = "ENVIADO ASESOR";
      task.status = "saneamiento realizado y subido a pilot";
      task.completedAt = now;
      task.statusLockedAt = now;
      task.statusLockedBy = session.userId || "";
      task.statusLockedByName = session.name || "";
    } else if (!task.takenAt) {
      task.takenAt = now;
    }
    if (!pdfDataUrl && task.status === "por asignar") task.status = "tomado";
    task.updatedAt = now;
    task.syncStatus = "pending";
    task.syncAction = pdfDataUrl ? "cuv-pdf-enviado" : "cuv-actualizado";
    saveState();
    renderAll();
    openLegalTaskModal(task.id);
    showToast(pdfDataUrl ? "CUV enviado al asesor comercial con PDF." : "Gestion CUV actualizada.");
    const saved = await guardarTareaSupabase(task, task.syncAction);
    saveState();
    if (!saved) showToast("CUV guardado localmente. Pendiente de sincronizar.");
  } catch (error) {
    showToast(error.message || "No se pudo guardar el CUV.");
  }
}

function approvePlateInfoRequest(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || !isInfoRequestTask(task)) return;
  if (session.role === "legal" && !canLegalUserSeeTask(task)) {
    showToast("Esta solicitud pertenece a otro buzon legal.");
    renderTasks();
    return;
  }
  if (session.role === "legal" && task.legalUserId && task.legalUserId !== session.userId) {
    showToast("Solo puede autorizar la solicitud que tomo.");
    renderTasks();
    return;
  }
  const now = new Date().toISOString();
  if (session.role === "legal" && !task.legalUserId) {
    task.legalUserId = session.userId;
    task.legalAdvisor = session.name;
    task.takenAt = now;
  }
  task.infoAccessStatus = "approved";
  task.status = "saneamiento realizado y subido a pilot";
  task.completedAt = task.completedAt || now;
  task.updatedAt = now;
  task.syncStatus = "pending";
  saveState();
  autoAssignOpenSaneamientos();
  renderAll();
  showToast("Informacion autorizada. El asesor ya puede ver el detalle de la placa.");
  guardarTareaSupabase(task, "autorizar-info-placa").then((ok) => {
    saveState();
    if (!ok) showToast("Autorizacion guardada localmente. Pendiente de sincronizar.");
  });
}

function takeTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || session.role !== "legal") return;
  if (!canLegalUserSeeTask(task)) {
    showToast("Este proceso pertenece a otro buzon legal.");
    renderTasks();
    return;
  }
  if (task.legalUserId) {
    showToast("Este lead ya fue tomado.");
    renderTasks();
    return;
  }
  if (!canLegalUserTakeTask(task)) {
    showToast("Ya tienes un saneamiento activo. Finalizalo antes de tomar una nueva tarea.");
    renderTasks();
    return;
  }

  task.legalUserId = session.userId;
  task.legalAdvisor = session.name;
  task.takenAt = new Date().toISOString();
  task.status = "tomado";
  task.statusLockedAt = "";
  task.statusLockedBy = "";
  task.statusLockedByName = "";
  task.updatedAt = new Date().toISOString();
  task.syncStatus = "pending";
  saveState();
  renderAll();
  showToast("Lead tomado. Temporizador legal iniciado.");
  guardarTareaSupabase(task, "tomar").then((ok) => {
    saveState();
    if (!ok) showToast("Lead tomado localmente. Pendiente de sincronizar.");
  });
}

function isTaskStatusLockedForLegal(task = {}) {
  if (session.role !== "legal") return false;
  if (task.statusLockedAt) return true;
  if (isClosedStatus(task.status)) return true;
  return Boolean(task.legalUserId && task.legalUserId === session.userId && task.status && !["tomado", "pendiente", "por asignar"].includes(task.status));
}

function updateTaskStatus(id, status, legalObservation = "") {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  if (session.role === "legal" && !canLegalUserSeeTask(task)) {
    showToast("Este proceso pertenece a otro buzon legal.");
    renderTasks();
    return;
  }

  if (session.role === "legal" && !task.legalUserId) {
    takeTask(id);
  }

  if (session.role === "legal" && task.legalUserId !== session.userId) {
    showToast("Solo puede actualizar el lead que tomo.");
    renderTasks();
    return;
  }

  if (isTaskStatusLockedForLegal(task)) {
    showToast("El estatus ya fue enviado. Solicite ayuda al administrador para corregirlo.");
    renderTasks();
    return;
  }

  task.status = status;
  appendLegalStatusObservation(task, status, legalObservation);
  if (status === "tomado" && !task.takenAt) {
    task.takenAt = new Date().toISOString();
    task.legalUserId = session.userId;
    task.legalAdvisor = session.name;
  }
  if (isClosedStatus(status) && !task.completedAt) {
    if (!task.takenAt) task.takenAt = new Date().toISOString();
    task.completedAt = new Date().toISOString();
  }
  if (!isClosedStatus(status)) {
    task.completedAt = "";
  }
  if (session.role === "legal" && !["tomado", "pendiente", "por asignar"].includes(status)) {
    task.statusLockedAt = new Date().toISOString();
    task.statusLockedBy = session.userId || "";
    task.statusLockedByName = session.name || "";
  }
  if (session.role === "admin" && ["tomado", "pendiente", "por asignar"].includes(status)) {
    task.statusLockedAt = "";
    task.statusLockedBy = "";
    task.statusLockedByName = "";
  }
  task.updatedAt = new Date().toISOString();
  task.syncStatus = "pending";

  saveState();
  if (isClosedStatus(status)) autoAssignOpenSaneamientos();
  renderAll();
  showToast("Estatus actualizado.");
  guardarTareaSupabase(task, "estatus").then((ok) => {
    saveState();
    if (!ok) showToast("Estatus actualizado localmente. Pendiente de sincronizar.");
  });
}

function changeOwnPassword(collection, password) {
  if (session.role === "public") return;
  changePassword(collection, session.userId, password);
}

function cleanUsernameValue(value = "") {
  return String(value || "").trim().toLowerCase();
}

function cleanPasswordValue(value = "") {
  return String(value || "").trim();
}

async function refreshAccessUsersAfterFailedLogin() {
  if (!navigator.onLine) return false;
  return Promise.race([
    actualizarUsuariosDesdeSupabaseParaLogin(),
    new Promise((resolve) => window.setTimeout(() => resolve(false), 3500))
  ]);
}

async function loginLegal(data) {
  await refreshAccessUsersAfterFailedLogin();
  const username = cleanUsernameValue(data.username);
  const password = cleanPasswordValue(data.password);
  let user = state.legalUsers.find((item) =>
    cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
  );

  if (!user) {
    await refreshAccessUsersAfterFailedLogin();
    user = state.legalUsers.find((item) =>
      cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
    );
    if (!user) {
      showToast("Usuario o contrasena incorrectos.");
      return;
    }
  }

  rememberAccessFromLogin("legal", legalLoginForm, data);
  setSession({ role: "legal", userId: user.id, name: user.name });
  legalLoginForm.reset();
  setView("tareas");
  showToast(`Bienvenido, ${user.name}.`);
}

async function loginCommercial(data) {
  const username = cleanUsernameValue(data.username);
  const password = cleanPasswordValue(data.password);
  let user = state.commercialAdvisors.find((item) =>
    cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
  );

  if (!user) {
    await refreshAccessUsersAfterFailedLogin();
    user = state.commercialAdvisors.find((item) =>
      cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
    );
    if (!user) {
      showToast("Usuario comercial o contrasena incorrectos.");
      return;
    }
  }

  rememberAccessFromLogin("commercial", commercialLoginForm, data);
  setSession({ role: "commercial", userId: user.id, name: user.name, agency: user.agency });
  commercialLoginForm.reset();
  setView("formulario");
  setCommercialProcessFromTarget("commercial-purchase-process", false);
  applyCommercialSessionToForm();
  showToast(`Bienvenido, ${user.name}.`);
}

function loginAdmin(data) {
  if (cleanPasswordValue(data.password) !== ADMIN_PASSWORD) {
    showToast("Clave de administrador incorrecta.");
    return;
  }

  rememberAccessFromLogin("admin", adminLoginForm, { password: data.password });
  setSession({ role: "admin", userId: "admin", name: "Administrador" });
  adminLoginForm.reset();
  setView("admin");
  showToast("Administrador activo.");
}

async function loginManager(data) {
  const username = cleanUsernameValue(data.username);
  const password = cleanPasswordValue(data.password);
  let user = state.managerUsers.find((item) =>
    cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
  );

  if (!user) {
    await refreshAccessUsersAfterFailedLogin();
    user = state.managerUsers.find((item) =>
      cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
    );
    if (!user) {
      showToast("Usuario gerencial o contrasena incorrectos.");
      return;
    }
  }

  rememberAccessFromLogin("manager", managerLoginForm, data);
  setSession({ role: "manager", userId: user.id, name: user.name, agency: "" });
  managerLoginForm.reset();
  setView("gerencial");
  showToast(`Bienvenido, ${user.name}.`);
}

async function loginProcessing(data) {
  const username = cleanUsernameValue(data.username);
  const password = cleanPasswordValue(data.password);
  let user = (state.processingUsers || []).find((item) =>
    cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
  );

  if (!user) {
    await refreshAccessUsersAfterFailedLogin();
    user = (state.processingUsers || []).find((item) =>
      cleanUsernameValue(item.username) === username && cleanPasswordValue(item.password) === password
    );
    if (!user) {
      showToast("Usuario de procesamiento o contrasena incorrectos.");
      return;
    }
  }

  rememberAccessFromLogin("processing", processingLoginForm, data);
  setSession({ role: "processing", userId: user.id, name: user.name, agency: "" });
  processingLoginForm.reset();
  setView("procesamiento");
  showToast(`Bienvenido, ${user.name}.`);
}

function getKpis(tasks = state.tasks) {
  const total = tasks.length;
  const uniquePlates = new Set(tasks.map((task) => normalizePlate(task.placa)).filter(Boolean)).size;
  const pending = tasks.filter((task) => task.status === "pendiente" || task.status === "por asignar").length;
  const inProgress = tasks.filter((task) => task.status !== "pendiente" && task.status !== "por asignar" && !isClosedStatus(task.status)).length;
  const completed = tasks.filter((task) => isClosedStatus(task.status)).length;
  const unassigned = tasks.filter((task) => !task.legalUserId && !isClosedStatus(task.status)).length;
  const duplicates = tasks.filter((task) => (task.duplicateWarnings?.length || getDuplicateWarnings(task, task.id).length)).length;
  const avgTake = getAverageMinutes(tasks.filter((task) => task.takenAt), "createdAt", "takenAt");
  const avgCompletion = getAverageCompletionMinutes(tasks);
  const completedToday = tasks.filter((task) => task.completedAt && isToday(task.completedAt)).length;
  return { total, uniquePlates, pending, inProgress, completed, unassigned, duplicates, avgTake, avgCompletion, completedToday };
}

function getTaskProcess(task = {}) {
  if (task.processType === "cuv") return "cuv";
  if (task.processType === "consulta-info") return "consulta-info";
  if (task.processType === "firma") return "firma";
  return task.processType === "venta" ? "venta" : "compra";
}

function getTaskMailbox(task = {}) {
  if (getTaskProcess(task) === "cuv") return "cuv";
  if (getTaskProcess(task) === "firma") return "firmas";
  return getTaskProcess(task) === "venta" ? "contratos" : "saneamientos";
}

function userHasMailbox(user = {}, mailbox = "saneamientos") {
  return normalizeLegalMailboxes(user.mailboxes).includes(mailbox);
}

function currentLegalUser() {
  if (session.role !== "legal") return null;
  return state.legalUsers.find((user) => user.id === session.userId) || null;
}

function canLegalUserSeeTask(task = {}, user = currentLegalUser()) {
  if (session.role === "admin") return true;
  if (!user) return false;
  const mailbox = getTaskMailbox(task);
  if (mailbox === "firmas") return !task.legalUserId || task.legalUserId === user.id;
  if (!userHasMailbox(user, mailbox)) return false;
  if (mailbox === "saneamientos" && !task.legalUserId && user.legalAvailable === false) return false;
  return !task.legalUserId || task.legalUserId === user.id;
}

function isCuvTask(task = {}) {
  return getTaskProcess(task) === "cuv";
}

function getEligibleLegalUsersForTask(task = {}) {
  const mailbox = getTaskMailbox(task);
  if (mailbox === "firmas") {
    return normalizeLegalUsers(state.legalUsers || []).filter((user) => user.legalAvailable !== false);
  }
  return normalizeLegalUsers(state.legalUsers || []).filter((user) =>
    userHasMailbox(user, mailbox) &&
    canLegalUserReceiveNewTask(user, task)
  );
}

function setDefaultCuvRequestDate() {
  if (!cuvRequestForm?.elements?.fechaSolicitud) return;
  cuvRequestForm.elements.fechaSolicitud.value = new Date().toISOString().slice(0, 10);
}

async function createCuvTask(data) {
  const createdAt = new Date().toISOString();
  const commercialOwner = session.role === "commercial"
    ? { id: session.userId, name: session.name, agency: session.agency }
    : { id: "", name: session.name || "", agency: session.agency || "" };
  const task = {
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
    takenAt: "",
    completedAt: "",
    status: "por asignar",
    legalUserId: "",
    legalAdvisor: "",
    processType: "cuv",
    tipoSaneamiento: "Solicitud CUV",
    tipoCompra: "CUV",
    fechaSolicitud: data.fechaSolicitud || createdAt.slice(0, 10),
    cliente: normalizeLooseText(data.cliente),
    placa: normalizePlate(data.placa),
    cedula: normalizeId(data.cedula),
    agencia: commercialOwner.agency || "",
    asesor: commercialOwner.name || "",
    commercialUserId: commercialOwner.id,
    commercialUserName: commercialOwner.name,
    commercialAgency: commercialOwner.agency,
    cuvOrderNumber: "",
    cuvStatus: "SOLICITADO",
    cuvHour: "",
    cuvValue: "",
    cuvObservations: "",
    cuvDeposits: "",
    cuvPdfName: "",
    cuvPdfDataUrl: "",
    observaciones: `SOLICITUD CUV | Placa: ${normalizePlate(data.placa)} | Titular: ${normalizeLooseText(data.cliente)}`,
    duplicateWarnings: [],
    syncStatus: "pending"
  };

  state.tasks.push(task);
  saveState();
  renderAll();
  showToast("Solicitud CUV creada. Guardando en linea...");
  const onlineSaved = await guardarTareaSupabase(task, "crear-cuv");
  saveState();
  renderAll();
  showToast(onlineSaved
    ? "Solicitud CUV enviada a Mesa de Control."
    : "Solicitud CUV guardada en este equipo. Quedo pendiente de sincronizar."
  );
}

function getLegalUserActiveLoad(userId, mailbox = "") {
  return (state.tasks || []).filter((task) =>
    task.legalUserId === userId &&
    !isClosedStatus(task.status) &&
    (!mailbox || getTaskMailbox(task) === mailbox)
  ).length;
}

function canLegalUserReceiveNewTask(user = {}, task = {}) {
  const mailbox = getTaskMailbox(task);
  if (mailbox === "firmas") return user.legalAvailable !== false;
  if (!userHasMailbox(user, mailbox)) return false;
  if (mailbox !== "saneamientos") return true;
  if (user.legalAvailable === false) return false;
  const activeLoad = getLegalUserActiveLoad(user.id, "saneamientos");
  return activeLoad === 0 || task.legalUserId === user.id;
}

function canLegalUserTakeTask(task = {}, user = currentLegalUser()) {
  if (session.role !== "legal" || !user) return false;
  if (task.legalUserId || isClosedStatus(task.status)) return false;
  if (!canLegalUserSeeTask(task, user)) return false;
  return canLegalUserReceiveNewTask(user, task);
}

function assignTaskToLegalUser(task, user, status = "tomado") {
  if (!task || !user) return task;
  const now = new Date().toISOString();
  task.legalUserId = user.id;
  task.legalAdvisor = user.name;
  task.takenAt = task.takenAt || now;
  task.status = status;
  task.updatedAt = now;
  return task;
}

function autoAssignSaneamientoTask(task) {
  if (!task || getTaskMailbox(task) !== "saneamientos" || task.legalUserId || isClosedStatus(task.status)) return task;
  const eligibleUsers = getEligibleLegalUsersForTask(task);
  if (!eligibleUsers.length) return task;
  const selected = eligibleUsers
    .map((user) => ({ user, load: getLegalUserActiveLoad(user.id, "saneamientos") }))
    .sort((a, b) => a.load - b.load || a.user.name.localeCompare(b.user.name))[0]?.user;
  if (selected) assignTaskToLegalUser(task, selected, "tomado");
  return task;
}

function autoAssignOpenSaneamientos() {
  let changed = false;
  (state.tasks || []).forEach((task) => {
    if (getTaskMailbox(task) === "saneamientos" && !task.legalUserId && !isClosedStatus(task.status)) {
      const before = task.legalUserId;
      autoAssignSaneamientoTask(task);
      if (task.legalUserId && task.legalUserId !== before) {
        task.syncStatus = "pending";
        task.syncAction = "auto-asignar";
        changed = true;
      }
    }
  });
  if (changed) {
    saveState();
    sincronizarTareasPendientesSupabase();
  }
  return changed;
}

function filterTasksByCommercialProcess(tasks = [], process = activeCommercialProcess) {
  return tasks.filter((task) => getTaskProcess(task) === process);
}

function getCommercialProcessLabel(process = activeCommercialProcess) {
  if (process === "firma") return "Firmas | Pilot";
  if (process === "cuv") return "CUV | control";
  return process === "venta" ? "Venta | contratos" : "Compra | saneamientos";
}

function isSignatureTask(task = {}) {
  return getTaskProcess(task) === "firma";
}

function canCommercialRequestSignature(task = {}) {
  if (!task || getTaskProcess(task) !== "compra") return false;
  if (!ownsCommercialTask(task)) return false;
  if (normalizeStatusValue(task.status) !== "saneamiento realizado y subido a pilot") return false;
  return !task.signatureRequestTaskId && task.signatureStatus !== SIGNATURE_STATUS.requested && task.signatureStatus !== SIGNATURE_STATUS.sent && task.signatureStatus !== SIGNATURE_STATUS.completed;
}

function canCommercialRequestPilotUpload(task = {}) {
  if (!task || getTaskProcess(task) !== "compra") return false;
  if (!ownsCommercialTask(task)) return false;
  return task.signatureStatus === SIGNATURE_STATUS.sent && !task.signaturePilotTaskId && task.signatureStatus !== SIGNATURE_STATUS.completed;
}

function validateSignatureEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value || "").trim());
}

function renderSignatureCountrySelects() {
  document.querySelectorAll("[data-country-select]").forEach((select) => {
    const current = select.value || "EC";
    select.innerHTML = SIGNATURE_COUNTRY_CODES.map((country) => `
      <option value="${escapeHtml(country.iso)}" ${country.iso === current ? "selected" : ""}>${escapeHtml(country.name)} ${escapeHtml(country.code)}</option>
    `).join("");
    select.value = SIGNATURE_COUNTRY_CODES.some((country) => country.iso === current) ? current : "EC";
  });
}

function getSignatureCountry(iso = "EC") {
  return SIGNATURE_COUNTRY_CODES.find((country) => country.iso === iso) || SIGNATURE_COUNTRY_CODES[0];
}

function normalizeSignatureWhatsapp(value = "") {
  return String(value || "").replace(/\D/g, "");
}

function buildSignatureWhatsapp(countryIso = "EC", value = "") {
  const country = getSignatureCountry(countryIso);
  const clean = normalizeSignatureWhatsapp(value);
  return `${country.code}${clean}`;
}

function validateSignatureWhatsapp(countryIso = "EC", value = "") {
  const country = getSignatureCountry(countryIso);
  const clean = normalizeSignatureWhatsapp(value);
  return clean.length >= country.min && clean.length <= country.max;
}

function showSignatureValidation(errors = []) {
  if (!signatureValidationMessage) return;
  if (!errors.length) {
    signatureValidationMessage.hidden = true;
    signatureValidationMessage.innerHTML = "";
    return;
  }
  signatureValidationMessage.hidden = false;
  signatureValidationMessage.innerHTML = errors.map((error) => `<span>${escapeHtml(error)}</span>`).join("");
}

function getSignatureTaskTitle(task = {}) {
  if (task.signatureStage === "subir-pilot") return "Subir contratos firmados a Pilot";
  return "Enviar documentos a firma";
}

function getSignatureDisplayStatus(task = {}) {
  if (task.signatureStatus === SIGNATURE_STATUS.completed) return "Contratos firmados subidos a Pilot";
  if (task.signatureStatus === SIGNATURE_STATUS.pilotRequested) return "Subida a Pilot solicitada";
  if (task.signatureStatus === SIGNATURE_STATUS.sent) return "Enviado a firmar exitoso";
  if (task.signatureStatus === SIGNATURE_STATUS.requested) return "Firma solicitada";
  return "";
}

function buildSignatureActionButtons(task = {}) {
  if (canCommercialRequestSignature(task)) {
    return `<button class="btn tiny primary" type="button" data-request-signature="${escapeHtml(task.id)}">Solicitar enviar a firmar</button>`;
  }
  if (canCommercialRequestPilotUpload(task)) {
    return `<button class="btn tiny primary" type="button" data-request-pilot-upload="${escapeHtml(task.id)}">Solicitar subir contratos firmados a Pilot</button>`;
  }
  const signatureStatus = getSignatureDisplayStatus(task);
  return signatureStatus ? `<span class="info-request-pending is-approved">${escapeHtml(signatureStatus)}</span>` : "";
}

function openSignatureRequestModal(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task || !commercialSignatureModal || !commercialSignatureForm || !signatureTaskIdInput) return;
  if (!canCommercialRequestSignature(task)) {
    showToast("Esta opcion solo aplica para saneamientos realizados y subidos a Pilot.");
    return;
  }
  commercialSignatureForm.reset();
  renderSignatureCountrySelects();
  signatureTaskIdInput.value = task.id;
  showSignatureValidation([]);
  if (signatureSpouseFields) signatureSpouseFields.hidden = true;
  if (signatureHeirsFields) signatureHeirsFields.hidden = true;
  openCommercialModal(commercialSignatureModal);
}

function collectSignatureFormData() {
  const data = Object.fromEntries(new FormData(commercialSignatureForm).entries());
  const titularEmail = String(data.titularEmail || "").trim();
  const titularCountry = data.titularCountry || "EC";
  const titularWhatsapp = normalizeSignatureWhatsapp(data.titularWhatsapp);
  const errors = [];
  if (!validateSignatureEmail(titularEmail)) errors.push("Correo del titular no valido.");
  if (!validateSignatureWhatsapp(titularCountry, titularWhatsapp)) {
    const country = getSignatureCountry(titularCountry);
    errors.push(`WhatsApp del titular debe tener ${country.min === country.max ? country.min : `${country.min} a ${country.max}`} digitos para ${country.name}.`);
  }

  const spouseEnabled = signatureSpouseToggle?.checked;
  const spouseCountry = data.spouseCountry || "EC";
  const spouse = spouseEnabled ? {
    email: String(data.spouseEmail || "").trim(),
    whatsapp: normalizeSignatureWhatsapp(data.spouseWhatsapp),
    country: spouseCountry
  } : null;
  if (spouseEnabled) {
    if (!validateSignatureEmail(spouse.email)) errors.push("Correo del conyuge no valido.");
    if (!validateSignatureWhatsapp(spouseCountry, spouse.whatsapp)) errors.push(`WhatsApp del conyuge no cumple la longitud de ${getSignatureCountry(spouseCountry).name}.`);
  }

  const heirsEnabled = signatureHeirsToggle?.checked;
  const heirs = [];
  if (heirsEnabled) {
    for (let index = 1; index <= 5; index += 1) {
      const email = String(data[`heirEmail${index}`] || "").trim();
      const whatsapp = normalizeSignatureWhatsapp(data[`heirWhatsapp${index}`] || "");
      const country = data[`heirCountry${index}`] || "EC";
      if (!email && !whatsapp) continue;
      if (!validateSignatureEmail(email)) errors.push(`Correo del heredero ${index} no valido.`);
      if (!validateSignatureWhatsapp(country, whatsapp)) errors.push(`WhatsApp del heredero ${index} no cumple la longitud de ${getSignatureCountry(country).name}.`);
      heirs.push({ index, email, whatsapp: buildSignatureWhatsapp(country, whatsapp), country });
    }
    if (!heirs.length) errors.push("Agregue al menos un heredero o desactive la opcion.");
  }

  return {
    taskId: data.taskId || "",
    payload: {
      titular: { email: titularEmail, whatsapp: buildSignatureWhatsapp(titularCountry, titularWhatsapp), country: titularCountry },
      conyuge: spouse ? { ...spouse, whatsapp: buildSignatureWhatsapp(spouseCountry, spouse.whatsapp) } : null,
      herederos: heirs,
      requestedAt: new Date().toISOString(),
      requestedBy: session.name || "",
      requestedByUserId: session.userId || ""
    },
    errors
  };
}

async function submitSignatureRequest(event) {
  event.preventDefault();
  const { taskId, payload, errors } = collectSignatureFormData();
  const source = state.tasks.find((task) => task.id === taskId);
  if (!source || !canCommercialRequestSignature(source)) {
    showToast("No se puede crear la solicitud de firma para este lead.");
    return;
  }
  if (errors.length) {
    showSignatureValidation(errors);
    return;
  }
  showSignatureValidation([]);
  const createdAt = new Date().toISOString();
  const signatureTask = {
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
    takenAt: "",
    completedAt: "",
    status: "por asignar",
    legalUserId: "",
    legalAdvisor: "",
    processType: "firma",
    signatureStage: "envio-firma",
    sourceTaskId: source.id,
    signaturePayload: payload,
    cliente: source.cliente || "",
    vendedor: source.vendedor || "",
    placa: normalizePlate(source.placa),
    cedula: source.cedula || source.cedulaVendedor || "",
    agencia: source.agencia || "",
    asesor: source.asesor || source.commercialUserName || "",
    commercialUserId: source.commercialUserId || session.userId || "",
    commercialUserName: source.commercialUserName || source.asesor || session.name || "",
    commercialAgency: source.commercialAgency || source.agencia || session.agency || "",
    tipoSaneamiento: "Envio a firma",
    tipoCompra: source.tipoCompra || "",
    observaciones: `SOLICITUD DE ENVIO A FIRMA | Placa: ${normalizePlate(source.placa)} | Solicitante: ${session.name || ""}`,
    duplicateWarnings: [],
    syncStatus: "pending",
    syncAction: "solicitar-firma"
  };
  source.signatureStatus = SIGNATURE_STATUS.requested;
  source.signatureRequestTaskId = signatureTask.id;
  source.signaturePayload = payload;
  source.signatureRequestedAt = createdAt;
  source.updatedAt = createdAt;
  source.syncStatus = "pending";
  source.syncAction = "solicitar-firma-origen";
  state.tasks.push(signatureTask);
  saveState();
  closeCommercialModals();
  renderAll();
  showToast("Solicitud de firma enviada a Mesa de Control.");
  const [sourceSaved, requestSaved] = await Promise.all([
    guardarTareaSupabase(source, "solicitar-firma-origen"),
    guardarTareaSupabase(signatureTask, "solicitar-firma")
  ]);
  saveState();
  if (!sourceSaved || !requestSaved) showToast("Solicitud guardada localmente. Pendiente de sincronizar.");
}

async function requestPilotUploadFromCommercial(taskId) {
  const source = state.tasks.find((task) => task.id === taskId);
  if (!source || !canCommercialRequestPilotUpload(source)) {
    showToast("Esta opcion se activa cuando la firma fue enviada exitosamente.");
    return;
  }
  const createdAt = new Date().toISOString();
  const pilotTask = {
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
    takenAt: "",
    completedAt: "",
    status: "por asignar",
    legalUserId: "",
    legalAdvisor: "",
    processType: "firma",
    signatureStage: "subir-pilot",
    sourceTaskId: source.id,
    signaturePayload: source.signaturePayload || {},
    cliente: source.cliente || "",
    vendedor: source.vendedor || "",
    placa: normalizePlate(source.placa),
    cedula: source.cedula || source.cedulaVendedor || "",
    agencia: source.agencia || "",
    asesor: source.asesor || source.commercialUserName || "",
    commercialUserId: source.commercialUserId || session.userId || "",
    commercialUserName: source.commercialUserName || source.asesor || session.name || "",
    commercialAgency: source.commercialAgency || source.agencia || session.agency || "",
    tipoSaneamiento: "Subir contratos firmados a Pilot",
    tipoCompra: source.tipoCompra || "",
    observaciones: `SOLICITUD DE SUBIDA A PILOT | Placa: ${normalizePlate(source.placa)} | Solicitante: ${session.name || ""}`,
    duplicateWarnings: [],
    syncStatus: "pending",
    syncAction: "solicitar-pilot-firmado"
  };
  source.signatureStatus = SIGNATURE_STATUS.pilotRequested;
  source.signaturePilotTaskId = pilotTask.id;
  source.signaturePilotRequestedAt = createdAt;
  source.updatedAt = createdAt;
  source.syncStatus = "pending";
  source.syncAction = "solicitar-pilot-firmado-origen";
  state.tasks.push(pilotTask);
  saveState();
  renderAll();
  showToast("Solicitud enviada a Mesa para subir contratos firmados a Pilot.");
  const [sourceSaved, requestSaved] = await Promise.all([
    guardarTareaSupabase(source, "solicitar-pilot-firmado-origen"),
    guardarTareaSupabase(pilotTask, "solicitar-pilot-firmado")
  ]);
  saveState();
  if (!sourceSaved || !requestSaved) showToast("Solicitud guardada localmente. Pendiente de sincronizar.");
}

function repairMissingSignatureTasks() {
  let changed = false;
  const existingIds = new Set((state.tasks || []).map((task) => task.id));
  (state.tasks || []).filter((task) => getTaskProcess(task) === "compra").forEach((source) => {
    if (source.signatureStatus === SIGNATURE_STATUS.requested && !source.signatureRequestTaskId && source.signaturePayload) {
      source.signatureRequestTaskId = crypto.randomUUID();
      source.updatedAt = new Date().toISOString();
      source.syncStatus = "pending";
      source.syncAction = "reparar-firma-origen";
    }
    if (source.signatureStatus === SIGNATURE_STATUS.pilotRequested && !source.signaturePilotTaskId && source.signaturePayload) {
      source.signaturePilotTaskId = crypto.randomUUID();
      source.updatedAt = new Date().toISOString();
      source.syncStatus = "pending";
      source.syncAction = "reparar-firma-pilot-origen";
    }
    if (source.signatureStatus === SIGNATURE_STATUS.requested && source.signatureRequestTaskId && !existingIds.has(source.signatureRequestTaskId)) {
      const createdAt = source.signatureRequestedAt || source.updatedAt || new Date().toISOString();
      state.tasks.push(normalizeTask({
        id: source.signatureRequestTaskId,
        createdAt,
        updatedAt: source.updatedAt || createdAt,
        status: "por asignar",
        legalUserId: "",
        legalAdvisor: "",
        processType: "firma",
        signatureStage: "envio-firma",
        sourceTaskId: source.id,
        signaturePayload: source.signaturePayload || {},
        cliente: source.cliente || "",
        vendedor: source.vendedor || "",
        placa: normalizePlate(source.placa),
        cedula: source.cedula || source.cedulaVendedor || "",
        agencia: source.agencia || "",
        asesor: source.asesor || source.commercialUserName || "",
        commercialUserId: source.commercialUserId || "",
        commercialUserName: source.commercialUserName || source.asesor || "",
        commercialAgency: source.commercialAgency || source.agencia || "",
        tipoSaneamiento: "Envio a firma",
        observaciones: `SOLICITUD DE ENVIO A FIRMA | Placa: ${normalizePlate(source.placa)} | Reconstruida automaticamente`,
        syncStatus: "pending",
        syncAction: "reparar-firma"
      }));
      existingIds.add(source.signatureRequestTaskId);
      changed = true;
    }
    if (source.signatureStatus === SIGNATURE_STATUS.pilotRequested && source.signaturePilotTaskId && !existingIds.has(source.signaturePilotTaskId)) {
      const createdAt = source.signaturePilotRequestedAt || source.updatedAt || new Date().toISOString();
      state.tasks.push(normalizeTask({
        id: source.signaturePilotTaskId,
        createdAt,
        updatedAt: source.updatedAt || createdAt,
        status: "por asignar",
        legalUserId: "",
        legalAdvisor: "",
        processType: "firma",
        signatureStage: "subir-pilot",
        sourceTaskId: source.id,
        signaturePayload: source.signaturePayload || {},
        cliente: source.cliente || "",
        vendedor: source.vendedor || "",
        placa: normalizePlate(source.placa),
        cedula: source.cedula || source.cedulaVendedor || "",
        agencia: source.agencia || "",
        asesor: source.asesor || source.commercialUserName || "",
        commercialUserId: source.commercialUserId || "",
        commercialUserName: source.commercialUserName || source.asesor || "",
        commercialAgency: source.commercialAgency || source.agencia || "",
        tipoSaneamiento: "Subir contratos firmados a Pilot",
        observaciones: `SOLICITUD DE SUBIDA A PILOT | Placa: ${normalizePlate(source.placa)} | Reconstruida automaticamente`,
        syncStatus: "pending",
        syncAction: "reparar-firma-pilot"
      }));
      existingIds.add(source.signaturePilotTaskId);
      changed = true;
    }
  });
  return changed;
}

async function completeSignatureTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task || !isSignatureTask(task)) return;
  if (session.role === "legal" && task.legalUserId && task.legalUserId !== session.userId) {
    showToast("Solo puede cerrar la solicitud que tomo.");
    return;
  }
  const now = new Date().toISOString();
  if (session.role === "legal" && !task.legalUserId) {
    task.legalUserId = session.userId;
    task.legalAdvisor = session.name;
    task.takenAt = now;
  }
  const source = state.tasks.find((item) => item.id === task.sourceTaskId);
  task.status = "saneamiento realizado y subido a pilot";
  task.completedAt = now;
  task.updatedAt = now;
  task.statusLockedAt = now;
  task.statusLockedBy = session.userId || "";
  task.statusLockedByName = session.name || "";
  task.syncStatus = "pending";
  task.syncAction = task.signatureStage === "subir-pilot" ? "firma-pilot-completada" : "firma-enviada";
  if (source) {
    source.signatureStatus = task.signatureStage === "subir-pilot" ? SIGNATURE_STATUS.completed : SIGNATURE_STATUS.sent;
    if (task.signatureStage === "subir-pilot") source.signaturePilotCompletedAt = now;
    else source.signatureSentAt = now;
    source.updatedAt = now;
    source.syncStatus = "pending";
    source.syncAction = task.syncAction + "-origen";
  }
  saveState();
  renderAll();
  showToast(task.signatureStage === "subir-pilot" ? "Contratos firmados marcados como subidos a Pilot." : "Firma marcada como enviada exitosamente.");
  const saves = [guardarTareaSupabase(task, task.syncAction)];
  if (source) saves.push(guardarTareaSupabase(source, source.syncAction));
  const results = await Promise.all(saves);
  saveState();
  if (results.some((ok) => !ok)) showToast("Actualizacion guardada localmente. Pendiente de sincronizar.");
}

function setCommercialArea(area = "dashboard", options = {}) {
  activeCommercialArea = area;
  if (options.statusView) activeCommercialRequestFilter = options.statusView;
  commercialAreaSections.forEach((section) => {
    section.classList.toggle("is-active-area", section.dataset.commercialAreaSection === area);
  });
  commercialAreaButtons.forEach((button) => {
    const isActive = options.button
      ? button === options.button
      : button.dataset.commercialArea === area && !button.dataset.commercialStatusView && !button.dataset.commercialModuleTarget;
    button.classList.toggle("is-active", isActive);
  });
  if (options.moduleTarget) {
    const moduleButton = document.querySelector(`[data-commercial-module="${options.moduleTarget}"]`);
    moduleButton?.click();
  }
  renderCommercialDashboard();
  renderCommercialRequests();
  renderCommercialControlSummary();
  if (area === "lookup") renderStatusLookup();
  if (options.scroll !== false) {
    document.querySelector(".commercial-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setCommercialProcessFromTarget(target, shouldScroll = true) {
  activeCommercialProcess = target === "commercial-sale-process" ? "venta" : target === "commercial-cuv-process" ? "cuv" : "compra";
  commercialProcessButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.commercialProcess === target));
  commercialProcessSections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.commercialProcessSection === target);
  });
  setCommercialArea("process", { scroll: shouldScroll });
  renderCommercialDashboard();
  if (statusSearch?.value || statusAdvisorFilter?.value || statusAgencyFilter?.value || statusStateFilter?.value || statusDateFrom?.value || statusDateTo?.value) {
    renderStatusLookup();
  }
  if (shouldScroll) document.querySelector(`#${target}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderDashboards() {
  const adminTasks = getAdminFilteredTasks();
  const kpis = getKpis();
  const adminKpis = getKpis(adminTasks);
  document.querySelector("#heroActive").textContent = kpis.pending + kpis.inProgress;
  document.querySelector("#heroAverage").textContent = `Promedio: ${formatMinutes(kpis.avgCompletion)}`;

  const cards = [
    [" Total leads", kpis.total, "Solicitudes registradas"],
    [" Placas unicas", kpis.uniquePlates, "Vehiculos sin repetir"],
    ["PEND Pendientes", kpis.pending, "Sin tomar"],
    [" En proceso", kpis.inProgress, "Trabajandose"],
    [" Completados", kpis.completed, "Cerrados"],
    ["Disponibles", kpis.unassigned, "Para tomar"],
    [" Duplicados", kpis.duplicates, "Placa o cliente repetido"],
    ["TIEMPO Prom. toma", formatMinutes(kpis.avgTake), "Ingreso a toma"],
    [" Prom. cierre", formatMinutes(kpis.avgCompletion), "Toma a cierre"]
  ];

  const adminCards = [
    [" Total leads", adminKpis.total, "Segun filtros"],
    [" Placas unicas", adminKpis.uniquePlates, "Vehiculos sin repetir"],
    ["PEND Pendientes", adminKpis.pending, "Sin tomar"],
    [" En proceso", adminKpis.inProgress, "Trabajandose"],
    [" Completados", adminKpis.completed, "Cerrados"],
    ["Disponibles", adminKpis.unassigned, "Para tomar"],
    [" Duplicados", adminKpis.duplicates, "Placa o cliente repetido"],
    ["TIEMPO Prom. toma", formatMinutes(adminKpis.avgTake), "Ingreso a toma"],
    [" Prom. cierre", formatMinutes(adminKpis.avgCompletion), "Toma a cierre"],
    [" Cerrados hoy", adminKpis.completedToday, "Gestion filtrada"]
  ];

  renderKpiCards("#accessKpis", cards.slice(0, 4));
  renderKpiCards("#adminKpis", adminCards);
  renderAdvisorKpis(adminTasks);
}

function getCommercialTasks() {
  if (session.role === "admin") return state.tasks;
  return state.tasks.filter((task) =>
    task.commercialUserId === session.userId ||
    (!task.commercialUserId && task.asesor === session.name && task.agencia === session.agency)
  );
}

function renderCommercialDashboard() {
  const kpiContainer = document.querySelector("#commercialKpis");
  const chartContainer = document.querySelector("#commercialChart");
  const generalKpiContainer = document.querySelector("#commercialGeneralKpis");
  const generalChartContainer = document.querySelector("#commercialGeneralChart");
  const leadList = document.querySelector("#commercialLeadList");
  if (!kpiContainer || !chartContainer) return;

  const tasks = getCommercialTasks();
  const kpis = getKpis(tasks);
  renderKpiCards("#commercialKpis", [
    ["Mis solicitudes", kpis.total, "Registradas por tu usuario"],
    ["PEND Pendientes", kpis.pending, "Aun sin tomar"],
    ["En proceso", kpis.inProgress, "Tomadas por mesa"],
    ["Cerradas", kpis.completed, "Finalizadas"]
  ]);
  chartContainer.innerHTML = renderBarRows(groupByStatus(tasks), Math.max(tasks.length, 1));
  if (leadList) renderCommercialLeadList(leadList, tasks);
  if (generalKpiContainer && generalChartContainer) renderCommercialGeneralDashboard();
  renderCommercialRequests();
  renderCommercialControlSummary();
}

function renderCommercialGeneralDashboard() {
  const tasks = state.tasks;
  const kpis = getKpis(tasks);
  renderKpiCards("#commercialGeneralKpis", [
    ["Disponibles", kpis.unassigned, "Por tomar en mesa"],
    ["En proceso", kpis.inProgress, "Gestion legal activa"],
    ["Cerrados", kpis.completed, "Finalizados"],
    ["TIEMPO Prom. cierre", formatMinutes(kpis.avgCompletion), "Tomado a cerrado"]
  ]);
  document.querySelector("#commercialGeneralChart").innerHTML = renderBarRows(groupByStatus(tasks), Math.max(tasks.length, 1));
}

function renderCommercialLeadList(container, tasks) {
  const sorted = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
  if (!sorted.length) {
    container.innerHTML = `<div class="empty compact-empty"> Todavia no tienes solicitudes registradas.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="mini-list-head">
      <strong> Ultimas solicitudes</strong>
      <span>${tasks.length} en total</span>
    </div>
    ${sorted.map((task) => `
      <article class="commercial-lead-row">
        <div>
          <strong>${escapeHtml(task.placa || "Sin placa")}</strong>
          <span>${escapeHtml(task.cliente || "Cliente sin nombre")}</span>
        </div>
        <div>
          ${renderStatusPill(task.status)}
          <small>${formatDateTime(task.createdAt)}</small>
        </div>
      </article>
    `).join("")}
  `;
}

function getCommercialTasks() {
  const ownedTasks = session.role === "admin" ? state.tasks : state.tasks.filter((task) =>
    task.commercialUserId === session.userId ||
    (!task.commercialUserId && task.asesor === session.name && task.agencia === session.agency)
  );
  return filterTasksByCommercialProcess(ownedTasks);
}

function getCommercialOwnedTasks() {
  if (session.role === "admin") return state.tasks;
  return state.tasks.filter((task) =>
    task.commercialUserId === session.userId ||
    (!task.commercialUserId && task.asesor === session.name && task.agencia === session.agency)
  );
}

function getCommercialOperationalTasks(tasks = state.tasks) {
  return tasks.filter((task) => ["compra", "venta", "cuv"].includes(getTaskProcess(task)));
}

function isInfoRequestTask(task = {}) {
  return getTaskProcess(task) === "consulta-info";
}

function getCommercialInfoRequests(tasks = state.tasks) {
  return tasks.filter(isInfoRequestTask);
}

function renderCommercialDashboard() {
  const kpiContainer = document.querySelector("#commercialKpis");
  const chartContainer = document.querySelector("#commercialChart");
  const generalKpiContainer = document.querySelector("#commercialGeneralKpis");
  const generalChartContainer = document.querySelector("#commercialGeneralChart");
  const leadList = document.querySelector("#commercialLeadList");
  if (!kpiContainer || !chartContainer) return;

  const tasks = getCommercialOwnedTasks();
  const dashboardTasks = getCommercialOperationalTasks(tasks);
  const infoRequests = getCommercialInfoRequests(tasks);
  const purchaseTasks = filterTasksByCommercialProcess(dashboardTasks, "compra");
  const saleTasks = filterTasksByCommercialProcess(dashboardTasks, "venta");
  const cuvTasks = filterTasksByCommercialProcess(dashboardTasks, "cuv");
  const kpis = getKpis(dashboardTasks);
  const notificationTasks = getCommercialNotificationTasks(dashboardTasks);
  const title = document.querySelector("#commercial-dashboard-title");
  const lookupTitle = document.querySelector("#lookup-title");
  if (title) title.textContent = "Dashboard comercial integral";
  if (lookupTitle) lookupTitle.textContent = activeCommercialProcess === "venta" ? "Revisa el estatus de tus contratos" : "Revisa el estatus de tus saneamientos";
  if (commercialNotificationCount) {
    commercialNotificationCount.textContent = String(notificationTasks.filter((item) => !item.seen).length);
  }

  renderKpiCards("#commercialKpis", [
    ["Saneamientos", purchaseTasks.length, "Solicitudes de compra"],
    ["Contratos", saleTasks.length, "Tracking de compraventa"],
    ["CUV", cuvTasks.length, "Proceso comercial separado"],
    ["Info pendiente", infoRequests.filter((task) => task.infoAccessStatus !== "approved" && !isClosedStatus(task.status)).length, "Solicitudes por autorizar"],
    ["Total cerradas", kpis.completed, "Compra, venta y CUV"]
  ]);
  chartContainer.innerHTML = renderBarRows(groupByStatus(dashboardTasks), Math.max(dashboardTasks.length, 1));
  if (leadList) {
    leadList.hidden = true;
    leadList.innerHTML = "";
  }
  renderCommercialCuvList();
  renderCommercialTrackingBoard(purchaseTasks);
  if (generalKpiContainer && generalChartContainer) renderCommercialGeneralDashboard();
}

function renderCommercialCuvList() {
  if (!commercialCuvList) return;
  const cuvTasks = filterTasksByCommercialProcess(getCommercialOwnedTasks(), "cuv")
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
  if (!cuvTasks.length) {
    commercialCuvList.innerHTML = `<div class="empty compact-empty">Aun no tienes solicitudes CUV registradas.</div>`;
    return;
  }
  commercialCuvList.innerHTML = cuvTasks.slice(0, 8).map((task) => `
    <article class="commercial-lead-row">
      <div>
        <strong>${escapeHtml(task.placa || "Sin placa")}</strong>
        <span>${escapeHtml(task.cliente || "Titular sin nombre")}</span>
        <small>Orden: ${escapeHtml(task.cuvOrderNumber || "Pendiente")} | Solicitado: ${escapeHtml(formatDateTime(task.createdAt))}</small>
      </div>
      <div class="commercial-lead-actions">
        <span class="info-request-pending ${task.cuvPdfDataUrl ? "is-approved" : ""}">${escapeHtml(task.cuvStatus || "SOLICITADO")}</span>
        <button class="btn tiny secondary" type="button" data-commercial-ficha="${escapeHtml(task.id)}">Ver ficha</button>
        ${task.cuvPdfDataUrl ? `<button class="btn tiny primary" type="button" data-pdf-download="${escapeHtml(task.id)}">Descargar PDF</button>` : ""}
      </div>
    </article>
  `).join("");
}

function getCommercialTrackingStage(task = {}) {
  const status = normalizeLooseText(task.status);
  const statusOption = getStatusOption(task.status);
  const base = {
    statusColor: statusOption?.color || "#64748b",
    statusLabel: statusOption?.label || task.status || "Sin estatus"
  };
  if (task.signatureStatus === SIGNATURE_STATUS.completed) {
    return { ...base, key: "firma-finalizada", label: "Proceso finalizado", statusLabel: "Contratos firmados subidos a Pilot", className: "success", progress: 100, step: 9 };
  }
  if (task.signatureStatus === SIGNATURE_STATUS.pilotRequested) {
    return { ...base, key: "subir-firmados", label: "Subir firmados a Pilot", statusLabel: "Subida de firmados solicitada", className: "warning", progress: 88, step: 8 };
  }
  if (task.signatureStatus === SIGNATURE_STATUS.sent) {
    return { ...base, key: "firma-enviada", label: "Enviado a firmar", statusLabel: "Enviado a firmar exitoso", className: "success", progress: 76, step: 7 };
  }
  if (task.signatureStatus === SIGNATURE_STATUS.requested) {
    return { ...base, key: "firma-solicitada", label: "Firma solicitada", statusLabel: "Firma solicitada", className: "info", progress: 66, step: 6 };
  }
  if (status.includes("RECHAZ")) {
    return { ...base, key: "rechazado", label: "Rechazado por legal", className: "danger", progress: 44, step: 4 };
  }
  if (isClosedStatus(task.status)) {
    return { ...base, key: "saneamiento-pilot", label: "Saneamiento en Pilot", className: "success", progress: 55, step: 5 };
  }
  if (task.legalUserId || task.takenAt || status.includes("TOMADO")) {
    return { ...base, key: "gestion", label: "Gestion legal", className: "warning", progress: 44, step: 4 };
  }
  if (status.includes("PEND") || status.includes("ASIGNAR")) {
    return { ...base, key: "recibido", label: "Recibida por mesa", className: "info", progress: 22, step: 2 };
  }
  return { ...base, key: "enviado", label: "Solicitud enviada", className: "neutral", progress: 11, step: 1 };
}

function getCommercialTrackingTasks(tasks = []) {
  const query = commercialTrackingSearch.trim().toLowerCase();
  return tasks
    .filter((task) => getTaskProcess(task) === "compra")
    .filter((task) => commercialTrackingFilter === "todos" || getCommercialTrackingColumnKey(task) === commercialTrackingFilter)
    .filter((task) => isInsideDateRange(task.createdAt, commercialTrackingDateFrom, commercialTrackingDateTo))
    .filter((task) => {
      if (!query) return true;
      const haystack = [
        task.placa,
        task.cliente,
        task.cedula,
        task.agencia,
        task.asesor,
        task.legalAdvisor,
        task.tipoSaneamiento,
        task.tipoCompra,
        getSignatureDisplayStatus(task),
        task.status
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
}

function getCommercialTrackingColumnKey(task = {}) {
  const stage = getCommercialTrackingStage(task);
  const status = normalizeLooseText(task.status);
  if (stage.key === "rechazado" || status.includes("RECHAZ")) return "rechazado";
  if (stage.key === "firma-finalizada" || stage.key === "saneamiento-pilot" || isClosedStatus(task.status)) return "completado";
  if (["firma-solicitada", "firma-enviada", "subir-firmados"].includes(stage.key)) return "revision";
  if (stage.key === "gestion" || task.legalUserId || task.takenAt || status.includes("TOMADO")) return "proceso";
  return "pendiente";
}

function getCommercialTrackingColumns() {
  return [
    { key: "pendiente", label: "Pendiente", hint: "Solicitudes", icon: "⏱", color: "#98a2b3" },
    { key: "proceso", label: "En proceso", hint: "Solicitudes", icon: "◌", color: "#f97316" },
    { key: "revision", label: "En revision", hint: "Solicitud", icon: "▣", color: "#f5b400" },
    { key: "completado", label: "Completado", hint: "Solicitudes", icon: "✓", color: "#10996a" },
    { key: "rechazado", label: "Rechazado", hint: "Solicitud", icon: "×", color: "#ef3d35" }
  ];
}

function renderCommercialTrackingBoard(tasks = []) {
  const container = document.querySelector("#commercialTrackingBoard");
  if (!container) return;
  const purchaseTasks = tasks.filter((task) => getTaskProcess(task) === "compra");
  const visibleTasks = getCommercialTrackingTasks(purchaseTasks);
  const columns = getCommercialTrackingColumns();
  const counts = purchaseTasks.reduce((map, task) => {
    const key = getCommercialTrackingColumnKey(task);
    map[key] = (map[key] || 0) + 1;
    return map;
  }, {});
  const filters = [
    ["todos", "Todos", purchaseTasks.length],
    ...columns.map((column) => [column.key, column.label, counts[column.key] || 0])
  ];
  const visibleByColumn = columns.reduce((map, column) => {
    map[column.key] = visibleTasks.filter((task) => getCommercialTrackingColumnKey(task) === column.key);
    return map;
  }, {});
  const totalVisible = visibleTasks.length;
  const uniquePlates = new Set(visibleTasks.map((task) => normalizePlate(task.placa)).filter(Boolean)).size;
  container.innerHTML = `
    <div class="commercial-tracking-searchbar">
      <label>
        Buscar por placa, cliente, cedula o asesor
        <input type="search" data-commercial-tracking-search value="${escapeHtml(commercialTrackingSearch)}" placeholder="Buscar por placa, cliente, cedula o asesor">
      </label>
      <label>
        Estado
        <select data-commercial-tracking-status>
          ${filters.map(([key, label, count]) => `<option value="${escapeHtml(key)}" ${commercialTrackingFilter === key ? "selected" : ""}>${escapeHtml(label)} (${count})</option>`).join("")}
        </select>
      </label>
      <label>
        Desde
        <input type="date" data-commercial-tracking-from value="${escapeHtml(commercialTrackingDateFrom)}">
      </label>
      <label>
        Hasta
        <input type="date" data-commercial-tracking-to value="${escapeHtml(commercialTrackingDateTo)}">
      </label>
      <button class="btn secondary tiny" type="button" data-commercial-tracking-clear>Limpiar</button>
    </div>
    <div class="commercial-kanban-board">
      ${columns.map((column) => {
        const columnTasks = visibleByColumn[column.key] || [];
        return `
          <section class="commercial-kanban-column" style="--column-color:${column.color}">
            <header class="commercial-kanban-column-head">
              <span class="kanban-icon">${escapeHtml(column.icon)}</span>
              <div>
                <strong>${escapeHtml(column.label)}</strong>
                <small>${columnTasks.length} ${escapeHtml(column.hint.toLowerCase())}</small>
              </div>
            </header>
            <div class="commercial-kanban-cards">
              ${columnTasks.slice(0, 6).map(renderCommercialTrackingCard).join("") || `<div class="empty compact-empty">Sin registros.</div>`}
            </div>
            ${columnTasks.length > 6 ? `<button class="kanban-view-all" type="button" data-commercial-tracking-filter="${escapeHtml(column.key)}">Ver todas (${columnTasks.length})</button>` : ""}
          </section>
        `;
      }).join("")}
    </div>
    <div class="commercial-tracking-summary">
      <article><strong>${totalVisible}</strong><span>Total solicitudes</span></article>
      <article><strong>${counts.pendiente || 0}</strong><span>Pendientes</span></article>
      <article><strong>${counts.proceso || 0}</strong><span>En proceso</span></article>
      <article><strong>${counts.revision || 0}</strong><span>En revision</span></article>
      <article><strong>${counts.completado || 0}</strong><span>Completadas</span></article>
      <article><strong>${counts.rechazado || 0}</strong><span>Rechazadas</span></article>
      <article><strong>${uniquePlates}</strong><span>Placas unicas</span></article>
    </div>
  `;
}

function renderCommercialTrackingCard(task) {
  const stage = getCommercialTrackingStage(task);
  const columnKey = getCommercialTrackingColumnKey(task);
  const completedSteps = Math.max(0, Math.min(COMMERCIAL_TRACKING_STEPS.length, stage.step || 0));
  const totalSteps = COMMERCIAL_TRACKING_STEPS.length;
  return `
    <article class="commercial-tracking-card ${stage.className} is-${columnKey}" style="--tracking-color:${escapeHtml(stage.statusColor)}; --tracking-text:${getReadableTextColor(stage.statusColor)}">
      <div class="tracking-card-top">
        <div>
          <strong>${escapeHtml(task.placa || "Sin placa")}</strong>
          <span>${escapeHtml(task.cliente || "Cliente sin nombre")}</span>
        </div>
        <span class="tracking-state">${escapeHtml(stage.statusLabel)}</span>
      </div>
      <div class="tracking-meta-row">
        <span><b>Agencia</b>${escapeHtml(task.agencia || "Sin agencia")}</span>
        <span><b>Mesa</b>${escapeHtml(task.legalAdvisor || "Disponible")}</span>
        <span><b>Ingreso</b>${escapeHtml(formatDateTime(task.createdAt))}</span>
      </div>
      <div class="tracking-progress-head"><span>Progreso general</span><strong>${stage.progress}%</strong></div>
      <div class="tracking-progress"><i style="width:${stage.progress}%"></i></div>
      <div class="tracking-steps-count">Etapas <b>${completedSteps} de ${totalSteps}</b> completadas</div>
      <div class="tracking-timeline">
        ${COMMERCIAL_TRACKING_STEPS.map((step, index) => `<span class="${index + 1 < stage.step ? "done" : index + 1 === stage.step ? "current" : ""}">${escapeHtml(step.label)}</span>`).join("")}
      </div>
      <div class="tracking-card-actions">
        <small>${escapeHtml(formatLeadDuration(task))}</small>
        <button class="btn tiny secondary" type="button" data-commercial-ficha="${escapeHtml(task.id)}">Ver ficha</button>
        ${canCommercialResendTask(task) ? `<button class="btn tiny primary resend-btn" type="button" data-resend-commercial-task="${escapeHtml(task.id)}">Reenviar</button>` : ""}
        ${buildSignatureActionButtons(task)}
      </div>
    </article>
  `;
}

function renderCommercialGeneralDashboard() {
  const tasks = getCommercialOperationalTasks(state.tasks);
  const purchaseTasks = filterTasksByCommercialProcess(tasks, "compra");
  const saleTasks = filterTasksByCommercialProcess(tasks, "venta");
  const cuvTasks = filterTasksByCommercialProcess(tasks, "cuv");
  const kpis = getKpis(tasks);
  renderKpiCards("#commercialGeneralKpis", [
    ["Saneamientos", purchaseTasks.length, "Toda el area comercial"],
    ["Contratos", saleTasks.length, "Tracking compraventa"],
    ["CUV", cuvTasks.length, "Control CUV"],
    ["En proceso", kpis.inProgress, "Gestion legal activa"],
    ["Cerrados", kpis.completed, "Finalizados"]
  ]);
  document.querySelector("#commercialGeneralChart").innerHTML = renderBarRows(groupByStatus(tasks), Math.max(tasks.length, 1));
}

function getCommercialNotificationSeenMap() {
  try {
    return JSON.parse(localStorage.getItem(COMMERCIAL_NOTIFICATIONS_SEEN_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function setCommercialNotificationSeenMap(map) {
  try {
    localStorage.setItem(COMMERCIAL_NOTIFICATIONS_SEEN_KEY, JSON.stringify(map || {}));
  } catch {
    // Si el navegador bloquea localStorage, solo se pierde el visto local.
  }
}

function getCommercialNotificationKey(task) {
  return `${session.userId || "public"}::${task.id}::${task.status}::${task.updatedAt || task.completedAt || task.createdAt}`;
}

function isCommercialNotificationStatus(statusValue = "") {
  const status = normalizeLooseText(statusValue);
  return status.includes("APROB") ||
    status.includes("RECHAZ") ||
    status.includes("SUBSAN") ||
    status.includes("SANEAMIENTO REALIZADO") ||
    status.includes("SUBIDO A PILOT");
}

function getCommercialNotificationTasks(tasks = getCommercialOperationalTasks(getCommercialOwnedTasks())) {
  const seen = getCommercialNotificationSeenMap();
  return tasks
    .filter((task) => isCommercialNotificationStatus(task.status))
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .map((task) => ({
      task,
      key: getCommercialNotificationKey(task),
      seen: Boolean(seen[getCommercialNotificationKey(task)])
    }));
}

function openCommercialNotificationsModal() {
  if (!commercialNotificationsModal || !commercialNotificationsContent) return;
  const notifications = getCommercialNotificationTasks();
  if (!notifications.length) {
    commercialNotificationsContent.innerHTML = `<div class="empty compact-empty">No tienes notificaciones de estatus por revisar.</div>`;
  } else {
    commercialNotificationsContent.innerHTML = notifications.map(({ task, seen }) => `
      <article class="commercial-notification-item ${seen ? "is-seen" : ""}">
        <div>
          <strong>${escapeHtml(task.placa || "Sin placa")}</strong>
          <span>${escapeHtml(task.cliente || task.vendedor || "Sin cliente")}</span>
        </div>
        <div>
          ${renderStatusPill(task.status)}
          <small>${escapeHtml(formatDateTime(task.updatedAt || task.completedAt || task.createdAt))}</small>
        </div>
      </article>
    `).join("");
  }
  const seenMap = getCommercialNotificationSeenMap();
  notifications.forEach(({ key }) => { seenMap[key] = true; });
  setCommercialNotificationSeenMap(seenMap);
  openCommercialModal(commercialNotificationsModal);
  renderCommercialDashboard();
}

function getCommercialRequestFilteredTasks(statusView = activeCommercialRequestFilter) {
  const tasks = getCommercialOwnedTasks().filter((task) => ["compra", "venta"].includes(getTaskProcess(task)));
  if (statusView === "pendientes") {
    return tasks.filter((task) => ["pendiente", "por asignar"].includes(task.status));
  }
  if (statusView === "en-proceso") {
    return tasks.filter((task) => !["pendiente", "por asignar"].includes(task.status) && !isClosedStatus(task.status));
  }
  if (statusView === "cerradas") {
    return tasks.filter((task) => isClosedStatus(task.status));
  }
  return tasks;
}

function getCommercialRequestFilterLabel(statusView = activeCommercialRequestFilter) {
  const labels = {
    todos: "Todos mis registros",
    pendientes: "Solicitudes pendientes",
    "en-proceso": "Solicitudes en proceso",
    cerradas: "Solicitudes cerradas"
  };
  return labels[statusView] || labels.todos;
}

function renderCommercialKpiCardsMarkup(cards) {
  return `
    <div class="kpi-grid compact-kpis commercial-modal-kpis">
      ${cards.map(([label, value, hint]) => `
        <article class="kpi-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <small>${escapeHtml(hint)}</small>
        </article>
      `).join("")}
    </div>
    ${renderLegalObservationList(task)}
  `;
}

function openCommercialSidebarModal(area = "requests", options = {}) {
  if (!commercialSidebarModal || !commercialSidebarModalContent) return false;
  const statusView = options.statusView || "todos";
  let title = "Detalle comercial";
  let eyebrow = "Vista comercial";
  let subtitle = "";
  let content = "";

  if (area === "requests") {
    const filteredTasks = getCommercialRequestFilteredTasks(statusView);
    const purchaseTasks = filterTasksByCommercialProcess(filteredTasks, "compra");
    const saleTasks = filterTasksByCommercialProcess(filteredTasks, "venta");
    const kpis = getKpis(filteredTasks);
    title = statusView === "todos" ? "Registro completo" : getCommercialRequestFilterLabel(statusView);
    eyebrow = "Solicitudes comerciales";
    subtitle = `${filteredTasks.length} registro${filteredTasks.length === 1 ? "" : "s"} encontrado${filteredTasks.length === 1 ? "" : "s"}`;
    content = `
      ${renderCommercialKpiCardsMarkup([
        ["Registros", filteredTasks.length, "Segun seleccion lateral"],
        ["Pendientes", kpis.pending + kpis.unassigned, "Aun sin cierre"],
        ["En proceso", kpis.inProgress, "Tomadas por mesa"],
        ["Cerradas", kpis.completed, "Finalizadas"]
      ])}
      <section class="commercial-modal-section">
        <div class="mini-list-head">
          <strong>Saneamientos</strong>
          <span>${purchaseTasks.length} registro${purchaseTasks.length === 1 ? "" : "s"}</span>
        </div>
        <div class="commercial-modal-list">${renderCommercialRows(purchaseTasks, { detailed: true })}</div>
      </section>
      <section class="commercial-modal-section">
        <div class="mini-list-head">
          <strong>Contratos de compraventa</strong>
          <span>${saleTasks.length} registro${saleTasks.length === 1 ? "" : "s"}</span>
        </div>
        <div class="commercial-modal-list">${renderCommercialRows(saleTasks, { detailed: true })}</div>
      </section>
    `;
  } else if (area === "control") {
    const ownedTasks = getCommercialOwnedTasks();
    const tasks = getCommercialOperationalTasks(ownedTasks);
    const infoRequests = getCommercialInfoRequests(ownedTasks);
    const kpis = getKpis(tasks);
    title = "Carga de mesa";
    eyebrow = "Mesa de control";
    subtitle = "Resumen de tareas vinculadas a tus solicitudes";
    content = `
      ${renderCommercialKpiCardsMarkup([
        ["Mis tareas", tasks.length, "Compra, venta y CUV"],
        ["Pendientes", kpis.pending + kpis.unassigned, "Por asignar o tomar"],
        ["En proceso", kpis.inProgress, "Gestion activa"],
        ["Info solicitada", infoRequests.length, "Autorizaciones de placa"],
        ["Cerradas", kpis.completed, "Finalizadas"]
      ])}
      <section class="commercial-modal-section">
        <div class="mini-list-head">
          <strong>Distribucion por estatus</strong>
          <span>${tasks.length + infoRequests.length} movimiento${tasks.length + infoRequests.length === 1 ? "" : "s"}</span>
        </div>
        <div class="personal-chart commercial-modal-chart">
          ${renderBarRows(groupByStatus([...tasks, ...infoRequests]), Math.max(tasks.length + infoRequests.length, 1))}
        </div>
      </section>
      <section class="commercial-modal-section">
        <div class="mini-list-head">
          <strong>Detalle operativo</strong>
          <span>${tasks.length} registro${tasks.length === 1 ? "" : "s"}</span>
        </div>
        <div class="commercial-modal-list">${renderCommercialRows(tasks, { detailed: true })}</div>
      </section>
    `;
  } else {
    return false;
  }

  if (commercialSidebarModalTitle) commercialSidebarModalTitle.textContent = title;
  if (commercialSidebarModalEyebrow) commercialSidebarModalEyebrow.textContent = eyebrow;
  if (commercialSidebarModalSubtitle) commercialSidebarModalSubtitle.textContent = subtitle;
  commercialSidebarModalContent.innerHTML = content;
  openCommercialModal(commercialSidebarModal);
  return true;
}

function renderCommercialRequests() {
  const kpiContainer = document.querySelector("#commercialRequestsKpis");
  const listContainer = document.querySelector("#commercialRequestsList");
  const title = document.querySelector("#commercialRequestsTitle");
  const badge = document.querySelector("#commercialRequestsBadge");
  if (!kpiContainer || !listContainer) return;

  const tasks = getCommercialTasks();
  const filteredTasks = getCommercialRequestFilteredTasks();
  const purchaseTasks = filterTasksByCommercialProcess(filteredTasks, "compra");
  const saleTasks = filterTasksByCommercialProcess(filteredTasks, "venta");
  const kpis = getKpis(filteredTasks);
  if (title) title.textContent = activeCommercialRequestFilter === "todos" ? "Registro completo del asesor" : getCommercialRequestFilterLabel();
  if (badge) badge.textContent = `${filteredTasks.length} registro${filteredTasks.length === 1 ? "" : "s"}`;
  renderKpiCards("#commercialRequestsKpis", [
    ["Registros", filteredTasks.length, "Segun filtro seleccionado"],
    ["Pendientes", kpis.pending + kpis.unassigned, "Aun sin cierre"],
    ["En proceso", kpis.inProgress, "Tomadas por mesa"],
    ["Cerradas", kpis.completed, "Finalizadas"]
  ]);
  listContainer.innerHTML = `
    <div class="commercial-request-group">
      <div class="mini-list-head">
        <strong>SANEAMIENTOS</strong>
        <span>${purchaseTasks.length} registro${purchaseTasks.length === 1 ? "" : "s"}</span>
      </div>
      ${renderCommercialRows(purchaseTasks, { detailed: activeCommercialRequestFilter === "todos" })}
    </div>
    <div class="commercial-request-group">
      <div class="mini-list-head">
        <strong>CONTRATOS DE COMPRAVENTA</strong>
        <span>${saleTasks.length} registro${saleTasks.length === 1 ? "" : "s"}</span>
      </div>
      ${renderCommercialRows(saleTasks, { detailed: activeCommercialRequestFilter === "todos" })}
    </div>
  `;
}

function renderCommercialControlSummary() {
  const kpiContainer = document.querySelector("#commercialControlKpis");
  const chartContainer = document.querySelector("#commercialControlChart");
  if (!kpiContainer || !chartContainer) return;

  const ownedTasks = getCommercialOwnedTasks();
  const tasks = getCommercialOperationalTasks(ownedTasks);
  const infoRequests = getCommercialInfoRequests(ownedTasks);
  const kpis = getKpis(tasks);
  renderKpiCards("#commercialControlKpis", [
    ["Mis tareas", tasks.length, "Compra, venta y CUV"],
    ["Pendientes", kpis.pending + kpis.unassigned, "Por asignar o tomar"],
    ["En proceso", kpis.inProgress, "Gestion activa"],
    ["Info solicitada", infoRequests.length, "Autorizaciones de placa"],
    ["Cerradas", kpis.completed, "Finalizadas"]
  ]);
  chartContainer.innerHTML = renderBarRows(groupByStatus([...tasks, ...infoRequests]), Math.max(tasks.length + infoRequests.length, 1));
}

function renderCommercialLeadList(container, tasks, options = {}) {
  const limit = options.limit || 8;
  const sorted = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
  if (!sorted.length) {
    container.innerHTML = `<div class="empty compact-empty">Todavia no tienes registros en ${getCommercialProcessLabel().toLowerCase()}.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="mini-list-head">
      <strong>${activeCommercialProcess === "venta" ? "Ultimos contratos" : "Ultimas solicitudes"}</strong>
      <span>${tasks.length} en total</span>
    </div>
    ${sorted.map((task) => `
      <article class="commercial-lead-row">
        <div>
          <strong>${escapeHtml(task.placa || "Sin placa")}</strong>
          <span>${escapeHtml(activeCommercialProcess === "venta" ? (task.vendedor || task.cliente || "Vendedor sin nombre") : (task.cliente || "Cliente sin nombre"))}</span>
        </div>
        <div class="commercial-lead-actions">
          ${renderStatusPill(task.status)}
          <small>${formatDateTime(task.createdAt)}</small>
          <button class="btn tiny secondary" type="button" data-commercial-ficha="${escapeHtml(task.id)}">Ver ficha</button>
          ${canCommercialResendTask(task) ? `<button class="btn tiny primary resend-btn" type="button" data-resend-commercial-task="${escapeHtml(task.id)}">Reenviar</button>` : ""}
          ${buildSignatureActionButtons(task)}
        </div>
      </article>
    `).join("")}
  `;
}

function openLegalTaskModal(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task || !legalTaskModal || !legalTaskModalContent) return;
  const canTake = canLegalUserTakeTask(task);
  const lockedForLegal = isTaskStatusLockedForLegal(task);
  const canEdit = session.role === "admin" || (task.legalUserId === session.userId && !lockedForLegal);
  const canEditStatus = canEdit && !isSignatureTask(task);
  const sourceTask = isInfoRequestTask(task) ? state.tasks.find((item) => item.id === task.sourceTaskId) : null;
  if (legalTaskModalTitle) legalTaskModalTitle.textContent = `${task.placa || "Sin placa"} | ${isInfoRequestTask(task) ? "Solicitud de informacion" : getCommercialProcessLabel(getTaskProcess(task))}`;
  legalTaskModalContent.innerHTML = `
    <div class="legal-modal-summary">
      <div>
        <span>Cliente / registro</span>
        <strong>${escapeHtml(task.cliente || task.vendedor || task.sourceCliente || "Sin registro")}</strong>
      </div>
      <div>
        <span>Estatus</span>
        ${renderStatusPill(task.status)}
      </div>
      <div>
        <span>Asistente legal</span>
        <strong>${escapeHtml(task.legalAdvisor || "Disponible")}</strong>
      </div>
      <div>
        <span>Tiempo</span>
        <strong>${escapeHtml(formatLeadDuration(task))}</strong>
      </div>
    </div>
    ${renderLegalTaskFullDetails(task)}
    ${isCuvTask(task) && canEdit ? renderCuvLegalForm(task) : ""}
    ${sourceTask ? `
      <div class="legal-modal-source">
        <p class="eyebrow">Registro consultado</p>
        ${renderLegalTaskFullDetails(sourceTask)}
      </div>
    ` : ""}
    <div class="legal-modal-actions">
      ${canTake ? `<button class="btn primary" type="button" data-modal-take-task="${escapeHtml(task.id)}">Tomar tarea</button>` : ""}
      ${isSignatureTask(task) && canEdit ? `<button class="btn primary" type="button" data-complete-signature-task="${escapeHtml(task.id)}">${task.signatureStage === "subir-pilot" ? "Marcar subido a Pilot" : "Marcar enviado a firmar"}</button>` : ""}
      ${lockedForLegal ? `<span class="locked-note">Estatus bloqueado. Solicite correccion al administrador.</span>` : ""}
      ${canEditStatus ? `
        <label>
          Actualizar estatus
          <select data-modal-status-task="${escapeHtml(task.id)}">
            ${state.statusOptions.map((option) => `<option value="${escapeHtml(option.value)}" ${option.value === task.status ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
          </select>
        </label>
      ` : ""}
    </div>
  `;
  openLegalTaskInfoModal();
}

function openLegalTaskInfoModal() {
  if (!legalTaskModal) return;
  legalTaskModal.hidden = false;
  document.body.classList.add("has-modal");
}

function closeLegalTaskInfoModal() {
  if (!legalTaskModal) return;
  legalTaskModal.hidden = true;
  document.body.classList.remove("has-modal");
}

function renderCommercialRows(tasks, options = {}) {
  const sorted = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (!sorted.length) return `<div class="empty compact-empty">Sin registros para mostrar.</div>`;
  return sorted.map((task) => {
    const canResend = canCommercialResendTask(task);
    return `
    <article class="commercial-lead-row ${options.detailed ? "is-detailed" : ""}">
      <div>
        <strong>${escapeHtml(task.placa || "Sin placa")}</strong>
        <span>${escapeHtml(getTaskProcess(task) === "venta" ? (task.vendedor || task.cliente || "Vendedor sin nombre") : (task.cliente || "Cliente sin nombre"))}</span>
        ${options.detailed ? `
          <small>Agencia: ${escapeHtml(task.agencia || "Sin agencia")} | Asesor: ${escapeHtml(task.asesor || task.commercialUserName || "Sin asesor")}</small>
          <small>Cedula: ${escapeHtml(task.cedula || task.cedulaVendedor || "Sin registro")} | Tipo: ${escapeHtml(task.tipoSaneamiento || task.tipoCompra || getCommercialProcessLabel(getTaskProcess(task)))}</small>
          <small>Observacion: ${escapeHtml(task.observaciones || "Sin observaciones")}</small>
          ${getLatestLegalObservation(task) ? `<small>Observacion mesa: ${escapeHtml(getLatestLegalObservation(task).note)}</small>` : ""}
        ` : ""}
      </div>
      <div class="commercial-lead-actions">
        ${renderStatusPill(task.status)}
        <small>${formatDateTime(task.createdAt)}</small>
        <button class="btn tiny secondary" type="button" data-commercial-ficha="${escapeHtml(task.id)}">Ver ficha</button>
        ${canResend ? `<button class="btn tiny primary resend-btn" type="button" data-resend-commercial-task="${escapeHtml(task.id)}">Reenviar</button>` : ""}
        ${buildSignatureActionButtons(task)}
      </div>
    </article>
  `;
  }).join("");
}

function canCommercialResendTask(task = {}) {
  if (session.role !== "commercial" && session.role !== "admin") return false;
  if (getTaskProcess(task) !== "compra") return false;
  if (!ownsCommercialTask(task)) return false;
  const status = normalizeLooseText(task.status);
  const isRejected = status.includes("RECHAZADO") || status.includes("RECHAZ");
  if (!isRejected) return false;
  const rejectionKey = getCommercialRejectionKey(task);
  const alreadyResentThisRejection = task.lastResentRejectionKey === rejectionKey;
  const hasChildResend = state.tasks.some((item) => item.resendOf === task.id);
  return !alreadyResentThisRejection && !hasChildResend;
}

function getCommercialRejectionKey(task = {}) {
  return [
    normalizeLooseText(task.status || ""),
    task.statusLockedAt || task.updatedAt || task.completedAt || task.createdAt || "",
    task.legalUserId || "",
    task.legalAdvisor || ""
  ].join("|");
}

async function resendRejectedCommercialTask(taskId) {
  const source = state.tasks.find((task) => task.id === taskId);
  if (!source || !canCommercialResendTask(source)) {
    showToast("Solo se pueden reenviar saneamientos rechazados.");
    return;
  }
  const confirmed = window.confirm(`Desea reenviar la solicitud de la placa ${source.placa || "sin placa"} sin llenar nuevamente el formulario?`);
  if (!confirmed) return;
  const createdAt = new Date().toISOString();
  const rejectionKey = getCommercialRejectionKey(source);
  const task = {
    ...structuredClone(source),
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
    takenAt: "",
    completedAt: "",
    status: "pendiente",
    legalUserId: "",
    legalAdvisor: "",
    statusLockedAt: "",
    statusLockedBy: "",
    statusLockedByName: "",
    parentTaskId: source.parentTaskId || source.id,
    resendOf: source.id,
    resendCount: Number(source.resendCount || 0) + 1,
    duplicateWarnings: getDuplicateWarnings(source, source.id),
    lastResentRejectionKey: "",
    lastResentAt: "",
    observaciones: `${source.observaciones || ""}${source.observaciones ? " | " : ""}REENVIO COMERCIAL POR RECHAZO LEGAL ${formatDateTime(createdAt)}`,
    syncStatus: "pending",
    syncAction: "reenviar-rechazado"
  };
  autoAssignSaneamientoTask(task);
  source.lastResentRejectionKey = rejectionKey;
  source.lastResentAt = createdAt;
  source.updatedAt = createdAt;
  source.syncStatus = "pending";
  source.syncAction = "marcar-reenvio-usado";
  state.tasks.push(task);
  saveState();
  renderAll();
  showToast("Solicitud reenviada a mesa de control.");
  const [sourceSaved, onlineSaved] = await Promise.all([
    guardarTareaSupabase(source, "marcar-reenvio-usado"),
    guardarTareaSupabase(task, "reenviar-rechazado")
  ]);
  saveState();
  if (!sourceSaved || !onlineSaved) showToast("Reenvio guardado localmente. Pendiente de sincronizar.");
}

function renderControlDashboard() {
  const container = document.querySelector("#controlKpis");
  if (!container) return;
  const tasks = session.role === "legal"
    ? state.tasks.filter((task) => canLegalUserSeeTask(task))
    : state.tasks;
  const allVisibleLegalTasks = session.role === "legal"
    ? state.tasks.filter((task) => canLegalUserSeeTask(task))
    : state.tasks;
  const pendingSignatureSends = allVisibleLegalTasks.filter((task) =>
    isSignatureTask(task) &&
    task.signatureStage === "envio-firma" &&
    !isClosedStatus(task.status)
  ).length;
  const pendingSaneamientoAssignment = allVisibleLegalTasks.filter((task) =>
    getTaskMailbox(task) === "saneamientos" &&
    !task.legalUserId &&
    !isClosedStatus(task.status)
  ).length;
  const user = currentLegalUser();
  if (legalSessionLabel && user) {
    const labels = normalizeLegalMailboxes(user.mailboxes)
      .map((mailbox) => LEGAL_MAILBOXES.find((item) => item.id === mailbox)?.label || mailbox)
      .join(" + ");
    legalSessionLabel.textContent = `Asistente: ${user.name} | Buzon: ${labels}`;
  }
  const kpis = getKpis(tasks);
  renderKpiCards("#controlKpis", [
    ["Firmas pendientes", pendingSignatureSends, "Por enviar a firma"],
    ["Saneamientos por asignar", pendingSaneamientoAssignment, "Sin asesor legal"],
    ["Disponibles", kpis.unassigned, "Sin tomar"],
    [" Tomados", kpis.inProgress, "En mesa"],
    ["Cerrados", kpis.completed, "Finalizados"],
    [" Placas unicas", kpis.uniquePlates, "Vehiculos"]
  ]);
}

function renderManagerDashboard() {
  const tasks = state.tasks;
  const kpis = getKpis(tasks);
  renderKpiCards("#managerKpis", [
    ["INFO Total saneamientos", kpis.total, "Operacion completa"],
    ["PLACA Placas unicas", kpis.uniquePlates, "Vehiculos sin repetir"],
    ["PEND Pendientes", kpis.pending, "Sin tomar"],
    ["ESTATUS Tomados / proceso", kpis.inProgress, "En gestion"],
    ["OK Cerrados", kpis.completed, "Estatus de cierre"],
    ["! Duplicados", kpis.duplicates, "Alertas de placa/cliente"],
    ["TIEMPO Prom. toma", formatMinutes(kpis.avgTake), "Ingreso a tomado"],
    ["TIEMPO Prom. cierre", formatMinutes(kpis.avgCompletion), "Tomado a cerrado"],
    ["INFO Cerrados hoy", kpis.completedToday, "Resultado del dia"]
  ]);

  const hero = document.querySelector("#managerHeroMetric");
  if (hero) {
    hero.innerHTML = `<span>Efectividad de cierre</span><strong>${kpis.total ? Math.round((kpis.completed / kpis.total) * 100) : 0}%</strong><small>${kpis.completed} de ${kpis.total} saneamientos</small>`;
  }

  document.querySelector("#managerStatusChart").innerHTML = renderBarRows(groupByStatus(tasks), Math.max(tasks.length, 1));
  document.querySelector("#managerAgencyChart").innerHTML = renderBarRows(groupByField(tasks, "agencia"), Math.max(tasks.length, 1));
  document.querySelector("#managerLegalChart").innerHTML = renderBarRows(groupByField(tasks, "legalAdvisor", "Disponible"), Math.max(tasks.length, 1));
  document.querySelector("#managerRiskPanel").innerHTML = `
    <article><strong>${kpis.duplicates}</strong><span>Duplicados detectados</span></article>
    <article><strong>${state.tasks.filter((task) => !task.legalUserId && task.status === "pendiente").length}</strong><span>Leads esperando mesa</span></article>
    <article><strong>${formatMinutes(kpis.avgCompletion)}</strong><span>Promedio tomado a cerrado</span></article>
  `;
  renderManagerDetails(tasks);
}

function renderManagerDetails(tasks) {
  const container = document.querySelector("#managerDetailList");
  if (!container) return;
  const detailCount = document.querySelector("#managerDetailCount");
  const filtered = getManagerFilteredDetails(tasks);
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 80);
  if (detailCount) {
    detailCount.textContent = `${filtered.length} ${filtered.length === 1 ? "registro" : "registros"}`;
  }
  if (!sorted.length) {
    container.innerHTML = `<div class="empty compact-empty"> No hay saneamientos con esos filtros.</div>`;
    return;
  }
  container.innerHTML = `
    <div class="detail-header">
      <span><span class="mono-icon">PLACA</span> Placa</span><span><span class="mono-icon">AGENCIA</span> Agencia</span><span><span class="mono-icon">ASESOR</span> Asesor</span><span><span class="mono-icon">ESTATUS</span> Estatus</span><span><span class="mono-icon">INFO</span> Fecha</span>
    </div>
    ${sorted.map((task) => `
      <article class="detail-row">
        <strong>${escapeHtml(task.placa)}</strong>
        <span>${escapeHtml(task.agencia || "Sin agencia")}</span>
        <span>${escapeHtml(task.asesor || "Sin asesor")}</span>
        <span>${renderStatusPill(task.status)}</span>
        <span>${formatDateTime(task.createdAt)}</span>
      </article>
    `).join("")}
    ${filtered.length > sorted.length ? `<div class="detail-limit-note">Mostrando los ultimos ${sorted.length} de ${filtered.length} registros filtrados.</div>` : ""}
  `;
}

function getManagerFilteredDetails(tasks) {
  const plateQuery = normalizePlate(managerDetailFilters.plate);
  return tasks
    .filter((task) => isInsideDateRange(task.createdAt, managerDetailFilters.from, managerDetailFilters.to))
    .filter((task) => !plateQuery || normalizePlate(task.placa).includes(plateQuery))
    .filter((task) => !managerDetailFilters.advisor || task.asesor === managerDetailFilters.advisor)
    .filter((task) => !managerDetailFilters.agency || task.agencia === managerDetailFilters.agency);
}

function groupByStatus(tasks) {
  return state.statusOptions.map((status) => ({
    label: status.label,
    color: status.color,
    value: tasks.filter((task) => task.status === status.value).length
  })).filter((item) => item.value > 0);
}

function groupByField(tasks, field, fallback = "Sin dato") {
  const map = new Map();
  tasks.forEach((task) => {
    const key = task[field] || fallback;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].map(([label, value]) => ({ label, value, color: state.theme.primary })).sort((a, b) => b.value - a.value).slice(0, 8);
}

function renderBarRows(items, total) {
  if (!items.length) return `<div class="empty compact-empty">No hay datos para graficar.</div>`;
  return items.map((item) => {
    const width = Math.max(4, Math.round((item.value / total) * 100));
    return `
      <div class="bar-row">
        <div><span>${escapeHtml(item.label)}</span><strong>${item.value}</strong></div>
        <i><b style="width:${width}%; background:${escapeHtml(item.color)}"></b></i>
      </div>
    `;
  }).join("");
}

function getAdminFilteredTasks() {
  return state.tasks
    .filter((task) => !adminFilters.legal || task.legalUserId === adminFilters.legal)
    .filter((task) => !adminFilters.commercial || task.asesor === adminFilters.commercial)
    .filter((task) => !adminFilters.agency || task.agencia === adminFilters.agency)
    .filter((task) => !adminFilters.status || task.status === adminFilters.status)
    .filter((task) => isInsideDateRange(task.createdAt, adminFilters.from, adminFilters.to));
}

function renderAdminLeads() {
  if (!adminLeadsList || !adminLeadCount) return;
  const tasks = getAdminFilteredTasks().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  adminLeadCount.textContent = `${tasks.length} ${tasks.length === 1 ? "lead" : "leads"}`;

  if (!tasks.length) {
    adminLeadsList.innerHTML = `<div class="empty compact-empty">No hay leads con los filtros actuales.</div>`;
    return;
  }

  adminLeadsList.innerHTML = tasks.map((task) => `
    <article class="admin-lead-row" data-admin-lead="${escapeHtml(task.id)}">
      <div>
        <strong>${escapeHtml(task.placa || "Sin placa")}</strong>
        <span>${escapeHtml(task.cliente || "Cliente sin nombre")}</span>
      </div>
      <span>${escapeHtml(task.agencia || "Sin agencia")}</span>
      <span>${escapeHtml(task.asesor || "Sin asesor")}</span>
      <span>${formatDateTime(task.createdAt)}</span>
      ${renderStatusPill(task.status)}
      <div class="row-actions compact-actions">
        <button class="btn secondary" type="button" data-edit-lead="${escapeHtml(task.id)}">Editar</button>
        <button class="btn danger" type="button" data-delete-lead="${escapeHtml(task.id)}">Borrar</button>
      </div>
    </article>
  `).join("");

  adminLeadsList.querySelectorAll("[data-edit-lead]").forEach((button) => {
    button.addEventListener("click", () => openAdminLeadEditor(button.dataset.editLead));
  });

  adminLeadsList.querySelectorAll("[data-delete-lead]").forEach((button) => {
    button.addEventListener("click", () => deleteAdminLead(button.dataset.deleteLead));
  });
}

function renderOptionsMarkup(options, selectedValue = "", placeholder = "Seleccione") {
  return `<option value="">${escapeHtml(placeholder)}</option>${options.map((option) =>
    `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(option)}</option>`
  ).join("")}`;
}

function renderAdvisorOptionsMarkup(selectedValue = "") {
  return `<option value="">Seleccione asesor</option>${state.commercialAdvisors.map((advisor) =>
    `<option value="${escapeHtml(advisor.name)}" ${advisor.name === selectedValue ? "selected" : ""}>${escapeHtml(advisor.name)}${advisor.agency ? ` - ${escapeHtml(advisor.agency)}` : ""}</option>`
  ).join("")}`;
}

function renderStatusOptionsMarkup(selectedValue = "") {
  return state.statusOptions.map((status) =>
    `<option value="${escapeHtml(status.value)}" ${status.value === selectedValue ? "selected" : ""}>${escapeHtml(status.label)}</option>`
  ).join("");
}

function renderLegalUserOptionsMarkup(selectedValue = "", task = null) {
  const users = task ? getEligibleLegalUsersForTask(task) : normalizeLegalUsers(state.legalUsers || []);
  return `<option value="">Disponible / sin asignar</option>${users.map((user) =>
    `<option value="${escapeHtml(user.id)}" ${user.id === selectedValue ? "selected" : ""}>${escapeHtml(user.name)}</option>`
  ).join("")}`;
}

function openAdminLeadEditor(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || !adminLeadModal || !adminLeadForm) return;
  adminLeadForm.elements.agencia.innerHTML = renderOptionsMarkup(state.agencies, task.agencia, "Seleccione agencia");
  adminLeadForm.elements.asesor.innerHTML = renderAdvisorOptionsMarkup(task.asesor);
  adminLeadForm.elements.tipoCompra.innerHTML = renderOptionsMarkup(state.purchaseTypes, task.tipoCompra, "Seleccione tipo");
  adminLeadForm.elements.tipoSaneamiento.innerHTML = renderOptionsMarkup(state.sanitationTypes, task.tipoSaneamiento, "Seleccione saneamiento");
  adminLeadForm.elements.status.innerHTML = renderStatusOptionsMarkup(task.status);
  adminLeadForm.elements.legalUserId.innerHTML = renderLegalUserOptionsMarkup(task.legalUserId, task);

  adminLeadForm.elements.id.value = task.id;
  adminLeadForm.elements.cliente.value = task.cliente || "";
  adminLeadForm.elements.cedula.value = task.cedula || "";
  adminLeadForm.elements.placa.value = task.placa || "";
  adminLeadForm.elements.valorToma.value = task.valorToma || "";
  adminLeadForm.elements.kilometraje.value = task.kilometraje || "";
  adminLeadForm.elements.ciudad.value = task.ciudad || "";
  adminLeadForm.elements.observaciones.value = task.observaciones || "";
  if (adminLeadModalTitle) adminLeadModalTitle.textContent = `Modificar lead ${task.placa || ""}`;
  if (adminLeadTimeInfo) adminLeadTimeInfo.textContent = `Tomado: ${formatDateTime(task.takenAt)} | Cerrado: ${formatDateTime(task.completedAt)}`;
  adminLeadModal.hidden = false;
}

function closeAdminLeadEditor() {
  if (!adminLeadModal || !adminLeadForm) return;
  adminLeadModal.hidden = true;
  adminLeadForm.reset();
}

function saveAdminLead(id, card) {
  if (session.role !== "admin") return;
  const task = state.tasks.find((item) => item.id === id);
  if (!task || !card) return;

  const data = Object.fromEntries(new FormDataLike(card).entries());
  const legalUser = state.legalUsers.find((user) => user.id === data.legalUserId);
  const commercialOwner = state.commercialAdvisors.find((advisor) => advisor.name === data.asesor && advisor.agency === data.agencia)
    || state.commercialAdvisors.find((advisor) => advisor.name === data.asesor);

  Object.assign(task, {
    cliente: data.cliente.trim(),
    cedula: normalizeId(data.cedula),
    placa: normalizePlate(data.placa),
    valorToma: data.valorToma,
    kilometraje: data.kilometraje,
    ciudad: data.ciudad.trim(),
    agencia: data.agencia,
    asesor: data.asesor,
    tipoCompra: data.tipoCompra,
    tipoSaneamiento: data.tipoSaneamiento,
    status: data.status,
    legalUserId: data.legalUserId,
    legalAdvisor: legalUser?.name || "",
    commercialUserId: commercialOwner?.id || task.commercialUserId || "",
    commercialUserName: commercialOwner?.name || data.asesor,
    commercialAgency: commercialOwner?.agency || data.agencia,
    observaciones: data.observaciones.trim(),
    agencyAdvisorKey: `${data.agencia}::${data.asesor}`
  });

  if (task.status === "tomado" && !task.takenAt) task.takenAt = new Date().toISOString();
  if (isClosedStatus(task.status) && !task.completedAt) {
    if (!task.takenAt) task.takenAt = new Date().toISOString();
    task.completedAt = new Date().toISOString();
  }
  if (!isClosedStatus(task.status)) task.completedAt = "";
  task.duplicateWarnings = getDuplicateWarnings(task, task.id);
  task.updatedAt = new Date().toISOString();
  task.syncStatus = "pending";
  task.syncAction = "editar-admin";

  saveState();
  renderAll();
  closeAdminLeadEditor();
  showToast("Lead actualizado.");
  guardarTareaSupabase(task, "editar-admin").then((ok) => {
    saveState();
    if (!ok) showToast("Edicion guardada localmente. Quedo pendiente de sincronizar.");
  });
}

function deleteAdminLead(id) {
  if (session.role !== "admin") return;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  const confirmed = window.confirm(`Va a borrar definitivamente el lead ${task.placa || ""}. Esta accion no se puede deshacer. Desea continuar?`);
  if (!confirmed) return;
  const deletedAt = new Date().toISOString();
  const deletion = {
    id: task.id,
    placa: task.placa || "",
    processType: task.processType || "compra",
    deleted: true,
    deletedAt,
    updatedAt: deletedAt,
    deletedBy: session.name || "Administrador",
    syncStatus: "pending",
    syncAction: "eliminar"
  };
  state.taskDeletions = (state.taskDeletions || []).filter((item) => item.id !== id);
  state.taskDeletions.push(deletion);
  state.tasks = state.tasks.filter((item) => item.id !== id);
  saveState();
  renderAll();
  showToast("Lead borrado y sincronizando.");
  guardarEliminacionTareaSupabase(deletion).then((ok) => {
    saveState();
    if (!ok) showToast("Lead borrado localmente. La eliminacion se sincronizara al recuperar conexion.");
  });
}

function exportDataBackup() {
  const payload = {
    app: "Autocor Control Legal",
    exportedAt: new Date().toISOString(),
    state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = URL.createObjectURL(blob);
  link.download = `autocor-control-legal-respaldo-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showToast("Respaldo exportado.");
}

function importDataBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(reader.result);
      const importedState = parsed.state || parsed;
      if (!importedState || !Array.isArray(importedState.tasks)) {
        showToast("El archivo no parece ser un respaldo valido.");
        return;
      }
      const confirmed = window.confirm("Esto reemplazara leads, usuarios, catalogos y configuracion actuales. Desea restaurar este respaldo?");
      if (!confirmed) return;
      replaceState(importedState);
      showToast("Respaldo restaurado.");
    } catch {
      showToast("No se pudo leer el respaldo.");
    } finally {
      importDataInput.value = "";
    }
  });
  reader.readAsText(file);
}

function parsePurchaseInput(text, source = "PEGADO") {
  const rows = parseDelimitedText(text);
  if (rows.length < 1) return [];
  const firstRowKeys = rows[0].map(normalizeHeaderKey);
  const hasHeader = firstRowKeys.some((key) => key === "PLACA") && firstRowKeys.some((key) => key.includes("AGENCIA"));
  const headers = hasHeader ? rows.shift() : PURCHASE_COLUMNS;
  const headerMap = headers.map((header, index) => {
    const key = normalizeHeaderKey(header);
    const column = PURCHASE_COLUMNS.find((item) => normalizeHeaderKey(item) === key) || PURCHASE_COLUMNS[index] || key;
    return column;
  });
  const importMonth = normalizeLooseText(purchaseMonthInput?.value || "");

  return rows
    .filter((row) => row.some((cell) => normalizeLooseText(cell)))
    .map((row) => {
      const record = {
        id: crypto.randomUUID(),
        importedAt: new Date().toISOString(),
        importMonth,
        source
      };
      PURCHASE_COLUMNS.forEach((column) => {
        record[column] = "";
      });
      row.forEach((cell, index) => {
        const column = headerMap[index];
        if (PURCHASE_COLUMNS.includes(column)) record[column] = column === "PLACA" ? normalizePlate(cell) : normalizeLooseText(cell);
      });
      return normalizePurchaseRecord(record);
    });
}

function parseDelimitedText(text) {
  const source = String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const firstLine = source.split("\n").find((line) => line.trim()) || "";
  const delimiter = firstLine.includes("\t") ? "\t" : firstLine.includes(";") ? ";" : ",";
  const rows = [];
  let row = [];
  let current = "";
  let inQuotes = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else if (char === "\n" && !inQuotes) {
      row.push(current.trim());
      if (row.some((cell) => normalizeLooseText(cell))) rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }
  row.push(current.trim());
  if (row.some((cell) => normalizeLooseText(cell))) rows.push(row);
  return rows;
}

function parseDelimitedLine(line, delimiter) {
  const cells = [];
  let current = "";
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells;
}

async function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsArrayBuffer(file);
  });
}

async function inflateZipEntry(bytes, method) {
  if (method === 0) return bytes;
  if (method !== 8 || typeof DecompressionStream === "undefined") {
    throw new Error("Formato de Excel no soportado por este navegador.");
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function readZipEntries(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  let eocdOffset = -1;
  for (let index = bytes.length - 22; index >= Math.max(0, bytes.length - 66000); index -= 1) {
    if (view.getUint32(index, true) === 0x06054b50) {
      eocdOffset = index;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error("No se pudo leer el archivo Excel.");
  const entryCount = view.getUint16(eocdOffset + 10, true);
  let centralOffset = view.getUint32(eocdOffset + 16, true);
  const decoder = new TextDecoder("utf-8");
  const entries = new Map();
  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(centralOffset, true) !== 0x02014b50) break;
    const method = view.getUint16(centralOffset + 10, true);
    const compressedSize = view.getUint32(centralOffset + 20, true);
    const nameLength = view.getUint16(centralOffset + 28, true);
    const extraLength = view.getUint16(centralOffset + 30, true);
    const commentLength = view.getUint16(centralOffset + 32, true);
    const localOffset = view.getUint32(centralOffset + 42, true);
    const name = decoder.decode(bytes.slice(centralOffset + 46, centralOffset + 46 + nameLength));
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = bytes.slice(dataStart, dataStart + compressedSize);
    entries.set(name, await inflateZipEntry(compressed, method));
    centralOffset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function getXmlText(entries, path) {
  const bytes = entries.get(path);
  return bytes ? new TextDecoder("utf-8").decode(bytes) : "";
}

function parseXml(text) {
  return new DOMParser().parseFromString(text, "application/xml");
}

function columnIndexFromCellRef(ref) {
  const letters = String(ref || "").match(/[A-Z]+/i)?.[0] || "A";
  return [...letters.toUpperCase()].reduce((total, letter) => (total * 26) + letter.charCodeAt(0) - 64, 0) - 1;
}

function readXlsxCell(cell, sharedStrings) {
  const type = cell.getAttribute("t");
  if (type === "inlineStr") return cell.querySelector("is t")?.textContent || "";
  const value = cell.querySelector("v")?.textContent || "";
  if (type === "s") return sharedStrings[Number(value)] || "";
  return value;
}

async function xlsxFileToDelimitedText(file) {
  const entries = await readZipEntries(await fileToArrayBuffer(file));
  const sharedXml = getXmlText(entries, "xl/sharedStrings.xml");
  const sharedStrings = sharedXml
    ? [...parseXml(sharedXml).querySelectorAll("si")].map((item) => [...item.querySelectorAll("t")].map((node) => node.textContent || "").join(""))
    : [];
  const workbookXml = getXmlText(entries, "xl/workbook.xml");
  const relsXml = getXmlText(entries, "xl/_rels/workbook.xml.rels");
  const workbook = parseXml(workbookXml);
  const rels = parseXml(relsXml);
  const firstSheet = workbook.querySelector("sheet");
  const relId = firstSheet?.getAttribute("r:id");
  const rel = relId ? [...rels.querySelectorAll("Relationship")].find((item) => item.getAttribute("Id") === relId) : null;
  const target = rel?.getAttribute("Target") || "worksheets/sheet1.xml";
  const sheetPath = `xl/${target.replace(/^\/?xl\//, "")}`;
  const sheetXml = getXmlText(entries, sheetPath);
  if (!sheetXml) throw new Error("No se encontro la primera hoja del Excel.");
  const sheet = parseXml(sheetXml);
  const rows = [...sheet.querySelectorAll("sheetData row")].map((row) => {
    const cells = [];
    [...row.querySelectorAll("c")].forEach((cell) => {
      cells[columnIndexFromCellRef(cell.getAttribute("r"))] = readXlsxCell(cell, sharedStrings);
    });
    return cells.map((cell) => cell || "");
  });
  return rows.map((row) => row.join("\t")).join("\n");
}

function addPurchaseRecords(records) {
  if (!records.length) {
    showToast("No se encontraron filas para procesar.");
    return;
  }
  const importMonth = normalizeLooseText(purchaseMonthInput?.value || records[0]?.importMonth || "");
  if (!importMonth) {
    showToast("Seleccione el mes al que corresponde la carga antes de procesar.");
    purchaseMonthInput?.focus();
    return;
  }
  const load = {
    id: crypto.randomUUID(),
    month: importMonth,
    source: records[0]?.source || "MANUAL",
    importedAt: new Date().toISOString(),
    recordCount: records.length
  };
  if (!state.dataProcessing.loads) state.dataProcessing.loads = [];
  state.dataProcessing.loads.push(load);
  records = records.map((record) => normalizePurchaseRecord({
    ...record,
    importMonth,
    loadId: load.id,
    loadLabel: `${importMonth} | ${load.source}`
  }));
  state.dataProcessing.compras.push(...records);
  purchaseFilters = { ...purchaseFilters, month: importMonth, loadId: load.id };
  if (purchaseMonthFilter) purchaseMonthFilter.value = importMonth;
  if (purchaseLoadFilter) purchaseLoadFilter.value = load.id;
  saveState();
  renderPurchaseProcessing();
  showToast(`${records.length} registros procesados para ${formatMonthLabel(importMonth)}.`);
}

function getPurchaseStats() {
  const records = getFilteredPurchaseRecords();
  const plateCounts = new Map();
  const movement = {
    pagoApproved: 0,
    pagoRejected: 0,
    salidaApproved: 0,
    salidaRejected: 0
  };
  records.forEach((record) => {
    const plate = record.PLACA;
    if (plate) plateCounts.set(plate, (plateCounts.get(plate) || 0) + 1);
    const flags = getPurchaseStatusFlags(record);
    if (flags.pagoApproved) movement.pagoApproved += 1;
    if (flags.pagoRejected) movement.pagoRejected += 1;
    if (flags.salidaApproved) movement.salidaApproved += 1;
    if (flags.salidaRejected) movement.salidaRejected += 1;
  });
  const duplicates = [...plateCounts.entries()].filter(([, count]) => count > 1);
  return {
    total: records.length,
    uniquePlates: plateCounts.size,
    duplicatePlates: duplicates.length,
    repeatedRows: duplicates.reduce((sum, [, count]) => sum + count, 0),
    duplicates,
    ...movement
  };
}

function renderPurchaseProcessing() {
  renderPurchaseFilterOptions();
  renderPurchaseFilterPresets();
  renderPurchaseLoadReport();
  updatePurchaseMonthHint();
  const records = getFilteredPurchaseRecords();
  const stats = getPurchaseStats();
  const count = document.querySelector("#purchaseRecordCount");
  const allRecords = state.dataProcessing?.compras || [];
  if (count) count.textContent = `${records.length} de ${allRecords.length} registros`;
  renderPurchaseExecutiveCards(records, stats);
  renderPurchaseExecutiveDashboard(records, stats);
  renderPurchaseCoordinatorProductivity(records);
  renderPurchaseStatusModules(records);
  renderPurchasePlainAnalysis(records, stats);
  renderPurchaseDuplicates(records);
  renderPurchaseAdvisorReport(records);
  renderPurchaseReports(records);
  renderPurchaseSimilarities(records);
  renderPurchasePendingApprovalSummary(records);
  renderPurchaseAdvisorDashboard(records);
}

function renderPurchasePlainAnalysis(records, stats) {
  const container = document.querySelector("#purchasePlainAnalysis");
  if (!container) return;
  const summary = getPurchaseOperationalSummary(records);
  const dailyAudit = purchaseFilters.date ? getPurchaseDailyAudit(records) : null;
  if (!records.length) {
    container.innerHTML = `
      <div class="analysis-copy">
        <p class="eyebrow">Analisis ejecutivo</p>
        <h3>Sin base cargada</h3>
        <p>Seleccione el mes, cargue el archivo y el sistema generara una lectura operativa automatica.</p>
      </div>
      ${dailyAudit ? renderPurchaseDailyAudit(dailyAudit) : ""}
    `;
    bindPurchaseDailyAuditActions(container);
    return;
  }
  const unique = summary.allPlates.length;
  const approved = summary.approvedPlates.length;
  const pendingApproval = summary.pendingApproval.length;
  const pendingReview = summary.pendingReview.length;
  const riskMedium = summary.riskMediumPending.length;
  const pendingDuplicates = summary.pendingDuplicates.length;
  const reconciled = approved + pendingApproval + pendingReview;
  const isBalanced = unique === reconciled;
  const urgentText = pendingApproval
    ? `Primero revise las ${pendingApproval} placas en "Falta aprobar", porque ya tuvieron rechazo y aun no tienen aprobacion posterior.`
    : "No hay placas rechazadas pendientes de aprobacion.";
  const reviewText = pendingReview
    ? `Despues revise las ${pendingReview} placas pendientes por revisar, porque no tienen un estado claro de aprobado o rechazado.`
    : "No hay placas sin estado claro.";

  const action = pendingApproval
    ? `Atender ${pendingApproval} placas en falta aprobar.`
    : pendingReview
      ? `Revisar ${pendingReview} placas sin estado claro.`
      : "La operacion no muestra alertas criticas.";
  container.innerHTML = `
    <div class="analysis-copy">
      <p class="eyebrow">Analisis ejecutivo</p>
      <h3>Resumen entendible de la carga</h3>
      <p>Con los filtros actuales hay <b>${stats.total}</b> solicitudes del Excel. Al unir placas repetidas, quedan <b>${unique}</b> vehiculos reales para gestionar.</p>
    </div>
    <div class="plain-equation">
      <span class="eq-ok"><b>${approved}</b> aprobadas</span>
      <i>+</i>
      <span class="eq-alert"><b>${pendingApproval}</b> falta aprobar</span>
      <i>+</i>
      <span class="eq-warn"><b>${pendingReview}</b> por revisar</span>
      <i>=</i>
      <span class="eq-total"><b>${reconciled}</b> clasificadas</span>
    </div>
    <div class="analysis-actions">
      <article class="${isBalanced ? "analysis-ok" : "analysis-alert"}">
        <strong>${isBalanced ? "Conciliacion correcta" : "Conciliacion por revisar"}</strong>
        <span>${isBalanced ? `Las ${unique} placas estan clasificadas sin descuadre.` : `Hay ${unique} placas, pero la clasificacion suma ${reconciled}.`}</span>
      </article>
      <article>
        <strong>Prioridad</strong>
        <span>${escapeHtml(action)}</span>
      </article>
      <article>
        <strong>Riesgo medio</strong>
        <span>${riskMedium ? `${riskMedium} placas deben quedar revisadas por Santiago Ortiz.` : "No hay riesgo medio pendiente de Santiago Ortiz."}</span>
      </article>
      <article>
        <strong>Reprocesos</strong>
        <span>${pendingDuplicates ? `${pendingDuplicates} placas repetidas siguen sin autorizacion operativa.` : "Los repetidos filtrados estan revisados o no existen."}</span>
      </article>
      <article>
        <strong>Regla simple</strong>
        <span>Aprobada termino. Falta aprobar tuvo rechazo. Por revisar no tiene estado claro.</span>
      </article>
    </div>
    ${dailyAudit ? renderPurchaseDailyAudit(dailyAudit) : ""}
  `;
  bindPurchaseDailyAuditActions(container);
}

function getPurchaseDailyAudit(activeRecords) {
  const dayRecords = getFilteredPurchaseRecords({ ignoreLoad: true });
  const loadMap = new Map((state.dataProcessing?.loads || []).map((load) => [load.id, load]));
  const groups = new Map();
  dayRecords.forEach((record) => {
    const key = record.loadId || "LEGACY";
    if (!groups.has(key)) {
      const load = loadMap.get(record.loadId);
      groups.set(key, {
        id: record.loadId || "",
        label: load ? `${formatMonthLabel(load.month)} | ${load.source}` : "CARGA ANTIGUA SIN IDENTIFICADOR",
        rows: 0,
        plates: new Set()
      });
    }
    const group = groups.get(key);
    group.rows += 1;
    if (record.PLACA) group.plates.add(record.PLACA);
  });
  const rows = [...groups.values()]
    .map((group) => ({
      ...group,
      uniquePlates: group.plates.size,
      repeatedRows: Math.max(0, group.rows - group.plates.size)
    }))
    .sort((a, b) => b.rows - a.rows || a.label.localeCompare(b.label));
  return {
    selectedDate: purchaseFilters.date,
    selectedLoadId: purchaseFilters.loadId,
    activeRows: activeRecords.length,
    allRows: dayRecords.length,
    allUniquePlates: new Set(dayRecords.map((record) => record.PLACA).filter(Boolean)).size,
    rows
  };
}

function renderPurchaseDailyAudit(audit) {
  const selectedText = audit.selectedLoadId
    ? `Estas viendo solo la carga seleccionada: ${audit.activeRows} filas.`
    : `Estas viendo todas las cargas del dia: ${audit.allRows} filas.`;
  const warning = !audit.selectedLoadId && audit.rows.length > 1
    ? `<p class="audit-warning">El numero puede subir porque hay ${audit.rows.length} cargas con la misma fecha de solicitud. Selecciona la carga correcta para compararla con tu archivo manual.</p>`
    : "";
  return `
    <section class="daily-audit-panel">
      <div class="daily-audit-head">
        <div>
          <p class="eyebrow">Auditoria del dia</p>
          <h3>${escapeHtml(formatPurchaseDateLabel(audit.selectedDate))}</h3>
        </div>
        <span>${escapeHtml(selectedText)}</span>
      </div>
      ${warning}
      <div class="daily-audit-summary">
        <article><strong>${audit.allRows}</strong><span>Filas encontradas en el dia</span></article>
        <article><strong>${audit.allUniquePlates}</strong><span>Placas unicas del dia</span></article>
        <article><strong>${audit.activeRows}</strong><span>Filas en pantalla actual</span></article>
      </div>
      <div class="daily-audit-loads">
        ${audit.rows.map((row) => `
          <button class="daily-audit-load ${row.id && row.id === audit.selectedLoadId ? "is-selected" : ""}" type="button" ${row.id ? `data-purchase-load-pick="${escapeHtml(row.id)}"` : "disabled"}>
            <span>${escapeHtml(row.label)}</span>
            <strong>${row.rows} filas</strong>
            <small>${row.uniquePlates} placas unicas - ${row.repeatedRows} repetidas</small>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function formatPurchaseDateLabel(value) {
  const normalized = normalizePurchaseDate(value);
  if (!normalized) return value || "Sin fecha";
  const [year, month, day] = normalized.split("-");
  return `${day}/${month}/${year}`;
}

function bindPurchaseDailyAuditActions(container) {
  container.querySelectorAll("[data-purchase-load-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      purchaseFilters.loadId = button.dataset.purchaseLoadPick || "";
      if (purchaseLoadFilter) purchaseLoadFilter.value = purchaseFilters.loadId;
      renderPurchaseProcessing();
    });
  });
}

function renderPurchaseExecutiveCards(records, stats) {
  const container = document.querySelector("#purchaseKpis");
  if (!container) return;
  const summary = getPurchaseOperationalSummary(records);
  const cards = [
    ["pendingApproval", "Falta aprobar", summary.pendingApproval.length, "Placas rechazadas sin aprobacion posterior", "is-critical", ""],
    ["pendingReview", "Pendientes por revisar", summary.pendingReview.length, "Pendiente o reproceso pendiente sin cierre de coordinacion", "is-warning", "PEND"],
    ["riskMedium", "Riesgo medio", summary.riskMediumPending.length, "Debe estar revisado por Santiago Ortiz", summary.riskMediumPending.length ? "is-warning" : "is-success", ""],
    ["approvedPlates", "Placas aprobadas", summary.approvedPlates.length, "Placas con pago, salida o reproceso aprobado", "is-success", ""],
    ["unique", "Placas unicas", summary.allPlates.length, "Vehiculos distintos conciliados", "is-plain", ""],
    ["duplicates", "Duplicados / reprocesos", summary.pendingDuplicates.length, `${summary.approvedDuplicates.length} autorizados entre meses`, summary.pendingDuplicates.length ? "is-warning" : "is-success", ""],
    ["records", "Solicitudes filtradas", stats.total, "Filas con la fecha/filtro seleccionado", "is-plain", ""],
    ["movement", "Movimientos pago/salida", stats.pagoApproved + stats.pagoRejected + stats.salidaApproved + stats.salidaRejected, "Eventos detectados, pueden repetirse por placa", "is-neutral", ""]
  ];
  container.innerHTML = cards.map(([key, label, value, hint, tone, icon]) => `
    <button class="kpi-card executive-kpi ${tone}" type="button" data-purchase-detail="${key}">
      <span><i class="kpi-emoji">${escapeHtml(icon)}</i>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
      <em class="kpi-detail-pill">Ver detalle</em>
    </button>
  `).join("");
  container.querySelectorAll("[data-purchase-detail]").forEach((button) => {
    button.onclick = () => openPurchaseDetail(button.dataset.purchaseDetail, records, stats, summary);
  });
  document.querySelectorAll(".dashboard-command-grid [data-purchase-detail]").forEach((button) => {
    button.onclick = () => openPurchaseDetail(button.dataset.purchaseDetail, records, stats, summary);
  });
  document.querySelectorAll(".data-table-panel [data-purchase-detail]").forEach((button) => {
    button.onclick = () => openPurchaseDetail(button.dataset.purchaseDetail, records, stats, summary);
  });
}

function renderPurchaseExecutiveDashboard(records, stats) {
  if (!purchaseExecutiveDashboard) return;
  if (!records.length) {
    purchaseExecutiveDashboard.innerHTML = `<div class="empty compact-empty">Carga una base de compras para ver el dashboard ejecutivo.</div>`;
    return;
  }
  const summary = getPurchaseOperationalSummary(records);
  const metrics = getPurchaseDashboardMetrics(records, stats, summary);
  const maxAgency = Math.max(...metrics.agencies.map((item) => item.total), 1);
  const maxLegal = Math.max(...metrics.legals.map((item) => item.total), 1);
  purchaseExecutiveDashboard.innerHTML = `
    <section class="purchase-top-dashboard">
      <button class="payment-card purchase-mini-kpi" type="button" data-purchase-detail="records"><span> Total solicitudes</span><strong>${metrics.total}</strong><small>Registros filtrados</small></button>
      <button class="payment-card purchase-mini-kpi" type="button" data-purchase-detail="unique"><span> Placas unicas</span><strong>${metrics.uniquePlates}</strong><small>Vehiculos distintos</small></button>
      <article class="payment-card purchase-mini-kpi"><span> Agencias</span><strong>${metrics.agenciesTotal}</strong><small>Activas</small></article>
      <article class="payment-card purchase-mini-kpi"><span> Coordinadores</span><strong>${metrics.legalTotal}</strong><small>Con carga asignada</small></article>
      <button class="payment-card purchase-mini-kpi" type="button" data-purchase-detail="approvedPlates"><span> Cerradas</span><strong>${metrics.completed}</strong><small>${metrics.complianceRate}% de placas</small></button>
      <button class="payment-card purchase-mini-kpi" type="button" data-purchase-detail="pendingApproval"><span> Seguimiento</span><strong>${metrics.notCompleted}</strong><small>${metrics.notCompletedRate}% de placas</small></button>
      <article class="payment-card payment-gauge-card purchase-gauge-wide">
        <p class="eyebrow">Cumplimiento general</p>
        <div class="payment-gauge" style="--score:${metrics.complianceRate}"><span>${metrics.complianceRate}%</span></div>
        <div class="payment-legend">
          <span><i class="ok-dot"></i>Cerradas ${metrics.completed} placa(s)</span>
          <span><i class="bad-dot"></i>Por gestionar ${metrics.notCompleted} placa(s)</span>
        </div>
      </article>
    </section>
    <section class="payment-dashboard-grid purchase-dashboard-grid">
      <article class="payment-card payment-wide">
        <p class="eyebrow">Estado de gestion - mesa de control</p>
        ${renderPurchaseStatusExecutiveTable(metrics.statusRows, metrics.total)}
      </article>
      <article class="payment-card">
        <p class="eyebrow">Distribucion por tipo de tramite</p>
        <div class="purchase-donut" style="--left:${metrics.complianceRate}; --right:${metrics.notCompletedRate}">
          <span>${metrics.uniquePlates}<small>Placas</small></span>
        </div>
        <div class="purchase-donut-caption">
          <b>${metrics.complianceRate}%</b><span>${metrics.completed} cerradas</span>
          <b>${metrics.notCompletedRate}%</b><span>${metrics.notCompleted} en seguimiento</span>
        </div>
      </article>
      <article class="payment-card payment-wide">
        <p class="eyebrow">Solicitudes por agencia</p>
        <div class="payment-split">
          <div>${metrics.agencies.map((item) => renderPaymentBar(item.agency, item.total, item.total / maxAgency)).join("")}</div>
          ${renderPaymentMiniTable(["Agencia", "Casos", "%"], metrics.agencies.map((item) => [item.agency, item.total, `${item.share}%`]), "Total", [metrics.total, "100%"])}
        </div>
      </article>
      <article class="payment-card payment-wide">
        <p class="eyebrow">Solicitudes por asesor legal</p>
        <div class="payment-split">
          <div>${metrics.legals.map((item) => renderPaymentBar(item.legal, item.total, item.total / maxLegal)).join("")}</div>
          ${renderPaymentMiniTable(["Asesor legal", "Casos", "%"], metrics.legals.map((item) => [item.legal, item.total, `${item.share}%`]), "Total", [metrics.total, "100%"])}
        </div>
      </article>
      <article class="payment-card payment-wide">
        <p class="eyebrow">Distribucion agencia vs asesor legal</p>
        ${renderPurchaseAgencyLegalMatrix(metrics.matrix)}
      </article>
      <article class="payment-card">
        <p class="eyebrow">Indicadores clave</p>
        <div class="payment-insight-list">
          <span><b>${metrics.complianceRate}%</b>Tasa de cumplimiento</span>
          <span><b>${metrics.rejectionRate}%</b>Falta aprobar</span>
          <span><b>${metrics.pendingRate}%</b>Pendientes</span>
          <span><b>${metrics.concentrationRate}%</b>Concentracion top 2</span>
        </div>
      </article>
      <article class="payment-card">
        <p class="eyebrow">Hallazgos principales</p>
        <div class="payment-finding-list">
          ${metrics.findings.map((finding) => `<p><strong>${escapeHtml(finding.title)}</strong><span>${escapeHtml(finding.text)}</span></p>`).join("")}
        </div>
      </article>
    </section>
  `;
  purchaseExecutiveDashboard.querySelectorAll("[data-purchase-detail]").forEach((button) => {
    button.onclick = () => openPurchaseDetail(button.dataset.purchaseDetail, records, stats, summary);
  });
}

function getPurchaseDashboardMetrics(records, stats, summary) {
  const total = Math.max(records.length, 1);
  const uniquePlates = Math.max(summary.allPlates.length, 1);
  const completed = summary.approvedPlates.length;
  const rejected = summary.pendingApproval.length;
  const pending = summary.pendingReview.length;
  const risks = summary.riskMediumPending.length + summary.riskHighPending.length;
  const notCompleted = rejected + pending + risks;
  const complianceRate = Math.round((completed / uniquePlates) * 1000) / 10;
  const notCompletedRate = Math.round((notCompleted / uniquePlates) * 1000) / 10;
  const rejectionRate = Math.round((rejected / uniquePlates) * 1000) / 10;
  const pendingRate = Math.round((pending / uniquePlates) * 1000) / 10;
  const agencies = groupPurchaseMetric(records, (record) => record.AGENCIA || "SIN AGENCIA", "agency").slice(0, 9)
    .map((item) => ({ ...item, share: Math.round((item.total / total) * 1000) / 10 }));
  const legals = groupPurchaseMetric(records, (record) => record["COORDINADOR LEGAL"] || "SIN DATO", "legal").slice(0, 8)
    .map((item) => ({ ...item, share: Math.round((item.total / total) * 1000) / 10 }));
  const statusCounts = [...getPurchaseStatusCounts(records).entries()]
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
  const topTwo = legals.slice(0, 2).reduce((sum, item) => sum + item.total, 0);
  const concentrationRate = Math.round((topTwo / total) * 1000) / 10;
  const matrix = buildPurchaseAgencyLegalMatrix(records, agencies.map((item) => item.agency), legals.map((item) => item.legal));
  const findings = [
    {
      title: "Concentracion por agencia",
      text: agencies.length >= 2 ? `${agencies[0].agency} y ${agencies[1].agency} concentran ${Math.round(((agencies[0].total + agencies[1].total) / total) * 1000) / 10}% de los casos.` : "Sin agencias suficientes para calcular concentracion."
    },
    {
      title: "Carga operativa",
      text: legals.length >= 2 ? `${legals[0].legal} y ${legals[1].legal} administran ${Math.round(((legals[0].total + legals[1].total) / total) * 1000) / 10}% de los registros.` : "Sin asesores legales suficientes para analizar carga."
    },
    {
      title: "Nivel de rechazo",
      text: `${rejectionRate}% de placas quedan en falta aprobar. Revise primero las placas rechazadas sin aprobacion posterior.`
    },
    {
      title: "Oportunidad",
      text: pending ? `Hay ${pending} placas pendientes por revisar para completar la gestion.` : "No hay pendientes por revisar en el filtro actual."
    }
  ];
  return {
    total: records.length,
    uniquePlates: summary.allPlates.length,
    agenciesTotal: new Set(records.map((record) => record.AGENCIA).filter(Boolean)).size,
    legalTotal: new Set(records.map((record) => record["COORDINADOR LEGAL"]).filter(Boolean)).size,
    completed,
    notCompleted,
    complianceRate,
    notCompletedRate,
    rejectionRate,
    pendingRate,
    agencies,
    legals,
    statusRows: statusCounts,
    concentrationRate,
    matrix,
    findings
  };
}

function groupPurchaseMetric(records, getter, key) {
  const map = new Map();
  records.forEach((record) => {
    const label = getter(record) || "SIN DATO";
    map.set(label, (map.get(label) || 0) + 1);
  });
  return [...map.entries()]
    .map(([label, total]) => ({ [key]: label, total }))
    .sort((a, b) => b.total - a.total || String(a[key]).localeCompare(String(b[key])));
}

function renderPurchaseStatusExecutiveTable(statusRows, total) {
  const rows = statusRows.slice(0, 7);
  return `
    <table class="payment-mini-table purchase-status-table">
      <thead><tr><th>Estado</th><th>Cantidad</th><th>%</th></tr></thead>
      <tbody>${rows.map(([status, count]) => `<tr><td>${escapeHtml(status)}</td><td>${count}</td><td>${Math.round((count / Math.max(total, 1)) * 1000) / 10}%</td></tr>`).join("")}</tbody>
    </table>
    <div class="purchase-status-summary">
      ${rows.slice(0, 3).map(([status, count], index) => `<span class="${index === 0 ? "ok" : index === 1 ? "warn" : "bad"}"><b>${count}</b>${escapeHtml(status)}</span>`).join("")}
    </div>
  `;
}

function buildPurchaseAgencyLegalMatrix(records, agencies, legals) {
  const rows = agencies.map((agency) => {
    const counts = legals.map((legal) => records.filter((record) => (record.AGENCIA || "SIN AGENCIA") === agency && (record["COORDINADOR LEGAL"] || "SIN DATO") === legal).length);
    return { agency, counts, total: counts.reduce((sum, value) => sum + value, 0) };
  });
  return { agencies, legals, rows };
}

function renderPurchaseAgencyLegalMatrix(matrix) {
  if (!matrix.rows.length || !matrix.legals.length) return `<div class="empty compact-empty">Sin datos suficientes para matriz.</div>`;
  return `<div class="payment-matrix-scroll"><table class="payment-matrix"><thead><tr><th>Agencia</th>${matrix.legals.map((legal) => `<th>${escapeHtml(legal)}</th>`).join("")}<th>Total</th></tr></thead><tbody>${matrix.rows.map((row) => `<tr><td>${escapeHtml(row.agency)}</td>${row.counts.map((count) => `<td>${count}</td>`).join("")}<td><strong>${row.total}</strong></td></tr>`).join("")}</tbody></table></div>`;
}

function renderPurchaseCoordinatorProductivity(records) {
  const container = document.querySelector("#purchaseCoordinatorProductivity");
  if (!container) return;
  const rows = getPurchaseCoordinatorMetrics(records);
  if (!rows.length) {
    container.innerHTML = `<div class="empty compact-empty">Seleccione un coordinador o cargue registros para ver productividad.</div>`;
    return;
  }
  const selectedCoordinators = getFilterValues(purchaseFilters.coordinator);
  const isFocused = selectedCoordinators.length > 0;
  const mainRows = isFocused ? rows : rows.slice(0, 4);
  const totals = mainRows.reduce((acc, row) => {
    acc.total += row.total;
    acc.unique += row.uniquePlates;
    acc.approved += row.approvedPlates.length;
    acc.rejected += row.rejectedPlates.length;
    acc.pending += row.pendingPlates.length;
    acc.risk += row.riskMediumPlates.length + row.riskHighPlates.length;
    return acc;
  }, { total: 0, unique: 0, approved: 0, rejected: 0, pending: 0, risk: 0 });
  const title = isFocused
    ? `Productividad de ${selectedCoordinators.join(", ")}`
    : "Productividad de coordinadores";
  const subtitle = [
    purchaseFilters.date && `Dia ${formatPurchaseDateLabel(purchaseFilters.date)}`,
    purchaseFilters.month && `Mes ${formatMonthLabel(purchaseFilters.month)}`,
    purchaseFilters.agency && `Agencia ${purchaseFilters.agency}`
  ].filter(Boolean).join(" | ") || "Vista segun filtros activos";
  const explanation = isFocused
    ? `Rechazadas en seguimiento son placas con pago/salida/reproceso rechazado dentro de la carga del coordinador. El KPI general de falta aprobar se calcula por placas unicas de toda la operacion, por eso no debe sumarse coordinador por coordinador.`
    : "Use el filtro de coordinador para abrir una lectura individual. El panel cambiara a productividad, pendientes y detalle diario de la persona seleccionada.";
  container.innerHTML = `
    <div class="coordinator-productivity-head">
      <div>
        <p class="eyebrow">Feedback operativo</p>
        <h3>${escapeHtml(title)}</h3>
        <span>${escapeHtml(subtitle)}</span>
      </div>
      <button class="btn secondary mini-btn" type="button" data-purchase-detail="records">Ver base filtrada</button>
    </div>
    <div class="coordinator-summary-strip">
      <article><span> Solicitudes</span><strong>${totals.total}</strong></article>
      <article><span> Placas unicas</span><strong>${totals.unique}</strong></article>
      <article class="is-ok"><span> Aprobadas</span><strong>${totals.approved}</strong></article>
      <article class="is-alert"><span> Rechazadas seg.</span><strong>${totals.rejected}</strong></article>
      <article class="is-warn"><span>PEND Pendientes</span><strong>${totals.pending}</strong></article>
      <article class="is-risk"><span> Riesgo</span><strong>${totals.risk}</strong></article>
    </div>
    <p class="coordinator-reading">${escapeHtml(explanation)}</p>
    <div class="coordinator-productivity-grid">
      ${mainRows.map(renderCoordinatorProductivityCard).join("")}
    </div>
  `;
  container.querySelectorAll("[data-purchase-detail]").forEach((button) => {
    button.onclick = () => openPurchaseDetail(button.dataset.purchaseDetail, records, getPurchaseStats(), getPurchaseOperationalSummary(records));
  });
}

function renderCoordinatorProductivityCard(row) {
  const maxDaily = Math.max(...row.daily.map((item) => item.total), 1);
  const pendingList = [...row.rejectedPlates, ...row.pendingPlates, ...row.riskMediumPlates, ...row.riskHighPlates]
    .slice(0, 10)
    .map((plate) => plate.plate)
    .join(", ");
  return `
    <article class="coordinator-card">
      <div class="coordinator-card-head">
        <div>
          <strong>${escapeHtml(row.coordinator)}</strong>
          <span>${row.total} solicitudes | ${row.uniquePlates} placas</span>
        </div>
        <b>${row.productivityRate}% cierre</b>
      </div>
      <div class="coordinator-card-metrics">
        <span><b>${row.approvedPlates.length}</b> aprobadas</span>
        <span><b>${row.rejectedPlates.length}</b> rechazadas seg.</span>
        <span><b>${row.pendingPlates.length}</b> pendientes</span>
        <span><b>${row.riskMediumPlates.length}</b> riesgo medio</span>
        <span><b>${row.riskHighPlates.length}</b> riesgo alto</span>
      </div>
      <div class="coordinator-daily">
        ${row.daily.slice(0, 5).map((item) => `
          <span>
            <small>${escapeHtml(formatPurchaseDateLabel(item.date))}</small>
            <i><b style="width:${Math.max(5, Math.round((item.total / maxDaily) * 100))}%"></b></i>
            <em>${item.total}</em>
          </span>
        `).join("") || `<span><small>Sin fecha</small><i><b style="width:0%"></b></i><em>0</em></span>`}
      </div>
      <details class="coordinator-one-to-one">
        <summary>Guia para feedback</summary>
        <p><b>Lectura:</b> ${row.total} registros revisados, ${row.approvedPlates.length} placas cerradas con aprobacion y ${row.rejectedPlates.length + row.pendingPlates.length} placas que requieren seguimiento.</p>
        <p><b>Casos a revisar:</b> ${escapeHtml(pendingList || "Sin placas pendientes relevantes para este filtro.")}</p>
      </details>
    </article>
  `;
}

function getPurchaseCoordinatorMetrics(records) {
  const groups = new Map();
  records.forEach((record) => {
    const coordinator = record["COORDINADOR LEGAL"] || "SIN COORDINADOR";
    if (!groups.has(coordinator)) {
      groups.set(coordinator, {
        coordinator,
        records: [],
        plates: new Map(),
        daily: new Map()
      });
    }
    const group = groups.get(coordinator);
    group.records.push(record);
    if (record.PLACA) group.plates.set(record.PLACA, (group.plates.get(record.PLACA) || 0) + 1);
    const day = getCoordinatorWorkDate(record) || "SIN FECHA";
    group.daily.set(day, (group.daily.get(day) || 0) + 1);
  });
  return [...groups.values()].map((group) => {
    const plateDetails = getAdvisorPlateDetails(group.records);
    const rejectedPlates = plateDetails.filter((plate) =>
      (plate.hasSalidaRejected || plate.hasPagoRejected || plate.hasRejected) &&
      !(plate.hasSalidaApproved || plate.hasPagoApproved || plate.hasReprocessApproved)
    );
    const rejectedIds = new Set(rejectedPlates.map((plate) => plate.plate));
    const riskMediumPlates = plateDetails.filter((plate) => plate.riskMediumActive);
    const riskHighPlates = plateDetails.filter((plate) => plate.riskHighActive);
    const riskIds = new Set([...riskMediumPlates, ...riskHighPlates].map((plate) => plate.plate));
    const pendingPlates = plateDetails.filter((plate) =>
      !rejectedIds.has(plate.plate) &&
      !riskIds.has(plate.plate) &&
      (plate.hasReprocessPending || (!plate.hasRejected && !plate.hasApproved && !plate.hasSalidaApproved && !plate.hasPagoApproved && !plate.hasReprocessApproved))
    );
    const pendingIds = new Set(pendingPlates.map((plate) => plate.plate));
    const approvedPlates = plateDetails.filter((plate) =>
      !rejectedIds.has(plate.plate) &&
      !pendingIds.has(plate.plate) &&
      !riskIds.has(plate.plate) &&
      (plate.hasApproved || plate.hasSalidaApproved || plate.hasPagoApproved || plate.hasReprocessApproved)
    );
    const closed = approvedPlates.length;
    const totalActionable = Math.max(plateDetails.length, 1);
    return {
      coordinator: group.coordinator,
      total: group.records.length,
      uniquePlates: group.plates.size,
      approvedPlates,
      rejectedPlates,
      pendingPlates,
      riskMediumPlates,
      riskHighPlates,
      daily: [...group.daily.entries()]
        .map(([date, total]) => ({ date, total }))
        .sort((a, b) => b.date.localeCompare(a.date)),
      productivityRate: Math.round((closed / totalActionable) * 100)
    };
  }).sort((a, b) => b.total - a.total || a.coordinator.localeCompare(b.coordinator));
}

function getCoordinatorWorkDate(record) {
  return normalizePurchaseDate(record["FECHA REVISION"]) || normalizePurchaseDate(record["FECHA DE SOLICITUD"]);
}

function renderPurchaseStatusModules(records) {
  const container = document.querySelector("#purchaseStatusModules");
  if (!container) return;
  const counts = getPurchaseStatusCounts(records);
  const totalPlates = new Set(records.map((record) => record.PLACA).filter(Boolean)).size;
  container.innerHTML = `
    <div class="status-board-head">
      <div>
        <p class="eyebrow">Mapa de estatus</p>
        <h3>Clasificacion operativa de compras</h3>
      </div>
      <span>${totalPlates} placas unicas filtradas</span>
    </div>
    <div class="status-board-grid">
      ${PURCHASE_STATUS_OPTIONS.map((status) => {
    const count = counts.get(status) || 0;
    const tone = getPurchaseStatusTone(status);
    return `
      <button class="status-module ${tone}" type="button" data-purchase-status-detail="${escapeHtml(status)}">
        <span><i>${escapeHtml(getPurchaseStatusIcon(status))}</i>${escapeHtml(status)}</span>
        <strong>${count}</strong>
      </button>
    `;
  }).join("")}
    </div>
  `;
  container.querySelectorAll("[data-purchase-status-detail]").forEach((button) => {
    button.addEventListener("click", () => openPurchaseStatusDetail(button.dataset.purchaseStatusDetail));
  });
}

function openPurchaseStatusDetail(status) {
  const baseRecords = getFilteredPurchaseRecords({ ignoreStatus: true });
  const summary = getPurchaseOperationalSummary(baseRecords);
  const records = status === "PENDIENTE"
    ? baseRecords.filter((record) => summary.pendingReview.some((plate) => plate.plate === record.PLACA))
    : baseRecords.filter((record) => getPurchaseRecordStatuses(record).includes(status));
  const plateItems = getPurchaseStatusPlateItems(status, baseRecords, summary);
  const title = document.querySelector("#purchaseDetailTitle");
  const content = document.querySelector("#purchaseDetailContent");
  const modal = document.querySelector("#purchaseDetailModal");
  if (!content || !modal) return;
  const reportTitle = `Estatus: ${status}`;
  const reportHtml = plateItems.length
    ? `${renderPurchaseStatusComparison(status, plateItems)}${renderPlateDetailGrid(plateItems, "Sin placas para este estatus.")}`
    : `<div class="empty compact-empty">Sin registros para este estatus.</div>`;
  if (title) title.textContent = reportTitle;
  content.innerHTML = reportHtml;
  currentPurchaseDetailReport = { title: reportTitle, html: reportHtml };
  modal.hidden = false;
}

function getPurchaseStatusCounts(records) {
  const plateSets = new Map(PURCHASE_STATUS_OPTIONS.map((status) => [status, new Set()]));
  const summary = getPurchaseOperationalSummary(records);
  records.forEach((record) => {
    if (!record.PLACA) return;
    getPurchaseRecordStatuses(record).forEach((status) => {
      if (!["PENDIENTE", "RIESGO MEDIO", "RIESGO ALTO"].includes(status)) plateSets.get(status)?.add(record.PLACA);
    });
  });
  plateSets.set("PENDIENTE", new Set(summary.pendingReview.map((plate) => plate.plate)));
  plateSets.set("RIESGO MEDIO", new Set(summary.riskMediumPending.map((plate) => plate.plate)));
  plateSets.set("RIESGO ALTO", new Set(summary.riskHighPending.map((plate) => plate.plate)));
  return new Map(PURCHASE_STATUS_OPTIONS.map((status) => [status, plateSets.get(status)?.size || 0]));
}

function getPurchaseStatusPlateItems(status, records, summary = getPurchaseOperationalSummary(records)) {
  if (status === "PENDIENTE") return summary.pendingReview;
  if (status === "RIESGO MEDIO") return summary.riskMediumPending;
  if (status === "RIESGO ALTO") return summary.riskHighPending;
  const matchingPlates = new Set(records
    .filter((record) => record.PLACA && getPurchaseRecordStatuses(record).includes(status))
    .map((record) => record.PLACA));
  return getAdvisorPlateDetails(records)
    .filter((plate) => matchingPlates.has(plate.plate))
    .map((plate) => enrichPlateWithOwner(plate, records));
}

function renderPurchaseStatusComparison(status, plateItems) {
  const approved = plateItems.filter((plate) => plate.hasSalidaApproved || plate.hasPagoApproved || plate.hasReprocessApproved || plate.hasApproved);
  const stillPending = plateItems.filter((plate) =>
    !plate.hasSalidaApproved &&
    !plate.hasPagoApproved &&
    !plate.hasReprocessApproved &&
    (plate.hasRejected || plate.hasSalidaRejected || plate.hasPagoRejected || plate.hasReprocessPending || !plate.hasCoordinatorReview)
  );
  const mixed = plateItems.filter((plate) => {
    const statuses = getPlateStatusNames(plate);
    return statuses.some((item) => item !== status && item !== "PENDIENTE");
  });
  const topPending = stillPending.slice(0, 8).map((plate) => plate.plate).join(", ") || "Sin placas pendientes";
  return `
    <section class="status-comparison-panel">
      <article>
        <span> Placas del estatus</span>
        <strong>${plateItems.length}</strong>
        <small>${escapeHtml(status)}</small>
      </article>
      <article class="is-success">
        <span> Ya aprobadas</span>
        <strong>${approved.length}</strong>
        <small>Con pago, salida o reproceso aprobado</small>
      </article>
      <article class="is-warning">
        <span>PEND Siguen pendientes</span>
        <strong>${stillPending.length}</strong>
        <small>${escapeHtml(topPending)}</small>
      </article>
      <article class="is-neutral">
        <span> Con otro estatus</span>
        <strong>${mixed.length}</strong>
        <small>Placas con historial cruzado</small>
      </article>
    </section>
  `;
}

function getPlateStatusNames(plate) {
  return [...new Set((plate.statuses || []).flatMap((status) => {
    const label = normalizeLooseText(status.label || "");
    return PURCHASE_STATUS_OPTIONS.filter((option) => label.includes(option));
  }))];
}

function getPurchaseStatusTone(status) {
  if (status.includes("RECHAZADO") || status.includes("RIESGO ALTO")) return "is-critical";
  if (status.includes("PENDIENTE") || status.includes("RIESGO MEDIO") || status.includes("SIN VALIDACION") || status === "REPROCESO") return "is-warning";
  if (status.includes("APROBADO")) return "is-success";
  return "is-plain";
}

function getPurchaseStatusIcon(status) {
  if (status === "PAGO APROBADO") return "";
  if (status === "PAGO RECHAZADO") return "";
  if (status === "SALIDA APROBADA") return "";
  if (status === "SALIDA RECHAZADA") return "";
  if (status === "PAGADO SIN VALIDACION") return "";
  if (status === "PENDIENTE") return "PEND";
  if (status === "REPROCESO") return "";
  if (status === "REPROCESO APROBADO") return "";
  if (status === "REPROCESO RECHAZADO") return "";
  if (status === "RIESGO MEDIO") return "";
  if (status === "RIESGO ALTO") return "";
  return "-";
}

function getPurchaseOperationalSummary(records) {
  const advisorRows = getPurchaseAdvisorMetrics(records);
  const pendingApproval = advisorRows.flatMap((row) => row.unresolvedRejectedPlates.map((plate) => ({ ...plate, advisor: row.advisor, agency: row.mainAgency })));
  const allPlates = getAdvisorPlateDetails(records);
  const pendingReview = allPlates
    .filter((plate) =>
      plate.hasReprocessPending ||
      (!plate.hasCoordinatorReview && !plate.hasRejected && !plate.hasApproved && !plate.hasSalidaApproved && !plate.hasPagoApproved && !plate.hasReprocessApproved)
    )
    .map((plate) => enrichPlateWithOwner(plate, records));
  const riskMediumPending = allPlates
    .filter((plate) => plate.riskMediumActive)
    .map((plate) => enrichPlateWithOwner(plate, records));
  const riskHighPending = allPlates
    .filter((plate) => plate.riskHighActive)
    .map((plate) => enrichPlateWithOwner(plate, records));
  const pendingApprovalIds = new Set(pendingApproval.map((plate) => plate.plate));
  const pendingReviewIds = new Set(pendingReview.map((plate) => plate.plate));
  const riskMediumIds = new Set(riskMediumPending.map((plate) => plate.plate));
  const riskHighIds = new Set(riskHighPending.map((plate) => plate.plate));
  const approvedPlates = allPlates
    .filter((plate) => (plate.hasApproved || plate.hasSalidaApproved || plate.hasPagoApproved || plate.hasReprocessApproved) && !pendingApprovalIds.has(plate.plate) && !pendingReviewIds.has(plate.plate) && !riskMediumIds.has(plate.plate) && !riskHighIds.has(plate.plate))
    .map((plate) => enrichPlateWithOwner(plate, records));
  const duplicates = getDuplicatePlateInsights(records);
  const approvedDuplicates = duplicates.filter((item) => item.isApproved);
  const pendingDuplicates = duplicates.filter((item) => !item.isApproved);
  const reconciled = approvedPlates.length + pendingApproval.length + pendingReview.length;
  return {
    allPlates,
    approvedPlates,
    pendingApproval,
    pendingReview,
    riskMediumPending,
    riskHighPending,
    duplicates,
    pendingDuplicates,
    approvedDuplicates,
    reconciled
  };
}

function enrichPlateWithOwner(plate, records) {
  const record = records.find((item) => item.PLACA === plate.plate);
  return {
    ...plate,
    advisor: record?.ASESOR || "SIN ASESOR",
    agency: record?.AGENCIA || "SIN AGENCIA"
  };
}

function openPurchaseDetail(type, records, stats, summary = getPurchaseOperationalSummary(records)) {
  const titles = {
    pendingApproval: "Placas pendientes de aprobar",
    pendingReview: "Pendientes por revisar",
    riskMedium: "Riesgo medio pendiente de Santiago Ortiz",
    approvedPlates: "Placas aprobadas",
    duplicates: "Duplicados y reprocesos",
    advisorRanking: "Ranking de asesores",
    standardSummary: "Resumen estandarizado",
    similarities: "Similitudes detectadas",
    movement: "Pago y salida",
    records: "Registros procesados",
    unique: "Placas unicas"
  };
  const title = document.querySelector("#purchaseDetailTitle");
  const content = document.querySelector("#purchaseDetailContent");
  const modal = document.querySelector("#purchaseDetailModal");
  if (!content || !modal) return;
  const reportTitle = titles[type] || "Detalle operativo";
  const reportHtml = renderPurchaseDetailContent(type, records, stats, summary);
  if (title) title.textContent = reportTitle;
  content.innerHTML = reportHtml;
  currentPurchaseDetailReport = { title: reportTitle, html: reportHtml };
  if (type === "duplicates") bindPurchaseDuplicateApprovalActions(content);
  modal.hidden = false;
}

function closePurchaseDetailModal() {
  const modal = document.querySelector("#purchaseDetailModal");
  if (modal) modal.hidden = true;
}

function renderPurchaseDetailContent(type, records, stats, summary) {
  if (type === "pendingApproval") return renderPlateDetailGrid(summary.pendingApproval, "No hay placas pendientes de aprobacion.");
  if (type === "pendingReview") return renderPlateDetailGrid(summary.pendingReview, "No hay placas pendientes por revisar.");
  if (type === "riskMedium") return renderPlateDetailGrid(summary.riskMediumPending, "No hay placas de riesgo medio pendientes de Santiago Ortiz.");
  if (type === "approvedPlates") return renderPlateDetailGrid(summary.approvedPlates, "No hay placas aprobadas.");
  if (type === "duplicates") return renderDuplicateInsightGrid(summary.duplicates);
  if (type === "advisorRanking") return renderAdvisorRankingDetail(records);
  if (type === "standardSummary") return renderStandardSummaryDetail(records);
  if (type === "similarities") return renderSimilarityDetail(records);
  if (type === "movement") {
    return `
      <div class="movement-summary-grid">
        <article><span>Pago aprobado</span><strong>${stats.pagoApproved}</strong></article>
        <article><span>Pago rechazado</span><strong>${stats.pagoRejected}</strong></article>
        <article><span>Salida aprobada</span><strong>${stats.salidaApproved}</strong></article>
        <article><span>Salida rechazada</span><strong>${stats.salidaRejected}</strong></article>
      </div>
      ${renderPlateDetailGrid(getAdvisorPlateDetails(records).filter((plate) => plate.hasRejected || plate.hasApproved || plate.hasSalidaApproved || plate.hasPagoApproved || plate.hasSalidaRejected || plate.hasPagoRejected), "Sin movimientos de pago o salida.")}
    `;
  }
  if (type === "unique") {
    const unique = getAdvisorPlateDetails(records).map((plate) => ({ ...plate, advisor: "BASE", agency: "GENERAL" }));
    return renderPlateDetailGrid(unique, "Sin placas.");
  }
  return renderPurchaseTableHtml(records);
}

function renderAdvisorRankingDetail(records) {
  const rows = getPurchaseAdvisorMetrics(records);
  if (!rows.length) return `<div class="empty compact-empty">Sin asesores para mostrar.</div>`;
  return `<div class="detail-card-grid">${rows.map((row) => `
    <article class="advisor-performance-card">
      <div class="advisor-performance-head">
        <div><strong>${escapeHtml(row.advisor)}</strong><span>${escapeHtml(row.mainAgency)}</span></div>
        <b>${row.approvalRate}%</b>
      </div>
      <div class="advisor-performance-stats">
        <span><b>${row.uniquePlates}</b> placas</span>
        <span><b>${row.approvedPlates.length}</b> aprobadas</span>
        <span><b>${row.unresolvedRejectedPlates.length}</b> falta aprobar</span>
      </div>
    </article>
  `).join("")}</div>`;
}

function renderStandardSummaryDetail(records) {
  const items = [
    ...countByField(records, "importMonth").map(([label, count]) => [`MES: ${label || "SIN DATO"}`, count]),
    ...countByField(records, "AUTO PAGADO").map(([label, count]) => [`AUTO PAGADO: ${label || "SIN DATO"}`, count]),
    ...countByField(records, "GRAVAMEN").map(([label, count]) => [`GRAVAMEN: ${label || "SIN DATO"}`, count]),
    ...countByField(records, "VALIDACION PN").map(([label, count]) => [`VALIDACION PN: ${label || "SIN DATO"}`, count]),
    ...countByField(records, "AGENCIA").map(([label, count]) => [`AGENCIA: ${label || "SIN DATO"}`, count])
  ];
  if (!items.length) return `<div class="empty compact-empty">Sin resumen para mostrar.</div>`;
  return `<div class="summary-chip-grid">${items.map(([label, count]) => `<article><strong>${escapeHtml(count)}</strong><span>${escapeHtml(label)}</span></article>`).join("")}</div>`;
}

function renderSimilarityDetail(records) {
  const advisors = [...new Set(records.map((record) => record.ASESOR).filter(Boolean))];
  const agencies = [...new Set(records.map((record) => record.AGENCIA).filter(Boolean))];
  const pairs = [
    ...findSimilarLabels(advisors).map((pair) => [`ASESOR: ${pair[0]}`, pair[1]]),
    ...findSimilarLabels(agencies).map((pair) => [`AGENCIA: ${pair[0]}`, pair[1]])
  ];
  if (!pairs.length) return `<div class="empty compact-empty">No se detectaron nombres similares.</div>`;
  return `<div class="summary-chip-grid">${pairs.map(([label, similar]) => `<article><strong>${escapeHtml(label)}</strong><span>Similar a ${escapeHtml(similar)}</span></article>`).join("")}</div>`;
}

function renderPlateDetailGrid(items, emptyText) {
  if (!items.length) return `<div class="empty compact-empty">${escapeHtml(emptyText)}</div>`;
  return `<div class="detail-card-grid">${items.map((item) => renderPendingPlateDetail(item)).join("")}</div>`;
}

function renderDuplicateInsightGrid(items) {
  if (!items.length) return `<div class="empty compact-empty">Sin duplicados para mostrar.</div>`;
  return `<div class="detail-card-grid">${items.map((item) => `
    <details class="duplicate-insight-card ${item.isApproved ? "is-approved" : ""}" open>
      <summary>
        <span><strong>${escapeHtml(item.plate)}</strong><small>${escapeHtml(item.months.join(" / "))}</small></span>
        <b class="${escapeHtml(item.className)}">${escapeHtml(item.label)}</b>
      </summary>
      <div>
        ${item.crossMonth ? `
          <label class="purchase-approval-check">
            <input type="checkbox" data-purchase-duplicate-approval="${escapeHtml(item.approvalKey)}" ${item.isApproved ? "checked" : ""}>
            Autorizar repetido entre meses
          </label>
        ` : `<small class="duplicate-note">Duplicado dentro del mismo mes. Revise si corresponde a correccion interna.</small>`}
        ${item.cases.map((caseItem) => `<p><strong>${escapeHtml(caseItem.month || "SIN MES")}</strong>${escapeHtml(caseItem.advisor || "SIN ASESOR")} | ${escapeHtml(caseItem.agency || "SIN AGENCIA")}<span>${escapeHtml(caseItem.summary)}</span></p>`).join("")}
      </div>
    </details>
  `).join("")}</div>`;
}

function bindPurchaseDuplicateApprovalActions(container) {
  container.querySelectorAll("[data-purchase-duplicate-approval]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      togglePurchaseDuplicateApproval(checkbox.dataset.purchaseDuplicateApproval, checkbox.checked);
      const records = getFilteredPurchaseRecords();
      openPurchaseDetail("duplicates", records, getPurchaseStats(), getPurchaseOperationalSummary(records));
    });
  });
}

function getPurchaseReportContext() {
  const records = getFilteredPurchaseRecords();
  const stats = getPurchaseStats();
  const summary = getPurchaseOperationalSummary(records);
  return { records, stats, summary };
}

function buildPurchaseReportHtml() {
  const { records, stats, summary } = getPurchaseReportContext();
  const advisorRows = getPurchaseAdvisorMetrics(records);
  const coordinatorRows = getPurchaseCoordinatorMetrics(records);
  const maxAdvisor = Math.max(...advisorRows.map((row) => row.total), 1);
  const duplicateRows = summary.pendingDuplicates.length ? summary.pendingDuplicates : summary.duplicates;
  const filterText = [
    purchaseFilters.month && `Mes: ${formatMonthLabel(purchaseFilters.month)}`,
    purchaseFilters.loadId && "Carga especifica",
    purchaseFilters.date && `Dia: ${formatPurchaseDateLabel(purchaseFilters.date)}`,
    purchaseFilters.agency && `Agencia: ${purchaseFilters.agency}`,
    formatMultiFilterLabel("Asesor", purchaseFilters.advisor),
    formatMultiFilterLabel("Coordinador legal", purchaseFilters.coordinator),
    purchaseFilters.status && `Estatus: ${purchaseFilters.status}`,
    purchaseFilters.plate && `Placa: ${purchaseFilters.plate}`
  ].filter(Boolean).join(" | ") || "Sin filtros activos";
  const statusClass = summary.pendingApproval.length || summary.pendingDuplicates.length ? "danger" : "ok";
  const statusText = summary.pendingApproval.length || summary.pendingDuplicates.length ? "Revision operativa pendiente" : "Operacion controlada";
  const statusRows = [...getPurchaseStatusCounts(records).entries()].filter(([, count]) => count > 0);
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Reporte gerencial de compras Autocor</title>
  <style>
    @page { size: A4; margin: 10mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #171a21; font-family: "Roboto Condensed", "Arial Narrow", Arial, sans-serif; background: #eef1f5; }
    .print-actions { position: sticky; top: 0; z-index: 10; display: flex; justify-content: flex-end; padding: 10px; background: rgba(238,241,245,.95); }
    .print-actions button { min-height: 38px; padding: 0 16px; border: 0; border-radius: 9px; color: #fff; background: #ef3d35; font-weight: 900; cursor: pointer; }
    .sheet { max-width: 1120px; margin: 0 auto; padding: 20px; background: #fff; }
    .header { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: center; padding: 20px; border-radius: 14px; color: #fff; background: linear-gradient(135deg, #20232c, #3a3e49); border-bottom: 6px solid #ef3d35; }
    .brand { display: flex; align-items: center; gap: 13px; }
    .logo { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 12px; background: #fff; color: #ef3d35; font-size: 24px; font-weight: 1000; }
    h1 { margin: 0; font-size: 25px; line-height: 1.05; }
    .subtitle { margin: 5px 0 0; color: rgba(255,255,255,.78); font-size: 12px; }
    .meta { display: grid; gap: 6px; min-width: 245px; padding: 12px; border: 1px solid rgba(255,255,255,.16); border-radius: 12px; background: rgba(255,255,255,.08); font-size: 11px; }
    .status { display: inline-flex; width: fit-content; margin-bottom: 8px; padding: 7px 10px; border-radius: 999px; color: #fff; font-size: 10px; font-weight: 1000; text-transform: uppercase; }
    .status.danger { background: #d82922; } .status.ok { background: #109e6f; }
    .executive { display: grid; grid-template-columns: 1.12fr .88fr; gap: 12px; margin-top: 14px; }
    .box { padding: 15px; border: 1px solid #dde2ea; border-radius: 12px; background: #fff; break-inside: avoid; }
    .box.soft { background: linear-gradient(135deg, #fff, #f8f9fb); }
    .box h2 { margin: 0 0 8px; font-size: 16px; }
    .box p { margin: 0; color: #596273; font-size: 12px; line-height: 1.45; }
    .kpis { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin: 14px 0; }
    .kpi { min-height: 94px; padding: 13px; border: 1px solid #dde2ea; border-radius: 12px; background: #fff; }
    .kpi span { display: block; color: #667085; font-size: 10px; font-weight: 1000; text-transform: uppercase; }
    .kpi strong { display: block; margin: 9px 0 5px; font-size: 24px; line-height: 1; }
    .kpi small { color: #727b8b; font-size: 10px; }
    .kpi.red { border-color: rgba(239,61,53,.28); background: linear-gradient(135deg, #fff7f6, #fff); }
    .kpi.green { border-color: rgba(16,158,111,.25); background: linear-gradient(135deg, #f4fff9, #fff); }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: start; }
    .advisor-production { grid-column: 1 / -1; }
    .advisor-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .advisor-card { break-inside: avoid; padding: 10px; border: 1px solid #e2e6ed; border-radius: 10px; background: linear-gradient(135deg, #fff, #fbfcfd); }
    .advisor-card-head { display: flex; justify-content: space-between; gap: 10px; align-items: start; }
    .advisor-name { color: #171a21; font-size: 11px; font-weight: 1000; text-transform: uppercase; }
    .advisor-rate { flex: 0 0 auto; padding: 4px 7px; border-radius: 999px; color: #fff; background: #343844; font-size: 9px; font-weight: 1000; }
    .advisor-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5px; margin: 8px 0; }
    .advisor-metrics span { padding: 6px; border-radius: 8px; background: #f2f4f7; color: #303642; font-size: 9px; font-weight: 900; }
    .advisor-metrics b { display: block; color: #171a21; font-size: 13px; }
    .advisor-alerts { display: grid; gap: 3px; margin-top: 6px; color: #b36300; font-size: 9px; font-weight: 900; }
    .advisor-production .fill { background: linear-gradient(90deg, #ef3d35, #343844); }
    .coordinator-box .fill { background: linear-gradient(90deg, #343844, #bfc3ca); }
    .section-title { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin: 0 0 10px; font-size: 16px; }
    .section-title small { color: #ef3d35; font-size: 10px; text-transform: uppercase; }
    .bar { display: grid; gap: 6px; margin: 9px 0; }
    .bar label { display: flex; justify-content: space-between; gap: 10px; color: #303642; font-size: 11px; font-weight: 1000; }
    .unclassified-line { display: block; color: #b36300; font-size: 9px; font-weight: 1000; }
    .track { height: 10px; border-radius: 999px; background: #edf0f4; overflow: hidden; }
    .fill { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #ef3d35, #bfc3ca); }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10px; }
    th { text-align: left; color: #596273; background: #f1f3f6; text-transform: uppercase; }
    th, td { padding: 7px; border-bottom: 1px solid #e6e9ef; vertical-align: top; }
    tr:nth-child(even) td { background: #fbfcfd; }
    .pill { display: inline-block; padding: 4px 8px; border-radius: 999px; color: #fff; background: #d82922; font-weight: 1000; font-size: 9px; }
    .pill.ok { background: #109e6f; }
    .status-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .status-box { padding: 10px; border: 1px solid #dde2ea; border-radius: 10px; background: #fbfcfd; }
    .status-box span { display: block; color: #667085; font-size: 9px; font-weight: 1000; text-transform: uppercase; }
    .status-box strong { display: block; margin-top: 5px; font-size: 20px; }
    .footer { margin-top: 12px; padding-top: 10px; border-top: 1px solid #e6e9ef; color: #697282; font-size: 10px; }
    @media print { body { background: #fff; } .sheet { max-width: none; padding: 0; } .print-actions { display: none; } .header, .box, .kpi { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="print-actions"><button onclick="window.print()">Guardar como PDF</button></div>
  <main class="sheet">
    <section class="header">
      <div class="brand"><div class="logo">A</div><div><h1>Reporte gerencial de compras procesadas</h1><p class="subtitle">Centro de depuracion | Duplicados, coordinador legal, aprobaciones y reprocesos</p></div></div>
      <div class="meta"><span><b>Fecha:</b> ${escapeHtml(formatDateTime(new Date().toISOString()))}</span><span><b>Filtro:</b> ${escapeHtml(filterText)}</span><span><b>Base:</b> ${records.length} registros</span></div>
    </section>
    <section class="executive">
      <article class="box soft"><span class="status ${statusClass}">${escapeHtml(statusText)}</span><h2>Lectura ejecutiva</h2><p>Se analizaron <b>${stats.total}</b> solicitudes y <b>${summary.allPlates.length}</b> placas unicas. Hay <b>${summary.pendingApproval.length}</b> placas con rechazo sin aprobacion posterior, <b>${summary.pendingReview.length}</b> pendientes/reprocesos sin cierre de coordinacion, <b>${summary.riskMediumPending.length}</b> riesgo medio pendiente de Santiago Ortiz y <b>${summary.pendingDuplicates.length}</b> repetidos sin autorizacion.</p></article>
      <article class="box soft"><h2>Criterio de duplicados</h2><p>El check de duplicados se usa en el detalle de Duplicados y reprocesos para autorizar placas repetidas entre meses. Una vez autorizadas dejan de contar como alerta pendiente, pero siguen visibles en trazabilidad.</p></article>
    </section>
    <section class="kpis">
      <article class="kpi"><span>Registros</span><strong>${stats.total}</strong><small>Filas filtradas</small></article>
      <article class="kpi green"><span>Placas unicas</span><strong>${summary.allPlates.length}</strong><small>Vehiculos distintos</small></article>
      <article class="kpi red"><span>Falta aprobar</span><strong>${summary.pendingApproval.length}</strong><small>Rechazos sin aprobacion</small></article>
      <article class="kpi"><span>Por revisar</span><strong>${summary.pendingReview.length}</strong><small>Sin estado claro</small></article>
      <article class="kpi red"><span>Riesgo medio</span><strong>${summary.riskMediumPending.length}</strong><small>Santiago Ortiz</small></article>
      <article class="kpi red"><span>Duplicados</span><strong>${summary.pendingDuplicates.length}</strong><small>Sin autorizar</small></article>
      <article class="kpi green"><span>Autorizados</span><strong>${summary.approvedDuplicates.length}</strong><small>Entre meses</small></article>
    </section>
    <section class="box"><h2 class="section-title">Modulos por estatus <small>${purchaseFilters.status ? `filtro: ${purchaseFilters.status}` : "catalogo operativo"}</small></h2><div class="status-grid">${statusRows.map(([label, count]) => `<article class="status-box"><span>${escapeHtml(label)}</span><strong>${count}</strong></article>`).join("") || "<p>Sin estatus para mostrar.</p>"}</div></section>
    <section class="grid">
      <article class="box coordinator-box"><h2 class="section-title">Productividad coordinador legal <small>${coordinatorRows.length} coordinadores</small></h2>${coordinatorRows.map((row) => `<div class="bar"><label><span>${escapeHtml(row.coordinator)}</span><b>${row.total} sol. | ${row.uniquePlates} placas | ${row.approvedPlates.length} aprob. | ${row.rejectedPlates.length} rechazadas seg. | ${row.pendingPlates.length} pend.</b></label><div class="track"><span class="fill" style="width:${Math.max(4, Math.round((row.total / Math.max(stats.total, 1)) * 100))}%"></span></div></div>`).join("") || "<p>Sin coordinadores para mostrar.</p>"}</article>
      <article class="box"><h2 class="section-title">Resumen del equipo <small>control</small></h2><p>El bloque de asesores se imprime completo en dos columnas para revisar solicitudes, placas, aprobadas y pendientes sin desperdiciar espacio.</p></article>
      <article class="box advisor-production"><h2 class="section-title">Produccion por asesor <small>${advisorRows.length} asesores</small></h2><div class="advisor-list">${advisorRows.map((row) => {
        const pendingPlates = [...row.unresolvedRejectedPlates, ...row.pendingReviewPlates];
        return `<article class="advisor-card"><div class="advisor-card-head"><span class="advisor-name">${escapeHtml(row.advisor)}</span><span class="advisor-rate">${row.approvalRate}%</span></div><div class="advisor-metrics"><span><b>${row.total}</b> solicitudes</span><span><b>${row.uniquePlates}</b> placas</span><span><b>${row.approvedPlates.length}</b> aprobadas</span><span><b>${pendingPlates.length}</b> pendientes</span><span><b>${row.riskMediumPlates.length}</b> riesgo medio</span><span><b>${row.riskHighPlates.length}</b> riesgo alto</span><span><b>${row.unclassifiedPlates.length}</b> sin clasificar</span></div><div class="track"><span class="fill" style="width:${Math.max(4, Math.round((row.total / maxAdvisor) * 100))}%"></span></div>${pendingPlates.length || row.riskMediumPlates.length || row.riskHighPlates.length || row.unclassifiedPlates.length ? `<div class="advisor-alerts">${pendingPlates.length ? `<span>Pendientes: ${escapeHtml(pendingPlates.map((plate) => plate.plate).join(", "))}</span>` : ""}${row.riskMediumPlates.length ? `<span>Riesgo medio: ${escapeHtml(row.riskMediumPlates.map((plate) => plate.plate).join(", "))}</span>` : ""}${row.riskHighPlates.length ? `<span>Riesgo alto: ${escapeHtml(row.riskHighPlates.map((plate) => plate.plate).join(", "))}</span>` : ""}${row.unclassifiedPlates.length ? `<span>Sin clasificar: ${escapeHtml(row.unclassifiedPlates.map((plate) => plate.plate).join(", "))}</span>` : ""}</div>` : ""}</article>`;
      }).join("") || "<p>Sin asesores para mostrar.</p>"}</div></article>
    </section>
    <section class="box"><h2 class="section-title">Placas riesgo medio / alto / sin clasificar <small>validacion de estados</small></h2>${renderRiskAndUnclassifiedPurchaseTable(advisorRows)}</section>
    <section class="box"><h2 class="section-title">Duplicados y reprocesos <small>${duplicateRows.length} placas</small></h2><table><thead><tr><th>Placa</th><th>Meses</th><th>Registros</th><th>Estado</th><th>Casos</th></tr></thead><tbody>${duplicateRows.map((item) => `<tr><td>${escapeHtml(item.plate)}</td><td>${escapeHtml(item.months.join(", "))}</td><td>${item.count}</td><td><span class="pill ${item.isApproved ? "ok" : ""}">${escapeHtml(item.label)}</span></td><td>${escapeHtml(item.cases.map((caseItem) => `${caseItem.month || "SIN MES"} ${caseItem.advisor || "SIN ASESOR"} ${caseItem.summary}`).join(" / "))}</td></tr>`).join("") || `<tr><td colspan="5">Sin duplicados pendientes.</td></tr>`}</tbody></table></section>
    <section class="box"><h2 class="section-title">Base operativa filtrada <small>${records.length} registros</small></h2><table><thead><tr><th>Placa</th><th>Fecha solicitud</th><th>Agencia</th><th>Asesor</th><th>Coordinador</th><th>Estado</th></tr></thead><tbody>${records.map((record) => `<tr><td>${escapeHtml(record.PLACA)}</td><td>${escapeHtml(record["FECHA DE SOLICITUD"])}</td><td>${escapeHtml(record.AGENCIA)}</td><td>${escapeHtml(record.ASESOR)}</td><td>${escapeHtml(record["COORDINADOR LEGAL"])}</td><td>${escapeHtml(summarizePurchaseCase(record))}</td></tr>`).join("") || `<tr><td colspan="6">Sin registros.</td></tr>`}</tbody></table></section>
    <div class="footer">Autocor | Reporte generado localmente desde la plataforma de mesa de control. Use Guardar como PDF en la ventana de impresion del navegador.</div>
  </main>
</body>
</html>`;
}

function exportPurchasePdfReport() {
  const { records } = getPurchaseReportContext();
  if (!records.length) {
    showToast("No hay datos de compras para generar reporte.");
    return;
  }
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showToast("El navegador bloqueo la ventana del reporte. Permita ventanas emergentes para descargar PDF.");
    return;
  }
  reportWindow.document.open();
  reportWindow.document.write(buildPurchaseReportHtml());
  reportWindow.document.close();
  setTimeout(() => reportWindow.print(), 500);
}

function renderRiskAndUnclassifiedPurchaseTable(advisorRows) {
  const rows = advisorRows.flatMap((row) => [
    ...row.riskMediumPlates.map((plate) => ({ type: "RIESGO MEDIO", row, plate })),
    ...row.riskHighPlates.map((plate) => ({ type: "RIESGO ALTO", row, plate })),
    ...row.unclassifiedPlates.map((plate) => ({ type: "SIN CLASIFICAR", row, plate }))
  ].map(({ type, row, plate }) => ({
    type,
    advisor: row.advisor,
    agency: row.mainAgency,
    plate: plate.plate,
    count: plate.count,
    reason: plate.statuses.map((status) => status.label.replace(/^Caso \d+:\s*/, "")).join(" / ")
  })));
  if (!rows.length) return `<p>No hay placas de riesgo ni sin clasificar con los filtros actuales.</p>`;
  return `
    <table>
      <thead><tr><th>Tipo</th><th>Asesor</th><th>Placa</th><th>Agencia</th><th>Casos</th><th>Texto detectado</th></tr></thead>
      <tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.advisor)}</td><td>${escapeHtml(row.plate)}</td><td>${escapeHtml(row.agency)}</td><td>${row.count}</td><td>${escapeHtml(row.reason || "Sin texto de estado interpretable")}</td></tr>`).join("")}</tbody>
    </table>
  `;
}

function getFilteredPurchaseRecords(options = {}) {
  const { ignoreLoad = false, ignoreStatus = false } = options;
  const plate = normalizePlate(purchaseFilters.plate);
  return (state.dataProcessing?.compras || [])
    .filter((record) => !purchaseFilters.month || record.importMonth === purchaseFilters.month)
    .filter((record) => ignoreLoad || !purchaseFilters.loadId || record.loadId === purchaseFilters.loadId)
    .filter((record) => !purchaseFilters.date || getRecordWorkDate(record) === purchaseFilters.date)
    .filter((record) => !purchaseFilters.agency || record.AGENCIA === purchaseFilters.agency)
    .filter((record) => !getFilterValues(purchaseFilters.advisor).length || getFilterValues(purchaseFilters.advisor).includes(record.ASESOR))
    .filter((record) => !getFilterValues(purchaseFilters.coordinator).length || getFilterValues(purchaseFilters.coordinator).includes(record["COORDINADOR LEGAL"]))
    .filter((record) => ignoreStatus || !purchaseFilters.status || getPurchaseRecordStatuses(record).includes(purchaseFilters.status))
    .filter((record) => !plate || record.PLACA.includes(plate));
}

function getRecordWorkDate(record) {
  return normalizePurchaseDate(record["FECHA DE SOLICITUD"]);
}

function normalizePurchaseDate(value) {
  const text = normalizeLooseText(value);
  if (!text) return "";
  const iso = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  const dayFirst = text.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})$/);
  if (dayFirst) {
    const year = dayFirst[3].length === 2 ? `20${dayFirst[3]}` : dayFirst[3];
    return `${year}-${dayFirst[2].padStart(2, "0")}-${dayFirst[1].padStart(2, "0")}`;
  }
  const excelSerial = Number(text);
  if (Number.isFinite(excelSerial) && excelSerial > 20000 && excelSerial < 80000) {
    const date = new Date(Math.round((excelSerial - 25569) * 86400 * 1000));
    return date.toISOString().slice(0, 10);
  }
  return "";
}

function renderPurchaseFilterOptions() {
  renderPurchaseFilterSelect(purchaseMonthFilter, uniquePurchaseValues("importMonth"), "TODOS LOS MESES", purchaseFilters.month);
  renderPurchaseLoadFilter();
  renderPurchaseFilterSelect(purchaseAgencyFilter, uniquePurchaseValues("AGENCIA"), "TODAS LAS AGENCIAS", purchaseFilters.agency);
  renderPurchaseFilterSelect(purchaseAdvisorFilter, uniquePurchaseValues("ASESOR"), "TODOS LOS ASESORES", purchaseFilters.advisor);
  renderPurchaseFilterSelect(purchaseCoordinatorFilter, uniquePurchaseValues("COORDINADOR LEGAL"), "TODOS LOS COORDINADORES", purchaseFilters.coordinator);
  renderPurchaseCheckFilter(purchaseAdvisorFilter, purchaseAdvisorFilterPanel, purchaseAdvisorFilterBtn, "Todos los asesores", "asesores");
  renderPurchaseCheckFilter(purchaseCoordinatorFilter, purchaseCoordinatorFilterPanel, purchaseCoordinatorFilterBtn, "Todos los coordinadores", "coordinadores");
  renderPurchaseFilterSelect(purchaseStatusFilter, PURCHASE_STATUS_OPTIONS, "TODOS LOS ESTATUS", purchaseFilters.status);
}

function renderPurchaseLoadFilter() {
  if (!purchaseLoadFilter) return;
  const loads = getPurchaseLoadsWithStats();
  purchaseLoadFilter.innerHTML = `<option value="">TODAS LAS CARGAS</option>${loads
    .filter((load) => !load.isLegacy)
    .map((load) => `<option value="${escapeHtml(load.id)}">${escapeHtml(formatMonthLabel(load.month))} | ${escapeHtml(load.source)} | ${load.recordCount} filas</option>`)
    .join("")}`;
  purchaseLoadFilter.value = purchaseFilters.loadId && loads.some((load) => load.id === purchaseFilters.loadId) ? purchaseFilters.loadId : "";
}

function uniquePurchaseValues(field) {
  return [...new Set((state.dataProcessing?.compras || []).map((record) => record[field]).filter(Boolean))]
    .sort((a, b) => field === "importMonth" ? b.localeCompare(a) : a.localeCompare(b));
}

function renderPurchaseFilterSelect(select, values, placeholder, current) {
  if (!select) return;
  const isMulti = Boolean(select.multiple);
  select.innerHTML = `${isMulti ? "" : `<option value="">${escapeHtml(placeholder)}</option>`}${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
  if (isMulti) {
    const selected = new Set(getFilterValues(current));
    [...select.options].forEach((option) => {
      option.selected = selected.has(option.value);
    });
  } else {
    select.value = current && values.includes(current) ? current : "";
  }
}

function getPurchaseFilterPresets() {
  state.dataProcessing.purchaseFilterPresets = state.dataProcessing.purchaseFilterPresets || [];
  return state.dataProcessing.purchaseFilterPresets;
}

function renderPurchaseFilterPresets() {
  if (!purchaseFilterPresetSelect) return;
  const presets = getPurchaseFilterPresets();
  purchaseFilterPresetSelect.innerHTML = `<option value="">Filtros guardados</option>${presets.map((preset) => `<option value="${escapeHtml(preset.id)}">${escapeHtml(preset.name)}</option>`).join("")}`;
}

function getSavablePurchaseFilters() {
  return {
    agency: purchaseFilters.agency || "",
    advisor: getFilterValues(purchaseFilters.advisor),
    coordinator: getFilterValues(purchaseFilters.coordinator),
    status: purchaseFilters.status || ""
  };
}

function savePurchaseFilterPreset() {
  const filters = getSavablePurchaseFilters();
  const hasSelection = filters.agency || filters.advisor.length || filters.coordinator.length || filters.status;
  if (!hasSelection) {
    showToast("Seleccione agencia, asesores, coordinadores o estatus antes de guardar.");
    return;
  }
  const defaultName = filters.advisor.length || filters.coordinator.length
    ? `Equipo ${new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" })}`
    : "Filtro de compras";
  const name = window.prompt("Nombre del filtro guardado:", defaultName);
  if (!name) return;
  const presets = getPurchaseFilterPresets();
  presets.push({ id: crypto.randomUUID(), name: normalizeLooseText(name), filters, createdAt: new Date().toISOString() });
  saveState();
  renderPurchaseFilterPresets();
  showToast("Filtro guardado.");
}

function applyPurchaseFilterPreset(id) {
  const preset = getPurchaseFilterPresets().find((item) => item.id === id);
  if (!preset) return;
  purchaseFilters = {
    ...purchaseFilters,
    agency: preset.filters?.agency || "",
    advisor: getFilterValues(preset.filters?.advisor),
    coordinator: getFilterValues(preset.filters?.coordinator),
    status: preset.filters?.status || ""
  };
  if (purchaseAgencyFilter) purchaseAgencyFilter.value = purchaseFilters.agency;
  if (purchaseStatusFilter) purchaseStatusFilter.value = purchaseFilters.status;
  syncMultiSelect(purchaseAdvisorFilter, purchaseFilters.advisor);
  syncMultiSelect(purchaseCoordinatorFilter, purchaseFilters.coordinator);
  renderPurchaseProcessing();
}

function syncMultiSelect(select, values) {
  if (!select) return;
  const selected = new Set(getFilterValues(values));
  [...select.options].forEach((option) => {
    option.selected = selected.has(option.value);
  });
}

function getFilterValues(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
}

function getSelectedOptions(select) {
  return select ? [...select.selectedOptions].map((option) => option.value).filter(Boolean) : [];
}

function renderPurchaseCheckFilter(select, panel, button, allLabel, pluralLabel) {
  if (!select || !panel || !button) return;
  const selected = getSelectedOptions(select);
  button.textContent = selected.length ? `${selected.length} ${pluralLabel} seleccionados` : allLabel;
  panel.innerHTML = `
    <label class="check-filter-all">
      <input type="checkbox" data-check-filter-all ${selected.length ? "" : "checked"}>
      ${escapeHtml(allLabel)}
    </label>
    ${[...select.options].map((option) => `
      <label>
        <input type="checkbox" value="${escapeHtml(option.value)}" ${option.selected ? "checked" : ""}>
        ${escapeHtml(option.textContent)}
      </label>
    `).join("")}
  `;
  panel.querySelector("[data-check-filter-all]")?.addEventListener("change", (event) => {
    if (!event.target.checked) return;
    [...select.options].forEach((option) => { option.selected = false; });
    updatePurchaseFilters();
  });
  panel.querySelectorAll("input:not([data-check-filter-all])").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const values = new Set([...panel.querySelectorAll("input:not([data-check-filter-all]):checked")].map((item) => item.value));
      [...select.options].forEach((option) => {
        option.selected = values.has(option.value);
      });
      updatePurchaseFilters();
    });
  });
}

function formatMultiFilterLabel(label, value) {
  const values = getFilterValues(value);
  if (!values.length) return "";
  return `${label}: ${values.length > 3 ? `${values.length} seleccionados` : values.join(", ")}`;
}

function updatePurchaseMonthHint() {
  if (!purchaseMonthHint) return;
  const month = normalizeLooseText(purchaseMonthInput?.value || "");
  purchaseMonthHint.textContent = month
    ? `La proxima carga se registrara en ${formatMonthLabel(month)}.`
    : "Seleccione el mes antes de cargar la base.";
  purchaseMonthHint.classList.toggle("is-ready", Boolean(month));
}

function renderPurchaseLoadReport() {
  if (!purchaseLoadReport) return;
  const loads = getPurchaseLoadsWithStats();
  if (purchaseLoadCount) purchaseLoadCount.textContent = `${loads.length} ${loads.length === 1 ? "carga" : "cargas"}`;
  purchaseLoadReport.innerHTML = loads.length ? loads.map((load) => `
    <article class="load-report-card">
      <div>
        <strong>${escapeHtml(formatMonthLabel(load.month))}</strong>
        <span>${escapeHtml(load.source)} | ${escapeHtml(formatDateTime(load.importedAt))}</span>
      </div>
      <div class="load-report-metrics">
        <span><b>${load.recordCount}</b> filas</span>
        <span><b>${load.newPlates}</b> nuevas</span>
        <span><b>${load.uniquePlates}</b> placas</span>
        <span><b>${load.duplicatePlates}</b> duplicadas</span>
        <span><b>${load.pendingApproval}</b> falta aprobar</span>
      </div>
      <button class="btn danger" type="button" data-remove-purchase-load="${escapeHtml(load.id)}">Borrar carga</button>
    </article>
  `).join("") : `<div class="empty compact-empty">Aun no hay cargas registradas.</div>`;

  purchaseLoadReport.querySelectorAll("[data-remove-purchase-load]").forEach((button) => {
    button.addEventListener("click", () => removePurchaseLoad(button.dataset.removePurchaseLoad));
  });
}

function getPurchaseLoadsWithStats() {
  const records = state.dataProcessing?.compras || [];
  const loads = state.dataProcessing?.loads || [];
  const knownLoads = loads.map((load) => buildPurchaseLoadStats(load, records.filter((record) => record.loadId === load.id), false, records));
  const legacyRecords = records.filter((record) => !record.loadId);
  const legacyGroups = [...new Map(legacyRecords.map((record) => [record.importMonth || "SIN MES", []])).keys()]
    .map((month) => buildPurchaseLoadStats({
      id: `legacy-${month}`,
      month,
      source: "CARGA ANTERIOR",
      importedAt: legacyRecords.find((record) => (record.importMonth || "SIN MES") === month)?.importedAt || "",
      recordCount: legacyRecords.filter((record) => (record.importMonth || "SIN MES") === month).length
    }, legacyRecords.filter((record) => (record.importMonth || "SIN MES") === month), true, records));
  return [...knownLoads, ...legacyGroups]
    .filter((load) => load.recordCount > 0)
    .sort((a, b) => new Date(b.importedAt || 0) - new Date(a.importedAt || 0));
}

function buildPurchaseLoadStats(load, records, isLegacy = false, allRecords = []) {
  const plateCounts = new Map();
  records.forEach((record) => {
    if (record.PLACA) plateCounts.set(record.PLACA, (plateCounts.get(record.PLACA) || 0) + 1);
  });
  const priorPlates = new Set(allRecords
    .filter((record) => record.PLACA && record.loadId !== load.id && new Date(record.importedAt || 0) < new Date(load.importedAt || 0))
    .map((record) => record.PLACA));
  const newPlates = [...plateCounts.keys()].filter((plate) => !priorPlates.has(plate));
  const rows = getPurchaseAdvisorMetrics(records);
  return {
    ...load,
    isLegacy,
    recordCount: records.length || load.recordCount || 0,
    newPlates: newPlates.length,
    uniquePlates: plateCounts.size,
    duplicatePlates: [...plateCounts.values()].filter((count) => count > 1).length,
    pendingApproval: rows.reduce((sum, row) => sum + row.unresolvedRejectedPlates.length, 0)
  };
}

function parseContractInput(text, source = "PEGADO") {
  const rows = parseDelimitedText(text);
  if (!rows.length) return [];
  const firstRowKeys = rows[0].map(normalizeHeaderKey);
  const hasHeader = firstRowKeys.some((key) => key.includes("CEDULA")) && firstRowKeys.some((key) => key.includes("PLACA"));
  const headers = hasHeader ? rows.shift() : CONTRACT_COLUMNS;
  const usedColumns = new Set();
  const headerMap = headers.map((header, index) => {
    const key = normalizeHeaderKey(header);
    const exact = CONTRACT_COLUMNS.find((column) =>
      !usedColumns.has(column) &&
      (normalizeHeaderKey(column) === key || getContractColumnAliases(column).some((alias) => normalizeHeaderKey(alias) === key))
    );
    const column = exact || CONTRACT_COLUMNS[index] || key;
    if (CONTRACT_COLUMNS.includes(column)) usedColumns.add(column);
    return column;
  });
  const importMonth = normalizeLooseText(contractMonthInput?.value || "");
  return rows
    .filter((row) => row.some((cell) => normalizeLooseText(cell)))
    .map((row) => {
      const record = { id: crypto.randomUUID(), importedAt: new Date().toISOString(), importMonth, source };
      CONTRACT_COLUMNS.forEach((column) => { record[column] = ""; });
      row.forEach((cell, index) => {
        const column = headerMap[index];
        if (CONTRACT_COLUMNS.includes(column)) record[column] = cell;
      });
      return normalizeContractRecord(record);
    });
}

function addContractRecords(records) {
  if (!records.length) {
    showToast("No se encontraron contratos para procesar.");
    return;
  }
  const importMonth = normalizeLooseText(contractMonthInput?.value || records[0]?.importMonth || "");
  if (!importMonth) {
    showToast("Seleccione el mes al que corresponde la carga de contratos.");
    contractMonthInput?.focus();
    return;
  }
  const load = {
    id: crypto.randomUUID(),
    month: importMonth,
    source: records[0]?.source || "MANUAL",
    importedAt: new Date().toISOString(),
    recordCount: records.length
  };
  state.dataProcessing.contratos = state.dataProcessing.contratos || [];
  state.dataProcessing.contractLoads = state.dataProcessing.contractLoads || [];
  state.dataProcessing.contractLoads.push(load);
  state.dataProcessing.contratos.push(...records.map((record) => normalizeContractRecord({
    ...record,
    importMonth,
    loadId: load.id,
    loadLabel: `${importMonth} | ${load.source}`
  })));
  contractFilters = { ...contractFilters, month: importMonth, loadId: load.id };
  saveState();
  renderContractProcessing();
  showToast(`${records.length} contratos procesados para ${formatMonthLabel(importMonth)}.`);
}

function getFilteredContractRecords() {
  const search = normalizeLooseText(contractFilters.search);
  return (state.dataProcessing?.contratos || [])
    .filter((record) => !contractFilters.month || record.importMonth === contractFilters.month)
    .filter((record) => !contractFilters.loadId || record.loadId === contractFilters.loadId)
    .filter((record) => !contractFilters.date || getContractRecordDate(record) === contractFilters.date)
    .filter((record) => !contractFilters.agency || record["AGENCIA DE VENTA"] === contractFilters.agency)
    .filter((record) => !contractFilters.advisor || record["NOMBRE DEL ASESOR"] === contractFilters.advisor)
    .filter((record) => !contractFilters.legal || record["ASISTENTE LEGAL"] === contractFilters.legal)
    .filter((record) => !contractFilters.status || record.ESTATUS === contractFilters.status)
    .filter((record) => !search || [record.PLACAS, record["CEDULA DE IDENTIDAD"], record["NOMBRE COMPLETO CLIENTE"]].some((value) => normalizeLooseText(value).includes(search)));
}

function getContractRecordDate(record) {
  return normalizePurchaseDate(record["HORA DE INICIO"])
    || normalizePurchaseDate(record["FECHA DE ACTA"])
    || normalizePurchaseDate(String(record["HORA DE INICIO"] || "").split(" ")[0]);
}

function renderContractProcessing() {
  const records = getFilteredContractRecords();
  const allRecords = state.dataProcessing?.contratos || [];
  const count = document.querySelector("#contractRecordCount");
  if (count) count.textContent = `${records.length} de ${allRecords.length} registros`;
  renderContractFilterOptions();
  renderContractLoadReport();
  updateContractMonthHint();
  renderContractKpis(records);
  renderContractStatusModules(records);
  renderContractAnalysis(records);
  renderContractTable(records);
}

function renderContractFilterOptions() {
  renderContractFilterSelect(contractMonthFilter, uniqueContractValues("importMonth"), "TODOS LOS MESES", contractFilters.month);
  renderContractLoadFilter();
  renderContractFilterSelect(contractAgencyFilter, uniqueContractValues("AGENCIA DE VENTA"), "TODAS LAS AGENCIAS", contractFilters.agency);
  renderContractFilterSelect(contractAdvisorFilter, uniqueContractValues("NOMBRE DEL ASESOR"), "TODOS LOS ASESORES", contractFilters.advisor);
  renderContractFilterSelect(contractLegalFilter, uniqueContractValues("ASISTENTE LEGAL"), "TODOS LOS ASISTENTES", contractFilters.legal);
  renderContractFilterSelect(contractStatusFilter, CONTRACT_STATUS_OPTIONS, "TODOS LOS ESTATUS", contractFilters.status);
  if (contractDateFilter) contractDateFilter.value = contractFilters.date || "";
  if (contractSearchFilter) contractSearchFilter.value = contractFilters.search || "";
}

function renderContractLoadFilter() {
  if (!contractLoadFilter) return;
  const loads = state.dataProcessing?.contractLoads || [];
  contractLoadFilter.innerHTML = `<option value="">TODAS LAS CARGAS</option>${loads
    .slice()
    .sort((a, b) => new Date(b.importedAt) - new Date(a.importedAt))
    .map((load) => `<option value="${escapeHtml(load.id)}">${escapeHtml(formatMonthLabel(load.month))} | ${escapeHtml(load.source)} | ${load.recordCount} filas</option>`)
    .join("")}`;
  contractLoadFilter.value = contractFilters.loadId && loads.some((load) => load.id === contractFilters.loadId) ? contractFilters.loadId : "";
}

function renderContractFilterSelect(select, values, placeholder, current) {
  if (!select) return;
  select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value === normalizeLooseText(value) && /^\d{4}-\d{2}$/.test(value) ? formatMonthLabel(value) : value)}</option>`).join("")}`;
  select.value = values.includes(current) ? current : "";
}

function uniqueContractValues(field) {
  return [...new Set((state.dataProcessing?.contratos || []).map((record) => record[field]).filter(Boolean))]
    .sort((a, b) => field === "importMonth" ? b.localeCompare(a) : a.localeCompare(b));
}

function getContractStats(records) {
  const plates = new Map();
  const ids = new Map();
  let closed = 0;
  let withAct = 0;
  let value = 0;
  records.forEach((record) => {
    if (record.PLACAS) plates.set(record.PLACAS, (plates.get(record.PLACAS) || 0) + 1);
    if (record["CEDULA DE IDENTIDAD"]) ids.set(record["CEDULA DE IDENTIDAD"], (ids.get(record["CEDULA DE IDENTIDAD"]) || 0) + 1);
    if (record["FECHA DE ACTA"]) withAct += 1;
    if (record["FECHA DE CONTRATO CERRADO"] || isContractClosed(record)) closed += 1;
    value += Number(record["VALOR DE VENTA"] || 0) || 0;
  });
  return {
    total: records.length,
    uniquePlates: plates.size,
    uniqueClients: ids.size,
    duplicatePlates: [...plates.values()].filter((count) => count > 1).length,
    duplicateClients: [...ids.values()].filter((count) => count > 1).length,
    closed,
    pending: Math.max(0, records.length - closed),
    withAct,
    value
  };
}

function isContractClosed(record) {
  const text = normalizeLooseText(record.ESTATUS);
  return Boolean(record["FECHA DE CONTRATO CERRADO"] || text.includes("CERRADO") || text.includes("FIRMADO") || text.includes("FINALIZADO") || text.includes("APROBADO"));
}

function renderContractKpis(records) {
  const container = document.querySelector("#contractKpis");
  if (!container) return;
  const stats = getContractStats(records);
  const cards = [
    ["Contratos", stats.total, "Filas procesadas", "is-neutral", ""],
    ["Cerrados", stats.closed, "Con cierre o estatus final", "is-success", ""],
    ["Pendientes", stats.pending, "Sin cierre de contrato", stats.pending ? "is-warning" : "is-success", "PEND"],
    ["Placas unicas", stats.uniquePlates, "Vehiculos distintos", "is-neutral", ""],
    ["Duplicados", stats.duplicatePlates + stats.duplicateClients, "Placas o cedulas repetidas", stats.duplicatePlates || stats.duplicateClients ? "is-critical" : "is-success", ""],
    ["Valor venta", `$ ${stats.value.toFixed(2)}`, "Suma filtrada", "is-success", ""]
  ];
  container.innerHTML = cards.map(([label, value, hint, tone, icon]) => `
    <button class="kpi-card executive-kpi ${tone}" type="button" data-contract-detail="${escapeHtml(label)}">
      <span>${escapeHtml(icon)} ${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
    </button>
  `).join("");
  container.querySelectorAll("[data-contract-detail]").forEach((button) => {
    button.addEventListener("click", () => openContractDetail(button.dataset.contractDetail));
  });
}

function renderContractStatusModules(records) {
  const container = document.querySelector("#contractStatusModules");
  if (!container) return;
  const counts = countByField(records, "ESTATUS");
  container.innerHTML = `
    <div class="status-board-head">
      <div><p class="eyebrow">Mapa de estatus</p><h3>Clasificacion contractual</h3></div>
      <span>${counts.length} estatus activos</span>
    </div>
    <div class="status-board-grid">
      ${counts.map(([status, count]) => `<button class="status-module ${isContractClosed({ ESTATUS: status }) ? "is-success" : "is-warning"}" type="button" data-contract-status="${escapeHtml(status)}"><span><i>${isContractClosed({ ESTATUS: status }) ? "" : "PEND"}</i>${escapeHtml(status || "SIN ESTATUS")}</span><strong>${count}</strong></button>`).join("") || `<div class="empty compact-empty">Sin estatus para mostrar.</div>`}
    </div>
  `;
  container.querySelectorAll("[data-contract-status]").forEach((button) => {
    button.addEventListener("click", () => openContractDetail("Estatus", button.dataset.contractStatus));
  });
}

function renderContractAnalysis(records) {
  const container = document.querySelector("#contractAnalysis");
  if (!container) return;
  const stats = getContractStats(records);
  const legalRanking = countByField(records, "ASISTENTE LEGAL").slice(0, 4);
  const duplicateText = stats.duplicatePlates || stats.duplicateClients
    ? `Hay ${stats.duplicatePlates} placa(s) y ${stats.duplicateClients} cedula(s) repetidas. Revise duplicados antes de cerrar contratos.`
    : "No se detectan duplicados por placa o cedula en el filtro actual.";
  container.innerHTML = `
    <section class="provider-audit-summary">
      <div>
        <p class="eyebrow">Analisis directo</p>
        <h3>${escapeHtml(duplicateText)}</h3>
        <p>Cierre contractual: <b>${stats.closed}</b> cerrados de <b>${stats.total}</b>. Valor filtrado: <b>$ ${stats.value.toFixed(2)}</b>.</p>
      </div>
      <div class="provider-audit-tags">
        <span>${stats.uniqueClients} clientes</span>
        <span>${stats.uniquePlates} placas</span>
        <span>${stats.withAct} con acta</span>
        <span>${legalRanking[0] ? `Top legal: ${legalRanking[0][0]}` : "Sin asistente"}</span>
      </div>
    </section>
    ${renderContractAgencyStatusMatrix(records)}
  `;
  container.querySelectorAll("[data-contract-matrix-status], [data-contract-matrix-agency]").forEach((button) => {
    button.addEventListener("click", () => {
      openContractDetail("Matriz", button.dataset.contractMatrixStatus || "", button.dataset.contractMatrixAgency || "");
    });
  });
}

function renderContractAgencyStatusMatrix(records) {
  if (!records.length) return "";
  const agencies = [...new Set(records.map((record) => record["AGENCIA DE VENTA"] || "SIN AGENCIA"))].sort();
  const totals = Object.fromEntries(CONTRACT_STATUS_OPTIONS.map((status) => [status, 0]));
  const rows = agencies.map((agency) => {
    const agencyRecords = records.filter((record) => (record["AGENCIA DE VENTA"] || "SIN AGENCIA") === agency);
    const counts = Object.fromEntries(CONTRACT_STATUS_OPTIONS.map((status) => [status, 0]));
    agencyRecords.forEach((record) => {
      const status = CONTRACT_STATUS_OPTIONS.includes(record.ESTATUS) ? record.ESTATUS : "OBSERVADO / DOCUMENTOS";
      counts[status] += 1;
      totals[status] += 1;
    });
    return { agency, counts, total: agencyRecords.length };
  });
  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);
  return `
    <section class="contract-status-matrix">
      <div class="card-title-row">
        <div>
          <p class="eyebrow">Matriz operativa</p>
          <h3>Estatus por agencia</h3>
        </div>
        <span class="soft-badge">${grandTotal} contratos</span>
      </div>
      <div class="processing-table-scroll">
        <table>
          <thead>
            <tr>
              <th>Agencia</th>
              ${CONTRACT_STATUS_OPTIONS.map((status) => `<th>${escapeHtml(status)}</th>`).join("")}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `<tr>
              <td><strong>${escapeHtml(row.agency)}</strong></td>
              ${CONTRACT_STATUS_OPTIONS.map((status) => `<td>${renderContractMatrixButton(row.counts[status] || 0, status, row.agency)}</td>`).join("")}
              <td>${renderContractMatrixButton(row.total, "", row.agency, true)}</td>
            </tr>`).join("")}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              ${CONTRACT_STATUS_OPTIONS.map((status) => `<th>${renderContractMatrixButton(totals[status] || 0, status, "", true)}</th>`).join("")}
              <th>${renderContractMatrixButton(grandTotal, "", "", true)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  `;
}

function renderContractMatrixButton(count, status = "", agency = "", isTotal = false) {
  if (!count) return `<span class="matrix-zero">0</span>`;
  return `<button class="matrix-detail-btn ${isTotal ? "is-total" : ""}" type="button" data-contract-matrix-status="${escapeHtml(status)}" data-contract-matrix-agency="${escapeHtml(agency)}">${count}</button>`;
}

function renderContractLoadReport() {
  if (!contractLoadReport) return;
  const loads = state.dataProcessing?.contractLoads || [];
  if (contractLoadCount) contractLoadCount.textContent = `${loads.length} ${loads.length === 1 ? "carga" : "cargas"}`;
  contractLoadReport.innerHTML = loads.length ? loads.slice().sort((a, b) => new Date(b.importedAt) - new Date(a.importedAt)).map((load) => {
    const records = (state.dataProcessing?.contratos || []).filter((record) => record.loadId === load.id);
    const stats = getContractStats(records);
    return `<article class="load-report-card">
      <div><strong>${escapeHtml(formatMonthLabel(load.month))}</strong><span>${escapeHtml(load.source)} | ${escapeHtml(formatDateTime(load.importedAt))}</span></div>
      <div class="load-report-metrics"><span><b>${records.length}</b> filas</span><span><b>${stats.uniquePlates}</b> placas</span><span><b>${stats.closed}</b> cerrados</span><span><b>${stats.duplicatePlates}</b> duplicadas</span></div>
      <button class="btn danger" type="button" data-remove-contract-load="${escapeHtml(load.id)}">Borrar carga</button>
    </article>`;
  }).join("") : `<div class="empty compact-empty">Aun no hay cargas de contratos.</div>`;
  contractLoadReport.querySelectorAll("[data-remove-contract-load]").forEach((button) => {
    button.addEventListener("click", () => removeContractLoad(button.dataset.removeContractLoad));
  });
}

function renderContractTable(records) {
  const container = document.querySelector("#contractTable");
  if (!container) return;
  if (!records.length) {
    container.innerHTML = `<div class="empty compact-empty">Carga contratos para ver la base normalizada.</div>`;
    return;
  }
  const visible = records.slice(-60).reverse();
  const columns = ["PLACAS", "NOMBRE COMPLETO CLIENTE", "CEDULA DE IDENTIDAD", "AGENCIA DE VENTA", "NOMBRE DEL ASESOR", "ASISTENTE LEGAL", "ESTATUS", "FECHA DE CONTRATO CERRADO"];
  container.innerHTML = `
    <div class="processing-table-scroll provider-compact-table">
      <table>
        <thead><tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>${visible.map((record) => `<tr>${columns.map((column) => `<td title="${escapeHtml(record[column] || "")}">${escapeHtml(record[column] || "")}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function updateContractMonthHint() {
  if (!contractMonthHint) return;
  const month = normalizeLooseText(contractMonthInput?.value || "");
  contractMonthHint.textContent = month ? `La proxima carga de contratos se registrara en ${formatMonthLabel(month)}.` : "Seleccione el mes antes de cargar la base.";
  contractMonthHint.classList.toggle("is-ready", Boolean(month));
}

function removeContractLoad(loadId) {
  if (!loadId) return;
  const confirmed = window.confirm("Desea borrar esta carga de contratos?");
  if (!confirmed) return;
  state.dataProcessing.contratos = (state.dataProcessing.contratos || []).filter((record) => record.loadId !== loadId);
  state.dataProcessing.contractLoads = (state.dataProcessing.contractLoads || []).filter((load) => load.id !== loadId);
  contractFilters = { ...contractFilters, loadId: "" };
  saveState();
  renderContractProcessing();
  showToast("Carga de contratos eliminada.");
}

function openContractDetail(kind = "Contratos", status = "", agency = "") {
  const modal = document.querySelector("#purchaseDetailModal");
  const title = document.querySelector("#purchaseDetailTitle");
  const content = document.querySelector("#purchaseDetailContent");
  if (!modal || !content) return;
  let records = getFilteredContractRecords();
  if (kind === "Cerrados") records = records.filter(isContractClosed);
  if (kind === "Pendientes") records = records.filter((record) => !isContractClosed(record));
  if (kind === "Duplicados") {
    const duplicatePlates = getDuplicateContractValues(records, "PLACAS");
    const duplicateIds = getDuplicateContractValues(records, "CEDULA DE IDENTIDAD");
    records = records.filter((record) => duplicatePlates.has(record.PLACAS) || duplicateIds.has(record["CEDULA DE IDENTIDAD"]));
  }
  if (agency) records = records.filter((record) => (record["AGENCIA DE VENTA"] || "SIN AGENCIA") === agency);
  if (status) records = records.filter((record) => record.ESTATUS === status);
  const reportTitle = [agency, status, !agency && !status ? kind : ""].filter(Boolean).join(" | ") || "Contratos";
  if (title) title.textContent = reportTitle;
  content.innerHTML = renderContractDetailHeader(records, { status, agency, kind }) + renderContractDetailTable(records);
  currentPurchaseDetailReport = { title: reportTitle, html: content.innerHTML };
  modal.hidden = false;
}

function renderContractDetailHeader(records, context = {}) {
  const stats = getContractStats(records);
  const duplicatePlates = getDuplicateContractValues(records, "PLACAS").size;
  const duplicateClients = getDuplicateContractValues(records, "CEDULA DE IDENTIDAD").size;
  return `
    <section class="status-comparison-panel contract-detail-summary">
      <article><span>Contratos</span><strong>${stats.total}</strong><small>${escapeHtml(context.agency || "Todas las agencias")}</small></article>
      <article><span>Estatus</span><strong>${escapeHtml(context.status || "Todos")}</strong><small>Filtro aplicado</small></article>
      <article><span>Cerrados</span><strong>${stats.closed}</strong><small>${stats.pending} pendientes</small></article>
      <article><span>Duplicados</span><strong>${duplicatePlates + duplicateClients}</strong><small>${duplicatePlates} placas | ${duplicateClients} cedulas</small></article>
    </section>
  `;
}

function getDuplicateContractValues(records, field) {
  const counts = new Map();
  records.forEach((record) => {
    if (record[field]) counts.set(record[field], (counts.get(record[field]) || 0) + 1);
  });
  return new Set([...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value));
}

function renderContractDetailTable(records) {
  if (!records.length) return `<div class="empty compact-empty">Sin contratos para mostrar.</div>`;
  const columns = ["PLACAS", "NOMBRE COMPLETO CLIENTE", "CEDULA DE IDENTIDAD", "VALOR DE VENTA", "AGENCIA DE VENTA", "NOMBRE DEL ASESOR", "ASISTENTE LEGAL", "ESTATUS", "FECHA DE ACTA", "FECHA DE CONTRATO CERRADO", "OBSERVACIONES 2"];
  return `<div class="processing-table-scroll provider-detail-table"><table><thead><tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead><tbody>${records.map((record) => `<tr>${columns.map((column) => `<td>${escapeHtml(record[column] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function exportContractsCsv() {
  const records = getFilteredContractRecords();
  if (!records.length) {
    showToast("No hay contratos para exportar.");
    return;
  }
  const csv = [CONTRACT_COLUMNS.join(";"), ...records.map((record) => CONTRACT_COLUMNS.map((column) => csvCell(record[column] || "")).join(";"))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `contratos-autocor-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function exportContractPdfReport() {
  const records = getFilteredContractRecords();
  if (!records.length) {
    showToast("No hay contratos para generar reporte.");
    return;
  }
  const stats = getContractStats(records);
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showToast("Permita ventanas emergentes para generar el PDF.");
    return;
  }
  const statusRows = countByField(records, "ESTATUS").filter(([, count]) => count > 0);
  reportWindow.document.open();
  reportWindow.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Reporte contratos Autocor</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:"Roboto Condensed","Arial Narrow",Arial,sans-serif;color:#171a21;background:#eef1f5}.sheet{background:#fff;padding:18px}.header{display:flex;justify-content:space-between;gap:16px;background:#20232c;color:#fff;border-bottom:6px solid #ef3d35;border-radius:14px;padding:18px}.kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin:14px 0}.kpi,.box{border:1px solid #dde2ea;border-radius:12px;background:#fff;padding:12px}.kpi span{font-size:10px;color:#667085;text-transform:uppercase;font-weight:900}.kpi strong{display:block;font-size:24px;margin-top:6px}table{width:100%;border-collapse:collapse;font-size:10px}th,td{border-bottom:1px solid #e6e9ef;padding:7px;text-align:left}th{background:#f1f3f6;text-transform:uppercase}.print{position:sticky;top:0;text-align:right}.print button{background:#ef3d35;color:#fff;border:0;border-radius:9px;padding:10px 14px;font-weight:900}@media print{.print{display:none}body{background:#fff}}</style></head><body><div class="print"><button onclick="window.print()">Guardar PDF</button></div><main class="sheet"><section class="header"><div><h1>Reporte de contratos</h1><p>Mesa de control Autocor | ${escapeHtml(formatDateTime(new Date().toISOString()))}</p></div><strong>${records.length} registros</strong></section><section class="kpis"><article class="kpi"><span>Contratos</span><strong>${stats.total}</strong></article><article class="kpi"><span>Cerrados</span><strong>${stats.closed}</strong></article><article class="kpi"><span>Pendientes</span><strong>${stats.pending}</strong></article><article class="kpi"><span>Placas</span><strong>${stats.uniquePlates}</strong></article><article class="kpi"><span>Duplicados</span><strong>${stats.duplicatePlates + stats.duplicateClients}</strong></article><article class="kpi"><span>Valor venta</span><strong>$ ${stats.value.toFixed(2)}</strong></article></section><section class="box"><h2>Estatus</h2>${statusRows.map(([label,count])=>`<p><b>${escapeHtml(label || "SIN ESTATUS")}</b>: ${count}</p>`).join("")}</section><section class="box"><h2>Detalle</h2>${renderContractDetailTable(records)}</section></main></body></html>`);
  reportWindow.document.close();
  setTimeout(() => reportWindow.print(), 500);
}

function removePurchaseLoad(loadId) {
  const load = (state.dataProcessing.loads || []).find((item) => item.id === loadId);
  if (!load) {
    showToast("Las cargas anteriores no tienen borrado selectivo. Use respaldo antes de limpiar.");
    return;
  }
  const confirmed = window.confirm(`Desea borrar solo la carga de ${formatMonthLabel(load.month)} (${load.source})?`);
  if (!confirmed) return;
  state.dataProcessing.compras = (state.dataProcessing.compras || []).filter((record) => record.loadId !== loadId);
  state.dataProcessing.loads = (state.dataProcessing.loads || []).filter((item) => item.id !== loadId);
  state.dataProcessing.purchaseDuplicateApprovals = {};
  saveState();
  renderPurchaseProcessing();
  showToast("Carga eliminada.");
}

function formatMonthLabel(month) {
  if (!month || month === "SIN MES") return "Sin mes";
  const [year, monthNumber] = String(month).split("-");
  if (!year || !monthNumber) return month;
  const date = new Date(Number(year), Number(monthNumber) - 1, 1);
  return new Intl.DateTimeFormat("es-EC", { month: "long", year: "numeric" }).format(date).toUpperCase();
}

function renderPurchaseDuplicates(records) {
  const container = document.querySelector("#purchaseDuplicateList");
  if (!container) return;
  const insights = getDuplicatePlateInsights(records);
  container.innerHTML = insights.length ? insights
    .slice(0, 30)
    .map((item) => `
      <details class="duplicate-insight-card">
        <summary>
          <span>
            <strong>${escapeHtml(item.plate)}</strong>
            <small>${escapeHtml(item.months.join(" / "))}</small>
          </span>
          <b class="${escapeHtml(item.className)}">${escapeHtml(item.label)}</b>
        </summary>
        <div>
          ${item.cases.map((caseItem) => `
            <p>
              <strong>${escapeHtml(caseItem.month || "SIN MES")}</strong>
              ${escapeHtml(caseItem.advisor || "SIN ASESOR")} | ${escapeHtml(caseItem.agency || "SIN AGENCIA")}
              <span>${escapeHtml(caseItem.summary)}</span>
            </p>
          `).join("")}
        </div>
      </details>
    `)
    .join("") : `<div class="empty compact-empty">Sin placas duplicadas.</div>`;
}

function getPurchaseDuplicateApprovals() {
  state.dataProcessing.purchaseDuplicateApprovals = state.dataProcessing.purchaseDuplicateApprovals || {};
  return state.dataProcessing.purchaseDuplicateApprovals;
}

function getPurchaseDuplicateApprovalKey(plate, records) {
  const ids = records.map((record) => record.id || `${record.loadId || "SIN-CARGA"}-${record.importMonth || "SIN-MES"}-${record["NO."] || ""}`).sort();
  return `${plate}::${ids.join("|")}`;
}

function isPurchaseDuplicateApproved(item) {
  return Boolean(item?.approvalKey && getPurchaseDuplicateApprovals()[item.approvalKey]);
}

function togglePurchaseDuplicateApproval(key, approved) {
  if (!key) return;
  const approvals = getPurchaseDuplicateApprovals();
  if (approved) {
    approvals[key] = { approvedAt: new Date().toISOString(), approvedBy: session.name || "Usuario" };
    showToast("Duplicado entre meses autorizado.");
  } else {
    delete approvals[key];
    showToast("Autorizacion retirada.");
  }
  saveState();
  renderPurchaseProcessing();
}

function getDuplicatePlateInsights(records) {
  const grouped = new Map();
  records.forEach((record) => {
    if (!record.PLACA) return;
    if (!grouped.has(record.PLACA)) grouped.set(record.PLACA, []);
    grouped.get(record.PLACA).push(record);
  });
  return [...grouped.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([plate, items]) => {
      const cases = items
        .map((record) => {
          const flags = getPurchaseStatusFlags(record);
          const status = getPurchaseResult(record);
          return {
            month: record.importMonth,
            advisor: record.ASESOR,
            agency: record.AGENCIA,
            status,
            flags,
            summary: summarizePurchaseCase(record)
          };
        })
        .sort((a, b) => (a.month || "").localeCompare(b.month || ""));
      const months = [...new Set(cases.map((item) => item.month).filter(Boolean))];
      const hasRejected = cases.some((item) => item.status === "rejected" || item.flags.salidaRejected || item.flags.pagoRejected);
      const hasApproved = cases.some((item) => item.flags.salidaApproved || item.flags.pagoApproved || item.status === "approved");
      const hasReprocessPending = cases.some((item) => item.flags.reprocessPending);
      const crossMonth = months.length > 1;
      const approvalKey = getPurchaseDuplicateApprovalKey(plate, items);
      const isApproved = Boolean(crossMonth && getPurchaseDuplicateApprovals()[approvalKey]);
      const label = isApproved ? "Autorizado entre meses" : hasRejected && hasApproved ? "Reproceso aprobado" : hasReprocessPending ? "Reproceso pendiente" : hasRejected ? "Falta aprobar" : crossMonth ? "Duplicado entre meses" : "Duplicado";
      const className = isApproved || hasRejected && hasApproved ? "status-text-approved" : hasRejected ? "status-text-rejected" : "status-text-pending";
      return { plate, count: items.length, months, cases, label, className, crossMonth, approvalKey, isApproved };
    })
    .sort((a, b) => {
      const priority = (item) => item.label === "Falta aprobar" ? 0 : item.label === "Reproceso aprobado" ? 1 : 2;
      return priority(a) - priority(b) || b.count - a.count || a.plate.localeCompare(b.plate);
    });
}

function summarizePurchaseCase(record) {
  const statuses = getPurchaseRecordStatusSummary(record, 1).label.replace(/^Caso 1: /, "");
  return statuses || "Sin estado claro";
}

function renderPurchaseReports(records) {
  const container = document.querySelector("#purchaseReportList");
  if (!container) return;
  const months = countByField(records, "importMonth").slice(0, 6);
  const paid = countByField(records, "AUTO PAGADO");
  const lien = countByField(records, "GRAVAMEN");
  const pn = countByField(records, "VALIDACION PN");
  const agencies = countByField(records, "AGENCIA").slice(0, 5);
  const items = [
    ...months.map(([label, count]) => [`MES: ${label || "SIN DATO"}`, count]),
    ...paid.map(([label, count]) => [`AUTO PAGADO: ${label || "SIN DATO"}`, count]),
    ...lien.map(([label, count]) => [`GRAVAMEN: ${label || "SIN DATO"}`, count]),
    ...pn.map(([label, count]) => [`VALIDACION PN: ${label || "SIN DATO"}`, count]),
    ...agencies.map(([label, count]) => [`AGENCIA: ${label || "SIN DATO"}`, count])
  ];
  container.innerHTML = items.length ? items
    .slice(0, 14)
    .map(([label, count]) => `<article><strong>${escapeHtml(label)}</strong><span>${count}</span></article>`)
    .join("") : `<div class="empty compact-empty">Aun no hay data procesada.</div>`;
}

function renderPurchaseAdvisorReport(records) {
  const container = document.querySelector("#purchaseAdvisorReportList");
  if (!container) return;
  const advisors = countByField(records, "ASESOR").slice(0, 15);
  container.innerHTML = advisors.length ? advisors
    .map(([label, count]) => `<article><strong>${escapeHtml(label || "SIN ASESOR")}</strong><span>${count} compras</span></article>`)
    .join("") : `<div class="empty compact-empty">Sin asesores para este filtro.</div>`;
}

function renderPurchaseAdvisorDashboard(records) {
  const container = document.querySelector("#purchaseAdvisorDashboard");
  if (!container) return;
  const rows = getPurchaseAdvisorMetrics(records);
  if (!rows.length) {
    container.innerHTML = `<div class="empty compact-empty">Sin data para generar dashboard por asesor.</div>`;
    renderFullAdvisorReport([]);
    return;
  }
  const maxTotal = Math.max(...rows.map((row) => row.total), 1);
  container.innerHTML = `
    <div class="advisor-dashboard-layout">
      <div class="advisor-performance-grid">
        ${rows.slice(0, 3).map((row) => renderAdvisorPerformanceCard(row, maxTotal)).join("")}
      </div>
      <aside class="advisor-analysis-list">
        ${rows.slice(0, 8).map(renderAdvisorAnalysisCard).join("")}
      </aside>
    </div>
  `;
  renderFullAdvisorReport(rows);
}

function renderPurchasePendingApprovalSummary(records) {
  const container = document.querySelector("#purchasePendingApprovalList");
  const count = document.querySelector("#pendingApprovalCount");
  const rows = getPurchaseAdvisorMetrics(records);
  const pending = rows.flatMap((row) => row.unresolvedRejectedPlates.map((plate) => ({ ...plate, advisor: row.advisor, agency: row.mainAgency })));
  if (count) count.textContent = `${pending.length} ${pending.length === 1 ? "placa" : "placas"}`;
  if (!container) return;
  if (!pending.length) {
    container.innerHTML = `<div class="empty compact-empty">No hay placas rechazadas pendientes de aprobacion.</div>`;
    return;
  }
  container.innerHTML = pending.map((item) => renderPendingPlateDetail(item)).join("");
}

function renderPendingPlateDetail(item) {
  return `
    <details class="pending-plate-card">
      <summary>
        <span>
          <strong>${escapeHtml(item.plate)}</strong>
          <small>${escapeHtml(item.advisor)} | ${escapeHtml(item.agency)}</small>
        </span>
        <b>${item.count} ${item.count === 1 ? "caso" : "casos"}</b>
      </summary>
      <div>
        ${item.statuses.map((status) => `<p class="${escapeHtml(status.className)}">${escapeHtml(status.label)}</p>`).join("")}
      </div>
    </details>
  `;
}

function renderFullAdvisorReport(rows) {
  const container = document.querySelector("#purchaseAdvisorReportFull");
  if (!container) return;
  if (!rows.length) {
    container.innerHTML = `<div class="empty compact-empty">Sin informacion para mostrar.</div>`;
    return;
  }
  container.innerHTML = `
    <div class="full-report-grid">
      ${rows.map((row) => `
        <details class="full-advisor-card" open>
          <summary>
            <span>
              <strong>${escapeHtml(row.advisor)}</strong>
              <small>${escapeHtml(row.mainAgency)}</small>
            </span>
            <i>
              <b>${row.total}</b> solicitudes
              <b>${row.uniquePlates}</b> placas unicas
              <b>${row.approvedPlates.length}</b> placas aprobadas
              <b class="alert-number">${row.unresolvedRejectedPlates.length}</b> falta aprobar
            </i>
          </summary>
          <div class="full-advisor-metrics">
            <span><b>${row.approvedPlates.length}</b> placas aprobadas</span>
            <span><b>${row.unresolvedRejectedPlates.length}</b> falta aprobar</span>
            <span><b>${row.pendingReviewPlates.length}</b> por revisar</span>
            <span><b>${row.approvalRate}%</b> aprobacion por placa</span>
            <span><b>${row.repeatedRequests}</b> filas repetidas</span>
            <span><b>${row.duplicatePlates}</b> placas duplicadas</span>
          </div>
          <div class="full-plate-grid">
            ${row.plateDetails.map((item) => `
              <details class="pending-plate-card ${item.hasRejected && !item.hasApproved ? "needs-approval" : ""}">
                <summary>
                  <span>
                    <strong>${escapeHtml(item.plate)}</strong>
                    <small>${item.hasRejected && !item.hasApproved ? "Falta aprobar" : item.hasApproved ? "Con aprobacion" : "En revision"}</small>
                  </span>
                  <b>${item.count} ${item.count === 1 ? "caso" : "casos"}</b>
                </summary>
                <div>
                  ${item.statuses.map((status) => `<p class="${escapeHtml(status.className)}">${escapeHtml(status.label)}</p>`).join("")}
                </div>
              </details>
            `).join("")}
          </div>
        </details>
      `).join("")}
    </div>
  `;
}

function openAdvisorReportModal() {
  const modal = document.querySelector("#purchaseAdvisorReportModal");
  if (modal) modal.hidden = false;
}

function closeAdvisorReportModal() {
  const modal = document.querySelector("#purchaseAdvisorReportModal");
  if (modal) modal.hidden = true;
}

function renderAdvisorPerformanceCard(row, maxTotal) {
  return `
    <article class="advisor-performance-card">
      <div class="advisor-performance-head">
        <div>
          <strong>${escapeHtml(row.advisor)}</strong>
          <span>${escapeHtml(row.mainAgency)}</span>
        </div>
        <b>${row.approvalRate}%</b>
      </div>
      <div class="advisor-performance-stats">
        <span><b>${row.uniquePlates}</b> placas</span>
        <span><b>${row.approvedPlates.length}</b> aprobadas</span>
        <span><b>${row.unresolvedRejectedPlates.length}</b> falta aprobar</span>
      </div>
      <div class="advisor-result-bars">
        <i class="bar-approved" style="width:${Math.max(row.approvedPlates.length ? 4 : 0, Math.round((row.approvedPlates.length / Math.max(row.uniquePlates, 1)) * 100))}%"></i>
        <i class="bar-rejected" style="width:${Math.max(row.unresolvedRejectedPlates.length ? 4 : 0, Math.round((row.unresolvedRejectedPlates.length / Math.max(row.uniquePlates, 1)) * 100))}%"></i>
        <i class="bar-pending" style="width:${Math.max(row.pendingReviewPlates.length ? 4 : 0, Math.round((row.pendingReviewPlates.length / Math.max(row.uniquePlates, 1)) * 100))}%"></i>
      </div>
      <i class="volume-bar full"><b style="width:${Math.max(6, Math.round((row.total / maxTotal) * 100))}%"></b></i>
    </article>
  `;
}

function getPurchaseAdvisorMetrics(records) {
  const groups = new Map();
  records.forEach((record) => {
    const advisor = record.ASESOR || "SIN ASESOR";
    if (!groups.has(advisor)) {
      groups.set(advisor, {
        advisor,
        records: [],
        plates: new Map(),
        agencies: new Map(),
        approved: 0,
        rejected: 0,
        pending: 0
      });
    }
    const group = groups.get(advisor);
    group.records.push(record);
    if (record.PLACA) group.plates.set(record.PLACA, (group.plates.get(record.PLACA) || 0) + 1);
    if (record.AGENCIA) group.agencies.set(record.AGENCIA, (group.agencies.get(record.AGENCIA) || 0) + 1);
    const result = getPurchaseResult(record);
    group[result] += 1;
  });

  return [...groups.values()]
    .map((group) => {
      const total = group.records.length;
      const duplicatePlates = [...group.plates.values()].filter((count) => count > 1).length;
      const repeatedRequests = Math.max(0, total - group.plates.size);
      const topRepeatedPlates = [...group.plates.entries()]
        .filter(([, count]) => count > 1)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);
      const plateDetails = getAdvisorPlateDetails(group.records);
      const unresolvedRejectedPlates = plateDetails.filter((plate) =>
        (plate.hasSalidaRejected || plate.hasPagoRejected || plate.hasRejected) &&
        !(plate.hasSalidaApproved || plate.hasPagoApproved || plate.hasReprocessApproved)
      );
      const pendingApprovalIds = new Set(unresolvedRejectedPlates.map((plate) => plate.plate));
      const pendingReviewPlates = plateDetails.filter((plate) =>
        plate.hasReprocessPending ||
        (
          !pendingApprovalIds.has(plate.plate) &&
          !plate.hasCoordinatorReview &&
          !plate.hasRejected &&
          !plate.hasApproved &&
          !plate.hasSalidaApproved &&
          !plate.hasPagoApproved &&
          !plate.hasReprocessApproved
        )
      );
      const pendingReviewIds = new Set(pendingReviewPlates.map((plate) => plate.plate));
      const riskMediumPlates = plateDetails.filter((plate) => plate.riskMediumActive);
      const riskHighPlates = plateDetails.filter((plate) => plate.riskHighActive);
      const riskMediumIds = new Set(riskMediumPlates.map((plate) => plate.plate));
      const riskHighIds = new Set(riskHighPlates.map((plate) => plate.plate));
      const approvedPlates = plateDetails.filter((plate) =>
        !pendingApprovalIds.has(plate.plate) &&
        !pendingReviewIds.has(plate.plate) &&
        !riskMediumIds.has(plate.plate) &&
        !riskHighIds.has(plate.plate) &&
        (plate.hasApproved || plate.hasSalidaApproved || plate.hasPagoApproved || plate.hasReprocessApproved)
      );
      const approvedIds = new Set(approvedPlates.map((plate) => plate.plate));
      const unclassifiedPlates = plateDetails.filter((plate) =>
        !approvedIds.has(plate.plate) &&
        !pendingApprovalIds.has(plate.plate) &&
        !pendingReviewIds.has(plate.plate) &&
        !riskMediumIds.has(plate.plate) &&
        !riskHighIds.has(plate.plate)
      );
      const mainAgency = [...group.agencies.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "SIN AGENCIA";
      return {
        advisor: group.advisor,
        mainAgency,
        total,
        uniquePlates: group.plates.size,
        repeatedRequests,
        duplicatePlates,
        topRepeatedPlates,
        plateDetails,
        unresolvedRejectedPlates,
        approvedPlates,
        pendingReviewPlates,
        riskMediumPlates,
        riskHighPlates,
        unclassifiedPlates,
        approved: group.approved,
        rejected: group.rejected,
        pending: group.pending,
        approvalRate: group.plates.size ? Math.round((approvedPlates.length / group.plates.size) * 100) : 0
      };
    })
    .sort((a, b) => b.total - a.total || b.uniquePlates - a.uniquePlates || a.advisor.localeCompare(b.advisor));
}

function renderAdvisorAnalysisCard(row) {
  const repeatedText = row.repeatedRequests
    ? `${row.repeatedRequests} solicitudes son repeticiones sobre placas ya existentes.`
    : "No hay filas repetidas: cada solicitud corresponde a una placa distinta.";
  const duplicateText = row.duplicatePlates
    ? `${row.duplicatePlates} placas aparecen mas de una vez.`
    : "No se detectan placas duplicadas para este asesor.";
  const topPlates = row.topRepeatedPlates.length
    ? `<small>Placas a revisar: ${row.topRepeatedPlates.map(([plate, count]) => `${escapeHtml(plate)} (${count})`).join(", ")}</small>`
    : `<small>Sin placas repetidas relevantes.</small>`;
  const resultText = `Conciliacion por placa: ${row.approvedPlates.length} aprobadas, ${row.unresolvedRejectedPlates.length} falta aprobar y ${row.pendingReviewPlates.length} por revisar.`;
  const unresolvedText = row.unresolvedRejectedPlates.length
    ? `${row.unresolvedRejectedPlates.length} placas tienen rechazo y aun no registran aprobacion.`
    : "No hay placas rechazadas pendientes de aprobacion.";
  const unresolvedDetail = row.unresolvedRejectedPlates.length
    ? `<details class="advisor-plate-detail alert-detail" open>
        <summary>Falta aprobar (${row.unresolvedRejectedPlates.length})</summary>
        <div>
          ${row.unresolvedRejectedPlates.map((item) => `
            <article>
              <strong>${escapeHtml(item.plate)}</strong>
              <span>${item.count} ${item.count === 1 ? "vez" : "veces"}</span>
              <p>${item.statuses.map((status) => `<b class="${escapeHtml(status.className)}">${escapeHtml(status.label)}</b>`).join(" ")}</p>
            </article>
          `).join("")}
        </div>
      </details>`
    : "";
  const priority = row.repeatedRequests || row.rejected
    ? "Revisar duplicados y motivos de rechazo antes de cerrar el mes."
    : "Operacion limpia; mantener seguimiento de pendientes.";
  const plateDetail = row.plateDetails.length
    ? `<details class="advisor-plate-detail">
        <summary>Ver detalle por placa (${row.plateDetails.length})</summary>
        <div>
          ${row.plateDetails.map((item) => `
            <article>
              <strong>${escapeHtml(item.plate)}</strong>
              <span>${item.count} ${item.count === 1 ? "vez" : "veces"}</span>
              <p>${item.statuses.map((status) => `<b class="${escapeHtml(status.className)}">${escapeHtml(status.label)}</b>`).join(" ")}</p>
            </article>
          `).join("")}
        </div>
      </details>`
    : "";

  return `
    <article class="advisor-analysis-card">
      <div>
        <strong>${escapeHtml(row.advisor)}</strong>
        <span>${escapeHtml(row.mainAgency)}</span>
      </div>
      <p><b>${row.total}</b> solicitudes cargadas representan <b>${row.uniquePlates}</b> placas unicas. ${escapeHtml(repeatedText)}</p>
      <p>${escapeHtml(duplicateText)} ${escapeHtml(resultText)} ${escapeHtml(unresolvedText)}</p>
      ${topPlates}
      ${unresolvedDetail}
      ${plateDetail}
      <em>${escapeHtml(priority)}</em>
    </article>
  `;
}

function getAdvisorPlateDetails(records) {
  const plates = new Map();
  records.forEach((record, index) => {
    const plate = record.PLACA || "SIN PLACA";
    if (!plates.has(plate)) plates.set(plate, []);
    plates.get(plate).push({ record, index });
  });
  return [...plates.entries()]
    .map(([plate, items]) => {
      const statuses = items.map(({ record, index }) => getPurchaseRecordStatusSummary(record, index + 1));
      const hasSalidaRejected = statuses.some((status) => status.flags.salidaRejected);
      const hasSalidaApproved = statuses.some((status) => status.flags.salidaApproved);
      const hasPagoApproved = statuses.some((status) => status.flags.pagoApproved);
      const hasPagoRejected = statuses.some((status) => status.flags.pagoRejected);
      const hasReprocessApproved = statuses.some((status) => status.flags.reprocessApproved);
      const hasReprocessPending = statuses.some((status) => status.flags.reprocessPending);
      const hasRiskMedium = statuses.some((status) => status.flags.riskMedium);
      const hasRiskHigh = statuses.some((status) => status.flags.riskHigh);
      const reviewedBySantiago = statuses.some((status) => status.flags.reviewedBySantiago);
      const hasCoordinatorReview = statuses.some((status) => status.flags.hasCoordinatorReview);
      const hasClosingApproval = hasSalidaApproved || hasPagoApproved || hasReprocessApproved || statuses.some((status) => status.flags.pagoApproved || status.flags.salidaApproved || status.flags.reprocessApproved);
      const riskMediumActive = hasRiskMedium && !hasClosingApproval && !reviewedBySantiago;
      const riskHighActive = hasRiskHigh && !hasClosingApproval;
      return {
        plate,
        count: items.length,
        statuses,
        hasRejected: statuses.some((status) => status.result === "rejected"),
        hasApproved: statuses.some((status) => status.result === "approved"),
        hasSalidaRejected,
        hasSalidaApproved,
        hasPagoApproved,
        hasPagoRejected,
        hasReprocessApproved,
        hasReprocessPending,
        hasRiskMedium,
        hasRiskHigh,
        riskMediumActive,
        riskHighActive,
        reviewedBySantiago,
        hasCoordinatorReview
      };
    })
    .sort((a, b) => b.count - a.count || a.plate.localeCompare(b.plate));
}

function getPurchaseRecordStatusSummary(record, caseNumber) {
  const mainStatuses = getPurchaseRecordStatuses(record);
  const details = [
    getFieldStatus("Pago", record["AUTO PAGADO"]),
    getFieldStatus("Gravamen", record.GRAVAMEN),
    getFieldStatus("PN", record["VALIDACION PN"]),
    getFieldStatus("Contrato", record["CONTRATO DE PRESTACION"]),
    getFieldStatus("Busqueda", record.BUSQUEDA),
    getFieldStatus("Data", record.DATA),
    getFieldStatus("Solicitud", record.SOLICITUD),
    getFieldStatus("Obs", record.OBSERVACIONES)
  ].filter(Boolean);
  const flags = getPurchaseStatusFlags(record);
  if (details.length) {
    const result = getPurchaseResult(record);
    const coordinatorNote = flags.riskMedium && !flags.reviewedBySantiago ? " | Riesgo medio pendiente Santiago Ortiz" : "";
    const pendingNote = flags.reprocessPending || result === "pending" ? " | Sin cierre de coordinador legal" : "";
    return {
      label: `Caso ${caseNumber}: ${mainStatuses.join(", ")} | ${details.join(" | ")}${coordinatorNote}${pendingNote}`,
      className: flags.riskMedium && !flags.reviewedBySantiago ? "status-text-pending" : result === "rejected" ? "status-text-rejected" : result === "approved" ? "status-text-approved" : "status-text-pending",
      result,
      flags
    };
  }
  return {
    label: `Caso ${caseNumber}: sin estado claro`,
    className: "status-text-pending",
    result: "pending",
    flags
  };
}

function getPurchaseRecordStatuses(record) {
  const flags = getPurchaseStatusFlags(record);
  const statuses = [];
  if (flags.pagoApproved) statuses.push("PAGO APROBADO");
  if (flags.pagoRejected) statuses.push("PAGO RECHAZADO");
  if (flags.salidaApproved) statuses.push("SALIDA APROBADA");
  if (flags.salidaRejected) statuses.push("SALIDA RECHAZADA");
  if (flags.paidWithoutValidation) statuses.push("PAGADO SIN VALIDACION");
  if (flags.reprocessRejected) statuses.push("REPROCESO RECHAZADO");
  if (flags.reprocessApproved) statuses.push("REPROCESO APROBADO");
  if (flags.reprocessPending) statuses.push("REPROCESO");
  if (flags.riskMedium) statuses.push("RIESGO MEDIO");
  if (flags.riskHigh) statuses.push("RIESGO ALTO");
  if (!statuses.length || flags.pending) statuses.push("PENDIENTE");
  return [...new Set(statuses.filter((status) => PURCHASE_STATUS_OPTIONS.includes(status)))];
}

function getFieldStatus(label, value) {
  const text = normalizeLooseText(value);
  if (!text) return "";
  if (matchesActionStatus(text, "SALIDA", REJECTED_STATUS_WORDS)) return "Salida rechazada";
  if (matchesActionStatus(text, "SALIDA", APPROVED_STATUS_WORDS)) return "Salida aprobada";
  if (matchesActionStatus(text, "PAGO", REJECTED_STATUS_WORDS)) return "Pago rechazado";
  if (matchesActionStatus(text, "PAGO", APPROVED_STATUS_WORDS)) return "Pago aprobado";
  if (matchesActionStatus(text, "REPROCESO", ["PENDIENTE", "PEND"])) return "Reproceso pendiente";
  if (matchesActionStatus(text, "REPROCESO", REJECTED_STATUS_WORDS)) return "Reproceso rechazado";
  if (matchesActionStatus(text, "REPROCESO", APPROVED_STATUS_WORDS)) return "Reproceso aprobado";
  if (text.includes("RIESGO MEDIO")) return `${label}: riesgo medio`;
  if (text.includes("RIESGO ALTO") || text.includes("RIEGO ALTO")) return `${label}: riesgo alto`;
  if (includesAnyStatus(text, REJECTED_STATUS_WORDS)) return `${label} rechazado`;
  if (includesAnyStatus(text, APPROVED_STATUS_WORDS) || /\b(SI|OK)\b/.test(text)) return `${label} aprobado`;
  if (text.includes("PENDIENTE")) return `${label} pendiente`;
  return `${label}: ${text}`;
}

function getPurchaseStatusFlags(record) {
  const pagoText = normalizeLooseText(record["AUTO PAGADO"]);
  const coordinatorText = normalizeLooseText(record["COORDINADOR LEGAL"]);
  const validationText = normalizeLooseText(record["VALIDACION PN"]);
  const allText = normalizeLooseText([
    record["AUTO PAGADO"],
    record["COORDINADOR LEGAL"],
    record["GRAVAMEN"],
    record["VALIDACION PN"],
    record["CONTRATO DE PRESTACION"],
    record.BUSQUEDA,
    record.DATA,
    record.SOLICITUD,
    record.OBSERVACIONES
  ].join(" "));
  const pagoApproved = matchesPaymentApproved(pagoText) || matchesActionStatus(allText, "PAGO", APPROVED_STATUS_WORDS);
  const pagoRejected = matchesActionStatus(allText, "PAGO", REJECTED_STATUS_WORDS);
  const salidaApproved = matchesActionStatus(allText, "SALIDA", APPROVED_STATUS_WORDS);
  const salidaRejected = matchesActionStatus(allText, "SALIDA", REJECTED_STATUS_WORDS);
  const reprocessApproved = matchesActionStatus(allText, "REPROCESO", APPROVED_STATUS_WORDS);
  const reprocessRejected = matchesActionStatus(allText, "REPROCESO", REJECTED_STATUS_WORDS);
  const reprocessPending = matchesActionStatus(allText, "REPROCESO", ["PENDIENTE", "PEND"]) || (allText.includes("REPROCESO") && !reprocessApproved && !reprocessRejected);
  const riskMedium = allText.includes("RIESGO MEDIO");
  const riskHigh = allText.includes("RIESGO ALTO") || allText.includes("RIEGO ALTO");
  const paidWithoutValidation = pagoApproved && (!validationText || validationText.includes("SIN VALIDACION") || validationText.includes("PENDIENTE"));
  const pending = allText.includes("PENDIENTE") || !(pagoApproved || pagoRejected || salidaApproved || salidaRejected || reprocessApproved || reprocessRejected || reprocessPending || riskMedium || riskHigh);
  return {
    salidaRejected,
    salidaApproved,
    pagoRejected,
    pagoApproved,
    paidWithoutValidation,
    reprocessApproved,
    reprocessRejected,
    reprocessPending,
    riskMedium,
    riskHigh,
    pending,
    reviewedBySantiago: coordinatorText.includes("SANTIAGO ORTIZ") || allText.includes("SANTIAGO ORTIZ"),
    hasCoordinatorReview: Boolean(coordinatorText)
  };
}

const REJECTED_STATUS_WORDS = ["RECHAZADO", "RECHAZADA", "NEGADO", "NEGADA", "ANULADO", "ANULADA", "DEVUELTO", "DEVUELTA", "NO PROCEDE", "NO APLICA", "OBSERVADO", "OBSERVADA"];
const APPROVED_STATUS_WORDS = ["APROBADO", "APROBADA", "AUTORIZADO", "AUTORIZADA", "VALIDADO", "VALIDADA", "REALIZADO", "REALIZADA", "COMPLETO", "COMPLETA", "COMPLETADO", "COMPLETADA", "PAGADO", "PAGADA", "SUBIDO", "SUBIDA"];

function includesAnyStatus(text, words) {
  return words.some((word) => text.includes(word));
}

function matchesActionStatus(text, action, words) {
  if (!text.includes(action)) return false;
  return words.some((word) => {
    const escaped = word.replace(/\s+/g, "\\s+");
    const afterAction = new RegExp(`\\b${action}\\b(?:\\s+\\w+){0,3}\\s+${escaped}\\b`);
    const beforeAction = new RegExp(`\\b${escaped}\\b(?:\\s+\\w+){0,3}\\s+${action}\\b`);
    return afterAction.test(text) || beforeAction.test(text);
  });
}

function matchesPaymentApproved(text) {
  if (!text || /\bNO\b/.test(text) || includesAnyStatus(text, REJECTED_STATUS_WORDS)) return false;
  return /\b(SI|OK)\b/.test(text) || includesAnyStatus(text, ["APROBADO", "APROBADA", "AUTORIZADO", "AUTORIZADA", "PAGADO", "PAGADA"]);
}

function getPurchaseResult(record) {
  const flags = getPurchaseStatusFlags(record);
  if (flags.salidaRejected || flags.pagoRejected) return "rejected";
  if (flags.salidaApproved || flags.pagoApproved || flags.reprocessApproved) return "approved";
  const text = normalizeLooseText([
    record["AUTO PAGADO"],
    record["GRAVAMEN"],
    record["VALIDACION PN"],
    record["CONTRATO DE PRESTACION"],
    record.BUSQUEDA,
    record.DATA,
    record.SOLICITUD,
    record.OBSERVACIONES
  ].join(" "));
  if (includesAnyStatus(text, REJECTED_STATUS_WORDS)) return "rejected";
  if (includesAnyStatus(text, APPROVED_STATUS_WORDS) || /\b(SI|OK)\b/.test(text)) return "approved";
  return "pending";
}

function renderPurchaseSimilarities(records) {
  const container = document.querySelector("#purchaseSimilarityList");
  if (!container) return;
  const advisors = [...new Set(records.map((record) => record.ASESOR).filter(Boolean))];
  const agencies = [...new Set(records.map((record) => record.AGENCIA).filter(Boolean))];
  const pairs = [
    ...findSimilarLabels(advisors).map((pair) => [`ASESOR: ${pair[0]}`, pair[1]]),
    ...findSimilarLabels(agencies).map((pair) => [`AGENCIA: ${pair[0]}`, pair[1]])
  ];
  container.innerHTML = pairs.length ? pairs
    .slice(0, 18)
    .map(([label, similar]) => `<article><strong>${escapeHtml(label)}</strong><span>similar a ${escapeHtml(similar)}</span></article>`)
    .join("") : `<div class="empty compact-empty">No se detectaron nombres similares.</div>`;
}

function findSimilarLabels(values) {
  const pairs = [];
  for (let i = 0; i < values.length; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      const a = values[i];
      const b = values[j];
      if (areSimilarLabels(a, b)) pairs.push([a, b]);
    }
  }
  return pairs;
}

function areSimilarLabels(a, b) {
  const compactA = normalizeHeaderKey(a);
  const compactB = normalizeHeaderKey(b);
  if (!compactA || !compactB || compactA === compactB) return false;
  if (compactA.includes(compactB) || compactB.includes(compactA)) return Math.min(compactA.length, compactB.length) >= 5;
  const distance = levenshteinDistance(compactA, compactB);
  return distance <= 2 || distance / Math.max(compactA.length, compactB.length) <= 0.18;
}

function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);
  for (let col = 0; col <= a.length; col += 1) matrix[0][col] = col;
  for (let row = 1; row <= b.length; row += 1) {
    for (let col = 1; col <= a.length; col += 1) {
      matrix[row][col] = b[row - 1] === a[col - 1]
        ? matrix[row - 1][col - 1]
        : Math.min(matrix[row - 1][col - 1] + 1, matrix[row][col - 1] + 1, matrix[row - 1][col] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function countByField(records, field) {
  const map = new Map();
  records.forEach((record) => {
    const key = record[field] || "SIN DATO";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function renderPurchaseTable(records) {
  const container = document.querySelector("#purchaseTable");
  if (!container) return;
  if (!records.length) {
    container.innerHTML = `<div class="empty compact-empty">Pega datos de Excel o sube un CSV para ver la tabla estandarizada.</div>`;
    return;
  }
  container.innerHTML = renderPurchaseTableHtml(records);
}

function renderPurchaseTableHtml(records) {
  const visible = records.slice(-80).reverse();
  return `
    <div class="processing-table-scroll">
      <table>
        <thead><tr>${PURCHASE_COLUMNS.slice(0, 8).map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>
          ${visible.map((record) => `<tr>${PURCHASE_COLUMNS.slice(0, 8).map((column) => `<td>${escapeHtml(record[column] || "")}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function exportPurchasesCsv() {
  const records = state.dataProcessing?.compras || [];
  if (!records.length) {
    showToast("No hay compras para exportar.");
    return;
  }
  const csv = [
    PURCHASE_COLUMNS.join(";"),
    ...records.map((record) => PURCHASE_COLUMNS.map((column) => csvCell(record[column] || "")).join(";"))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `compras-estandarizadas-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function normalizeMoneyValue(value) {
  const raw = String(value ?? "").replace(/\$/g, "").trim();
  if (!raw) return "";
  const cleaned = raw
    .replace(/\s+/g, "")
    .replace(/[^0-9,.-]/g, "");
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  const decimalIndex = Math.max(lastComma, lastDot);
  let normalized = cleaned;
  if (decimalIndex >= 0) {
    const decimalDigits = cleaned.slice(decimalIndex + 1).replace(/\D/g, "");
    const integerPart = cleaned.slice(0, decimalIndex).replace(/[.,]/g, "");
    const decimalPart = cleaned.slice(decimalIndex + 1).replace(/[.,]/g, "");
    normalized = decimalDigits.length > 0 && decimalDigits.length <= 2
      ? `${integerPart}.${decimalPart}`
      : cleaned.replace(/[.,]/g, "");
  }
  const number = Number(normalized);
  return Number.isFinite(number) ? number.toFixed(2) : normalizeLooseText(value);
}

function normalizeProviderAmountValue(value) {
  const normalized = normalizeMoneyValue(value);
  const amount = Number(String(normalized || "").replace(",", "."));
  if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_PROVIDER_REASONABLE_AMOUNT) return "";
  return amount.toFixed(2);
}

function normalizeProviderDateValue(value) {
  const raw = String(value ?? "").trim();
  const excelSerial = Number(raw);
  if (Number.isFinite(excelSerial) && excelSerial > 20000 && excelSerial < 80000) {
    const date = new Date(Math.round((excelSerial - 25569) * 86400000));
    return new Intl.DateTimeFormat("es-EC", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }
  return normalizeLooseText(value);
}

function parseProviderColumns(value) {
  const source = Array.isArray(value) ? value.join(",") : String(value || "");
  const compactSource = normalizeLooseText(source);
  const knownColumns = [
    "CUV",
    "CODIGO",
    "FECHA",
    "VALOR",
    "NO.",
    "PLACA",
    "PILOT COMPRA",
    "PILOT VENTA",
    "ASESOR COMPRA",
    "ASESOR VENTA",
    "AGENCIA COMPRA",
    "AGENCIA VENTA",
    "MES COMPRA",
    "MES VENTA",
    "CONTRATO DE PRESTACION",
    "VALIDACION PN",
    "TRAMITE",
    "NOTARIA",
    "ASESOR",
    "AGENCIA",
    "MES",
    "OBSERVACIONES - WHATSAPP",
    "OBSERVACIONES WHATSAPP",
    "OBSERVACIONES"
  ];
  if (!/[\n,;]/.test(source) && compactSource.split(/\s+/).length > 2) {
    const found = knownColumns
      .map((column) => ({ column, index: compactSource.indexOf(column) }))
      .filter((item) => item.index >= 0)
      .sort((a, b) => a.index - b.index)
      .map((item) => item.column === "OBSERVACIONES WHATSAPP" ? "OBSERVACIONES - WHATSAPP" : item.column)
      .filter((column, index, list) => list.indexOf(column) === index);
    if (found.length) return found;
  }
  const columns = source
    .split(/[\n,;]+/)
    .map((item) => normalizeLooseText(item))
    .filter(Boolean);
  return [...new Set(columns)];
}

function getProviderProfiles() {
  state.dataProcessing.providerProfiles = buildProviderProfilesFromHistory(
    state.dataProcessing?.providerProfiles || [],
    state.dataProcessing || {}
  );
  return state.dataProcessing.providerProfiles;
}

function getProviderProfile(id) {
  const profiles = state?.dataProcessing?.providerProfiles?.length ? state.dataProcessing.providerProfiles : DEFAULT_PROVIDER_PROFILES;
  return profiles.find((profile) => profile.id === id) || profiles[0] || DEFAULT_PROVIDER_PROFILES[0];
}

function getSelectedProviderProfile() {
  return getProviderProfile(providerProfileSelect?.value);
}

function getProviderColumns(profile = getSelectedProviderProfile()) {
  const columns = parseProviderColumns(profile?.columns || []);
  return columns.length ? columns : PROVIDER_COLUMNS;
}

function getMoneyNumber(value) {
  const normalized = normalizeProviderAmountValue(value) || normalizeMoneyValue(value);
  const number = Number(String(normalized || "0").replace(",", "."));
  return Number.isFinite(number) && number <= MAX_PROVIDER_REASONABLE_AMOUNT ? number : 0;
}

function inferPlateFromProviderRecord(record) {
  const text = normalizeLooseText(Object.values(record).join(" "));
  const match = text.match(/\b[A-Z]{3}[0-9]{3,4}\b/);
  return match ? match[0] : "";
}

function inferProviderAmountFromRecord(record) {
  const candidates = [];
  Object.entries(record || {}).forEach(([key, value]) => {
    if (/^(id|profileId|loadId|importedAt|source|importMonth)$/i.test(key)) return;
    const raw = String(value ?? "");
    if (!raw.trim()) return;
    const dollarMatches = [...raw.matchAll(/\$\s*([0-9][0-9.,]*)/g)].map((match) => match[1]);
    const decimalMatches = [...raw.matchAll(/\b([0-9]{1,4}[,.][0-9]{1,2})\b/g)].map((match) => match[1]);
    const integerMatches = raw.trim().match(/^[0-9]{1,4}$/) ? [raw.trim()] : [];
    [...dollarMatches, ...decimalMatches, ...integerMatches].forEach((candidate) => {
      const normalized = normalizeProviderAmountValue(candidate);
      if (normalized) candidates.push({ key, normalized, value: Number(normalized) });
    });
  });
  const preferred = candidates.find((item) => normalizeHeaderKey(item.key).includes("VALOR"))
    || candidates.find((item) => item.value > 0 && item.value <= 50)
    || candidates[0];
  return preferred?.normalized || "";
}

function getProviderRecordAmount(record) {
  return getMoneyNumber(record?.VALOR || inferProviderAmountFromRecord(record || {}));
}

function getProviderExplicitAmount(record) {
  const direct = getMoneyNumber(record?.VALOR || "");
  if (direct) return direct;
  const valueColumn = Object.entries(record || {}).find(([key, value]) =>
    normalizeHeaderKey(key).includes("VALOR") && getMoneyNumber(value)
  );
  return valueColumn ? getMoneyNumber(valueColumn[1]) : 0;
}

function getProviderCommonAmount(records = []) {
  const counts = new Map();
  records.forEach((record) => {
    const amount = getProviderRecordAmount(record);
    if (!amount || amount > MAX_PROVIDER_REASONABLE_AMOUNT) return;
    const key = amount.toFixed(2);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]));
  return ranked.length ? Number(ranked[0][0]) : 0;
}

function getProviderPlateResolvedAmount(items = [], fallbackAmount = 0) {
  const validAmounts = items
    .map(getProviderRecordAmount)
    .filter((amount) => amount > 0 && amount <= MAX_PROVIDER_REASONABLE_AMOUNT);
  if (!validAmounts.length) return fallbackAmount || 0;
  const counts = new Map();
  validAmounts.forEach((amount) => {
    const key = amount.toFixed(2);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  const [modeKey, modeCount] = [...counts.entries()].sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]))[0];
  const modeAmount = Number(modeKey);
  if (fallbackAmount && validAmounts.length === 1) return fallbackAmount;
  if (fallbackAmount && modeCount === 1 && counts.size > 1) return fallbackAmount;
  return modeAmount || fallbackAmount || 0;
}

function getProviderRecordDisplayAmount(record, records = []) {
  return getProviderRecordAmount(record) || getProviderCommonAmount(records);
}

function getProviderPaidAmount(records = []) {
  return records.reduce((sum, record) => sum + getProviderExplicitAmount(record), 0);
}

function findProviderColumn(columns = [], patterns = []) {
  return columns.find((column) => patterns.some((pattern) => pattern.test(normalizeHeaderKey(column)))) || "";
}

function setProviderColumnValue(record, columns, patterns, value) {
  const column = findProviderColumn(columns, patterns);
  if (column && value && !normalizeLooseText(record[column])) record[column] = value;
}

function getKnownProviderAdvisors() {
  const names = [
    ...(state.commercialAdvisors || []).map((advisor) => advisor.name),
    ...(state.legalUsers || []).map((user) => user.name)
  ].map(normalizeLooseText).filter((name) => name.split(" ").length >= 2);
  return [...new Set(names)].sort((a, b) => b.length - a.length);
}

function findKnownNameInsideText(text = "", names = getKnownProviderAdvisors()) {
  const normalized = normalizeLooseText(text);
  return names.find((name) => normalized.includes(name)) || "";
}

function guessProviderAdvisorFromText(text = "") {
  const normalized = normalizeLooseText(text);
  const detailIndex = normalized.search(/\b(CLIENTE|CORRESPONDE|SE DESCUENTA|ASUME|ENVIADO|DEVOLUCION|VALIDAR|GESTION)\b/);
  const candidateZone = detailIndex > 0 ? normalized.slice(0, detailIndex) : normalized;
  const words = candidateZone
    .split(/\s+/)
    .filter((word) => /^[A-Z]{3,}$/.test(word))
    .filter((word) => !/(AUTOCOR|DEVOLUCIONES|RESPALDOS|NOMBRE|CLIENTE|PLACA|HORA|FINALIZACION|FECHA|VALOR|STATUS)/.test(word));
  return words.length >= 2 ? words.slice(-2).join(" ") : "";
}

function extractProviderDateFromText(text = "") {
  const match = String(text).match(/\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?\b/);
  return match ? match[0] : "";
}

function extractProviderAmountCandidateFromText(text = "") {
  const raw = String(text || "");
  const candidates = [];
  const moneyPattern = /(?:\$|USD)?\s*([0-9]{1,3}(?:[.,][0-9]{3})+(?:[.,][0-9]{1,2})?|[0-9]{1,6}[.,][0-9]{1,2}|[0-9]{2,6})/gi;
  [...raw.matchAll(moneyPattern)].forEach((match) => {
    const value = String(match[1] || "").trim();
    const matchText = String(match[0] || "");
    const valueOffset = matchText.indexOf(match[1]);
    const start = (match.index || 0) + Math.max(valueOffset, 0);
    const before = raw.slice(Math.max(0, start - 2), start);
    const after = raw.slice(start + value.length, start + value.length + 2);
    if (/[/:-]/.test(before) || /^[/:-]/.test(after)) return;
    if (/[A-Z]$/i.test(raw.slice(Math.max(0, start - 1), start)) || /^[A-Z]/i.test(raw.slice(start + value.length, start + value.length + 1))) return;
    if (/^\d{1,2}$/.test(value)) return;
    if (/^(19|20)\d{2}$/.test(value)) return;
    candidates.push(value);
  });
  const valid = candidates
    .map((candidate) => ({
      raw: candidate,
      normalized: normalizeProviderAmountValue(candidate),
      hasDecimal: /[.,]\d{1,2}$/.test(candidate)
    }))
    .filter((item) => item.normalized);
  const decimalValues = valid.filter((item) => item.hasDecimal);
  const selected = decimalValues.length ? decimalValues[decimalValues.length - 1] : valid[valid.length - 1];
  return selected || { raw: "", normalized: "" };
}

function extractProviderAmountFromText(text = "") {
  return extractProviderAmountCandidateFromText(text).normalized || "";
}

function extractProviderStatusFromText(text = "") {
  const normalized = normalizeLooseText(text);
  const statuses = [
    "DEVOLUCION AUTORIZADA",
    "DEVOLUCION PENDIENTE",
    "AUTORIZADO",
    "APROBADO",
    "RECHAZADO",
    "PENDIENTE",
    "SI",
    "NO"
  ];
  return statuses.find((status) => new RegExp(`\\b${status}\\b`).test(normalized)) || "";
}

function cleanProviderObservationText(rawText = "", pieces = {}) {
  let text = normalizeLooseText(rawText);
  [
    pieces.id,
    pieces.date,
    pieces.plate,
    pieces.client,
    pieces.advisor,
    pieces.amountRaw,
    pieces.amount,
    pieces.status
  ].filter(Boolean).forEach((piece) => {
    const safePiece = normalizeLooseText(piece).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (safePiece) text = text.replace(new RegExp(`\\b${safePiece}\\b`, "g"), " ");
  });
  text = text
    .replace(/\$?\s*\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?/g, " ")
    .replace(/\$?\s*\d{1,6}[.,]\d{1,2}/g, " ")
    .replace(/\b(SI|NO)\b\s*(?=DEVOLUCION|AUTORIZADA|PENDIENTE|APROBADO|RECHAZADO|$)/g, " ")
    .replace(/\s+\|\s+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return text || normalizeLooseText(rawText);
}

function extractProviderClientFromText(rawText = "", plate = "", advisor = "") {
  const normalized = normalizeLooseText(rawText);
  const plateIndex = plate ? normalized.indexOf(normalizeLooseText(plate)) : -1;
  const advisorIndex = advisor ? normalized.indexOf(normalizeLooseText(advisor)) : -1;
  if (plateIndex < 0 || advisorIndex <= plateIndex) return "";
  return normalized
    .slice(plateIndex + normalizeLooseText(plate).length, advisorIndex)
    .replace(/\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?\b/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function splitProviderLooseTextRows(text = "") {
  const lines = String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const dataLines = [];
  lines.forEach((line) => {
    const hasPlate = /\b[A-Z]{3}[-\s]?\d{3,4}\b/i.test(line);
    const beginsWithRecord = /^\d+\s+/.test(line) && (hasPlate || /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/.test(line));
    if (hasPlate || beginsWithRecord) {
      dataLines.push(line);
      return;
    }
    if (dataLines.length && !/^(ID|PLACA|FECHA|HORA|NOMBRE|VALOR|STATUS|SE ENCUENTRA)/i.test(line)) {
      dataLines[dataLines.length - 1] = `${dataLines[dataLines.length - 1]} ${line}`;
    }
  });
  return dataLines;
}

function parseProviderLooseTextInput(text, columns, profile, provider, importMonth, source) {
  const looseRows = splitProviderLooseTextRows(text);
  return looseRows.map((rawLine) => {
    const raw = rawLine.replace(/\s+/g, " ").trim();
    const record = {
      id: crypto.randomUUID(),
      provider,
      profileId: profile.id,
      profileName: profile.name,
      importMonth,
      source,
      importedAt: new Date().toISOString(),
      _RAW: raw,
      _WARNINGS: []
    };
    columns.forEach((column) => { record[column] = ""; });

    const plate = raw.match(/\b[A-Z]{3}[-\s]?\d{3,4}\b/i)?.[0] || "";
    const date = extractProviderDateFromText(raw);
    const amountCandidate = extractProviderAmountCandidateFromText(raw);
    const amount = amountCandidate.normalized || "";
    const advisor = findKnownNameInsideText(raw) || guessProviderAdvisorFromText(raw);
    const status = extractProviderStatusFromText(raw);
    const recordId = raw.match(/^\d+/)?.[0] || "";
    const client = extractProviderClientFromText(raw, plate, advisor);

    setProviderColumnValue(record, columns, [/^ID$/, /^NO$/], recordId);
    setProviderColumnValue(record, columns, [/PLACA/], normalizeProviderPlateValue(plate));
    setProviderColumnValue(record, columns, [/FECHA/, /HORA.*FINALIZACION/], date);
    setProviderColumnValue(record, columns, [/VALOR/], amount);
    setProviderColumnValue(record, columns, [/ASESOR/], advisor);
    setProviderColumnValue(record, columns, [/STATUS/, /ESTATUS/, /ESTADO/], status);
    setProviderColumnValue(record, columns, [/NOMBRE.*CLIENTE/, /CLIENTE/], client);

    const normalizedRaw = normalizeLooseText(raw);
    const plateIndex = plate ? normalizedRaw.indexOf(normalizeLooseText(plate)) : -1;
    const advisorIndex = advisor ? normalizedRaw.indexOf(advisor) : -1;
    if (!client && plateIndex >= 0) {
      const afterPlate = normalizedRaw.slice(plateIndex + normalizeLooseText(plate).length).trim();
      const clientText = advisorIndex > plateIndex
        ? normalizedRaw.slice(plateIndex + normalizeLooseText(plate).length, advisorIndex).trim()
        : afterPlate.split(/\s+\$?\d{1,4}(?:[,.]\d{1,2})?\s+/)[0]?.trim() || "";
      setProviderColumnValue(record, columns, [/NOMBRE.*CLIENTE/, /CLIENTE/], clientText);
    }
    const detailText = cleanProviderObservationText(raw, {
      id: recordId,
      date,
      plate,
      client: client || record["NOMBRE DEL CLIENTE"],
      advisor,
      amountRaw: amountCandidate.raw,
      amount,
      status
    });
    setProviderColumnValue(record, columns, [/DETALLE/, /OBSERVACION/, /WHATSAPP/], detailText || raw);
    if (!record.PLACA && normalizeProviderPlateValue(plate)) record.PLACA = normalizeProviderPlateValue(plate);
    if (!record.VALOR && amount) record.VALOR = amount;
    if (!getProviderAdvisor(record) && advisor) record.ASESOR = advisor;
    if (!getProviderObservation(record)) record.OBSERVACIONES = detailText || raw;

    if (!getProviderRecordPlate(record)) record._WARNINGS.push("Sin placa detectada");
    if (!getProviderRecordAmount(record)) record._WARNINGS.push("Sin valor detectado");
    if (!getProviderAdvisor(record)) record._WARNINGS.push("Sin asesor detectado");
    return normalizeProviderRecord(record);
  }).filter(isValidProviderRecord);
}

function getProviderRecordPlate(record) {
  return normalizeProviderPlateValue(record?.PLACA || "") || findProviderPlateInRecord(record || {}).plate;
}

function looksLikeProviderObservation(value) {
  const text = normalizeLooseText(value);
  return text.length > 55 || /(WHATSAPP|OBSERVACION|INFORMACION|HAGAMOS|CLICK|TABLA|BUSCADOR|DUPLICAD)/.test(text);
}

function getProviderAdvisor(record) {
  const value = [record?.["ASESOR COMPRA"], record?.["ASESOR VENTA"], record?.ASESOR]
    .find((item) => normalizeLooseText(item) && !normalizeProviderPlateValue(item) && !looksLikeProviderObservation(item));
  return normalizeLooseText(value || "");
}

function getProviderAgency(record) {
  const value = [record?.["AGENCIA COMPRA"], record?.["AGENCIA VENTA"], record?.AGENCIA]
    .find((item) => normalizeLooseText(item) && !looksLikeProviderObservation(item));
  return normalizeLooseText(value || "");
}

function getProviderObservation(record) {
  const values = [
    record?.["OBSERVACIONES - WHATSAPP"],
    record?.OBSERVACIONES,
    record?.["DETALLE DE LA DEVOLUCION"],
    record?.["DETALLE DE LA DEVOLUCION"],
    record?.["ASESOR COMPRA"],
    record?.["ASESOR VENTA"],
    record?.ASESOR,
    record?.["AGENCIA COMPRA"],
    record?.["AGENCIA VENTA"]
  ].filter((item) => normalizeLooseText(item) && looksLikeProviderObservation(item));
  return normalizeLooseText(values[0] || record?.["OBSERVACIONES - WHATSAPP"] || record?.OBSERVACIONES || record?._RAW || "");
}

function isValidProviderRecord(record) {
  return Boolean(
    getProviderRecordAmount(record) > 0 ||
    normalizeLooseText(record?.FECHA) ||
    normalizeLooseText(record?.CODIGO) ||
    normalizeLooseText(record?.["PILOT COMPRA"]) ||
    normalizeLooseText(record?.["PILOT VENTA"])
  );
}

function parseProviderInput(text, source = "PEGADO") {
  const profile = getSelectedProviderProfile();
  const columns = getProviderColumns(profile);
  const rows = parseDelimitedText(text);
  if (!rows.length) return [];
  const provider = normalizeLooseText(providerNameInput?.value || "");
  const importMonth = normalizeLooseText(providerMonthInput?.value || "");
  const maxCells = Math.max(...rows.map((row) => row.length), 0);
  if (maxCells <= 1) {
    return parseProviderLooseTextInput(text, columns, profile, provider, importMonth, source);
  }
  const firstRowKeys = rows[0].map(normalizeHeaderKey);
  const hasHeader = firstRowKeys.some((key) => columns.some((column) => normalizeHeaderKey(column) === key));
  const headers = hasHeader ? rows.shift() : columns;
  const headerMap = headers.map((header, index) => {
    const key = normalizeHeaderKey(header);
    return columns.find((column) => normalizeHeaderKey(column) === key) || columns[index] || key;
  });
  return rows
    .filter((row) => row.some((cell) => normalizeLooseText(cell)))
    .map((row) => {
      const record = {
        id: crypto.randomUUID(),
        provider,
        profileId: profile.id,
        profileName: profile.name,
        importMonth,
        source,
        importedAt: new Date().toISOString(),
        _RAW: row.join(" | "),
        _WARNINGS: []
      };
      columns.forEach((column) => { record[column] = ""; });
      row.forEach((cell, index) => {
        const column = headerMap[index];
        if (columns.includes(column)) record[column] = cell;
      });
      const normalized = normalizeProviderRecord(record);
      if (!getProviderRecordPlate(normalized)) normalized._WARNINGS.push("Sin placa detectada");
      if (!getProviderRecordAmount(normalized)) normalized._WARNINGS.push("Sin valor detectado");
      return normalized;
    })
    .filter(isValidProviderRecord);
}

function getProviderPreviewRows(records) {
  const getFirst = (record, keys) => keys.map((key) => record[key]).find((value) => normalizeLooseText(value)) || "";
  const commonAmount = getProviderCommonAmount(records);
  return records.map((record) => ({
    perfil: record.profileName,
    proveedor: record.provider,
    placa: getProviderRecordPlate(record),
    fecha: getFirst(record, ["FECHA", "FECHA DE SOLICITUD"]),
    valor: `$ ${(getProviderRecordAmount(record) || commonAmount).toFixed(2)}`,
    asesor: getProviderAdvisor(record),
    agencia: getProviderAgency(record),
    observacion: getProviderObservation(record),
    raw: record._RAW || "",
    warnings: record._WARNINGS || []
  }));
}

function getProviderPreviewHealth(records = []) {
  const missingPlate = records.filter((record) => !getProviderRecordPlate(record)).length;
  const missingAmount = records.filter((record) => !getProviderRecordAmount(record)).length;
  const missingAdvisor = records.filter((record) => !getProviderAdvisor(record)).length;
  const rawRecovered = records.filter((record) => normalizeLooseText(record._RAW)).length;
  return { missingPlate, missingAmount, missingAdvisor, rawRecovered };
}

function updatePendingProviderCell(index, key, value) {
  const record = pendingProviderRecords[index];
  if (!record) return;
  const normalizedValue = key === "PLACA"
    ? normalizeProviderPlateValue(value) || normalizeLooseText(value)
    : key === "VALOR"
      ? normalizeProviderAmountValue(value) || normalizeLooseText(value)
      : normalizeLooseText(value);
  record[key] = normalizedValue;
  record._WARNINGS = [];
  const normalized = normalizeProviderRecord(record);
  if (!getProviderRecordPlate(normalized)) normalized._WARNINGS.push("Sin placa detectada");
  if (!getProviderRecordAmount(normalized)) normalized._WARNINGS.push("Sin valor detectado");
  if (!getProviderAdvisor(normalized)) normalized._WARNINGS.push("Sin asesor detectado");
  pendingProviderRecords[index] = normalized;
  renderProviderPastePreview(pendingProviderRecords);
}

window.updatePendingProviderCell = updatePendingProviderCell;

function renderProviderPreviewInput(index, key, value, extraClass = "") {
  return `<input class="provider-preview-input ${extraClass}" value="${escapeHtml(value || "")}" onchange="updatePendingProviderCell(${index}, '${escapeHtml(key)}', this.value)">`;
}

function renderProviderPastePreview(records) {
  if (!providerPastePreview) return;
  if (!records.length) {
    providerPastePreview.hidden = true;
    providerPastePreview.innerHTML = "";
    return;
  }
  const uniquePlates = new Set(records.map(getProviderRecordPlate).filter(Boolean)).size;
  const reconciledTotal = getProviderBillableAmount(records);
  const paidTotal = getProviderPaidAmount(records);
  const duplicates = getProviderDuplicateGroups(records);
  const health = getProviderPreviewHealth(records);
  const rows = getProviderPreviewRows(records).slice(0, 80);
  providerPastePreview.hidden = false;
  providerPastePreview.innerHTML = `
    <section class="provider-preview-head">
      <div>
        <p class="eyebrow">Vista previa antes de guardar</p>
        <h3>${records.length} filas leidas | ${uniquePlates} placas unicas | pagado $ ${paidTotal.toFixed(2)} | conciliado $ ${reconciledTotal.toFixed(2)}</h3>
        <p>Revise aqui si el pegado tomo bien placa, fecha, valor, asesor y agencia. Si no cuadra, corrija el perfil antes de guardar.</p>
      </div>
      <div class="provider-preview-actions">
        <button id="saveProviderPreviewBtn" class="btn primary" type="button">Guardar esta carga</button>
        <button id="cancelProviderPreviewBtn" class="btn secondary" type="button">Descartar</button>
      </div>
    </section>
    <div class="provider-preview-health">
      <article class="${health.missingPlate ? "is-warning" : "is-ok"}"><strong>${records.length - health.missingPlate}</strong><span>placas detectadas</span></article>
      <article class="${health.missingAmount ? "is-warning" : "is-ok"}"><strong>${records.length - health.missingAmount}</strong><span>valores detectados</span></article>
      <article class="${health.missingAdvisor ? "is-warning" : "is-ok"}"><strong>${records.length - health.missingAdvisor}</strong><span>asesores detectados</span></article>
      <article><strong>${health.rawRecovered}</strong><span>filas con respaldo original</span></article>
    </div>
    ${duplicates.length ? `<div class="provider-preview-alert">Atencion: ${duplicates.length} placa(s) repetidas dentro de esta carga.</div>` : ""}
    <div class="processing-table-scroll provider-compact-table">
      <table>
        <thead><tr><th>Perfil</th><th>Proveedor</th><th>Placa</th><th>Fecha</th><th>Valor</th><th>Asesor</th><th>Agencia</th><th>Observacion</th><th>Validacion</th></tr></thead>
        <tbody>
          ${rows.map((row, index) => `<tr>
            <td title="${escapeHtml(row.perfil)}">${escapeHtml(row.perfil)}</td>
            <td title="${escapeHtml(row.proveedor)}">${escapeHtml(row.proveedor)}</td>
            <td>${renderProviderPreviewInput(index, "PLACA", row.placa, "is-plate")}</td>
            <td>${renderProviderPreviewInput(index, "FECHA", row.fecha)}</td>
            <td>${renderProviderPreviewInput(index, "VALOR", row.valor.replace("$", "").trim(), "is-money")}</td>
            <td>${renderProviderPreviewInput(index, "ASESOR", row.asesor)}</td>
            <td>${renderProviderPreviewInput(index, "AGENCIA", row.agencia)}</td>
            <td>${renderProviderPreviewInput(index, "OBSERVACIONES", row.observacion, "is-observation")}</td>
            <td>${row.warnings.length ? `<span class="provider-row-warning">${escapeHtml(row.warnings.join(", "))}</span>` : `<span class="provider-row-ok">OK</span>`}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    ${records.length > rows.length ? `<p class="preview-note">Se muestran las primeras ${rows.length} filas para mantener la pantalla rapida.</p>` : ""}
  `;
  document.querySelector("#saveProviderPreviewBtn")?.addEventListener("click", () => {
    addProviderRecords(pendingProviderRecords);
    pendingProviderRecords = [];
    renderProviderPastePreview([]);
    if (providerBulkInput) providerBulkInput.value = "";
  });
  document.querySelector("#cancelProviderPreviewBtn")?.addEventListener("click", () => {
    pendingProviderRecords = [];
    renderProviderPastePreview([]);
  });
}

function previewProviderRecordsFromText(text, source = "PEGADO") {
  pendingProviderRecords = parseProviderInput(text, source);
  if (!pendingProviderRecords.length) {
    showToast("No se encontraron filas para previsualizar.");
    renderProviderPastePreview([]);
    return;
  }
  renderProviderPastePreview(pendingProviderRecords);
}

function addProviderRecords(records) {
  const profile = getSelectedProviderProfile();
  const provider = normalizeLooseText(providerNameInput?.value || records[0]?.provider || "");
  const importMonth = normalizeLooseText(providerMonthInput?.value || records[0]?.importMonth || "");
  if (!provider) {
    showToast("Ingrese el nombre del proveedor antes de cargar.");
    providerNameInput?.focus();
    return;
  }
  if (!importMonth) {
    showToast("Seleccione el mes del reporte antes de cargar.");
    providerMonthInput?.focus();
    return;
  }
  if (!records.length) {
    showToast("No se encontraron filas para procesar.");
    return;
  }
  const loadId = crypto.randomUUID();
  records = records.map((record) => normalizeProviderRecord({
    ...record,
    profileId: profile.id,
    profileName: profile.name,
    provider,
    importMonth,
    loadId
  }));
  const total = getProviderBillableAmount(records);
  const paidTotal = getProviderPaidAmount(records);
  state.dataProcessing.proveedores = state.dataProcessing.proveedores || [];
  state.dataProcessing.providerLoads = state.dataProcessing.providerLoads || [];
  state.dataProcessing.providerLoads.push({
    id: loadId,
    profileId: profile.id,
    profileName: profile.name,
    provider,
    month: importMonth,
    source: records[0]?.source || "MANUAL",
    importedAt: new Date().toISOString(),
    recordCount: records.length,
    total,
    paidTotal
  });
  state.dataProcessing.proveedores.push(...records);
  providerFilters = { provider, month: importMonth, plate: "", loadId };
  saveState();
  renderProviderProcessing();
  showToast(`${records.length} registros de ${provider} procesados.`);
}

function getFilteredProviderRecords() {
  return (state.dataProcessing?.proveedores || [])
    .filter(isValidProviderRecord)
    .filter((record) => !providerFilters.provider || record.provider === providerFilters.provider)
    .filter((record) => !providerFilters.month || record.importMonth === providerFilters.month)
    .filter((record) => !providerFilters.loadId || record.loadId === providerFilters.loadId)
    .filter((record) => !providerFilters.plate || getProviderRecordPlate(record).includes(normalizeLooseText(providerFilters.plate)));
}

function renderProviderHeroMetrics(records, allRecords) {
  const providers = new Set(records.map((record) => record.provider).filter(Boolean)).size;
  const pendingDuplicates = getProviderDuplicateGroups(records).filter(isProviderDuplicatePending).length;
  const months = [...new Set(records.map((record) => record.importMonth).filter(Boolean))].sort().reverse();
  const monthLabel = providerFilters.month
    ? formatMonthLabel(providerFilters.month)
    : months.length === 1
      ? formatMonthLabel(months[0])
      : "Todos los meses";
  if (providerHeroRecords) providerHeroRecords.textContent = String(records.length || allRecords.length || 0);
  if (providerHeroProviders) providerHeroProviders.textContent = String(providers);
  if (providerHeroPending) providerHeroPending.textContent = String(pendingDuplicates);
  if (providerHeroMonth) providerHeroMonth.textContent = monthLabel;
}

function renderProviderProcessing() {
  renderProviderProfileControls();
  const records = getFilteredProviderRecords();
  const allRecords = (state.dataProcessing?.proveedores || []).filter(isValidProviderRecord);
  if (providerRecordCount) providerRecordCount.textContent = `${records.length} de ${allRecords.length} registros`;
  renderProviderHeroMetrics(records, allRecords);
  renderProviderFilters();
  renderProviderKpis(records);
  renderProviderExecutiveDashboard(records);
  renderProviderDuplicates(records);
  renderProviderTable(records);
}

function renderProviderProfileControls() {
  const profiles = getProviderProfiles();
  if (providerProfileSelect) {
    const current = providerProfileSelect.dataset.pendingValue || providerProfileSelect.value || profiles[0]?.id || "";
    providerProfileSelect.innerHTML = profiles.map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)}</option>`).join("");
    providerProfileSelect.value = profiles.some((profile) => profile.id === current) ? current : profiles[0]?.id || "";
    providerProfileSelect.dataset.pendingValue = "";
  }
  const profile = getSelectedProviderProfile();
  if (providerNameInput && !providerNameInput.value && profile?.name) providerNameInput.value = profile.name;
  if (providerProfileSummary) {
    const columns = getProviderColumns(profile);
    providerProfileSummary.innerHTML = `
      <strong>${escapeHtml(profile?.name || "Perfil")}</strong>
      <span>${columns.length} columnas configuradas</span>
      <div>${columns.map((column) => `<b>${escapeHtml(column)}</b>`).join("")}</div>
    `;
  }
}

function toggleProviderProfileManager(forceOpen = null) {
  if (!providerProfileBox) return;
  const shouldOpen = forceOpen === null ? providerProfileBox.hidden : Boolean(forceOpen);
  providerProfileBox.hidden = !shouldOpen;
  if (toggleProviderProfileManagerBtn) {
    toggleProviderProfileManagerBtn.textContent = shouldOpen ? "Ocultar registro de proveedor" : "Registrar proveedor aqui";
  }
}

function toggleProviderCellsPanel() {
  if (!providerProfileSummary) return;
  providerProfileSummary.hidden = !providerProfileSummary.hidden;
  if (showProviderCellsBtn) {
    showProviderCellsBtn.textContent = providerProfileSummary.hidden ? "Mostrar celdas de registro" : "Ocultar celdas de registro";
  }
}

function addProviderProfile() {
  const editingId = providerProfileIdInput?.value || "";
  const name = normalizeLooseText(providerProfileNameInput?.value || "");
  const columns = parseProviderColumns(providerProfileColumnsInput?.value || "");
  if (!name || !columns.length) {
    showToast("Ingrese nombre del perfil y columnas.");
    return;
  }
  const profiles = getProviderProfiles();
  const existing = profiles.find((profile) => profile.id === editingId) || profiles.find((profile) => profile.name === name);
  if (existing) {
    const previousName = existing.name;
    const previousId = existing.id;
    state.dataProcessing.proveedores = (state.dataProcessing.proveedores || []).map((record) => (
      record.profileId === previousId ? { ...record, profileName: name } : record
    ));
    state.dataProcessing.providerLoads = (state.dataProcessing.providerLoads || []).map((load) => (
      load.profileId === previousId ? { ...load, profileName: name } : load
    ));
    if (providerNameInput?.value === previousName) providerNameInput.value = name;
    existing.name = name;
    existing.columns = columns;
  } else {
    profiles.push({ id: crypto.randomUUID(), name, columns });
  }
  state.dataProcessing.providerProfiles = profiles;
  saveState();
  if (providerProfileSelect) providerProfileSelect.dataset.pendingValue = existing?.id || profiles[profiles.length - 1].id;
  if (providerNameInput) providerNameInput.value = name;
  providerProfileForm?.reset();
  if (providerProfileIdInput) providerProfileIdInput.value = "";
  renderProviderProcessing();
  showToast(existing ? "Perfil actualizado." : "Perfil de proveedor creado.");
}

function editSelectedProviderProfile() {
  const profile = getSelectedProviderProfile();
  if (!profile) return;
  if (providerProfileIdInput) providerProfileIdInput.value = profile.id;
  if (providerProfileNameInput) providerProfileNameInput.value = profile.name;
  if (providerProfileColumnsInput) providerProfileColumnsInput.value = getProviderColumns(profile).join(", ");
  showToast("Perfil cargado para editar.");
}

function deleteSelectedProviderProfile() {
  const profile = getSelectedProviderProfile();
  if (!profile) return;
  const profiles = getProviderProfiles();
  if (profiles.length <= 1) {
    showToast("Debe quedar al menos un perfil para poder cargar reportes.");
    return;
  }
  const relatedRecords = (state.dataProcessing.proveedores || []).filter((record) => record.profileId === profile.id).length;
  const confirmed = window.confirm(`Desea eliminar el perfil "${profile.name}"? ${relatedRecords} registro(s) ya cargados conservaran su historial, pero el perfil ya no aparecera para nuevas cargas.`);
  if (!confirmed) return;
  state.dataProcessing.providerProfiles = profiles.filter((item) => item.id !== profile.id);
  if (providerProfileForm) providerProfileForm.reset();
  if (providerProfileIdInput) providerProfileIdInput.value = "";
  if (providerProfileSelect) providerProfileSelect.dataset.pendingValue = state.dataProcessing.providerProfiles[0]?.id || "";
  saveState();
  renderProviderProcessing();
  showToast("Perfil eliminado.");
}

function renderProviderFilters() {
  const records = state.dataProcessing?.proveedores || [];
  const loads = state.dataProcessing?.providerLoads || [];
  const providers = [...new Set(records.map((record) => record.provider).filter(Boolean))].sort();
  const months = [...new Set(records.map((record) => record.importMonth).filter(Boolean))].sort().reverse();
  if (providerFilterSelect) {
    providerFilterSelect.innerHTML = `<option value="">TODOS LOS PROVEEDORES</option>${providers.map((provider) => `<option value="${escapeHtml(provider)}">${escapeHtml(provider)}</option>`).join("")}`;
    providerFilterSelect.value = providers.includes(providerFilters.provider) ? providerFilters.provider : "";
  }
  if (providerMonthFilter) {
    providerMonthFilter.innerHTML = `<option value="">TODOS LOS MESES</option>${months.map((month) => `<option value="${escapeHtml(month)}">${escapeHtml(formatMonthLabel(month))}</option>`).join("")}`;
    providerMonthFilter.value = months.includes(providerFilters.month) ? providerFilters.month : "";
  }
  if (providerLoadFilter) {
    const visibleLoads = loads
      .filter((load) => !providerFilters.provider || load.provider === providerFilters.provider)
      .filter((load) => !providerFilters.month || load.month === providerFilters.month)
      .slice()
      .sort((a, b) => new Date(b.importedAt) - new Date(a.importedAt));
    providerLoadFilter.innerHTML = `<option value="">TODAS LAS CARGAS</option>${visibleLoads.map((load) => {
      const label = `${formatDateTime(load.importedAt)} | ${load.recordCount} filas | ${load.provider}`;
      return `<option value="${escapeHtml(load.id)}">${escapeHtml(label)}</option>`;
    }).join("")}`;
    providerLoadFilter.value = visibleLoads.some((load) => load.id === providerFilters.loadId) ? providerFilters.loadId : "";
  }
  if (providerPlateFilter) providerPlateFilter.value = providerFilters.plate || "";
  if (deleteProviderLoadBtn) deleteProviderLoadBtn.disabled = !providerFilters.loadId;
}

function getProviderDuplicateGroups(records) {
  const commonAmount = getProviderCommonAmount(records);
  const groups = new Map();
  records.forEach((record) => {
    const key = getProviderRecordPlate(record);
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  });
  return [...groups.entries()]
    .map(([plate, items]) => ({
      plate,
      items,
      approvalKey: getProviderDuplicateApprovalKey(plate, items),
      total: items.reduce((sum, item) => sum + (getProviderRecordAmount(item) || commonAmount), 0),
      providers: [...new Set(items.map((item) => item.provider).filter(Boolean))],
      months: [...new Set(items.map((item) => item.importMonth).filter(Boolean))]
    }))
    .filter((group) => group.items.length > 1)
    .sort((a, b) => b.total - a.total);
}

function getProviderDuplicateApprovalKey(plate, items) {
  const ids = items.map((item) => item.id || `${item.loadId}-${item.CODIGO || item.CUV || item.FECHA || ""}`).sort();
  return `${plate}::${ids.join("|")}`;
}

function getProviderDuplicateSimpleKey(group) {
  const providers = (group.providers || [...new Set(group.items.map((item) => item.provider).filter(Boolean))])
    .map(normalizeLooseText)
    .sort()
    .join("|");
  return `${group.plate}::provider::${providers || "SIN PROVEEDOR"}`;
}

function getProviderDuplicateChargeItems(group) {
  return group.items.slice(1);
}

function getProviderBillableRecords(records) {
  const groups = new Map();
  const withoutPlate = [];
  records.forEach((record) => {
    const plate = getProviderRecordPlate(record);
    if (!plate) {
      withoutPlate.push(record);
      return;
    }
    if (!groups.has(plate)) groups.set(plate, []);
    groups.get(plate).push(record);
  });
  const billable = [];
  groups.forEach((items, plate) => {
    const group = {
      plate,
      items,
      approvalKey: getProviderDuplicateApprovalKey(plate, items)
    };
    billable.push(items[0]);
    getProviderDuplicateChargeItems(group).forEach((item, index) => {
      if (isProviderDuplicateItemApproved(group, item, index + 1)) billable.push(item);
    });
  });
  return billable;
}

function getProviderBillableAmount(records) {
  const commonAmount = getProviderCommonAmount(records);
  const groups = new Map();
  const withoutPlate = [];
  records.forEach((record) => {
    const plate = getProviderRecordPlate(record);
    if (!plate) {
      withoutPlate.push(record);
      return;
    }
    if (!groups.has(plate)) groups.set(plate, []);
    groups.get(plate).push(record);
  });
  let total = 0;
  groups.forEach((items, plate) => {
    const group = { plate, items, approvalKey: getProviderDuplicateApprovalKey(plate, items) };
    const plateAmount = getProviderPlateResolvedAmount(items, commonAmount);
    total += plateAmount;
    getProviderDuplicateChargeItems(group).forEach((item, index) => {
      if (isProviderDuplicateItemApproved(group, item, index + 1)) {
        total += getProviderRecordAmount(item) || plateAmount;
      }
    });
  });
  return total;
}

function getProviderDuplicateItemKey(group, item, index) {
  return `${group.approvalKey}::item::${item.id || `${item.loadId || "SIN-CARGA"}-${item.CODIGO || item.CUV || item.FECHA || index}`}`;
}

function getProviderDuplicateApprovals() {
  state.dataProcessing.providerDuplicateApprovals = state.dataProcessing.providerDuplicateApprovals || {};
  return state.dataProcessing.providerDuplicateApprovals;
}

function isProviderDuplicateApprovalEntryApproved(entry) {
  return Boolean(entry === true || (entry && typeof entry === "object" && (entry.approvedAt || entry.approved)));
}

function isProviderDuplicateApprovalEntryRejected(entry) {
  return Boolean(entry && typeof entry === "object" && (entry.rejectedAt || entry.rejected || entry.status === "no_aprobado"));
}

function isProviderDuplicateItemApproved(group, item, index) {
  const approvals = getProviderDuplicateApprovals();
  return isProviderDuplicateApprovalEntryApproved(approvals[getProviderDuplicateItemKey(group, item, index)]);
}

function isProviderDuplicateItemRejected(group, item, index) {
  const approvals = getProviderDuplicateApprovals();
  return isProviderDuplicateApprovalEntryRejected(approvals[getProviderDuplicateItemKey(group, item, index)]);
}

function getProviderUnauthorizedDuplicateItems(group) {
  return getProviderDuplicateChargeItems(group)
    .map((item, index) => ({ item, index: index + 1 }))
    .filter(({ item, index }) => !isProviderDuplicateItemApproved(group, item, index) && !isProviderDuplicateItemRejected(group, item, index));
}

function getProviderRejectedDuplicateItems(group) {
  return getProviderDuplicateChargeItems(group)
    .map((item, index) => ({ item, index: index + 1 }))
    .filter(({ item, index }) => isProviderDuplicateItemRejected(group, item, index));
}

function getProviderDuplicateUnauthorizedAmount(group, records = getFilteredProviderRecords()) {
  const fallbackAmount = getProviderPlateResolvedAmount(group.items, getProviderCommonAmount(records));
  return getProviderUnauthorizedDuplicateItems(group)
    .reduce((sum, { item }) => sum + (getProviderRecordAmount(item) || fallbackAmount), 0);
}

function getProviderRejectedOverchargeAmount(records = getFilteredProviderRecords()) {
  const fallbackAmount = getProviderCommonAmount(records);
  return getProviderDuplicateGroups(records).reduce((sum, group) => {
    const groupFallback = getProviderPlateResolvedAmount(group.items, fallbackAmount);
    return sum + getProviderRejectedDuplicateItems(group)
      .reduce((itemSum, { item }) => itemSum + (getProviderRecordAmount(item) || groupFallback), 0);
  }, 0);
}

function getProviderAuthorizedOverchargeAmount(records = getFilteredProviderRecords()) {
  const fallbackAmount = getProviderCommonAmount(records);
  return getProviderDuplicateGroups(records).reduce((sum, group) => {
    const groupFallback = getProviderPlateResolvedAmount(group.items, fallbackAmount);
    const authorizedItems = getProviderDuplicateChargeItems(group)
      .filter((item, index) => isProviderDuplicateItemApproved(group, item, index + 1));
    return sum + authorizedItems.reduce((itemSum, item) => itemSum + (getProviderRecordAmount(item) || groupFallback), 0);
  }, 0);
}

function isProviderDuplicateApproved(group) {
  const chargeItems = getProviderDuplicateChargeItems(group);
  return Boolean(chargeItems.length && chargeItems.every((item, index) => isProviderDuplicateItemApproved(group, item, index + 1)));
}

function isProviderDuplicateRejected(group) {
  const chargeItems = getProviderDuplicateChargeItems(group);
  return Boolean(chargeItems.length && !isProviderDuplicatePending(group) && chargeItems.some((item, index) => isProviderDuplicateItemRejected(group, item, index + 1)));
}

function isProviderDuplicatePending(group) {
  return getProviderUnauthorizedDuplicateItems(group).length > 0;
}

function getPendingProviderDuplicateGroups(records) {
  return getProviderDuplicateGroups(records).filter(isProviderDuplicatePending);
}

function toggleProviderDuplicateApproval(key, approved, fallbackKey = "") {
  const approvals = getProviderDuplicateApprovals();
  const group = getProviderDuplicateGroups(getFilteredProviderRecords())
    .find((item) => item.approvalKey === key || getProviderDuplicateSimpleKey(item) === fallbackKey);
  delete approvals[key];
  if (fallbackKey) delete approvals[fallbackKey];
  if (approved) {
    const approval = { approvedAt: new Date().toISOString(), approvedBy: session.name || "Usuario" };
    if (group) {
      getProviderUnauthorizedDuplicateItems(group).forEach(({ item: chargeItem, index: chargeIndex }) => {
        approvals[getProviderDuplicateItemKey(group, chargeItem, chargeIndex)] = approval;
      });
    }
    providerDuplicateView = "pending";
    providerDuplicatePage = 1;
  } else {
    if (group) {
      getProviderDuplicateChargeItems(group).forEach((chargeItem, chargeIndex) => {
        const itemKey = getProviderDuplicateItemKey(group, chargeItem, chargeIndex + 1);
        delete approvals[itemKey];
      });
    }
    providerDuplicateView = "pending";
    providerDuplicatePage = 1;
  }
  saveState();
  renderProviderProcessing();
}

function setProviderDuplicateRejected(key, rejected = true, fallbackKey = "") {
  const approvals = getProviderDuplicateApprovals();
  const group = getProviderDuplicateGroups(getFilteredProviderRecords())
    .find((item) => item.approvalKey === key || getProviderDuplicateSimpleKey(item) === fallbackKey);
  const rejection = { status: "no_aprobado", rejectedAt: new Date().toISOString(), rejectedBy: session.name || "Usuario" };
  delete approvals[key];
  if (fallbackKey) delete approvals[fallbackKey];
  if (rejected) {
    if (group) {
      getProviderUnauthorizedDuplicateItems(group).forEach(({ item: chargeItem, index: chargeIndex }) => {
        approvals[getProviderDuplicateItemKey(group, chargeItem, chargeIndex)] = rejection;
      });
    }
  } else if (group) {
    getProviderDuplicateChargeItems(group).forEach((chargeItem, chargeIndex) => {
      const itemKey = getProviderDuplicateItemKey(group, chargeItem, chargeIndex + 1);
      if (isProviderDuplicateApprovalEntryRejected(approvals[itemKey])) delete approvals[itemKey];
    });
  }
  providerDuplicateView = "pending";
  providerDuplicatePage = 1;
  saveState();
  renderProviderProcessing();
  showToast(rejected ? "Duplicado marcado como no aprobado." : "Duplicado devuelto a pendientes.");
}

function toggleProviderDuplicateItemApproval(groupKey, itemKey, approved) {
  const approvals = getProviderDuplicateApprovals();
  const current = approvals[itemKey] && typeof approvals[itemKey] === "object" ? approvals[itemKey] : {};
  if (approved) {
    approvals[itemKey] = { ...current, approvedAt: new Date().toISOString(), approvedBy: session.name || "Usuario" };
  } else {
    const groups = getProviderDuplicateGroups(getFilteredProviderRecords());
    const group = groups.find((item) => item.approvalKey === groupKey);
    if (approvals[groupKey] && group) {
      delete approvals[groupKey];
      getProviderDuplicateChargeItems(group).forEach((chargeItem, chargeIndex) => {
        const key = getProviderDuplicateItemKey(group, chargeItem, chargeIndex + 1);
        if (key !== itemKey) {
          approvals[key] = { approvedAt: new Date().toISOString(), approvedBy: session.name || "Usuario" };
        }
      });
    }
    delete approvals[itemKey];
  }
  providerDuplicateView = "pending";
  providerDuplicatePage = 1;
  saveState();
  renderProviderProcessing();
}

function handleProviderGroupApprovalChange(input) {
  toggleProviderDuplicateApproval(input.dataset.providerDuplicateApproval, input.checked, input.dataset.providerDuplicateSimpleKey || "");
}

function handleProviderItemApprovalChange(input) {
  toggleProviderDuplicateItemApproval(input.dataset.providerDuplicateGroup, input.dataset.providerDuplicateItem, input.checked);
}

function approveProviderDuplicateGroupByKeys(key, fallbackKey = "") {
  const approvals = getProviderDuplicateApprovals();
  const group = getProviderDuplicateGroups(getFilteredProviderRecords())
    .find((item) => item.approvalKey === key || getProviderDuplicateSimpleKey(item) === fallbackKey);
  const approval = { approvedAt: new Date().toISOString(), approvedBy: session.name || "Usuario" };
  delete approvals[key];
  if (fallbackKey) delete approvals[fallbackKey];
  if (group) {
    getProviderUnauthorizedDuplicateItems(group).forEach(({ item: chargeItem, index: chargeIndex }) => {
      approvals[getProviderDuplicateItemKey(group, chargeItem, chargeIndex)] = approval;
    });
  }
}

function approveSelectedProviderDuplicates() {
  const selected = [...(providerDuplicateReport?.querySelectorAll("[data-provider-bulk-duplicate]:checked") || [])];
  if (!selected.length) {
    showToast("Selecciona al menos una placa duplicada.");
    return;
  }
  selected.forEach((checkbox) => {
    approveProviderDuplicateGroupByKeys(checkbox.dataset.providerBulkDuplicate, checkbox.dataset.providerBulkSimpleKey || "");
  });
  providerDuplicateView = "pending";
  providerDuplicatePage = 1;
  saveState();
  renderProviderProcessing();
  showToast(`${selected.length} duplicado(s) aprobado(s).`);
}

function rejectProviderDuplicateGroupByKeys(key, fallbackKey = "") {
  const approvals = getProviderDuplicateApprovals();
  const group = getProviderDuplicateGroups(getFilteredProviderRecords())
    .find((item) => item.approvalKey === key || getProviderDuplicateSimpleKey(item) === fallbackKey);
  const rejection = { status: "no_aprobado", rejectedAt: new Date().toISOString(), rejectedBy: session.name || "Usuario" };
  delete approvals[key];
  if (fallbackKey) delete approvals[fallbackKey];
  if (group) {
    getProviderUnauthorizedDuplicateItems(group).forEach(({ item: chargeItem, index: chargeIndex }) => {
      approvals[getProviderDuplicateItemKey(group, chargeItem, chargeIndex)] = rejection;
    });
  }
}

function rejectSelectedProviderDuplicates() {
  const selected = [...(providerDuplicateReport?.querySelectorAll("[data-provider-bulk-duplicate]:checked") || [])];
  if (!selected.length) {
    showToast("Selecciona al menos una placa duplicada.");
    return;
  }
  selected.forEach((checkbox) => {
    rejectProviderDuplicateGroupByKeys(checkbox.dataset.providerBulkDuplicate, checkbox.dataset.providerBulkSimpleKey || "");
  });
  providerDuplicateView = "pending";
  providerDuplicatePage = 1;
  saveState();
  renderProviderProcessing();
  showToast(`${selected.length} duplicado(s) marcado(s) como no aprobado(s).`);
}

function setVisibleProviderDuplicateSelection(checked) {
  providerDuplicateReport?.querySelectorAll("[data-provider-bulk-duplicate]").forEach((checkbox) => {
    checkbox.checked = checked;
  });
}

window.handleProviderGroupApprovalChange = handleProviderGroupApprovalChange;
window.handleProviderItemApprovalChange = handleProviderItemApprovalChange;

function renderProviderKpis(records) {
  if (!providerKpis) return;
  providerKpis.hidden = true;
  providerKpis.innerHTML = "";
  return;
  const paidTotal = getProviderBillableAmount(records);
  const authorizedOvercharge = getProviderAuthorizedOverchargeAmount(records);
  const rejectedOvercharge = getProviderRejectedOverchargeAmount(records);
  const uniquePlates = new Set(records.map(getProviderRecordPlate).filter(Boolean)).size;
  const duplicates = getProviderDuplicateGroups(records);
  const pendingDuplicates = duplicates.filter(isProviderDuplicatePending);
  const possibleOvercharge = pendingDuplicates.reduce((sum, group) => sum + getProviderDuplicateUnauthorizedAmount(group, records), 0);
  const providers = new Set(records.map((record) => record.provider).filter(Boolean)).size;
  providerKpis.innerHTML = [
    ["paid", "Gasto pagado", `$ ${paidTotal.toFixed(2)}`, "Base conciliada mas autorizados", "is-success"],
    ["authorizedOvercharge", "Sobrecobro autorizado", `$ ${authorizedOvercharge.toFixed(2)}`, "Duplicados aprobados", authorizedOvercharge ? "is-success" : "is-neutral"],
    ["rejectedOvercharge", "Valores no aprobados", `$ ${rejectedOvercharge.toFixed(2)}`, "Duplicados no aprobados", rejectedOvercharge ? "is-critical" : "is-success"],
    ["providers", "Proveedores", providers, "Proveedores filtrados", "is-plain"],
    ["unique", "Placas unicas", uniquePlates, "Vehiculos distintos", "is-neutral"],
    ["duplicates", "Duplicados sin autorizar", pendingDuplicates.length, `${duplicates.length - pendingDuplicates.length} aceptado(s)`, pendingDuplicates.length ? "is-critical" : "is-success"],
    ["overcharge", "Posible sobrecobro", `$ ${possibleOvercharge.toFixed(2)}`, "Solo duplicados sin autorizacion", possibleOvercharge ? "is-warning" : "is-success"]
  ].map(([key, label, value, hint, tone]) => `
    <button class="kpi-card executive-kpi ${tone}" type="button" data-provider-detail="${escapeHtml(key)}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
    </button>
  `).join("");
  providerKpis.querySelectorAll("[data-provider-detail]").forEach((button) => {
    button.addEventListener("click", () => openProviderDetail(button.dataset.providerDetail));
  });
}

function renderProviderExecutiveDashboard(records) {
  if (!providerExecutiveDashboard) return;
  if (!records.length) {
    providerExecutiveDashboard.innerHTML = `<div class="empty compact-empty">Carga un reporte de pagos para ver el dashboard ejecutivo.</div>`;
    return;
  }
  const metrics = getProviderDashboardMetrics(records);
  const maxAgency = Math.max(...metrics.agencies.map((item) => item.total), 1);
  const maxAdvisor = Math.max(...metrics.advisors.map((item) => item.total), 1);
  const maxProvider = Math.max(...metrics.providers.map((item) => item.amount), 1);
  providerExecutiveDashboard.innerHTML = `
    <section class="provider-exec-shell">
      <div class="provider-exec-toolbar">
        <div>
          <p class="eyebrow">Bienvenido, Santiago</p>
          <h3>Mesa de Control Financiero</h3>
        </div>
        <div class="provider-exec-actions">
          <button class="btn primary" type="button" data-provider-detail="duplicates">Control financiero operativo</button>
          <button class="btn secondary" type="button" id="providerExecPdfBtn">PDF disponible al final de la base</button>
          <span class="provider-period-chip">Periodo <b>${escapeHtml(metrics.period)}</b></span>
        </div>
      </div>

      <div class="provider-exec-kpi-grid">
        ${renderProviderExecKpi("&#128176;", "Gasto pagado", `$ ${metrics.paidTotal.toFixed(2)}`, "Base conciliada mas autorizados", "paid", "success")}
        ${renderProviderExecKpi("&#128737;&#65039;", "Sobrecobro autorizado", `$ ${metrics.authorizedOvercharge.toFixed(2)}`, "Duplicados aprobados", "authorizedOvercharge", "success")}
        ${renderProviderExecKpi("&#128101;", "Proveedores", metrics.providersCount, "Proveedores filtrados", "providers", "blue")}
        ${renderProviderExecKpi("&#128663;", "Placas unicas", metrics.uniquePlates, "Vehiculos distintos", "unique", "purple")}
        ${renderProviderExecKpi("&#128196;", "Duplicados sin autorizar", metrics.pendingDuplicates, `${metrics.approvedDuplicates} aceptado(s)`, "duplicates", metrics.pendingDuplicates ? "danger" : "success")}
        ${renderProviderExecKpi("&#9888;&#65039;", "Posible sobrecobro", `$ ${metrics.overcharge.toFixed(2)}`, "Solo duplicados sin autorizacion", "overcharge", metrics.overcharge ? "warning" : "success")}
        ${renderProviderExecKpi("&#9940;", "Valores no aprobados", `$ ${metrics.rejectedOvercharge.toFixed(2)}`, `${metrics.rejectedDuplicates} caso(s) no aprobados`, "rejectedOvercharge", metrics.rejectedOvercharge ? "danger" : "success")}
      </div>

      <section class="provider-exec-grid">
        <article class="provider-exec-panel provider-exec-gauge">
          <p class="eyebrow">Cumplimiento financiero</p>
          <div class="payment-gauge" style="--score:${metrics.cleanRate}">
            <span>${metrics.cleanRate}%</span>
          </div>
          <div class="payment-legend">
            <span><i class="ok-dot"></i>Sin alerta ${metrics.cleanRecords}</span>
            <span><i class="bad-dot"></i>Por revisar ${metrics.flaggedRecords}</span>
          </div>
          <div class="provider-exec-note ${metrics.pendingDuplicates ? "is-warning" : "is-ok"}">
            <strong>${metrics.pendingDuplicates ? "Revisar posibles sobrecobros." : "Excelente gestion financiera."}</strong>
            <span>${metrics.pendingDuplicates ? `Existen $ ${metrics.overcharge.toFixed(2)} sin autorizacion.` : "Continua asi."}</span>
          </div>
        </article>

        <article class="provider-exec-panel provider-exec-wide">
          <p class="eyebrow">Distribucion por proveedor</p>
          <h3>Gasto pagado</h3>
          ${metrics.providers.map((item) => renderPaymentBar(item.provider, `$ ${item.amount.toFixed(2)} | ${item.share}%`, item.amount / maxProvider)).join("") || `<div class="empty compact-empty">Sin proveedores.</div>`}
          <div class="provider-total-line"><span>Total general</span><b>$ ${metrics.paidTotal.toFixed(2)}</b><strong>100%</strong></div>
        </article>

        <article class="provider-exec-panel provider-exec-wide">
          <p class="eyebrow">Solicitudes por agencia</p>
          <div class="payment-split">
            <div>
              ${metrics.agencies.map((item) => renderPaymentBar(item.agency, item.total, item.total / maxAgency)).join("") || `<div class="empty compact-empty">Sin agencias.</div>`}
            </div>
            ${renderPaymentMiniTable(["Agencia", "Casos", "%"], metrics.agencies.map((item) => [item.agency, item.total, `${item.share}%`]), "Total", [metrics.records, "100%"])}
          </div>
        </article>

        <article class="provider-exec-panel">
          <p class="eyebrow">Solicitudes por asesor</p>
          ${metrics.advisors.map((item) => renderPaymentBar(item.advisor, item.total, item.total / maxAdvisor)).join("") || `<div class="empty compact-empty">Sin asesores.</div>`}
          ${renderPaymentMiniTable(["Asesor", "Casos", "%"], metrics.advisors.slice(0, 5).map((item) => [item.advisor, item.total, `${item.share}%`]), "Total", [metrics.records, "100%"])}
        </article>

        <article class="provider-exec-panel">
          <p class="eyebrow">Distribucion agencia vs asesor</p>
          ${renderProviderAgencyAdvisorDonut(metrics)}
        </article>

        <article class="provider-exec-panel">
          <p class="eyebrow">Alertas y observaciones</p>
          <div class="provider-alert-list">
            ${metrics.findings.map((finding) => `<p class="${escapeHtml(finding.tone)}"><b>${escapeHtml(finding.icon)}</b><span><strong>${escapeHtml(finding.title)}</strong><small>${escapeHtml(finding.text)}</small></span></p>`).join("")}
          </div>
        </article>

        <article class="provider-exec-panel">
          <p class="eyebrow">Indicadores clave</p>
          <div class="payment-insight-list">
            <span><b>$ ${metrics.averagePerPlate.toFixed(2)}</b> gasto promedio por placa</span>
            <span><b>${metrics.pendingDuplicates}</b> duplicados sin autorizar</span>
            <span><b>$ ${metrics.overcharge.toFixed(2)}</b> posible sobrecobro</span>
            <span><b>$ ${metrics.rejectedOvercharge.toFixed(2)}</b> no aprobado</span>
            <span><b>${metrics.records}</b> cargas procesadas</span>
          </div>
        </article>
      </section>

      <footer class="provider-exec-footer">
        <span>FECHA Periodo <b>${escapeHtml(metrics.period)}</b></span>
        <span>BASE Fuente de datos <b>Base de datos Control Financiero</b></span>
        <span>TIEMPOÃ¯Â¸Â Fecha de corte <b>${escapeHtml(metrics.cutoff)}</b></span>
        <span>SYNC Ultima actualizacion <b>${escapeHtml(metrics.updatedAt)}</b></span>
      </footer>
    </section>
  `;
  providerExecutiveDashboard.querySelectorAll("[data-provider-detail]").forEach((button) => {
    button.addEventListener("click", () => openProviderDetail(button.dataset.providerDetail));
  });
  providerExecutiveDashboard.querySelector("#providerExecPdfBtn")?.addEventListener("click", () => exportProviderPdfBtn?.click());
}

function renderProviderExecKpi(icon, label, value, hint, detail, tone = "blue") {
  return `
    <button class="provider-exec-kpi is-${escapeHtml(tone)}" type="button" data-provider-detail="${escapeHtml(detail)}">
      <span class="provider-exec-kpi-icon">${icon}</span>
      <span class="provider-exec-kpi-copy">
        <small>${escapeHtml(label)}</small>
        <strong>${escapeHtml(value)}</strong>
        <em>${escapeHtml(hint)}</em>
      </span>
    </button>
  `;
}

function renderProviderAgencyAdvisorDonut(metrics) {
  const agencyTotal = metrics.agencies.reduce((sum, item) => sum + item.total, 0);
  const advisorTotal = metrics.advisors.reduce((sum, item) => sum + item.total, 0);
  const total = Math.max(agencyTotal + advisorTotal, 1);
  const agencyShare = Math.round((agencyTotal / total) * 100);
  return `
    <div class="provider-donut-wrap">
      <div class="provider-donut" style="--agency:${agencyShare}">
        <span>${metrics.records}</span>
        <small>Total</small>
      </div>
      <div class="provider-donut-legend">
        <p><i class="agency"></i><span>Agencia</span><b>${agencyTotal}</b></p>
        <p><i class="advisor"></i><span>Asesor</span><b>${advisorTotal}</b></p>
      </div>
    </div>
  `;
}

function getProviderMonthLabel() {
  const value = providerFilters.month || providerMonthInput?.value || "";
  if (!value) return "Todos los periodos";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-EC", { month: "long", year: "numeric" });
}

function getProviderCurrentDateTime() {
  return new Date().toLocaleString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getProviderDashboardMetrics(records) {
  const duplicates = getProviderDuplicateGroups(records);
  const pendingDuplicates = duplicates.filter(isProviderDuplicatePending);
  const approvedDuplicates = duplicates.filter(isProviderDuplicateApproved);
  const rejectedDuplicates = duplicates.filter(isProviderDuplicateRejected);
  const overcharge = pendingDuplicates.reduce((sum, group) => sum + getProviderDuplicateUnauthorizedAmount(group, records), 0);
  const paidTotal = getProviderBillableAmount(records);
  const authorizedOvercharge = getProviderAuthorizedOverchargeAmount(records);
  const rejectedOvercharge = getProviderRejectedOverchargeAmount(records);
  const cleanRecords = Math.max(0, records.length - pendingDuplicates.reduce((sum, group) => sum + Math.max(0, group.items.length - 1), 0));
  const flaggedRecords = records.length - cleanRecords;
  const cleanRate = records.length ? Math.round((cleanRecords / records.length) * 1000) / 10 : 0;
  const duplicateRate = records.length ? Math.round((flaggedRecords / records.length) * 1000) / 10 : 0;
  const agencies = groupProviderMetric(records, getProviderAgency, "agency")
    .map((item) => ({ ...item, share: records.length ? Math.round((item.total / records.length) * 1000) / 10 : 0 }))
    .slice(0, 9);
  const advisors = groupProviderMetric(records, getProviderAdvisor, "advisor")
    .map((item) => ({ ...item, share: records.length ? Math.round((item.total / records.length) * 1000) / 10 : 0 }))
    .slice(0, 8);
  const providers = [...new Set(records.map((record) => record.provider || "SIN PROVEEDOR"))]
    .map((provider) => {
      const providerRecords = records.filter((record) => (record.provider || "SIN PROVEEDOR") === provider);
      const amount = getProviderBillableAmount(providerRecords);
      return { provider, total: providerRecords.length, amount, share: paidTotal ? Math.round((amount / paidTotal) * 1000) / 10 : 0 };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8);
  const matrix = buildProviderAgencyAdvisorMatrix(records);
  const topAgency = agencies[0];
  const topAdvisor = advisors[0];
  const findings = [
    {
      icon: "AGENCIA",
      title: "Concentracion por agencia",
      text: topAgency ? `${topAgency.agency} concentra ${topAgency.share}% de los registros filtrados.` : "Sin agencias para analizar.",
      tone: "is-info"
    },
    {
      icon: "ASESOR",
      title: "Carga operativa",
      text: topAdvisor ? `${topAdvisor.advisor} administra ${topAdvisor.total} registro(s) en la base filtrada.` : "Sin asesores para analizar.",
      tone: "is-blue"
    },
    {
      icon: pendingDuplicates.length ? "ALERTA" : "OK",
      title: "Control de cobros",
      text: pendingDuplicates.length ? `${pendingDuplicates.length} placa(s) repetidas necesitan autorizacion. Priorice el posible sobrecobro.` : "No hay duplicados pendientes de autorizacion.",
      tone: pendingDuplicates.length ? "is-warning" : "is-ok"
    },
    {
      icon: "PROV",
      title: "Proveedores activos",
      text: `${new Set(records.map((record) => record.provider).filter(Boolean)).size} proveedor(es) gestionados en el periodo actual.`,
      tone: "is-purple"
    }
  ];
  const uniquePlates = new Set(records.map(getProviderRecordPlate).filter(Boolean)).size;
  const now = getProviderCurrentDateTime();
  return {
    period: getProviderMonthLabel(),
    cutoff: now,
    updatedAt: now,
    records: records.length,
    paidTotal,
    authorizedOvercharge,
    rejectedOvercharge,
    providersCount: new Set(records.map((record) => record.provider).filter(Boolean)).size,
    uniquePlates,
    approvedDuplicates: approvedDuplicates.length,
    rejectedDuplicates: rejectedDuplicates.length,
    pendingDuplicates: pendingDuplicates.length,
    overcharge,
    averagePerPlate: uniquePlates ? paidTotal / uniquePlates : 0,
    cleanRecords,
    flaggedRecords,
    cleanRate,
    duplicateRate,
    agencies,
    advisors,
    providers,
    matrix,
    findings
  };
}

function groupProviderMetric(records, getter, key) {
  const map = new Map();
  records.forEach((record) => {
    const label = getter(record) || "SIN DATO";
    map.set(label, (map.get(label) || 0) + 1);
  });
  return [...map.entries()]
    .map(([label, total]) => ({ [key]: label, total }))
    .sort((a, b) => b.total - a.total || String(a[key]).localeCompare(String(b[key])));
}

function buildProviderAgencyAdvisorMatrix(records) {
  const agencies = groupProviderMetric(records, getProviderAgency, "agency").slice(0, 8).map((item) => item.agency);
  const advisors = groupProviderMetric(records, getProviderAdvisor, "advisor").slice(0, 6).map((item) => item.advisor);
  const rows = agencies.map((agency) => {
    const counts = advisors.map((advisor) => records.filter((record) => (getProviderAgency(record) || "SIN DATO") === agency && (getProviderAdvisor(record) || "SIN DATO") === advisor).length);
    return { agency, counts, total: counts.reduce((sum, value) => sum + value, 0) };
  });
  return { agencies, advisors, rows };
}

function renderPaymentBar(label, value, ratio) {
  const width = Math.max(4, Math.min(100, Math.round((ratio || 0) * 100)));
  return `<div class="payment-bar"><label><span>${escapeHtml(label || "SIN DATO")}</span><b>${escapeHtml(value)}</b></label><div><i style="width:${width}%"></i></div></div>`;
}

function renderPaymentMiniTable(headers, rows, totalLabel = "", totalValues = []) {
  return `<table class="payment-mini-table"><thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>${totalLabel ? `<tfoot><tr><th>${escapeHtml(totalLabel)}</th>${totalValues.map((value) => `<th>${escapeHtml(value)}</th>`).join("")}</tr></tfoot>` : ""}</table>`;
}

function renderProviderAgencyAdvisorMatrix(matrix) {
  if (!matrix.rows.length || !matrix.advisors.length) return `<div class="empty compact-empty">Sin datos suficientes para matriz.</div>`;
  return `<div class="payment-matrix-scroll"><table class="payment-matrix"><thead><tr><th>Agencia</th>${matrix.advisors.map((advisor) => `<th>${escapeHtml(advisor)}</th>`).join("")}<th>Total</th></tr></thead><tbody>${matrix.rows.map((row) => `<tr><td>${escapeHtml(row.agency)}</td>${row.counts.map((count) => `<td>${count}</td>`).join("")}<td><strong>${row.total}</strong></td></tr>`).join("")}</tbody></table></div>`;
}

function renderProviderDuplicates(records) {
  if (!providerDuplicateReport) return;
  const duplicates = getProviderDuplicateGroups(records);
  const pendingDuplicates = duplicates.filter(isProviderDuplicatePending);
  const approvedDuplicates = duplicates.filter(isProviderDuplicateApproved);
  const rejectedDuplicates = duplicates.filter(isProviderDuplicateRejected);
  const visibleDuplicates = providerDuplicateView === "approved"
    ? approvedDuplicates
    : providerDuplicateView === "rejected"
      ? rejectedDuplicates
      : pendingDuplicates;
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(visibleDuplicates.length / pageSize));
  providerDuplicatePage = Math.min(Math.max(providerDuplicatePage, 1), totalPages);
  const pageStart = (providerDuplicatePage - 1) * pageSize;
  const pageItems = visibleDuplicates.slice(pageStart, pageStart + pageSize);
  const total = getProviderBillableAmount(records);
  const possibleOvercharge = pendingDuplicates.reduce((sum, group) => sum + getProviderDuplicateUnauthorizedAmount(group, records), 0);
  if (!records.length) {
    providerDuplicateReport.innerHTML = `<div class="empty compact-empty">Carga un reporte para generar alertas de proveedores.</div>`;
    return;
  }
  if (!duplicates.length) {
    providerDuplicateReport.innerHTML = `
      ${renderProviderAuditSummary(records, duplicates, total, possibleOvercharge)}
      <div class="empty compact-empty">Sin placas repetidas en el filtro actual.</div>
    `;
    return;
  }
  providerDuplicateReport.innerHTML = `
    ${renderProviderAuditSummary(records, duplicates, total, possibleOvercharge)}
    <div class="provider-duplicate-tabs">
      <button class="${providerDuplicateView === "pending" ? "is-active" : ""}" type="button" data-provider-duplicate-tab="pending">
        Pendientes (${pendingDuplicates.length})
      </button>
      <button class="${providerDuplicateView === "approved" ? "is-active" : ""}" type="button" data-provider-duplicate-tab="approved">
        Aprobados (${approvedDuplicates.length})
      </button>
      <button class="${providerDuplicateView === "rejected" ? "is-active" : ""}" type="button" data-provider-duplicate-tab="rejected">
        No aprobados (${rejectedDuplicates.length})
      </button>
    </div>
    ${providerDuplicateView === "pending" && pendingDuplicates.length ? `
      <div class="provider-bulk-actions">
        <strong>Seleccion masiva</strong>
        <button type="button" data-provider-bulk-select="all">Seleccionar visibles</button>
        <button type="button" data-provider-bulk-select="none">Limpiar</button>
        <button class="is-primary" type="button" data-provider-bulk-approve>Aprobar seleccionados</button>
        <button class="is-danger" type="button" data-provider-bulk-reject>No aprobar seleccionados</button>
      </div>
    ` : ""}
    <div class="provider-alert-list">
      ${visibleDuplicates.length
        ? pageItems.map((group) => renderProviderDuplicateCard(group, records)).join("")
        : `<div class="empty compact-empty">${providerDuplicateView === "approved" ? "Todavia no hay duplicados aprobados." : providerDuplicateView === "rejected" ? "Todavia no hay duplicados no aprobados." : "No hay duplicados pendientes por autorizar."}</div>`}
    </div>
    ${visibleDuplicates.length > pageSize ? `
      <div class="provider-pagination">
        <button type="button" data-provider-duplicate-page="prev" ${providerDuplicatePage <= 1 ? "disabled" : ""}>Anterior</button>
        <span>Pagina ${providerDuplicatePage} de ${totalPages} | ${visibleDuplicates.length} duplicados</span>
        <button type="button" data-provider-duplicate-page="next" ${providerDuplicatePage >= totalPages ? "disabled" : ""}>Siguiente</button>
      </div>
    ` : ""}
  `;
  providerDuplicateReport.querySelectorAll("[data-provider-duplicate-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      providerDuplicateView = button.dataset.providerDuplicateTab || "pending";
      providerDuplicatePage = 1;
      renderProviderDuplicates(records);
    });
  });
  providerDuplicateReport.querySelectorAll("[data-provider-duplicate-page]").forEach((button) => {
    button.addEventListener("click", () => {
      providerDuplicatePage += button.dataset.providerDuplicatePage === "next" ? 1 : -1;
      renderProviderDuplicates(records);
    });
  });
  providerDuplicateReport.querySelectorAll("[data-provider-bulk-select]").forEach((button) => {
    button.addEventListener("click", () => {
      setVisibleProviderDuplicateSelection(button.dataset.providerBulkSelect === "all");
    });
  });
  providerDuplicateReport.querySelectorAll("[data-provider-bulk-approve]").forEach((button) => {
    button.addEventListener("click", approveSelectedProviderDuplicates);
  });
  providerDuplicateReport.querySelectorAll("[data-provider-bulk-reject]").forEach((button) => {
    button.addEventListener("click", rejectSelectedProviderDuplicates);
  });
  providerDuplicateReport.querySelectorAll("button[data-provider-duplicate-approval]").forEach((button) => {
    button.addEventListener("click", () => toggleProviderDuplicateApproval(button.dataset.providerDuplicateApproval, true, button.dataset.providerDuplicateSimpleKey || ""));
  });
  providerDuplicateReport.querySelectorAll("[data-provider-duplicate-reject]").forEach((button) => {
    button.addEventListener("click", () => setProviderDuplicateRejected(button.dataset.providerDuplicateReject, true, button.dataset.providerDuplicateSimpleKey || ""));
  });
  providerDuplicateReport.querySelectorAll("[data-provider-duplicate-reopen]").forEach((button) => {
    button.addEventListener("click", () => setProviderDuplicateRejected(button.dataset.providerDuplicateReopen, false, button.dataset.providerDuplicateSimpleKey || ""));
  });
}

function renderProviderAuditSummary(records, duplicates, total, possibleOvercharge) {
  const providers = [...new Set(records.map((record) => record.provider).filter(Boolean))];
  const months = [...new Set(records.map((record) => record.importMonth).filter(Boolean))].map(formatMonthLabel);
  const pendingDuplicates = duplicates.filter(isProviderDuplicatePending);
  const worst = pendingDuplicates[0] || duplicates[0];
  const message = pendingDuplicates.length
    ? `Hay ${pendingDuplicates.length} placa(s) con duplicados sin autorizacion. Revise primero ${worst?.plate || "la placa principal"} porque mantiene $ ${getProviderDuplicateUnauthorizedAmount(worst || { items: [] }, records).toFixed(2)} sin autorizar.`
    : duplicates.length
      ? `Todos los duplicados del filtro actual estan aceptados. Mantenga el check solo cuando la repeticion fue solicitada o autorizada.`
    : "No se encontraron repeticiones en el filtro actual. El gasto luce consistente para la base cargada.";
  return `
    <section class="provider-audit-summary">
      <div>
        <p class="eyebrow">Analisis directo</p>
        <h3>${escapeHtml(message)}</h3>
        <p>Total revisado: <b>$ ${total.toFixed(2)}</b>. Posible sobrecobro referencial: <b>$ ${possibleOvercharge.toFixed(2)}</b>.</p>
      </div>
      <div class="provider-audit-tags">
        <span>${records.length} registros</span>
        <span>${providers.length || 0} proveedor(es)</span>
        <span>${pendingDuplicates.length} sin autorizacion</span>
        <span>${months.slice(0, 3).join(", ") || "Sin mes"}</span>
      </div>
    </section>
  `;
}

function renderProviderDuplicateCard(group, contextRecords = getFilteredProviderRecords()) {
  const advisors = [...new Set(group.items.map(getProviderAdvisor).filter(Boolean))];
  const dates = [...new Set(group.items.map((item) => item.FECHA).filter(Boolean))];
  const whatsappRefs = [...new Set(group.items.map(getProviderObservation).filter(Boolean))].slice(0, 3);
  const approved = isProviderDuplicateApproved(group);
  const rejected = isProviderDuplicateRejected(group);
  const pending = !approved && !rejected;
  const unauthorizedAmount = getProviderDuplicateUnauthorizedAmount(group, contextRecords);
  const simpleKey = getProviderDuplicateSimpleKey(group);
  const statusText = approved ? "Duplicado autorizado" : rejected ? "No aprobado" : "Sin autorizacion";
  return `
    <details class="duplicate-insight-card provider-alert-card ${approved ? "is-approved" : rejected ? "is-rejected" : ""}">
      <summary>
        <strong>${escapeHtml(group.plate)}</strong>
        <span>${group.items.length} registros | $ ${group.total.toFixed(2)} | sobrecobro $ ${unauthorizedAmount.toFixed(2)} | ${escapeHtml(group.providers.join(", "))}</span>
        <em>${escapeHtml(statusText)}</em>
      </summary>
      ${pending ? `
        <label class="provider-bulk-check">
          <input type="checkbox" data-provider-bulk-duplicate="${escapeHtml(group.approvalKey)}" data-provider-bulk-simple-key="${escapeHtml(simpleKey)}">
          Seleccionar para accion en lote
        </label>
        <div class="provider-duplicate-actions">
          <button class="btn primary" type="button" data-provider-duplicate-approval="${escapeHtml(group.approvalKey)}" data-provider-duplicate-simple-key="${escapeHtml(simpleKey)}">Aprobar duplicado</button>
          <button class="btn danger" type="button" data-provider-duplicate-reject="${escapeHtml(group.approvalKey)}" data-provider-duplicate-simple-key="${escapeHtml(simpleKey)}">No aprobar</button>
        </div>
      ` : rejected ? `
        <div class="provider-duplicate-actions">
          <button class="btn secondary" type="button" data-provider-duplicate-reopen="${escapeHtml(group.approvalKey)}" data-provider-duplicate-simple-key="${escapeHtml(simpleKey)}">Regresar a pendiente</button>
        </div>
      ` : ""}
      ${approved ? `<div class="provider-duplicate-actions"><button class="btn secondary" type="button" data-provider-duplicate-reopen="${escapeHtml(group.approvalKey)}" data-provider-duplicate-simple-key="${escapeHtml(simpleKey)}">Regresar a pendiente</button></div>` : ""}
      <div class="provider-alert-brief">
        <span><b>Fechas</b>${escapeHtml(dates.join(", ") || "Sin fecha")}</span>
        <span><b>Asesores</b>${escapeHtml(advisors.join(", ") || "Sin asesor")}</span>
        <span><b>WhatsApp / soporte</b>${escapeHtml(whatsappRefs.join(" | ") || "Sin observacion")}</span>
      </div>
      <div class="processing-table-scroll">
        <table>
          <thead><tr><th>Estado</th><th>Autorizar</th><th>Proveedor</th><th>Fecha</th><th>Valor</th><th>Codigo/CUV</th><th>Agencia</th><th>Observacion</th></tr></thead>
          <tbody>
            ${group.items.map((item, index) => {
              const isBase = index === 0;
              const itemApproved = isBase || isProviderDuplicateItemApproved(group, item, index);
              const itemRejected = !isBase && isProviderDuplicateItemRejected(group, item, index);
              const itemKey = getProviderDuplicateItemKey(group, item, index);
              return `
              <tr>
                <td>${isBase ? "BASE" : itemApproved ? "AUTORIZADO" : itemRejected ? "NO APROBADO" : "SOBRECOBRO"}</td>
                <td>${isBase || rejected ? "-" : `<input type="checkbox" data-provider-duplicate-item="${escapeHtml(itemKey)}" data-provider-duplicate-group="${escapeHtml(group.approvalKey)}" ${itemApproved ? "checked" : ""}>`}</td>
                <td>${escapeHtml(item.provider)}</td>
                <td>${escapeHtml(item.FECHA)}</td>
                <td>$ ${escapeHtml(getProviderRecordDisplayAmount(item, group.items).toFixed(2))}</td>
                <td>${escapeHtml(item.CODIGO || item.CUV)}</td>
                <td>${escapeHtml(getProviderAgency(item))}</td>
                <td>${escapeHtml(getProviderObservation(item))}</td>
              </tr>
            `; }).join("")}
          </tbody>
        </table>
      </div>
    </details>
  `;
}

function getProviderDetailRows(kind) {
  const records = getFilteredProviderRecords();
  if (kind === "duplicates" || kind === "overcharge") {
    return getProviderDuplicateGroups(records).flatMap((group) => {
      if (kind === "duplicates") return group.items;
      return getProviderUnauthorizedDuplicateItems(group).map(({ item }) => item);
    });
  }
  if (kind === "authorizedOvercharge") {
    return getProviderDuplicateGroups(records).flatMap((group) =>
      getProviderDuplicateChargeItems(group)
        .filter((item, index) => isProviderDuplicateItemApproved(group, item, index + 1))
    );
  }
  if (kind === "rejectedOvercharge") {
    return getProviderDuplicateGroups(records).flatMap((group) =>
      getProviderRejectedDuplicateItems(group).map(({ item }) => item)
    );
  }
  if (kind === "paid") return getProviderBillableRecords(records);
  if (kind === "unique") {
    const seen = new Set();
    return records.filter((record) => {
      const plate = getProviderRecordPlate(record);
      if (!plate || seen.has(plate)) return false;
      seen.add(plate);
      return true;
    });
  }
  if (kind === "total") return getProviderBillableRecords(records);
  return records;
}

function renderProviderDetailTable(records) {
  if (!records.length) return `<div class="empty compact-empty">Sin informacion para mostrar con el filtro actual.</div>`;
  const commonAmount = getProviderCommonAmount(records);
  return `
    <div class="processing-table-scroll provider-detail-table">
      <table>
        <thead>
          <tr><th>Proveedor</th><th>Placa</th><th>Fecha</th><th>Valor</th><th>Asesor</th><th>Agencia</th><th>Codigo/CUV</th><th>Observacion</th></tr>
        </thead>
        <tbody>
          ${records.map((record) => {
            const observation = getProviderObservation(record);
            return `<tr>
              <td>${escapeHtml(record.provider)}</td>
              <td>${escapeHtml(getProviderRecordPlate(record))}</td>
              <td>${escapeHtml(record.FECHA || "")}</td>
              <td>$ ${escapeHtml((getProviderRecordAmount(record) || commonAmount).toFixed(2))}</td>
              <td>${escapeHtml(getProviderAdvisor(record))}</td>
              <td>${escapeHtml(getProviderAgency(record))}</td>
              <td>${escapeHtml(record.CODIGO || record.CUV || "")}</td>
              <td title="${escapeHtml(observation)}">${escapeHtml(observation)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getProviderReportContext() {
  const records = getFilteredProviderRecords();
  const duplicates = getProviderDuplicateGroups(records);
  const pendingDuplicates = duplicates.filter(isProviderDuplicatePending);
  const approvedDuplicates = duplicates.filter(isProviderDuplicateApproved);
  const rejectedDuplicates = duplicates.filter(isProviderDuplicateRejected);
  const total = getProviderBillableAmount(records);
  const authorizedOvercharge = getProviderAuthorizedOverchargeAmount(records);
  const paidTotal = getProviderBillableAmount(records);
  const rejectedOvercharge = getProviderRejectedOverchargeAmount(records);
  const uniquePlates = new Set(records.map(getProviderRecordPlate).filter(Boolean)).size;
  const providers = new Set(records.map((record) => record.provider).filter(Boolean)).size;
  const overcharge = pendingDuplicates.reduce((sum, group) => sum + getProviderDuplicateUnauthorizedAmount(group, records), 0);
  return { records, duplicates, pendingDuplicates, approvedDuplicates, rejectedDuplicates, total, authorizedOvercharge, rejectedOvercharge, paidTotal, uniquePlates, providers, overcharge };
}

function buildProviderReportHtml() {
  const { records, duplicates, pendingDuplicates, approvedDuplicates, rejectedDuplicates, total, authorizedOvercharge, rejectedOvercharge, paidTotal, uniquePlates, providers, overcharge } = getProviderReportContext();
  const topProviders = [...new Map(records.map((record) => [record.provider, 0]))].map(([provider]) => {
    const providerRecords = records.filter((record) => record.provider === provider);
    return {
      provider,
      total: getProviderBillableAmount(providerRecords),
      records: providerRecords.length,
      plates: new Set(providerRecords.map(getProviderRecordPlate).filter(Boolean)).size
    };
  }).sort((a, b) => b.total - a.total).slice(0, 8);
  const maxProvider = Math.max(...topProviders.map((item) => item.total), 1);
  const duplicateRows = pendingDuplicates.length ? pendingDuplicates : duplicates;
  const reportDate = formatDateTime(new Date().toISOString());
  const filterText = [
    providerFilters.provider && `Proveedor: ${providerFilters.provider}`,
    providerFilters.month && `Mes: ${formatMonthLabel(providerFilters.month)}`,
    providerFilters.loadId && `Carga especifica`,
    providerFilters.plate && `Placa: ${providerFilters.plate}`
  ].filter(Boolean).join(" | ") || "Sin filtros activos";
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Reporte proveedores Autocor</title>
  <style>
    @page { size: A4; margin: 12mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #191b22; font-family: "Roboto Condensed", "Arial Narrow", Arial, sans-serif; background: #f4f6f8; }
    .sheet { max-width: 1120px; margin: 0 auto; padding: 22px; background: #fff; }
    .hero { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; align-items: stretch; padding: 22px; border-radius: 18px; color: #fff; background: linear-gradient(135deg, #15171d, #3a3d46 58%, #ef3d35); overflow: hidden; }
    .hero h1 { margin: 6px 0 8px; font-size: 34px; line-height: 1; }
    .hero p { margin: 0; color: rgba(255,255,255,.86); }
    .hero .badge { display: inline-flex; width: fit-content; padding: 7px 11px; border-radius: 999px; background: rgba(255,255,255,.14); font-size: 12px; font-weight: 900; text-transform: uppercase; }
    .hero-art { display: grid; place-items: center; min-height: 160px; border: 1px solid rgba(255,255,255,.16); border-radius: 16px; background: radial-gradient(circle at 30% 28%, rgba(255,255,255,.32), transparent 22%), rgba(255,255,255,.08); font-size: 76px; }
    .kpis { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin: 16px 0; }
    .kpi { min-height: 110px; padding: 15px; border: 1px solid #dde0e6; border-radius: 14px; background: linear-gradient(135deg, #fff, #f8f9fb); }
    .kpi span { display: block; color: #626a78; font-size: 12px; font-weight: 900; text-transform: uppercase; }
    .kpi strong { display: block; margin-top: 10px; font-size: 28px; }
    .kpi small { color: #667085; }
    .kpi.danger { border-color: rgba(216,41,34,.28); background: linear-gradient(135deg, #fff5f4, #fff); }
    .kpi.good { border-color: rgba(16,158,111,.26); background: linear-gradient(135deg, #f2fff9, #fff); }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .panel { padding: 16px; border: 1px solid #dde0e6; border-radius: 14px; background: #fff; break-inside: avoid; }
    .panel h2 { margin: 0 0 10px; font-size: 18px; }
    .analysis { border-color: rgba(239,61,53,.24); background: linear-gradient(135deg, #fff8f7, #fff); }
    .bar { display: grid; gap: 6px; margin: 9px 0; }
    .bar label { display: flex; justify-content: space-between; gap: 10px; color: #3b414d; font-size: 12px; font-weight: 900; }
    .track { height: 12px; border-radius: 999px; background: #eceff4; overflow: hidden; }
    .fill { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #ef3d35, #ff8a23); }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
    th { text-align: left; color: #5d6573; background: #f2f4f7; text-transform: uppercase; }
    th, td { padding: 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
    .pill { display: inline-block; padding: 4px 8px; border-radius: 999px; color: #fff; background: #d82922; font-weight: 900; font-size: 10px; }
    .pill.ok { background: #109e6f; }
    .footer { margin-top: 16px; padding-top: 12px; border-top: 1px solid #e5e7eb; color: #697282; font-size: 11px; }
    .print-actions { position: sticky; top: 0; z-index: 2; display: flex; justify-content: flex-end; gap: 8px; padding: 10px; background: rgba(244,246,248,.92); backdrop-filter: blur(8px); }
    .print-actions button { min-height: 38px; padding: 0 14px; border: 0; border-radius: 10px; color: #fff; background: #ef3d35; font-weight: 900; cursor: pointer; }
    @media print { body { background: #fff; } .sheet { max-width: none; padding: 0; } .print-actions { display: none; } .hero { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="print-actions"><button onclick="window.print()"> Guardar como PDF</button></div>
  <main class="sheet">
    <section class="hero">
      <div>
        <span class="badge"> Proveedores y pagos | Mesa de control</span>
        <h1>Reporte ejecutivo de cobros y duplicados</h1>
        <p>${escapeHtml(filterText)}<br>Generado: ${escapeHtml(reportDate)}</p>
      </div>
      <div class="hero-art"></div>
    </section>
    <section class="kpis">
      <article class="kpi good"><span>Gasto pagado</span><strong>$ ${paidTotal.toFixed(2)}</strong><small>Base conciliada mas autorizados</small></article>
      <article class="kpi"><span>Sobrecobro autorizado</span><strong>$ ${authorizedOvercharge.toFixed(2)}</strong><small>Duplicados aprobados</small></article>
      <article class="kpi"><span>Registros</span><strong>${records.length}</strong><small>Filas analizadas</small></article>
      <article class="kpi"><span>Placas unicas</span><strong>${uniquePlates}</strong><small>Solo celda PLACA</small></article>
      <article class="kpi danger"><span>No aprobado</span><strong>$ ${rejectedOvercharge.toFixed(2)}</strong><small>${rejectedDuplicates.length} caso(s)</small></article>
    </section>
    <section class="grid">
      <article class="panel analysis">
        <h2> Analisis directo</h2>
        <p>${pendingDuplicates.length ? `Hay ${pendingDuplicates.length} duplicado(s) pendientes. El posible sobrecobro referencial es $ ${overcharge.toFixed(2)}.` : `No hay duplicados pendientes por autorizar. ${approvedDuplicates.length} duplicado(s) ya fueron aprobados.`}</p>
        <p>Este reporte separa duplicados autorizados de los pendientes para que la revision no se llene de ruido operativo.</p>
      </article>
      <article class="panel">
        <h2> Estado de duplicados</h2>
        <div class="bar"><label><span>Pendientes</span><b>${pendingDuplicates.length}</b></label><div class="track"><span class="fill" style="width:${Math.round((pendingDuplicates.length / Math.max(duplicates.length, 1)) * 100)}%"></span></div></div>
        <div class="bar"><label><span>Aprobados</span><b>${approvedDuplicates.length}</b></label><div class="track"><span class="fill" style="width:${Math.round((approvedDuplicates.length / Math.max(duplicates.length, 1)) * 100)}%"></span></div></div>
        <div class="bar"><label><span>Proveedores</span><b>${providers}</b></label><div class="track"><span class="fill" style="width:${Math.min(100, providers * 16)}%"></span></div></div>
      </article>
    </section>
    <section class="panel">
      <h2> Ranking por proveedor</h2>
      ${topProviders.map((item) => `<div class="bar"><label><span>${escapeHtml(item.provider || "SIN PROVEEDOR")}</span><b>$ ${item.total.toFixed(2)} | ${item.plates} placas</b></label><div class="track"><span class="fill" style="width:${Math.max(4, Math.round((item.total / maxProvider) * 100))}%"></span></div></div>`).join("") || "<p>Sin proveedores para mostrar.</p>"}
    </section>
    <section class="panel">
      <h2> Duplicados pendientes</h2>
      <table>
        <thead><tr><th>Placa</th><th>Registros</th><th>Valor</th><th>Proveedor</th><th>Estado</th></tr></thead>
        <tbody>${duplicateRows.slice(0, 25).map((group) => `<tr><td>${escapeHtml(group.plate)}</td><td>${group.items.length}</td><td>$ ${getProviderDuplicateUnauthorizedAmount(group, records).toFixed(2)}</td><td>${escapeHtml(group.providers.join(", "))}</td><td><span class="pill ${isProviderDuplicateApproved(group) ? "ok" : ""}">${isProviderDuplicateApproved(group) ? "Aprobado" : "Pendiente"}</span></td></tr>`).join("") || `<tr><td colspan="5">Sin duplicados pendientes.</td></tr>`}</tbody>
      </table>
    </section>
    <section class="panel">
      <h2> Muestra de registros</h2>
      <table>
        <thead><tr><th>Proveedor</th><th>Placa</th><th>Fecha</th><th>Valor</th><th>Asesor</th><th>Agencia</th></tr></thead>
        <tbody>${records.slice(0, 40).map((record) => `<tr><td>${escapeHtml(record.provider)}</td><td>${escapeHtml(getProviderRecordPlate(record))}</td><td>${escapeHtml(record.FECHA || "")}</td><td>$ ${getProviderRecordDisplayAmount(record, records).toFixed(2)}</td><td>${escapeHtml(getProviderAdvisor(record))}</td><td>${escapeHtml(getProviderAgency(record))}</td></tr>`).join("") || `<tr><td colspan="6">Sin registros.</td></tr>`}</tbody>
      </table>
    </section>
    <div class="footer">Autocor | Reporte generado localmente desde la plataforma de mesa de control. Para descargar en PDF use el boton superior o Ctrl+P y seleccione Guardar como PDF.</div>
  </main>
</body>
</html>`;
}

function buildProviderReportHtmlV2() {
  const { records, duplicates, pendingDuplicates, approvedDuplicates, rejectedDuplicates, total, authorizedOvercharge, rejectedOvercharge, paidTotal, uniquePlates, providers, overcharge } = getProviderReportContext();
  const topProviders = [...new Set(records.map((record) => record.provider).filter(Boolean))].map((provider) => {
    const providerRecords = records.filter((record) => record.provider === provider);
    return {
      provider,
      total: getProviderBillableAmount(providerRecords),
      records: providerRecords.length,
      plates: new Set(providerRecords.map(getProviderRecordPlate).filter(Boolean)).size
    };
  }).sort((a, b) => b.total - a.total).slice(0, 10);
  const maxProvider = Math.max(...topProviders.map((item) => item.total), 1);
  const duplicateRows = pendingDuplicates.length ? pendingDuplicates : duplicates;
  const reportDate = formatDateTime(new Date().toISOString());
  const filterText = [
    providerFilters.provider && `Proveedor: ${providerFilters.provider}`,
    providerFilters.month && `Mes: ${formatMonthLabel(providerFilters.month)}`,
    providerFilters.loadId && "Carga especifica",
    providerFilters.plate && `Placa: ${providerFilters.plate}`
  ].filter(Boolean).join(" | ") || "Sin filtros activos";
  const statusText = pendingDuplicates.length ? "Riesgo operativo pendiente" : "Operacion controlada";
  const statusClass = pendingDuplicates.length ? "danger" : "ok";
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Reporte ejecutivo proveedores Autocor</title>
  <style>
    @page { size: A4; margin: 10mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #171a21; font-family: "Roboto Condensed", "Arial Narrow", Arial, sans-serif; background: #eef1f5; }
    .print-actions { position: sticky; top: 0; z-index: 10; display: flex; justify-content: flex-end; padding: 10px; background: rgba(238,241,245,.95); }
    .print-actions button { min-height: 38px; padding: 0 16px; border: 0; border-radius: 9px; color: #fff; background: #ef3d35; font-weight: 900; cursor: pointer; }
    .sheet { max-width: 1120px; margin: 0 auto; padding: 20px; background: #fff; }
    .header { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: center; padding: 20px; border-radius: 14px; color: #fff; background: linear-gradient(135deg, #1f222b, #343844); border-bottom: 6px solid #ef3d35; }
    .brand { display: flex; align-items: center; gap: 13px; }
    .logo { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 12px; background: #fff; color: #ef3d35; font-size: 24px; font-weight: 1000; }
    h1 { margin: 0; font-size: 25px; line-height: 1.05; }
    .subtitle { margin: 5px 0 0; color: rgba(255,255,255,.78); font-size: 12px; }
    .meta { display: grid; gap: 6px; min-width: 245px; padding: 12px; border: 1px solid rgba(255,255,255,.16); border-radius: 12px; background: rgba(255,255,255,.08); font-size: 11px; }
    .status { display: inline-flex; width: fit-content; padding: 7px 10px; border-radius: 999px; color: #fff; font-size: 10px; font-weight: 1000; text-transform: uppercase; }
    .status.danger { background: #d82922; }
    .status.ok { background: #109e6f; }
    .executive { display: grid; grid-template-columns: 1.12fr .88fr; gap: 12px; margin-top: 14px; }
    .box { padding: 15px; border: 1px solid #dde2ea; border-radius: 12px; background: #fff; break-inside: avoid; }
    .box.soft { background: linear-gradient(135deg, #fff, #f8f9fb); }
    .box h2 { margin: 0 0 8px; font-size: 16px; }
    .box p { margin: 0; color: #596273; font-size: 12px; line-height: 1.45; }
    .kpis { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 14px 0; }
    .kpi { min-height: 94px; padding: 13px; border: 1px solid #dde2ea; border-radius: 12px; background: #fff; }
    .kpi span { display: block; color: #667085; font-size: 10px; font-weight: 1000; text-transform: uppercase; }
    .kpi strong { display: block; margin: 9px 0 5px; font-size: 24px; line-height: 1; }
    .kpi small { color: #727b8b; font-size: 10px; }
    .kpi.red { border-color: rgba(239,61,53,.28); background: linear-gradient(135deg, #fff7f6, #fff); }
    .kpi.green { border-color: rgba(16,158,111,.25); background: linear-gradient(135deg, #f4fff9, #fff); }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .section-title { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin: 0 0 10px; font-size: 16px; }
    .section-title small { color: #ef3d35; font-size: 10px; text-transform: uppercase; }
    .bar { display: grid; gap: 6px; margin: 9px 0; }
    .bar label { display: flex; justify-content: space-between; gap: 10px; color: #303642; font-size: 11px; font-weight: 1000; }
    .track { height: 10px; border-radius: 999px; background: #edf0f4; overflow: hidden; }
    .fill { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #ef3d35, #bfc3ca); }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10px; }
    th { text-align: left; color: #596273; background: #f1f3f6; text-transform: uppercase; }
    th, td { padding: 7px; border-bottom: 1px solid #e6e9ef; vertical-align: top; }
    tr:nth-child(even) td { background: #fbfcfd; }
    .pill { display: inline-block; padding: 4px 8px; border-radius: 999px; color: #fff; background: #d82922; font-weight: 1000; font-size: 9px; }
    .pill.ok { background: #109e6f; }
    .footer { margin-top: 12px; padding-top: 10px; border-top: 1px solid #e6e9ef; color: #697282; font-size: 10px; }
    @media print { body { background: #fff; } .sheet { max-width: none; padding: 0; } .print-actions { display: none; } .header, .box, .kpi { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="print-actions"><button onclick="window.print()">Guardar como PDF</button></div>
  <main class="sheet">
    <section class="header">
      <div class="brand">
        <div class="logo">A</div>
        <div>
          <h1>Reporte ejecutivo de proveedores y pagos</h1>
          <p class="subtitle">Mesa de control | Validacion de cobros, placas repetidas y autorizaciones</p>
        </div>
      </div>
      <div class="meta">
        <span><b>Fecha:</b> ${escapeHtml(reportDate)}</span>
        <span><b>Filtro:</b> ${escapeHtml(filterText)}</span>
        <span><b>Base:</b> ${records.length} registros</span>
      </div>
    </section>
    <section class="executive">
      <article class="box soft">
        <span class="status ${statusClass}">${escapeHtml(statusText)}</span>
        <h2>Lectura ejecutiva</h2>
        <p>${pendingDuplicates.length ? `Existen ${pendingDuplicates.length} duplicado(s) sin autorizacion. El monto referencial a revisar es $ ${overcharge.toFixed(2)}. Priorice placas con mayor cantidad de registros y valor acumulado.` : `No existen duplicados pendientes por autorizar. Los ${approvedDuplicates.length} duplicado(s) aprobados quedan separados para trazabilidad.`}</p>
      </article>
      <article class="box soft">
        <h2>Criterio del reporte</h2>
        <p>Las placas se cuentan solo desde la celda PLACA. Los duplicados aprobados no alimentan el posible sobrecobro y permanecen documentados como autorizados.</p>
      </article>
    </section>
    <section class="kpis">
      <article class="kpi green"><span>Gasto pagado</span><strong>$ ${paidTotal.toFixed(2)}</strong><small>Base conciliada mas autorizados</small></article>
      <article class="kpi"><span>Sobrecobro autorizado</span><strong>$ ${authorizedOvercharge.toFixed(2)}</strong><small>Duplicados aprobados</small></article>
      <article class="kpi"><span>Registros</span><strong>${records.length}</strong><small>Filas analizadas</small></article>
      <article class="kpi"><span>Placas unicas</span><strong>${uniquePlates}</strong><small>Solo celda PLACA</small></article>
      <article class="kpi red"><span>No aprobado</span><strong>$ ${rejectedOvercharge.toFixed(2)}</strong><small>${rejectedDuplicates.length} caso(s)</small></article>
    </section>
    <section class="grid">
      <article class="box">
        <h2 class="section-title">Estado de duplicados <small>control</small></h2>
        <div class="bar"><label><span>Pendientes</span><b>${pendingDuplicates.length}</b></label><div class="track"><span class="fill" style="width:${Math.round((pendingDuplicates.length / Math.max(duplicates.length, 1)) * 100)}%"></span></div></div>
        <div class="bar"><label><span>Aprobados</span><b>${approvedDuplicates.length}</b></label><div class="track"><span class="fill" style="width:${Math.round((approvedDuplicates.length / Math.max(duplicates.length, 1)) * 100)}%"></span></div></div>
        <div class="bar"><label><span>Proveedores</span><b>${providers}</b></label><div class="track"><span class="fill" style="width:${Math.min(100, providers * 16)}%"></span></div></div>
      </article>
      <article class="box">
        <h2 class="section-title">Impacto financiero <small>referencial</small></h2>
        <div class="bar"><label><span>Posible sobrecobro</span><b>$ ${overcharge.toFixed(2)}</b></label><div class="track"><span class="fill" style="width:${Math.min(100, Math.round((overcharge / Math.max(total, 1)) * 100))}%"></span></div></div>
        <div class="bar"><label><span>Valores no aprobados</span><b>$ ${rejectedOvercharge.toFixed(2)}</b></label><div class="track"><span class="fill" style="width:${Math.min(100, Math.round((rejectedOvercharge / Math.max(total + rejectedOvercharge, 1)) * 100))}%"></span></div></div>
      </article>
    </section>
    <section class="box">
      <h2 class="section-title">Ranking por proveedor <small>top ${topProviders.length}</small></h2>
      ${topProviders.map((item) => `<div class="bar"><label><span>${escapeHtml(item.provider || "SIN PROVEEDOR")}</span><b>$ ${item.total.toFixed(2)} | ${item.plates} placas</b></label><div class="track"><span class="fill" style="width:${Math.max(4, Math.round((item.total / maxProvider) * 100))}%"></span></div></div>`).join("") || "<p>Sin proveedores para mostrar.</p>"}
    </section>
    <section class="box">
      <h2 class="section-title">Duplicados para seguimiento <small>${pendingDuplicates.length ? "pendientes" : "historico"}</small></h2>
      <table>
        <thead><tr><th>Placa</th><th>Registros</th><th>Valor</th><th>Proveedor</th><th>Estado</th></tr></thead>
        <tbody>${duplicateRows.slice(0, 30).map((group) => `<tr><td>${escapeHtml(group.plate)}</td><td>${group.items.length}</td><td>$ ${getProviderDuplicateUnauthorizedAmount(group, records).toFixed(2)}</td><td>${escapeHtml(group.providers.join(", "))}</td><td><span class="pill ${isProviderDuplicateApproved(group) ? "ok" : ""}">${isProviderDuplicateApproved(group) ? "Aprobado" : "Pendiente"}</span></td></tr>`).join("") || `<tr><td colspan="5">Sin duplicados pendientes.</td></tr>`}</tbody>
      </table>
    </section>
    <section class="box">
      <h2 class="section-title">Muestra de registros <small>primeros 45</small></h2>
      <table>
        <thead><tr><th>Proveedor</th><th>Placa</th><th>Fecha</th><th>Valor</th><th>Asesor</th><th>Agencia</th></tr></thead>
        <tbody>${records.slice(0, 45).map((record) => `<tr><td>${escapeHtml(record.provider)}</td><td>${escapeHtml(getProviderRecordPlate(record))}</td><td>${escapeHtml(record.FECHA || "")}</td><td>$ ${getProviderRecordDisplayAmount(record, records).toFixed(2)}</td><td>${escapeHtml(getProviderAdvisor(record))}</td><td>${escapeHtml(getProviderAgency(record))}</td></tr>`).join("") || `<tr><td colspan="6">Sin registros.</td></tr>`}</tbody>
      </table>
    </section>
    <div class="footer">Autocor | Reporte generado localmente desde la plataforma de mesa de control. Use Guardar como PDF en la ventana de impresion del navegador.</div>
  </main>
</body>
</html>`;
}

function exportProviderPdfReport() {
  const { records } = getProviderReportContext();
  if (!records.length) {
    showToast("No hay datos de proveedores para generar reporte.");
    return;
  }
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showToast("El navegador bloqueo la ventana del reporte. Permita ventanas emergentes para descargar PDF.");
    return;
  }
  reportWindow.document.open();
  reportWindow.document.write(buildProviderReportHtmlV2());
  reportWindow.document.close();
  setTimeout(() => reportWindow.print(), 500);
}

function printPurchaseDetailReport() {
  const title = currentPurchaseDetailReport.title || document.querySelector("#purchaseDetailTitle")?.textContent || "Reporte operativo";
  const html = currentPurchaseDetailReport.html || document.querySelector("#purchaseDetailContent")?.innerHTML || "";
  if (!html.trim()) {
    showToast("Abra primero un detalle para imprimir.");
    return;
  }
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showToast("El navegador bloqueo la ventana del reporte. Permita ventanas emergentes para imprimir.");
    return;
  }
  const filterText = [
    purchaseFilters.month && `Mes: ${formatMonthLabel(purchaseFilters.month)}`,
    purchaseFilters.loadId && "Carga especifica",
    purchaseFilters.date && `Dia: ${formatPurchaseDateLabel(purchaseFilters.date)}`,
    purchaseFilters.agency && `Agencia: ${purchaseFilters.agency}`,
    formatMultiFilterLabel("Asesor", purchaseFilters.advisor),
    formatMultiFilterLabel("Coordinador", purchaseFilters.coordinator),
    purchaseFilters.status && `Estatus: ${purchaseFilters.status}`,
    purchaseFilters.plate && `Placa: ${purchaseFilters.plate}`
  ].filter(Boolean).join(" | ") || "Sin filtros activos";
  reportWindow.document.open();
  reportWindow.document.write(`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)} | Autocor</title>
  <style>
    @page { size: A4 landscape; margin: 10mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #171a21; font-family: "Roboto Condensed", "Arial Narrow", Arial, sans-serif; background: #eef1f5; }
    .print-actions { position: sticky; top: 0; z-index: 20; display: flex; justify-content: flex-end; padding: 10px; background: rgba(238,241,245,.95); }
    .print-actions button { min-height: 38px; padding: 0 16px; border: 0; border-radius: 9px; color: #fff; background: #ef3d35; font-weight: 900; cursor: pointer; }
    .sheet { max-width: 1280px; margin: 0 auto; padding: 18px; background: #fff; }
    .header { display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: center; padding: 18px; border-radius: 14px; color: #fff; background: linear-gradient(135deg, #20232c, #3a3e49); border-bottom: 6px solid #ef3d35; }
    .brand { display: flex; align-items: center; gap: 12px; }
    .logo { display: grid; place-items: center; width: 50px; height: 50px; border-radius: 12px; background: #fff; color: #ef3d35; font-size: 24px; font-weight: 1000; }
    h1 { margin: 0; font-size: 24px; line-height: 1.05; }
    .subtitle { margin: 5px 0 0; color: rgba(255,255,255,.78); font-size: 11px; }
    .meta { display: grid; gap: 5px; min-width: 250px; padding: 10px; border: 1px solid rgba(255,255,255,.16); border-radius: 12px; background: rgba(255,255,255,.08); font-size: 10px; }
    .content { margin-top: 14px; }
    .detail-card-grid, .summary-chip-grid, .movement-summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .status-comparison-panel { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 0 0 14px; }
    .status-comparison-panel article { min-height: 92px; padding: 12px; border: 1px solid #dde2ea; border-radius: 10px; background: #fff; }
    .status-comparison-panel span { display: block; color: #596273; font-size: 9px; font-weight: 1000; text-transform: uppercase; }
    .status-comparison-panel strong { display: block; margin-top: 5px; font-size: 24px; line-height: 1; }
    .status-comparison-panel small { display: block; margin-top: 5px; color: #697282; font-size: 9px; }
    details, article, .pending-plate-card, .duplicate-insight-card { break-inside: avoid; border: 1px solid #dde2ea; border-radius: 10px; background: #fff; }
    summary { padding: 10px 12px; font-weight: 900; cursor: default; list-style: none; }
    details > div { padding: 0 12px 12px; }
    p { margin: 6px 0; color: #596273; font-size: 11px; line-height: 1.35; }
    strong { color: #171a21; }
    small { color: #667085; }
    b, .status-text-approved, .status-text-rejected, .status-text-pending { display: inline-block; margin: 2px 4px 2px 0; padding: 4px 7px; border-radius: 999px; font-size: 9px; font-weight: 1000; }
    .status-text-approved { color: #087956; background: #eafaf2; }
    .status-text-rejected { color: #c92520; background: #fff0ef; }
    .status-text-pending { color: #b36300; background: #fff6e8; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10px; }
    th { text-align: left; color: #596273; background: #f1f3f6; text-transform: uppercase; }
    th, td { padding: 7px; border-bottom: 1px solid #e6e9ef; vertical-align: top; }
    tr:nth-child(even) td { background: #fbfcfd; }
    input[type="checkbox"], button { display: none !important; }
    .footer { margin-top: 12px; padding-top: 10px; border-top: 1px solid #e6e9ef; color: #697282; font-size: 10px; }
    @media print { body { background: #fff; } .sheet { max-width: none; padding: 0; } .print-actions { display: none; } .header, details, article { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="print-actions"><button onclick="window.print()">Imprimir / Guardar PDF</button></div>
  <main class="sheet">
    <section class="header">
      <div class="brand"><div class="logo">A</div><div><h1>${escapeHtml(title)}</h1><p class="subtitle">Reporte operativo de compras | Mesa de control Autocor</p></div></div>
      <div class="meta"><span><b>Fecha:</b> ${escapeHtml(formatDateTime(new Date().toISOString()))}</span><span><b>Filtro:</b> ${escapeHtml(filterText)}</span></div>
    </section>
    <section class="content">${html}</section>
    <div class="footer">Autocor | Reporte generado desde el detalle operativo de compras.</div>
  </main>
</body>
</html>`);
  reportWindow.document.close();
  setTimeout(() => reportWindow.print(), 500);
}

function openProviderDetail(kind = "total") {
  if (!providerDetailModal || !providerDetailContent || !providerDetailTitle) return;
  const labels = {
    paid: "Detalle del gasto pagado",
    total: "Detalle del gasto conciliado",
    authorizedOvercharge: "Detalle del sobrecobro autorizado",
    rejectedOvercharge: "Detalle de valores no aprobados",
    providers: "Detalle por proveedor",
    unique: "Placas unicas de la carga",
    duplicates: "Placas repetidas",
    overcharge: "Posible sobrecobro"
  };
  const rows = getProviderDetailRows(kind);
  const total = kind === "total"
    ? getProviderBillableAmount(getFilteredProviderRecords())
    : kind === "paid"
      ? getProviderBillableAmount(rows)
      : rows.reduce((sum, record) => sum + getProviderRecordDisplayAmount(record, rows), 0);
  const plates = new Set(rows.map(getProviderRecordPlate).filter(Boolean)).size;
  providerDetailTitle.textContent = labels[kind] || "Detalle de proveedores";
  providerDetailContent.innerHTML = `
    <div class="provider-detail-summary">
      <article><strong>${rows.length}</strong><span>registros</span></article>
      <article><strong>${plates}</strong><span>placas unicas</span></article>
      <article><strong>$ ${total.toFixed(2)}</strong><span>valor revisado</span></article>
    </div>
    ${renderProviderDetailTable(rows)}
  `;
  providerDetailModal.hidden = false;
}

function closeProviderDetail() {
  if (providerDetailModal) providerDetailModal.hidden = true;
}

function deleteSelectedProviderLoad() {
  const loadId = providerLoadFilter?.value || providerFilters.loadId || "";
  if (!loadId) {
    showToast("Seleccione una carga especifica para eliminar.");
    return;
  }
  const load = (state.dataProcessing?.providerLoads || []).find((item) => item.id === loadId);
  if (!load) {
    showToast("No se encontro la carga seleccionada.");
    return;
  }
  const relatedRecords = (state.dataProcessing?.proveedores || []).filter((record) => record.loadId === loadId).length;
  const label = `${load.provider || "Proveedor"} - ${formatMonthLabel(load.month)} - ${relatedRecords} registro(s)`;
  const confirmed = window.confirm(`Desea eliminar esta carga?\n${label}\n\nSe borraran los registros de esta carga, pero no se afectaran otras cargas.`);
  if (!confirmed) return;
  createPcBackup("antes-de-eliminar-carga-proveedor");
  state.dataProcessing.proveedores = (state.dataProcessing.proveedores || []).filter((record) => record.loadId !== loadId);
  state.dataProcessing.providerLoads = (state.dataProcessing.providerLoads || []).filter((item) => item.id !== loadId);
  allowIntentionalSmallerModulePublish("proveedores");
  providerFilters = { provider: "", month: "", plate: "", loadId: "" };
  pendingProviderRecords = [];
  renderProviderPastePreview([]);
  saveState();
  renderProviderProcessing();
  guardarModulosSupabase();
  showToast("Carga eliminada.");
}

function renderProviderTable(records) {
  if (!providerTable) return;
  if (!records.length) {
    providerTable.innerHTML = `<div class="empty compact-empty">Sin registros de proveedores para mostrar.</div>`;
    return;
  }
  const visible = records.slice(-80).reverse();
  const getFirst = (record, keys) => keys.map((key) => record[key]).find((value) => normalizeLooseText(value)) || "";
  const commonAmount = getProviderCommonAmount(records);
  const displayColumns = [
    ["PERFIL", (record) => record.profileName],
    ["PROVEEDOR", (record) => record.provider],
    ["PLACA", (record) => getProviderRecordPlate(record)],
    ["FECHA", (record) => getFirst(record, ["FECHA", "FECHA DE SOLICITUD"])],
    ["VALOR", (record) => `$ ${(getProviderRecordAmount(record) || commonAmount).toFixed(2)}`],
    ["ASESOR", (record) => getProviderAdvisor(record)],
    ["AGENCIA", (record) => getProviderAgency(record)],
    ["OBSERVACION", (record) => getProviderObservation(record)]
  ];
  providerTable.innerHTML = `
    <div class="processing-table-scroll provider-compact-table">
      <table>
        <thead><tr>${displayColumns.map(([label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead>
        <tbody>
          ${visible.map((record) => `<tr>${displayColumns.map(([, reader]) => {
            const value = reader(record) || "";
            return `<td title="${escapeHtml(value)}">${escapeHtml(value)}</td>`;
          }).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderFileLibrary() {
  if (!fileLibraryList) return;
  const files = state.dataProcessing?.files || [];
  const category = fileCategoryFilter?.value || "";
  const folder = fileFolderFilter?.value || "";
  const search = normalizeLooseText(fileSearchInput?.value || "");
  const categories = [...new Set(files.map((file) => file.category).filter(Boolean))].sort();
  const folders = getFileFolders();

  renderFileFolderControls(folders, files);

  if (fileCategoryFilter) {
    const current = fileCategoryFilter.value;
    fileCategoryFilter.innerHTML = `<option value="">TODAS LAS CATEGORIAS</option>${categories.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}`;
    fileCategoryFilter.value = categories.includes(current) ? current : "";
  }

  const filtered = files
    .filter((file) => !folder || file.folderId === folder)
    .filter((file) => !category || file.category === category)
    .filter((file) => !search || [file.name, file.category, getFolderName(file.folderId), getFolderPath(file.folderId), file.notes, file.uploadedBy].some((value) => normalizeLooseText(value).includes(search)))
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

  if (fileLibraryCount) {
    const totalSize = filtered.reduce((sum, file) => sum + Number(file.size || 0), 0);
    const resultText = filtered.length === files.length
      ? `${files.length} ${files.length === 1 ? "archivo" : "archivos"}`
      : `${filtered.length} de ${files.length} archivos`;
    fileLibraryCount.textContent = `${resultText} - ${formatFileSize(totalSize)}`;
  }

  if (!filtered.length) {
    fileLibraryList.innerHTML = `<div class="empty compact-empty"> No hay archivos guardados con esos filtros.</div>`;
    return;
  }

  fileLibraryList.innerHTML = filtered.map((file) => `
    <article class="file-library-card">
      ${renderFilePreview(file)}
      <div class="file-library-info">
        <strong>${escapeHtml(file.name)}</strong>
        <span>${escapeHtml(getFolderPath(file.folderId))} - ${escapeHtml(file.category)} - ${escapeHtml(formatFileSize(file.size))} - ${escapeHtml(formatDateTime(file.uploadedAt))}</span>
        ${file.notes ? `<p>${escapeHtml(file.notes)}</p>` : ""}
      </div>
      <div class="file-library-actions">
        <select data-file-move="${escapeHtml(file.id)}" aria-label="Mover archivo">
          ${folders.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === file.folderId ? "selected" : ""}>${escapeHtml(getFolderPath(item.id))}</option>`).join("")}
        </select>
        <button class="btn secondary" type="button" data-file-preview="${escapeHtml(file.id)}">Vista previa</button>
        <button class="btn secondary" type="button" data-file-download="${escapeHtml(file.id)}">Descargar</button>
        <button class="btn danger" type="button" data-file-delete="${escapeHtml(file.id)}">Borrar</button>
      </div>
    </article>
  `).join("");

  fileLibraryList.querySelectorAll("[data-file-download]").forEach((button) => {
    button.addEventListener("click", () => downloadStoredFile(button.dataset.fileDownload));
  });
  fileLibraryList.querySelectorAll("[data-file-preview]").forEach((button) => {
    button.addEventListener("click", () => openStoredFilePreview(button.dataset.filePreview));
  });
  fileLibraryList.querySelectorAll("[data-file-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteStoredFile(button.dataset.fileDelete));
  });
  fileLibraryList.querySelectorAll("[data-file-move]").forEach((select) => {
    select.addEventListener("change", () => moveStoredFile(select.dataset.fileMove, select.value));
  });
}

function openFileVaultPanel(panelName) {
  fileVaultPanels.forEach((panel) => {
    panel.hidden = panel.dataset.filePanel !== panelName;
  });
  filePanelButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filePanelOpen === panelName);
  });
}

function updateFilePickerLabel() {
  if (!fileLibraryInput || !fileLibraryPickerText) return;
  const files = Array.from(fileLibraryInput.files || []);
  const picker = fileLibraryPickerText.closest(".file-vault-picker");
  if (!files.length) {
    fileLibraryPickerText.textContent = "Seleccionar archivos";
    picker?.classList.remove("has-files");
    return;
  }
  picker?.classList.add("has-files");
  fileLibraryPickerText.textContent = files.length === 1
    ? `Archivo seleccionado: ${files[0].name}`
    : `${files.length} archivos seleccionados`;
}

function getFileFolders() {
  state.dataProcessing.folders = normalizeFileFolders(state.dataProcessing?.folders || []);
  return state.dataProcessing.folders;
}

function getFolderName(id) {
  return getFileFolders().find((folder) => folder.id === id)?.name || "GENERAL";
}

function getFolderPath(id, sourceMap = null) {
  const folders = sourceMap || new Map((state.dataProcessing?.folders || []).map((folder) => [folder.id, folder]));
  const folder = folders.get(id);
  if (!folder) return "GENERAL";
  const chain = [];
  let current = folder;
  const visited = new Set();
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    chain.unshift(current.name);
    current = current.parentId ? folders.get(current.parentId) : null;
  }
  return chain.join(" / ");
}

function renderFileFolderControls(folders, files) {
  const folderSearch = normalizeLooseText(fileFolderSearchInput?.value || "");
  const searchedFolders = folderSearch
    ? folders.filter((folder) => normalizeLooseText(getFolderPath(folder.id)).includes(folderSearch))
    : folders;
  const buildFolderOptions = (currentId = "", includeBlank = false) => {
    const visible = [...searchedFolders];
    const currentFolder = currentId ? folders.find((folder) => folder.id === currentId) : null;
    if (currentFolder && !visible.some((folder) => folder.id === currentFolder.id)) visible.push(currentFolder);
    const sorted = visible.sort((a, b) => getFolderPath(a.id).localeCompare(getFolderPath(b.id)));
    return `${includeBlank ? `<option value="">TODAS LAS CARPETAS</option>` : ""}${sorted.map((folder) => `<option value="${escapeHtml(folder.id)}">${escapeHtml(getFolderPath(folder.id))}</option>`).join("")}`;
  };
  if (fileUploadFolderSelect) {
    const current = fileUploadFolderSelect.value || "folder-general";
    fileUploadFolderSelect.innerHTML = buildFolderOptions(current);
    fileUploadFolderSelect.value = folders.some((folder) => folder.id === current) ? current : "folder-general";
  }
  if (fileFolderParentSelect) {
    const current = fileFolderParentSelect.value || "folder-general";
    fileFolderParentSelect.innerHTML = buildFolderOptions(current);
    fileFolderParentSelect.value = folders.some((folder) => folder.id === current) ? current : "folder-general";
  }
  if (fileFolderFilter) {
    const current = fileFolderFilter.value;
    fileFolderFilter.innerHTML = buildFolderOptions(current, true);
    fileFolderFilter.value = folders.some((folder) => folder.id === current) ? current : "";
  }
  if (fileFolderList) {
    const folderCount = folders.length;
    const visibleCount = searchedFolders.length;
    const selectedFolderId = fileFolderFilter?.value || "";
    const activeFolderText = selectedFolderId ? getFolderPath(selectedFolderId) : "Todas las carpetas";
    const activeFiles = selectedFolderId
      ? files.filter((file) => file.folderId === selectedFolderId).length
      : files.length;
    fileFolderList.innerHTML = `
      <div class="folder-compact-summary">
        <div>
          <span>Carpetas encontradas</span>
          <strong>${visibleCount} / ${folderCount}</strong>
        </div>
        <div>
          <span>Filtro activo</span>
          <strong>${escapeHtml(activeFolderText)}</strong>
        </div>
        <div>
          <span>Archivos visibles</span>
          <strong>${activeFiles}</strong>
        </div>
      </div>
    `;
  }
}

function renderFilePreview(file) {
  const kind = getFileKind(file);
  if (kind === "image" && file.dataUrl) {
    return `<div class="file-library-preview is-image"><img src="${escapeHtml(file.dataUrl)}" alt=""></div>`;
  }
  const labels = {
    pdf: ["PDF", "Documento"],
    excel: ["XLS", "Excel"],
    word: ["DOC", "Word"],
    zip: ["ZIP", "Comprimido"],
    file: ["FILE", "Archivo"]
  };
  const [code, label] = labels[kind] || labels.file;
  return `
    <div class="file-library-preview is-${escapeHtml(kind)}">
      <span>${escapeHtml(code)}</span>
      <small>${escapeHtml(label)}</small>
    </div>
  `;
}

function getFileKind(file) {
  const name = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();
  if (type.includes("image") || /\.(png|jpg|jpeg|webp|gif)$/i.test(name)) return "image";
  if (type.includes("pdf") || /\.pdf$/i.test(name)) return "pdf";
  if (/\.(xls|xlsx|csv)$/i.test(name)) return "excel";
  if (/\.(doc|docx)$/i.test(name)) return "word";
  if (/\.(zip|rar|7z)$/i.test(name)) return "zip";
  return "file";
}

function dataUrlToBlob(dataUrl = "") {
  const match = String(dataUrl).match(/^data:([^;,]+)?(;base64)?,(.*)$/);
  if (!match) return null;
  const mime = match[1] || "application/octet-stream";
  const isBase64 = Boolean(match[2]);
  const payload = match[3] || "";
  try {
    const binary = isBase64 ? atob(payload) : decodeURIComponent(payload);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
  } catch {
    return null;
  }
}

function openOrDownloadDataUrl(dataUrl = "", filename = "archivo.pdf") {
  if (!dataUrl) {
    showToast("No se encontro el archivo para descargar.");
    return;
  }
  const blob = dataUrlToBlob(dataUrl);
  const url = blob ? URL.createObjectURL(blob) : dataUrl;
  const isTouchDevice = window.matchMedia?.("(pointer: coarse)")?.matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isTouchDevice) {
    const opened = window.open(url, "_blank", "noopener");
    if (!opened) showToast("Permite ventanas emergentes para abrir el PDF.");
    if (blob) window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    return;
  }
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "archivo.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  if (blob) window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function downloadCuvPdf(taskId = "") {
  const task = (state.tasks || []).find((item) => item.id === taskId);
  if (!task?.cuvPdfDataUrl) {
    showToast("Este CUV aun no tiene PDF disponible.");
    return;
  }
  openOrDownloadDataUrl(task.cuvPdfDataUrl, task.cuvPdfName || `${task.placa || "CUV"}.pdf`);
}

function formatFileSize(size) {
  const bytes = Number(size || 0);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function readFileForLibrary(file, category, notes, folderId = "folder-general") {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const id = crypto.randomUUID();
      resolve({
        payload: reader.result,
        metadata: normalizeStoredFile({
        id,
        storageKey: id,
        name: file.name,
        category,
        notes,
        type: file.type || "application/octet-stream",
        size: file.size,
        folderId: folderId || "folder-general",
        dataUrl: sharedPcStorageAvailable ? reader.result : "",
        uploadedAt: new Date().toISOString(),
        uploadedBy: session.name || "USUARIO LOCAL"
        })
      });
    });
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

async function saveSelectedFiles() {
  if (!fileLibraryInput?.files?.length) {
    showToast("Seleccione uno o mas archivos.");
    return;
  }
  const data = Object.fromEntries(new FormData(fileLibraryForm).entries());
  const selected = Array.from(fileLibraryInput.files);
  const tooLarge = selected.find((file) => file.size > MAX_FILE_LIBRARY_SIZE);
  if (tooLarge) {
    showToast(`"${tooLarge.name}" pesa ${formatFileSize(tooLarge.size)}. El limite del repositorio local es ${formatFileSize(MAX_FILE_LIBRARY_SIZE)}.`);
    return;
  }
  const previousFiles = state.dataProcessing.files || [];
  try {
    const stored = await Promise.all(selected.map((file) => readFileForLibrary(file, data.category, data.notes, data.folderId)));
    await Promise.all(stored.map((item) => putFilePayload(item.metadata.storageKey, item.payload)));
    state.dataProcessing.files = [...previousFiles, ...stored.map((item) => item.metadata)];
    saveState();
    fileLibraryForm.reset();
    updateFilePickerLabel();
    renderFileLibrary();
    showToast(`${stored.length} ${stored.length === 1 ? "archivo guardado" : "archivos guardados"}.`);
  } catch {
    state.dataProcessing.files = previousFiles;
    showToast("No se pudieron guardar los archivos. Revise el peso o formato.");
  }
}

async function getStoredFileDataUrl(file) {
  if (file?.dataUrl) return file.dataUrl;
  if (!file?.storageKey) return "";
  try {
    return await getFilePayload(file.storageKey);
  } catch {
    return "";
  }
}

async function downloadStoredFile(id) {
  const file = (state.dataProcessing?.files || []).find((item) => item.id === id);
  const dataUrl = await getStoredFileDataUrl(file);
  if (!dataUrl) {
    showToast("No se encontro el archivo guardado.");
    return;
  }
  openOrDownloadDataUrl(dataUrl, file.name || "archivo");
}

async function openStoredFilePreview(id) {
  const file = (state.dataProcessing?.files || []).find((item) => item.id === id);
  const dataUrl = await getStoredFileDataUrl(file);
  if (!dataUrl || !filePreviewModal || !filePreviewContent) {
    showToast("No se encontro vista previa para este archivo.");
    return;
  }
  const fileWithPayload = { ...file, dataUrl };
  const kind = getFileKind(file);
  if (filePreviewTitle) filePreviewTitle.textContent = file.name || "Archivo";
  if (kind === "image") {
    filePreviewContent.innerHTML = `<img class="file-preview-image" src="${escapeHtml(dataUrl)}" alt="">`;
  } else if (kind === "pdf") {
    filePreviewContent.innerHTML = `<iframe class="file-preview-frame" src="${escapeHtml(dataUrl)}" title="${escapeHtml(file.name)}"></iframe>`;
  } else if (isCsvFile(file)) {
    filePreviewContent.innerHTML = renderCsvFilePreview(fileWithPayload);
    filePreviewContent.querySelector("[data-print-preview]")?.addEventListener("click", printFilePreview);
  } else {
    filePreviewContent.innerHTML = `
      <div class="file-preview-empty">
        ${renderFilePreview(file)}
        <h3>${escapeHtml(file.name)}</h3>
        <p>${kind === "excel" ? "Para Excel .xlsx, el navegador local no puede convertir a PDF directamente. Guardelo como CSV para vista previa en tabla o como PDF desde Excel y subalo aqui." : "Este tipo de archivo no siempre se puede previsualizar directamente en el navegador local."}</p>
        <div class="file-preview-meta">
          <span><b>Tipo</b>${escapeHtml(getFileKind(file).toUpperCase())}</span>
          <span><b>Peso</b>${escapeHtml(formatFileSize(file.size))}</span>
          <span><b>Carpeta</b>${escapeHtml(getFolderPath(file.folderId))}</span>
        </div>
        <button class="btn primary" type="button" data-preview-download="${escapeHtml(file.id)}">Descargar archivo</button>
      </div>
    `;
    filePreviewContent.querySelector("[data-preview-download]")?.addEventListener("click", () => downloadStoredFile(file.id));
  }
  filePreviewModal.hidden = false;
}

function isCsvFile(file) {
  const name = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();
  return /\.csv$/i.test(name) || type.includes("csv") || type.includes("text/plain");
}

function renderCsvFilePreview(file) {
  const text = decodeDataUrlText(file.dataUrl);
  const rows = parseDelimitedText(text).slice(0, 80);
  if (!rows.length) {
    return `
      <div class="file-preview-empty">
        ${renderFilePreview(file)}
        <h3>${escapeHtml(file.name)}</h3>
        <p>No se pudo leer una tabla en este archivo.</p>
        <button class="btn primary" type="button" data-preview-download="${escapeHtml(file.id)}">Descargar archivo</button>
      </div>
    `;
  }
  const header = rows[0];
  const body = rows.slice(1);
  return `
    <div class="csv-preview-shell">
      <div class="csv-preview-toolbar">
        <div>
          <strong>${escapeHtml(file.name)}</strong>
          <span>${rows.length} filas visibles. Use imprimir para guardar como PDF.</span>
        </div>
        <button class="btn primary" type="button" data-print-preview>Imprimir / guardar PDF</button>
      </div>
      <div class="csv-preview-table">
        <table>
          <thead><tr>${header.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr></thead>
          <tbody>${body.map((row) => `<tr>${header.map((_, index) => `<td>${escapeHtml(row[index] || "")}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function decodeDataUrlText(dataUrl = "") {
  const [, meta = "", payload = ""] = String(dataUrl).match(/^data:([^,]*),(.*)$/) || [];
  try {
    if (meta.includes(";base64")) {
      return decodeURIComponent(escape(atob(payload)));
    }
    return decodeURIComponent(payload);
  } catch {
    try {
      return atob(payload);
    } catch {
      return "";
    }
  }
}

function printFilePreview() {
  window.print();
}

function closeStoredFilePreview() {
  if (filePreviewModal) filePreviewModal.hidden = true;
  if (filePreviewContent) filePreviewContent.innerHTML = "";
  if (filePreviewTitle) filePreviewTitle.textContent = "Archivo";
}

function addFileFolder(name, parentId = "folder-general") {
  const cleanName = normalizeLooseText(name);
  if (!cleanName) return;
  const folders = getFileFolders();
  const cleanParentId = folders.some((folder) => folder.id === parentId) ? parentId : "folder-general";
  if (folders.some((folder) => folder.parentId === cleanParentId && folder.name === cleanName)) {
    showToast("Esa subcarpeta ya existe dentro de la carpeta seleccionada.");
    return;
  }
  state.dataProcessing.folders = [...folders, {
    id: crypto.randomUUID(),
    name: cleanName,
    parentId: cleanParentId,
    createdAt: new Date().toISOString(),
    isDefault: false
  }];
  saveState();
  renderFileLibrary();
  showToast("Carpeta creada.");
}

function getAllowedFolderParents(folderId) {
  const blockedIds = new Set([folderId, ...getFolderDescendantIds(folderId)]);
  return getFileFolders().filter((folder) => !blockedIds.has(folder.id));
}

function deleteFileFolder(id) {
  const folders = getFileFolders();
  const folder = folders.find((item) => item.id === id);
  if (!folder) return;
  if (folder.isDefault) {
    showToast("Las carpetas base no se pueden eliminar.");
    return;
  }
  const descendantIds = getFolderDescendantIds(id);
  const affectedIds = new Set([id, ...descendantIds]);
  const affectedFiles = (state.dataProcessing.files || []).filter((file) => affectedIds.has(file.folderId)).length;
  const confirmed = window.confirm(`Desea eliminar la carpeta "${getFolderPath(folder.id)}"? ${affectedFiles} archivo(s) pasaran a General y tambien se eliminaran sus subcarpetas.`);
  if (!confirmed) return;
  state.dataProcessing.files = (state.dataProcessing.files || []).map((file) => (
    affectedIds.has(file.folderId) ? { ...file, folderId: "folder-general" } : file
  ));
  state.dataProcessing.folders = folders.filter((item) => !affectedIds.has(item.id));
  if (affectedIds.has(fileFolderFilter?.value)) fileFolderFilter.value = "";
  if (affectedIds.has(fileUploadFolderSelect?.value)) fileUploadFolderSelect.value = "folder-general";
  if (affectedIds.has(fileFolderParentSelect?.value)) fileFolderParentSelect.value = "folder-general";
  saveState();
  renderFileLibrary();
  showToast("Carpeta eliminada. Archivos movidos a General.");
}

function moveFileFolder(id, parentId) {
  const folders = getFileFolders();
  const folder = folders.find((item) => item.id === id);
  if (!folder) return;
  if (folder.isDefault) {
    showToast("Las carpetas base no se pueden mover.");
    renderFileLibrary();
    return;
  }
  const nextParentId = folders.some((item) => item.id === parentId) ? parentId : "folder-general";
  const blockedIds = new Set([id, ...getFolderDescendantIds(id)]);
  if (blockedIds.has(nextParentId)) {
    showToast("No puede mover una carpeta dentro de si misma o de una subcarpeta.");
    renderFileLibrary();
    return;
  }
  if (folder.parentId === nextParentId) return;
  state.dataProcessing.folders = folders.map((item) => (
    item.id === id ? { ...item, parentId: nextParentId } : item
  ));
  saveState();
  renderFileLibrary();
  showToast(`Carpeta movida a ${getFolderPath(nextParentId)}.`);
}

function getFolderDescendantIds(parentId) {
  const folders = getFileFolders();
  const children = folders.filter((folder) => folder.parentId === parentId);
  return children.flatMap((child) => [child.id, ...getFolderDescendantIds(child.id)]);
}

function moveStoredFile(id, folderId) {
  const file = (state.dataProcessing?.files || []).find((item) => item.id === id);
  if (!file) return;
  file.folderId = folderId || "folder-general";
  saveState();
  renderFileLibrary();
  showToast(`Archivo movido a ${getFolderPath(file.folderId)}.`);
}

async function deleteStoredFile(id) {
  const file = (state.dataProcessing?.files || []).find((item) => item.id === id);
  if (!file) return;
  const confirmed = window.confirm(`Desea borrar el archivo "${file.name}"?`);
  if (!confirmed) return;
  state.dataProcessing.files = (state.dataProcessing.files || []).filter((item) => item.id !== id);
  if (file.storageKey) {
    try {
      await deleteFilePayload(file.storageKey);
    } catch {
      // Si IndexedDB no responde, igual se elimina la ficha visible del archivo.
    }
  }
  saveState();
  renderFileLibrary();
  showToast("Archivo borrado.");
}

function csvCell(value) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}

class FormDataLike {
  constructor(container) {
    this.controls = container.querySelectorAll("input, select, textarea");
  }

  entries() {
    return [...this.controls].map((control) => [control.name, control.value]);
  }
}

function renderAnnouncements() {
  const publicContainer = document.querySelector("#announcementsList");
  const adminContainer = document.querySelector("#adminAnnouncementsList");
  const billboardContainer = document.querySelector("#billboardList");
  renderAnnouncementRecipients();
  renderForceLogoutRecipients();
  const activeAnnouncements = getActiveAnnouncements();
  const publicItems = activeAnnouncements.slice(0, 3);
  if (publicContainer) {
    publicContainer.innerHTML = publicItems.length ? publicItems.map((announcement) => `
      <article class="announcement-card">
        ${announcement.imageDataUrl ? `<img src="${announcement.imageDataUrl}" alt="">` : ""}
        <span>${formatDateTime(announcement.createdAt)}</span>
        <strong>${escapeHtml(announcement.title)}</strong>
        <p>${escapeHtml(announcement.body)}</p>
      </article>
    `).join("") : `<div class="empty compact-empty">No hay comunicados publicados.</div>`;
  }

  if (adminContainer) {
    adminContainer.innerHTML = activeAnnouncements.length ? activeAnnouncements.map((announcement) => `
      <article class="user-row">
        <div>
          <strong>${escapeHtml(announcement.title)}</strong>
          <span>${escapeHtml(announcement.body)}</span>
          <small>${escapeHtml(getAnnouncementAudienceLabel(announcement))}${announcement.popupEnabled === false ? " | Solo cartelera" : " | Emergente al iniciar sesion"}</small>
        </div>
        <button class="btn secondary" type="button" data-remove-announcement="${escapeHtml(announcement.id)}">Eliminar</button>
      </article>
    `).join("") : `<div class="empty compact-empty">No hay comunicados publicados.</div>`;

    adminContainer.querySelectorAll("[data-remove-announcement]").forEach((button) => {
      button.addEventListener("click", () => removeAnnouncement(button.dataset.removeAnnouncement));
    });
  }

  if (billboardContainer) {
    billboardContainer.innerHTML = activeAnnouncements.length ? activeAnnouncements.map((announcement) => `
    <article class="billboard-card">
      ${announcement.imageDataUrl ? `<img src="${announcement.imageDataUrl}" alt="">` : `<div class="billboard-placeholder">${escapeHtml(announcement.title.slice(0, 1))}</div>`}
      <div>
        <span>${formatDateTime(announcement.createdAt)}</span>
        <strong>${escapeHtml(announcement.title)}</strong>
        <p>${escapeHtml(announcement.body)}</p>
        ${announcement.imageDataUrl ? `<button class="btn secondary view-announcement-image" type="button" data-image-id="${escapeHtml(announcement.id)}">Ver imagen</button>` : ""}
      </div>
    </article>
  `).join("") : `<div class="empty compact-empty">No hay comunicados publicados.</div>`;

    billboardContainer.querySelectorAll("[data-image-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const announcement = getActiveAnnouncements().find((item) => item.id === button.dataset.imageId);
        if (announcement?.imageDataUrl) openImageModal(announcement.imageDataUrl);
      });
    });
  }
}

function openImageModal(src) {
  imageModalImg.src = src;
  imageModal.hidden = false;
}

function closeImageModal() {
  imageModal.hidden = true;
  imageModalImg.src = "";
}

function ownsCommercialTask(task = {}) {
  if (session.role !== "commercial") return true;
  return task.commercialUserId === session.userId ||
    (!task.commercialUserId && task.asesor === session.name && task.agencia === session.agency);
}

function findPendingPlateInfoRequest(sourceTask = {}) {
  const plate = normalizePlate(sourceTask.placa);
  if (!plate || !session.userId) return null;
  return state.tasks.find((task) =>
    isInfoRequestTask(task) &&
    normalizePlate(task.placa) === plate &&
    task.commercialUserId === session.userId &&
    task.infoAccessStatus !== "approved" &&
    !isClosedStatus(task.status)
  );
}

function findApprovedPlateInfoRequest(sourceTask = {}) {
  const plate = normalizePlate(sourceTask.placa);
  if (!plate || !session.userId) return null;
  return state.tasks.find((task) =>
    isInfoRequestTask(task) &&
    normalizePlate(task.placa) === plate &&
    task.commercialUserId === session.userId &&
    (task.infoAccessStatus === "approved" || isClosedStatus(task.status))
  );
}

async function createPlateInfoRequest(sourceTask) {
  if (!sourceTask?.placa || !canOpenCommercialTools()) return;
  const existing = findPendingPlateInfoRequest(sourceTask);
  if (existing) {
    showToast("La solicitud de informacion ya esta pendiente por aprobar.");
    renderStatusLookup();
    return;
  }
  const createdAt = new Date().toISOString();
  const task = {
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
    takenAt: "",
    completedAt: "",
    status: "por asignar",
    legalUserId: "",
    legalAdvisor: "",
    processType: "consulta-info",
    infoAccessStatus: "pending",
    sourceTaskId: sourceTask.id || "",
    sourceProcessType: getTaskProcess(sourceTask),
    sourceCliente: sourceTask.cliente || sourceTask.vendedor || "",
    sourceAsesor: sourceTask.asesor || sourceTask.commercialUserName || "",
    sourceAgencia: sourceTask.agencia || sourceTask.commercialAgency || "",
    requestedByName: session.name || "",
    requestedByUserId: session.userId || "",
    requestedByAgency: session.agency || "",
    requestedAt: createdAt,
    tipoSaneamiento: "Solicitud de informacion de placa",
    tipoCompra: "Consulta externa",
    cliente: "SOLICITUD DE INFORMACION",
    vendedor: "",
    placa: normalizePlate(sourceTask.placa),
    cedula: sourceTask.cedula || sourceTask.cedulaVendedor || "",
    agencia: session.agency || "",
    asesor: session.name || "",
    ciudad: "",
    valorToma: "",
    kilometraje: "",
    observaciones: `SOLICITUD DE INFORMACION | Placa: ${normalizePlate(sourceTask.placa)} | Solicitante: ${session.name || ""} | Agencia solicitante: ${session.agency || ""} | Registro original: ${sourceTask.id || "sin id"} | Asesor original: ${sourceTask.asesor || sourceTask.commercialUserName || "Sin registro"}.`,
    duplicateWarnings: [],
    commercialUserId: session.userId,
    commercialUserName: session.name,
    commercialAgency: session.agency,
    agencyAdvisorKey: `${session.agency || ""}::${session.name || ""}`,
    syncStatus: "pending"
  };
  autoAssignSaneamientoTask(task);
  state.tasks.push(task);
  saveState();
  renderAll();
  showToast("Solicitud enviada a mesa de control para autorizar informacion.");
  const onlineSaved = await guardarTareaSupabase(task, "solicitar-info-placa");
  saveState();
  if (!onlineSaved) showToast("Solicitud guardada localmente. Pendiente de sincronizar.");
}

function renderStatusLookup() {
  if (!statusResults) return;
  if (!canOpenCommercialTools()) {
    statusLookupKpis.innerHTML = "";
    statusResults.innerHTML = `<div class="empty compact-empty">Ingrese como asesor comercial para consultar placas y estatus.</div>`;
    return;
  }
  const query = statusSearch.value.trim().toLowerCase();
  const hasAnyFilter = query || statusAdvisorFilter.value || statusAgencyFilter.value || statusStateFilter.value || statusDateFrom.value || statusDateTo.value;
  if (!hasAnyFilter) {
    statusLookupKpis.innerHTML = "";
    statusResults.innerHTML = `<div class="empty compact-empty">Ingrese una placa, cedula, cliente, asesor o use los filtros.</div>`;
    return;
  }

  const results = state.tasks
    .filter((task) => getTaskProcess(task) !== "consulta-info")
    .filter((task) => isInsideDateRange(task.createdAt, statusDateFrom.value, statusDateTo.value))
    .filter((task) => !statusAdvisorFilter.value || task.asesor === statusAdvisorFilter.value)
    .filter((task) => !statusAgencyFilter.value || task.agencia === statusAgencyFilter.value)
    .filter((task) => !statusStateFilter.value || task.status === statusStateFilter.value)
    .filter((task) => {
      if (!query) return true;
      const haystack = [
        task.placa,
        task.cedula,
        task.cliente,
        task.asesor,
        task.agencia,
        task.ciudad,
        task.vendedor,
        task.telefono,
        task.correo
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!results.length) {
    statusLookupKpis.innerHTML = "";
    statusResults.innerHTML = `<div class="empty compact-empty">No se encontraron solicitudes con esos datos.</div>`;
    return;
  }

  const kpis = getKpis(results);
  statusLookupKpis.innerHTML = `
    <span><strong>${results.length}</strong> resultados</span>
    <span><strong>${kpis.pending}</strong> pendientes</span>
    <span><strong>${kpis.inProgress}</strong> tomados</span>
    <span><strong>${kpis.completed}</strong> cerrados</span>
  `;

  statusResults.innerHTML = results.map((task) => {
    const isOwner = ownsCommercialTask(task);
    const approvedInfoRequest = isOwner ? null : findApprovedPlateInfoRequest(task);
    const canSeeFullInfo = isOwner || approvedInfoRequest;
    const pendingInfoRequest = isOwner ? null : findPendingPlateInfoRequest(task);
    return `
    <article class="status-result-card">
      <div>
        <strong>${escapeHtml(canSeeFullInfo ? (task.cliente || task.vendedor || "Sin nombre") : "Registro de otro asesor")}</strong>
        <span>${escapeHtml(task.placa)} | ${canSeeFullInfo ? `Cedula ${escapeHtml(task.cedula || task.cedulaVendedor || "Sin registro")}` : "Informacion restringida"}</span>
        <span>Asesor comercial: ${escapeHtml(canSeeFullInfo ? (task.asesor || "Sin registro") : "Requiere autorizacion")}</span>
        ${canSeeFullInfo ? `<span>Agencia: ${escapeHtml(task.agencia || "Sin agencia")} | Proceso: ${escapeHtml(getCommercialProcessLabel(getTaskProcess(task)))}</span>` : ""}
      </div>
      <div>
        ${renderStatusPill(task.status)}
        <small>Ingresado: ${formatDateTime(task.createdAt)}</small>
        ${isOwner ? "" : approvedInfoRequest
          ? `<span class="info-request-pending is-approved">Informacion autorizada</span>`
          : pendingInfoRequest
          ? `<span class="info-request-pending">Pendiente por aprobar</span>`
          : `<button class="btn secondary request-plate-info" type="button" data-request-plate-info="${escapeHtml(task.id)}">Solicitar informacion</button>`}
      </div>
    </article>
  `;
  }).join("");
}

function renderKpiCards(selector, cards) {
  const container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = cards.map(([label, value, hint]) => `
    <article class="kpi-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
    </article>
  `).join("");
}

function renderAdvisorKpis(tasks = state.tasks) {
  const container = document.querySelector("#advisorKpis");
  if (!container) return;
  container.innerHTML = state.legalUsers.map((user) => {
    const userTasks = tasks.filter((task) => task.legalUserId === user.id || task.legalAdvisor === user.name);
    const kpis = getKpis(userTasks);
    return `
      <article class="advisor-card">
        <strong>${escapeHtml(user.name)}</strong>
        <span>${kpis.inProgress} en proceso</span>
        <span>${kpis.completed} completados</span>
        <span>Promedio cierre: ${formatMinutes(kpis.avgCompletion)}</span>
      </article>
    `;
  }).join("");
}

function getAverageCompletionMinutes(tasks) {
  return getAverageMinutes(tasks.filter((task) => task.takenAt && task.completedAt), "takenAt", "completedAt");
}

function getAverageMinutes(tasks, startKey, endKey) {
  const values = tasks
    .map((task) => (new Date(task[endKey]) - new Date(task[startKey])) / 60000)
    .filter((value) => Number.isFinite(value) && value >= 0);
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function formatMinutes(minutes) {
  if (!minutes) return "0 min";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h ${rest}m`;
}

function formatLeadDuration(task) {
  if (task.takenAt && task.completedAt) {
    return `Cierre: ${formatMinutes(Math.round((new Date(task.completedAt) - new Date(task.takenAt)) / 60000))}`;
  }
  if (task.takenAt) {
    return `En curso: ${formatMinutes(Math.max(0, Math.round((Date.now() - new Date(task.takenAt)) / 60000)))}`;
  }
  return `Espera: ${formatMinutes(Math.max(0, Math.round((Date.now() - new Date(task.createdAt)) / 60000)))}`;
}

function formatTakenToClosed(task) {
  if (!task.takenAt) return "Pendiente";
  if (!task.completedAt) return "En curso";
  return formatMinutes(Math.max(0, Math.round((new Date(task.completedAt) - new Date(task.takenAt)) / 60000)));
}

function formatDateTime(value) {
  if (!value) return "Pendiente";
  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function renderStatusPill(statusValue) {
  const status = getStatusOption(statusValue);
  return `<span class="status-pill" style="background:${escapeHtml(status.color)}; color:${getReadableTextColor(status.color)}">${escapeHtml(status.label)}</span>`;
}

function getReadableTextColor(hex) {
  const clean = String(hex || "#ffffff").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean;
  const num = parseInt(full, 16);
  if (!Number.isFinite(num)) return "#ffffff";
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#1f2025" : "#ffffff";
}

function isToday(value) {
  const date = new Date(value);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function renderAll() {
  applyTheme();
  applyCopy();
  renderLogo();
  applyRememberedLogins();
  renderSelects();
  renderOptions();
  renderAnnouncements();
  renderUsers();
  renderManagerUsers();
  renderProcessingUsers();
  renderTasks();
  renderDashboards();
  renderAdminLeads();
  renderCommercialDashboard();
  renderControlDashboard();
  renderLegalAvailability();
  renderLegalChat();
  renderManagerDashboard();
  renderPurchaseProcessing();
  renderContractProcessing();
  renderProviderProcessing();
  renderFileLibrary();
  renderPcBackups();
  renderInternalBackupStatus();
  updateDuplicatePreview();
  applyCommercialSessionToForm();
  setDefaultCuvRequestDate();
  initPasswordToggles();
}

function safeRenderAll() {
  try {
    renderAll();
  } catch (error) {
    console.error("Error al refrescar la interfaz:", error);
    showToast("Se cargo la pagina. Hay un dato del respaldo que necesita revision.");
  }
}

function shadeColor(hex, percent) {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  const r = Math.max(0, Math.min(255, (num >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (tab.dataset.view) {
      setView(tab.dataset.view);
      return;
    }
    if (tab.dataset.scrollTarget) {
      if (tab.dataset.scrollTarget === "lookup-title" && !canOpenCommercialTools()) {
        showToast("Ingrese como asesor comercial para consultar placas.");
        setView("acceso");
        window.setTimeout(() => commercialLoginForm.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
        return;
      }
      setView("acceso");
      window.setTimeout(() => document.querySelector(`#${tab.dataset.scrollTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  });
});

adminModuleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.adminModule;
    adminModuleButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    adminModuleSections.forEach((section) => {
      section.classList.toggle("is-active", section.dataset.adminSection === target);
    });
  });
});

if (adminFormProcessSelect) {
  adminFormProcessSelect.addEventListener("change", renderFormAdministration);
}

if (adminFormFieldsList) {
  adminFormFieldsList.addEventListener("click", (event) => {
    const row = event.target.closest("[data-form-field]");
    if (!row) return;
    if (event.target.closest("[data-save-form-field]")) saveFormFieldConfiguration(row);
    if (event.target.closest("[data-hide-base-field]")) hideBaseFormField(row.dataset.formField);
    if (event.target.closest("[data-delete-form-field]")) deleteCustomFormField(row.dataset.formField);
  });
}

function getAnnouncementAudienceLabel(announcement = {}) {
  const item = normalizeAnnouncement(announcement);
  if (item.audience === "all") return "Destinatarios: todos los equipos";
  if (item.audience === "commercial") return "Destinatarios: todo comercial";
  if (item.audience === "legal") return "Destinatarios: toda mesa de control";
  const names = getAnnouncementUserOptions()
    .filter((user) => item.targetUsers.includes(user.key))
    .map((user) => user.label.split("|")[0].trim());
  return `Destinatarios: ${names.length ? names.join(", ") : "usuarios especificos"}`;
}

function getPendingSessionAnnouncements() {
  return getActiveAnnouncements()
    .filter((announcement) => isAnnouncementForSession(announcement, session))
    .slice(0, 5);
}

function maybeShowSessionAnnouncements() {
  if (!sessionAnnouncementModal || !sessionAnnouncementList) return;
  if (!session || session.role === "public") return;
  const key = `${session.role}:${session.userId}:${lastActivityAt}`;
  if (sessionAnnouncementShownKey === key) return;
  const items = getPendingSessionAnnouncements();
  if (!items.length) return;
  sessionAnnouncementShownKey = key;
  sessionAnnouncementList.innerHTML = items.map((announcement) => `
    <article class="session-announcement-card">
      ${announcement.imageDataUrl ? `<img src="${announcement.imageDataUrl}" alt="">` : ""}
      <div>
        <span>${escapeHtml(getAnnouncementAudienceLabel(announcement))}</span>
        <strong>${escapeHtml(announcement.title)}</strong>
        <p>${escapeHtml(announcement.body)}</p>
        <small>${escapeHtml(formatDateTime(announcement.createdAt))}</small>
      </div>
    </article>
  `).join("");
  sessionAnnouncementModal.hidden = false;
  document.body.classList.add("has-modal");
}

function closeSessionAnnouncementModal() {
  if (!sessionAnnouncementModal) return;
  sessionAnnouncementModal.hidden = true;
  document.body.classList.remove("has-modal");
}

function compressAnnouncementImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("error", () => reject(new Error("No se pudo leer la imagen.")));
    reader.addEventListener("load", () => {
      const image = new Image();
      image.addEventListener("error", () => reject(new Error("No se pudo procesar la imagen.")));
      image.addEventListener("load", () => {
        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      });
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

if (customFormFieldForm) {
  customFormFieldForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addCustomFormField(Object.fromEntries(new FormData(customFormFieldForm).entries()));
    customFormFieldForm.reset();
  });
}

commercialModuleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.commercialModule;
    commercialModuleButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    commercialModuleSections.forEach((section) => {
      section.classList.toggle("is-active", section.dataset.commercialSection === target);
    });
  });
});

commercialAreaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".commercial-workspace")?.classList.remove("is-menu-open");
    document.querySelector("[data-commercial-menu-toggle]")?.setAttribute("aria-expanded", "false");
    const statusView = button.dataset.commercialStatusView || (button.dataset.commercialArea === "requests" ? "todos" : activeCommercialRequestFilter);
    if (["requests", "control"].includes(button.dataset.commercialArea)) {
      activeCommercialRequestFilter = statusView;
      commercialAreaButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      openCommercialSidebarModal(button.dataset.commercialArea, { statusView, button });
      return;
    }
    setCommercialArea(button.dataset.commercialArea, {
      button,
      moduleTarget: button.dataset.commercialModuleTarget || "",
      statusView
    });
  });
});

commercialProcessButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCommercialProcessFromTarget(button.dataset.commercialProcess);
  });
});

commercialStartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.commercialStart;
    if (target === "commercial-dashboard-title") {
      setCommercialArea("dashboard");
      return;
    }
    setCommercialProcessFromTarget(target);
  });
});

document.querySelector("[data-commercial-menu-toggle]")?.addEventListener("click", (event) => {
  const workspace = document.querySelector(".commercial-workspace");
  const isOpen = !workspace?.classList.contains("is-menu-open");
  workspace?.classList.toggle("is-menu-open", isOpen);
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-coming-soon]").forEach((button) => {
  button.addEventListener("click", () => {
    const label = button.dataset.comingSoon === "cuv" ? "CUV" : "Venta";
    openConstructionModal(label);
  });
});

document.querySelectorAll("[data-close-commercial-modal]").forEach((button) => {
  button.addEventListener("click", closeCommercialModals);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (legalTaskModal && !legalTaskModal.hidden) {
    closeLegalTaskInfoModal();
    return;
  }
  if (legalChatPanel && !legalChatPanel.hidden) {
    setLegalChatOpen(false);
    return;
  }
  const blockingModalOpen = (commercialPilotModal && !commercialPilotModal.hidden) || (commercialDuplicateModal && !commercialDuplicateModal.hidden);
  if (!blockingModalOpen) closeCommercialModals();
});

document.addEventListener("click", (event) => {
  const pdfButton = event.target.closest("[data-pdf-download]");
  if (pdfButton) {
    event.preventDefault();
    downloadCuvPdf(pdfButton.dataset.pdfDownload);
    return;
  }
  const trackingFilterButton = event.target.closest("[data-commercial-tracking-filter]");
  if (trackingFilterButton) {
    commercialTrackingFilter = trackingFilterButton.dataset.commercialTrackingFilter || "todos";
    commercialTrackingPage = 1;
    renderCommercialDashboard();
    return;
  }
  const trackingPageButton = event.target.closest("[data-commercial-tracking-page]");
  if (trackingPageButton) {
    commercialTrackingPage += trackingPageButton.dataset.commercialTrackingPage === "next" ? 1 : -1;
    renderCommercialDashboard();
    return;
  }
  const trackingClearButton = event.target.closest("[data-commercial-tracking-clear]");
  if (trackingClearButton) {
    commercialTrackingSearch = "";
    commercialTrackingDateFrom = "";
    commercialTrackingDateTo = "";
    commercialTrackingPage = 1;
    renderCommercialDashboard();
    return;
  }
  const fichaButton = event.target.closest("[data-commercial-ficha]");
  if (fichaButton) {
    openCommercialLeadFicha(fichaButton.dataset.commercialFicha);
  }
  const resendButton = event.target.closest("[data-resend-commercial-task]");
  if (resendButton) {
    resendRejectedCommercialTask(resendButton.dataset.resendCommercialTask);
  }
  const signatureButton = event.target.closest("[data-request-signature]");
  if (signatureButton) {
    openSignatureRequestModal(signatureButton.dataset.requestSignature);
  }
  const pilotUploadButton = event.target.closest("[data-request-pilot-upload]");
  if (pilotUploadButton) {
    requestPilotUploadFromCommercial(pilotUploadButton.dataset.requestPilotUpload);
  }
  if (event.target.closest("[data-close-legal-task]")) {
    closeLegalTaskInfoModal();
  }
  const modalTakeButton = event.target.closest("[data-modal-take-task]");
  if (modalTakeButton) {
    takeTask(modalTakeButton.dataset.modalTakeTask);
    openLegalTaskModal(modalTakeButton.dataset.modalTakeTask);
  }
  const completeSignatureButton = event.target.closest("[data-complete-signature-task]");
  if (completeSignatureButton) {
    completeSignatureTask(completeSignatureButton.dataset.completeSignatureTask);
  }
  const openCuvButton = event.target.closest("[data-open-cuv-task]");
  if (openCuvButton) {
    openLegalTaskModal(openCuvButton.dataset.openCuvTask);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-commercial-tracking-search]")) {
    commercialTrackingSearch = event.target.value || "";
    commercialTrackingPage = 1;
    window.clearTimeout(commercialTrackingSearchTimer);
    commercialTrackingSearchTimer = window.setTimeout(() => {
      renderCommercialDashboard();
    }, 260);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-commercial-tracking-from]")) {
    commercialTrackingDateFrom = event.target.value || "";
    commercialTrackingPage = 1;
    renderCommercialDashboard();
  }
  if (event.target.matches("[data-commercial-tracking-to]")) {
    commercialTrackingDateTo = event.target.value || "";
    commercialTrackingPage = 1;
    renderCommercialDashboard();
  }
  if (event.target.matches("[data-commercial-tracking-status]")) {
    commercialTrackingFilter = event.target.value || "todos";
    commercialTrackingPage = 1;
    renderCommercialDashboard();
  }
});

commercialSignatureForm?.addEventListener("submit", submitSignatureRequest);

signatureSpouseToggle?.addEventListener("change", () => {
  if (signatureSpouseFields) signatureSpouseFields.hidden = !signatureSpouseToggle.checked;
});

signatureHeirsToggle?.addEventListener("change", () => {
  if (signatureHeirsFields) signatureHeirsFields.hidden = !signatureHeirsToggle.checked;
});

legalTaskModalContent?.addEventListener("change", (event) => {
  const statusSelect = event.target.closest("[data-modal-status-task]");
  if (!statusSelect) return;
  const task = state.tasks.find((item) => item.id === statusSelect.dataset.modalStatusTask);
  const note = askLegalStatusObservation(task, statusSelect.value);
  updateTaskStatus(statusSelect.dataset.modalStatusTask, statusSelect.value, note);
  openLegalTaskModal(statusSelect.dataset.modalStatusTask);
});

legalTaskModalContent?.addEventListener("submit", (event) => {
  const cuvForm = event.target.closest("[data-cuv-legal-form]");
  if (!cuvForm) return;
  event.preventDefault();
  saveCuvLegalTask(cuvForm);
});

document.querySelector("#commercialNotificationBell")?.addEventListener("click", () => {
  openCommercialNotificationsModal();
});

legalChatOpenBtn?.addEventListener("click", () => {
  setLegalChatOpen(true);
  renderLegalChat();
});

legalChatCloseBtn?.addEventListener("click", () => {
  setLegalChatOpen(false);
});

processingTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.processingTab;
    processingTabButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    processingPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.processingPanel === target);
    });
    if (navigator.onLine && canSyncCurrentView()) {
      restoreModulesFromSupabaseIfNeeded();
    }
  });
});

agenciaSelect.addEventListener("change", () => {
  renderAdvisorSelect();
  updateDuplicatePreview();
});

form?.addEventListener("change", (event) => {
  if (event.target?.name !== "agencia") return;
  renderAdvisorSelect();
  updateDuplicatePreview();
});

logoutBtn.addEventListener("click", () => {
  setSession(getPublicSession());
  persistView("acceso");
  setView("acceso");
  showToast("Sesion cerrada.");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderTasks();
  });
});

legalSidebarFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.legalSidebarFilter;
    renderTasks();
  });
});

legalSidebarNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.legalScroll}`);
    legalSidebarNavButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

taskSearch.addEventListener("input", () => {
  searchTerm = taskSearch.value;
  renderTasks();
});

taskDateFromInput.addEventListener("change", () => {
  taskDateFrom = taskDateFromInput.value;
  renderTasks();
});

taskDateToInput.addEventListener("change", () => {
  taskDateTo = taskDateToInput.value;
  renderTasks();
});

statusLookupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canOpenCommercialTools()) {
    showToast("Ingrese como asesor comercial para consultar placas.");
    commercialLoginForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  renderStatusLookup();
});

statusResults?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-request-plate-info]");
  if (!button) return;
  const task = state.tasks.find((item) => item.id === button.dataset.requestPlateInfo);
  if (!task) {
    showToast("No se encontro el registro para solicitar informacion.");
    return;
  }
  button.disabled = true;
  button.textContent = "Enviando...";
  createPlateInfoRequest(task);
});

function guardedStatusLookup() {
  if (canOpenCommercialTools()) renderStatusLookup();
}

statusSearch.addEventListener("input", guardedStatusLookup);
statusDateFrom.addEventListener("change", guardedStatusLookup);
statusDateTo.addEventListener("change", guardedStatusLookup);
statusAdvisorFilter.addEventListener("change", guardedStatusLookup);
statusAgencyFilter.addEventListener("change", guardedStatusLookup);
statusStateFilter.addEventListener("change", guardedStatusLookup);

heroSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canOpenCommercialTools()) {
    showToast("Ingrese como asesor comercial para consultar placas.");
    commercialLoginForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const query = heroSearchInput.value.trim();
  if (!query) return;
  statusSearch.value = query;
  renderStatusLookup();
  document.querySelector("#statusLookupForm").scrollIntoView({ behavior: "smooth", block: "start" });
});

form.addEventListener("input", updateDuplicatePreview);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const submitButton = form.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Validando...";
  }
  try {
    const canContinueDuplicate = await confirmDuplicateConflict(data);
    if (!canContinueDuplicate) {
      showToast("Envio cancelado. Revise el posible duplicado antes de continuar.");
      return;
    }
    const confirmedPilot = await confirmPilotDocuments();
    if (!confirmedPilot) {
      showToast("Envio pausado para revisar documentos en Pilot.");
      return;
    }
    if (submitButton) submitButton.textContent = "Guardando...";
    await createTask(data);
    form.reset();
    updateDuplicatePreview();
    applyCommercialSessionToForm();
    setView("formulario");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar a control legal";
    }
  }
});

saleContractForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(saleContractForm).entries());
  const submitButton = saleContractForm.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Guardando...";
  }
  await createSaleContractTask(data);
  saleContractForm.reset();
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Enviar contrato a mesa";
  }
  setView("formulario");
});

cuvRequestForm?.addEventListener("reset", () => {
  window.setTimeout(setDefaultCuvRequestDate, 0);
});

cuvRequestForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(cuvRequestForm).entries());
  const submitButton = cuvRequestForm.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Guardando...";
  }
  try {
    await createCuvTask(data);
    cuvRequestForm.reset();
    setDefaultCuvRequestDate();
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar solicitud CUV";
    }
  }
});

legalLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginLegal(Object.fromEntries(new FormData(legalLoginForm).entries()));
});

commercialLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginCommercial(Object.fromEntries(new FormData(commercialLoginForm).entries()));
});

adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginAdmin(Object.fromEntries(new FormData(adminLoginForm).entries()));
});

managerLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginManager(Object.fromEntries(new FormData(managerLoginForm).entries()));
});

processingLoginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  loginProcessing(Object.fromEntries(new FormData(processingLoginForm).entries()));
});

commercialPasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  changeOwnPassword("commercialAdvisors", new FormData(commercialPasswordForm).get("password"));
  commercialPasswordForm.reset();
});

legalPasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  changeOwnPassword("legalUsers", new FormData(legalPasswordForm).get("password"));
  legalPasswordForm.reset();
});

legalAvailabilityToggle?.addEventListener("click", () => {
  toggleLegalAvailability();
});

legalChatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendLegalChatMessage(legalChatInput?.value || "");
  if (legalChatInput) legalChatInput.value = "";
});

legalChatRecipientSearch?.addEventListener("input", () => {
  renderLegalChat();
});

legalChatRecipientSelect?.addEventListener("change", () => {
  renderLegalChat();
});

legalChatList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-chat-message]");
  if (!button) return;
  deleteLegalChatMessage(button.dataset.deleteChatMessage);
});

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(userForm);
  createUser({
    ...Object.fromEntries(formData.entries()),
    mailboxes: formData.getAll("mailboxes")
  });
  userForm.reset();
  userForm.querySelector("[name='mailboxes'][value='saneamientos']").checked = true;
});

managerUserForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createManagerUser(Object.fromEntries(new FormData(managerUserForm).entries()));
  managerUserForm.reset();
});

processingUserForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  createProcessingUser(Object.fromEntries(new FormData(processingUserForm).entries()));
  processingUserForm.reset();
});

commercialAdvisorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCommercialAdvisor(Object.fromEntries(new FormData(commercialAdvisorForm).entries()));
  commercialAdvisorForm.reset();
});

announcementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(announcementForm).entries());
  const file = announcementForm.elements.image.files[0];
  if (!file) {
    addAnnouncement(data);
    announcementForm.reset();
    renderAnnouncementRecipients();
    return;
  }
  compressAnnouncementImage(file).then((imageDataUrl) => {
    addAnnouncement(data, imageDataUrl);
    announcementForm.reset();
    renderAnnouncementRecipients();
  }).catch(() => showToast("No se pudo procesar la imagen del comunicado."));
});

announcementAudience?.addEventListener("change", renderAnnouncementRecipients);
announcementRecipientSearch?.addEventListener("input", renderAnnouncementRecipients);
forceLogoutAudience?.addEventListener("change", renderForceLogoutRecipients);
forceLogoutRecipientSearch?.addEventListener("input", renderForceLogoutRecipients);
forceLogoutBtn?.addEventListener("click", createForceLogoutRequest);

document.querySelectorAll("[data-close-session-announcement]").forEach((button) => {
  button.addEventListener("click", closeSessionAnnouncementModal);
});

themeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.theme = Object.fromEntries(new FormData(themeForm).entries());
  saveState();
  guardarBrandingSupabase();
  renderAll();
  showToast("Diseno actualizado.");
});

resetThemeBtn.addEventListener("click", () => {
  state.theme = structuredClone(defaultState.theme);
  saveState();
  guardarBrandingSupabase();
  renderAll();
  showToast("Diseno restaurado al default.");
});

copyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.copy = Object.fromEntries(
    [...new FormData(copyForm).entries()]
      .map(([key, value]) => [key, normalizeCopyText(key, value)])
  );
  saveState();
  guardarBrandingSupabase();
  renderAll();
  showToast("Textos actualizados.");
});

resetCopyBtn.addEventListener("click", () => {
  state.copy = structuredClone(defaultState.copy);
  saveState();
  guardarBrandingSupabase();
  renderAll();
  showToast("Textos restaurados.");
});

statusOptionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addStatusOption(Object.fromEntries(new FormData(statusOptionForm).entries()));
  statusOptionForm.reset();
  statusOptionForm.elements.color.value = "#8d8d92";
});

[adminLegalFilter, adminCommercialFilter, adminAgencyFilter, adminStatusFilter, adminDateFrom, adminDateTo].forEach((control) => {
  control.addEventListener("change", () => {
    adminFilters = {
      legal: adminLegalFilter.value,
      commercial: adminCommercialFilter.value,
      agency: adminAgencyFilter.value,
      status: adminStatusFilter.value,
      from: adminDateFrom.value,
      to: adminDateTo.value
    };
    renderDashboards();
    renderAdminLeads();
  });
});

clearAdminFilters.addEventListener("click", () => {
  adminLegalFilter.value = "";
  adminCommercialFilter.value = "";
  adminAgencyFilter.value = "";
  adminStatusFilter.value = "";
  adminDateFrom.value = "";
  adminDateTo.value = "";
  adminFilters = { legal: "", commercial: "", agency: "", status: "", from: "", to: "" };
  renderDashboards();
  renderAdminLeads();
});

function updateManagerDetailFilters() {
  managerDetailFilters = {
    from: managerDateFrom?.value || "",
    to: managerDateTo?.value || "",
    plate: managerPlateFilter?.value || "",
    advisor: managerAdvisorFilter?.value || "",
    agency: managerAgencyFilter?.value || ""
  };
  renderManagerDashboard();
}

[managerDateFrom, managerDateTo, managerAdvisorFilter, managerAgencyFilter].forEach((control) => {
  if (control) control.addEventListener("change", updateManagerDetailFilters);
});

if (managerPlateFilter) managerPlateFilter.addEventListener("input", updateManagerDetailFilters);

if (clearManagerFilters) {
  clearManagerFilters.addEventListener("click", () => {
    managerDetailFilters = { from: "", to: "", plate: "", advisor: "", agency: "" };
    if (managerDateFrom) managerDateFrom.value = "";
    if (managerDateTo) managerDateTo.value = "";
    if (managerPlateFilter) managerPlateFilter.value = "";
    if (managerAdvisorFilter) managerAdvisorFilter.value = "";
    if (managerAgencyFilter) managerAgencyFilter.value = "";
    renderManagerDashboard();
  });
}

if (adminLeadForm) {
  adminLeadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveAdminLead(adminLeadForm.elements.id.value, adminLeadForm);
  });
}

if (reconcileAdminLeadsBtn) {
  reconcileAdminLeadsBtn.addEventListener("click", reconcileAdminLeadsFromSupabase);
}

if (exportDataBtn) exportDataBtn.addEventListener("click", exportDataBackup);
if (restoreInternalBackupBtn) restoreInternalBackupBtn.addEventListener("click", restoreInternalBackupManually);
if (createPcBackupBtn) createPcBackupBtn.addEventListener("click", () => createPcBackup("manual"));

if (importDataInput) {
  importDataInput.addEventListener("change", () => {
    importDataBackup(importDataInput.files[0]);
  });
}

if (processPurchasePasteBtn) {
  processPurchasePasteBtn.addEventListener("click", () => {
    addPurchaseRecords(parsePurchaseInput(purchaseBulkInput.value, "PEGADO"));
    purchaseBulkInput.value = "";
  });
}

if (purchaseFileInput) {
  purchaseFileInput.addEventListener("change", async () => {
    const file = purchaseFileInput.files[0];
    if (!file) return;
    if (/\.xlsx$/i.test(file.name)) {
      try {
        const text = await xlsxFileToDelimitedText(file);
        addPurchaseRecords(parsePurchaseInput(text, file.name));
      } catch (error) {
        showToast(error.message || "No se pudo leer el Excel. Guardelo como CSV e intente nuevamente.");
      }
      purchaseFileInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      addPurchaseRecords(parsePurchaseInput(reader.result, file.name));
      purchaseFileInput.value = "";
    });
    reader.readAsText(file);
  });
}

if (exportPurchasesBtn) exportPurchasesBtn.addEventListener("click", exportPurchasesCsv);
if (exportPurchasePdfBtn) exportPurchasePdfBtn.addEventListener("click", exportPurchasePdfReport);
if (printPurchaseDetailBtn) printPurchaseDetailBtn.addEventListener("click", printPurchaseDetailReport);
if (exportContractsBtn) exportContractsBtn.addEventListener("click", exportContractsCsv);
if (exportContractPdfBtn) exportContractPdfBtn.addEventListener("click", exportContractPdfReport);
if (exportProviderPdfBtn) exportProviderPdfBtn.addEventListener("click", exportProviderPdfReport);
document.querySelectorAll(".provider-table-panel [data-provider-detail]").forEach((button) => {
  button.addEventListener("click", () => openProviderDetail(button.dataset.providerDetail));
});

if (processContractPasteBtn) {
  processContractPasteBtn.addEventListener("click", () => {
    addContractRecords(parseContractInput(contractBulkInput.value, "PEGADO"));
    if (contractBulkInput) contractBulkInput.value = "";
  });
}

if (contractFileInput) {
  contractFileInput.addEventListener("change", async () => {
    const file = contractFileInput.files[0];
    if (!file) return;
    if (/\.xlsx$/i.test(file.name)) {
      try {
        const text = await xlsxFileToDelimitedText(file);
        addContractRecords(parseContractInput(text, file.name));
      } catch (error) {
        showToast(error.message || "No se pudo leer el Excel de contratos.");
      }
      contractFileInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      addContractRecords(parseContractInput(reader.result, file.name));
      contractFileInput.value = "";
    });
    reader.readAsText(file);
  });
}

if (processProviderPasteBtn) {
  processProviderPasteBtn.addEventListener("click", () => {
    previewProviderRecordsFromText(providerBulkInput.value, "PEGADO");
  });
}

if (providerProfileForm) {
  providerProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addProviderProfile();
  });
}

if (toggleProviderProfileManagerBtn) {
  toggleProviderProfileManagerBtn.addEventListener("click", () => toggleProviderProfileManager());
}

if (showProviderCellsBtn) {
  showProviderCellsBtn.addEventListener("click", toggleProviderCellsPanel);
}

if (editProviderProfileBtn) editProviderProfileBtn.addEventListener("click", editSelectedProviderProfile);
if (deleteProviderProfileBtn) deleteProviderProfileBtn.addEventListener("click", deleteSelectedProviderProfile);

if (providerProfileSelect) {
  providerProfileSelect.addEventListener("change", () => {
    const profile = getSelectedProviderProfile();
    if (providerNameInput) providerNameInput.value = profile.name;
    if (providerProfileSummary) providerProfileSummary.hidden = true;
    if (showProviderCellsBtn) showProviderCellsBtn.textContent = "Mostrar celdas de registro";
    pendingProviderRecords = [];
    renderProviderPastePreview([]);
    renderProviderProcessing();
  });
}

if (providerFileInput) {
  providerFileInput.addEventListener("change", async () => {
    const file = providerFileInput.files[0];
    if (!file) return;
    if (/\.xlsx$/i.test(file.name)) {
      try {
        const text = await xlsxFileToDelimitedText(file);
        previewProviderRecordsFromText(text, file.name);
      } catch (error) {
        showToast(error.message || "No se pudo leer el Excel. Guardelo como CSV e intente nuevamente.");
      }
      providerFileInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      previewProviderRecordsFromText(reader.result, file.name);
      providerFileInput.value = "";
    });
    reader.readAsText(file);
  });
}

if (fileLibraryForm) {
  fileLibraryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSelectedFiles();
  });
}
if (fileLibraryInput) fileLibraryInput.addEventListener("change", updateFilePickerLabel);

if (fileCategoryFilter) fileCategoryFilter.addEventListener("change", renderFileLibrary);
if (fileFolderFilter) fileFolderFilter.addEventListener("change", renderFileLibrary);
if (fileFolderSearchInput) fileFolderSearchInput.addEventListener("input", renderFileLibrary);
if (fileSearchInput) fileSearchInput.addEventListener("input", renderFileLibrary);
filePanelButtons.forEach((button) => {
  button.addEventListener("click", () => openFileVaultPanel(button.dataset.filePanelOpen));
});
if (fileFolderForm) {
  fileFolderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addFileFolder(fileFolderForm.elements.name.value, fileFolderForm.elements.parentId.value);
    fileFolderForm.reset();
    if (fileFolderParentSelect) fileFolderParentSelect.value = "folder-general";
  });
}
if (clearFileLibraryBtn) {
  clearFileLibraryBtn.addEventListener("click", () => {
    if (fileFolderFilter) fileFolderFilter.value = "";
    if (fileCategoryFilter) fileCategoryFilter.value = "";
    if (fileFolderSearchInput) fileFolderSearchInput.value = "";
    if (fileSearchInput) fileSearchInput.value = "";
    renderFileLibrary();
    openFileVaultPanel("files");
  });
}

function updatePurchaseFilters() {
  purchaseFilters = {
    month: purchaseMonthFilter?.value || "",
    loadId: purchaseLoadFilter?.value || "",
    date: purchaseDateFilter?.value || "",
    agency: purchaseAgencyFilter?.value || "",
    advisor: getSelectedOptions(purchaseAdvisorFilter),
    coordinator: getSelectedOptions(purchaseCoordinatorFilter),
    status: purchaseStatusFilter?.value || "",
    plate: purchasePlateFilter?.value || ""
  };
  renderPurchaseProcessing();
}

[purchaseMonthFilter, purchaseLoadFilter, purchaseDateFilter, purchaseAgencyFilter, purchaseAdvisorFilter, purchaseCoordinatorFilter, purchaseStatusFilter].forEach((control) => {
  if (control) control.addEventListener("change", updatePurchaseFilters);
});

if (purchasePlateFilter) purchasePlateFilter.addEventListener("input", updatePurchaseFilters);

if (savePurchaseFilterPresetBtn) savePurchaseFilterPresetBtn.addEventListener("click", savePurchaseFilterPreset);
if (purchaseFilterPresetSelect) {
  purchaseFilterPresetSelect.addEventListener("change", () => {
    applyPurchaseFilterPreset(purchaseFilterPresetSelect.value);
    purchaseFilterPresetSelect.value = "";
  });
}

[
  [purchaseAdvisorFilterBtn, purchaseAdvisorFilterPanel],
  [purchaseCoordinatorFilterBtn, purchaseCoordinatorFilterPanel]
].forEach(([button, panel]) => {
  if (!button || !panel) return;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    [purchaseAdvisorFilterPanel, purchaseCoordinatorFilterPanel].forEach((otherPanel) => {
      if (otherPanel && otherPanel !== panel) otherPanel.hidden = true;
    });
    panel.hidden = !panel.hidden;
  });
  panel.addEventListener("click", (event) => event.stopPropagation());
});

document.addEventListener("click", () => {
  if (purchaseAdvisorFilterPanel) purchaseAdvisorFilterPanel.hidden = true;
  if (purchaseCoordinatorFilterPanel) purchaseCoordinatorFilterPanel.hidden = true;
});

if (togglePurchaseLoadsBtn && purchaseLoadReport) {
  togglePurchaseLoadsBtn.addEventListener("click", () => {
    purchaseLoadReport.classList.toggle("is-collapsed");
    togglePurchaseLoadsBtn.textContent = purchaseLoadReport.classList.contains("is-collapsed") ? "Ver cargas" : "Ocultar cargas";
  });
}

function updateContractFilters() {
  contractFilters = {
    month: contractMonthFilter?.value || "",
    loadId: contractLoadFilter?.value || "",
    date: contractDateFilter?.value || "",
    agency: contractAgencyFilter?.value || "",
    advisor: contractAdvisorFilter?.value || "",
    legal: contractLegalFilter?.value || "",
    status: contractStatusFilter?.value || "",
    search: contractSearchFilter?.value || ""
  };
  renderContractProcessing();
}

[contractMonthFilter, contractLoadFilter, contractDateFilter, contractAgencyFilter, contractAdvisorFilter, contractLegalFilter, contractStatusFilter].forEach((control) => {
  if (control) control.addEventListener("change", updateContractFilters);
});
if (contractSearchFilter) contractSearchFilter.addEventListener("input", updateContractFilters);

if (clearContractFiltersBtn) {
  clearContractFiltersBtn.addEventListener("click", () => {
    contractFilters = { month: "", loadId: "", date: "", agency: "", advisor: "", legal: "", status: "", search: "" };
    [contractMonthFilter, contractLoadFilter, contractDateFilter, contractAgencyFilter, contractAdvisorFilter, contractLegalFilter, contractStatusFilter, contractSearchFilter].forEach((control) => {
      if (control) control.value = "";
    });
    renderContractProcessing();
  });
}

if (clearContractsBtn) {
  clearContractsBtn.addEventListener("click", () => {
    const confirmed = window.confirm("Desea borrar todos los contratos procesados?");
    if (!confirmed) return;
    state.dataProcessing.contratos = [];
    state.dataProcessing.contractLoads = [];
    saveState();
    renderContractProcessing();
    showToast("Contratos procesados limpiados.");
  });
}

if (toggleContractLoadsBtn && contractLoadReport) {
  toggleContractLoadsBtn.addEventListener("click", () => {
    contractLoadReport.classList.toggle("is-collapsed");
    toggleContractLoadsBtn.textContent = contractLoadReport.classList.contains("is-collapsed") ? "Ver cargas" : "Ocultar cargas";
  });
}

if (openContractBaseBtn) openContractBaseBtn.addEventListener("click", () => openContractDetail("Contratos"));

if (contractMonthInput) {
  contractMonthInput.value = contractMonthInput.value || new Date().toISOString().slice(0, 7);
  contractMonthInput.addEventListener("change", updateContractMonthHint);
  updateContractMonthHint();
}

const toggleCoordinatorProductivityBtn = document.querySelector("#toggleCoordinatorProductivityBtn");
const purchaseCoordinatorProductivityPanel = document.querySelector("#purchaseCoordinatorProductivity");
if (toggleCoordinatorProductivityBtn && purchaseCoordinatorProductivityPanel) {
  toggleCoordinatorProductivityBtn.addEventListener("click", () => {
    purchaseCoordinatorProductivityPanel.hidden = !purchaseCoordinatorProductivityPanel.hidden;
    toggleCoordinatorProductivityBtn.classList.toggle("is-active", !purchaseCoordinatorProductivityPanel.hidden);
    toggleCoordinatorProductivityBtn.querySelector("small").textContent = purchaseCoordinatorProductivityPanel.hidden
      ? "Feedback y one to one"
      : "Ocultar productividad";
  });
}

if (purchaseMonthInput) {
  purchaseMonthInput.value = purchaseMonthInput.value || new Date().toISOString().slice(0, 7);
  purchaseMonthInput.addEventListener("change", updatePurchaseMonthHint);
  updatePurchaseMonthHint();
}

if (providerMonthInput) {
  providerMonthInput.value = providerMonthInput.value || new Date().toISOString().slice(0, 7);
}

function updateProviderFilters() {
  const provider = providerFilterSelect?.value || "";
  const month = providerMonthFilter?.value || "";
  let loadId = providerLoadFilter?.value || "";
  if (loadId) {
    const load = (state.dataProcessing?.providerLoads || []).find((item) => item.id === loadId);
    if (!load || (provider && load.provider !== provider) || (month && load.month !== month)) loadId = "";
  }
  providerFilters = {
    provider,
    month,
    loadId,
    plate: providerPlateFilter?.value || ""
  };
  renderProviderProcessing();
}

[providerFilterSelect, providerMonthFilter, providerLoadFilter].forEach((control) => {
  if (control) control.addEventListener("change", updateProviderFilters);
});

if (providerPlateFilter) providerPlateFilter.addEventListener("input", updateProviderFilters);

if (deleteProviderLoadBtn) {
  deleteProviderLoadBtn.addEventListener("click", deleteSelectedProviderLoad);
}

if (clearProviderFiltersBtn) {
  clearProviderFiltersBtn.addEventListener("click", () => {
    providerFilters = { provider: "", month: "", plate: "", loadId: "" };
    if (providerFilterSelect) providerFilterSelect.value = "";
    if (providerMonthFilter) providerMonthFilter.value = "";
    if (providerLoadFilter) providerLoadFilter.value = "";
    if (providerPlateFilter) providerPlateFilter.value = "";
    renderProviderProcessing();
  });
}

if (clearProvidersBtn) {
  clearProvidersBtn.addEventListener("click", () => {
    const confirmed = window.confirm("Desea borrar todos los reportes cargados de proveedores?");
    if (!confirmed) return;
    createPcBackup("antes-de-limpiar-proveedores");
    state.dataProcessing.providerTrash = {
      deletedAt: new Date().toISOString(),
      proveedores: structuredClone(state.dataProcessing.proveedores || []),
      providerLoads: structuredClone(state.dataProcessing.providerLoads || []),
      providerDuplicateApprovals: structuredClone(state.dataProcessing.providerDuplicateApprovals || {})
    };
    state.dataProcessing.proveedores = [];
    state.dataProcessing.providerLoads = [];
    state.dataProcessing.providerDuplicateApprovals = {};
    providerFilters = { provider: "", month: "", plate: "", loadId: "" };
    pendingProviderRecords = [];
    renderProviderPastePreview([]);
    saveState();
    renderProviderProcessing();
    showToast("Reportes de proveedores limpiados.");
  });
}

if (restoreProviderTrashBtn) {
  restoreProviderTrashBtn.addEventListener("click", () => {
    const trash = state.dataProcessing?.providerTrash;
    if (!trash?.proveedores?.length && !trash?.providerLoads?.length) {
      showToast("No hay borrado de proveedores disponible para restaurar.");
      return;
    }
    const confirmed = window.confirm(`Se restaurara el borrado del ${formatDateTime(trash.deletedAt)}. Desea continuar?`);
    if (!confirmed) return;
    state.dataProcessing.proveedores = mergeByKey(state.dataProcessing.proveedores || [], trash.proveedores || [], "id").map(normalizeProviderRecord);
    state.dataProcessing.providerLoads = mergeByKey(state.dataProcessing.providerLoads || [], trash.providerLoads || [], "id").map(normalizeProviderLoad);
    state.dataProcessing.providerDuplicateApprovals = {
      ...(trash.providerDuplicateApprovals || {}),
      ...(state.dataProcessing.providerDuplicateApprovals || {})
    };
    providerFilters = { provider: "", month: "", plate: "", loadId: "" };
    saveState();
    renderProviderProcessing();
    showToast("Proveedores restaurados desde el ultimo borrado.");
  });
}

document.querySelector("#openAdvisorReportBtn")?.addEventListener("click", openAdvisorReportModal);

document.querySelectorAll("[data-close-advisor-report]").forEach((button) => {
  button.addEventListener("click", closeAdvisorReportModal);
});

document.querySelectorAll("[data-close-purchase-detail]").forEach((button) => {
  button.addEventListener("click", closePurchaseDetailModal);
});

document.querySelectorAll("[data-close-provider-detail]").forEach((button) => {
  button.addEventListener("click", closeProviderDetail);
});

if (clearPurchaseFiltersBtn) {
  clearPurchaseFiltersBtn.addEventListener("click", () => {
    purchaseFilters = { month: "", loadId: "", date: "", agency: "", advisor: [], coordinator: [], status: "", plate: "" };
    if (purchaseMonthFilter) purchaseMonthFilter.value = "";
    if (purchaseLoadFilter) purchaseLoadFilter.value = "";
    if (purchaseDateFilter) purchaseDateFilter.value = "";
    if (purchaseAgencyFilter) purchaseAgencyFilter.value = "";
    if (purchaseAdvisorFilter) [...purchaseAdvisorFilter.options].forEach((option) => { option.selected = false; });
    if (purchaseCoordinatorFilter) [...purchaseCoordinatorFilter.options].forEach((option) => { option.selected = false; });
    if (purchaseStatusFilter) purchaseStatusFilter.value = "";
    if (purchasePlateFilter) purchasePlateFilter.value = "";
    renderPurchaseProcessing();
  });
}

if (clearPurchasesBtn) {
  clearPurchasesBtn.addEventListener("click", () => {
    const confirmed = window.confirm("Desea borrar todos los registros procesados de compras?");
    if (!confirmed) return;
    state.dataProcessing.compras = [];
    state.dataProcessing.loads = [];
    state.dataProcessing.purchaseDuplicateApprovals = {};
    saveState();
    renderPurchaseProcessing();
    showToast("Compras procesadas limpiadas.");
  });
}

document.querySelectorAll("[data-close-admin-lead]").forEach((button) => {
  button.addEventListener("click", closeAdminLeadEditor);
});

document.querySelectorAll("[data-option-form]").forEach((optionForm) => {
  optionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const key = optionForm.dataset.optionForm;
    const input = optionForm.querySelector("input");
    addOption(key, input.value);
    input.value = "";
  });
});

logoInput.addEventListener("change", () => {
  const file = logoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.logoDataUrl = reader.result;
    saveState();
    guardarBrandingSupabase();
    renderLogo();
    showToast("Logo actualizado.");
  });
  reader.readAsDataURL(file);
});

resetLogoBtn.addEventListener("click", () => {
  state.logoDataUrl = "";
  saveState();
  guardarBrandingSupabase();
  renderLogo();
  showToast("Logo restablecido.");
});

document.querySelectorAll("[data-close-image]").forEach((button) => {
  button.addEventListener("click", closeImageModal);
});

document.querySelectorAll("[data-close-file-preview]").forEach((button) => {
  button.addEventListener("click", closeStoredFilePreview);
});

commercialSupportBtn?.addEventListener("click", openSupportModal);
document.querySelectorAll("[data-close-support]").forEach((button) => {
  button.addEventListener("click", closeSupportModal);
});

document.addEventListener("change", (event) => {
  const groupCheck = event.target.closest?.("[data-provider-duplicate-approval]");
  if (groupCheck) {
    handleProviderGroupApprovalChange(groupCheck);
    return;
  }
  const itemCheck = event.target.closest?.("[data-provider-duplicate-item]");
  if (itemCheck) {
    handleProviderItemApprovalChange(itemCheck);
  }
});

["click", "keydown", "input", "change", "mousemove"].forEach((eventName) => {
  document.addEventListener(eventName, touchSession, { passive: true });
});

window.setInterval(checkSessionExpiry, 60000);

document.addEventListener("visibilitychange", () => {
  if (document.hidden || !navigator.onLine) return;
  checkForAppUpdate();
  if (!canSyncCurrentView()) return;
  if (Date.now() - supabaseLastRefreshAt < SUPABASE_FOCUS_REFRESH_MIN_MS) return;
  restoreModulesFromSupabaseIfNeeded();
  sincronizarTareasPendientesSupabase();
});

window.addEventListener("online", () => {
  if (!canSyncCurrentView()) return;
  restoreModulesFromSupabaseIfNeeded();
  sincronizarTareasPendientesSupabase();
});

safeRenderAll();
restorePersistedViewAfterLoad();
restoreStateFromInternalBackupIfNeeded();
restoreStateFromSupabaseIfNeeded();
restoreBrandingFromSupabaseIfNeeded();
if (canSyncCurrentView()) restoreModulesFromSupabaseIfNeeded();
if (session.role !== "public") reconcileTasksForCurrentBuild();
startSupabaseModulePolling();
migrateIndexedDbFilesToSharedPc();
checkForAppUpdate();
window.setInterval(checkForAppUpdate, 5 * 60 * 1000);



