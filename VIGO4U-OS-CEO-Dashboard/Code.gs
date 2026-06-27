const APP_TITLE = 'VIGO4U OS - แดชบอร์ดผู้บริหาร';
const SCRIPT_KEYS = {
  spreadsheetId: 'VIGO4U_OS_SPREADSHEET_ID',
  driveFolderId: 'VIGO4U_OS_DRIVE_FOLDER_ID',
  authMode: 'VIGO4U_OS_AUTH_MODE'
};

const SHEETS = {
  customers: 'Customers',
  vehicles: 'Vehicles',
  invoices: 'Invoices',
  invoiceItems: 'InvoiceItems',
  payments: 'Payments',
  allocations: 'PaymentAllocations',
  workOrders: 'WorkOrders',
  workshopCosts: 'WorkshopCosts',
  documents: 'Documents',
  auditLog: 'AuditLog',
  users: 'Users'
};

const CUSTOMER_HEADERS = [
  'customer_id',
  'customer_name',
  'company_name',
  'phone',
  'email',
  'country',
  'status',
  'source',
  'notes',
  'created_at',
  'updated_at'
];

const VEHICLE_HEADERS = [
  'vehicle_id',
  'customer_id',
  'stock_no',
  'vin',
  'make',
  'model',
  'year',
  'color',
  'status',
  'location',
  'photo_url',
  'document_url',
  'notes',
  'created_at',
  'updated_at'
];

const INVOICE_HEADERS = [
  'invoice_id',
  'customer_id',
  'invoice_no',
  'invoice_date',
  'due_date',
  'status',
  'currency',
  'subtotal',
  'paid_amount',
  'balance_amount',
  'notes',
  'created_at',
  'updated_at'
];

const INVOICE_ITEM_HEADERS = [
  'invoice_item_id',
  'invoice_id',
  'vehicle_id',
  'description',
  'qty',
  'unit_price',
  'line_total',
  'status',
  'created_at',
  'updated_at'
];

const PAYMENT_HEADERS = [
  'payment_id',
  'customer_id',
  'payment_date',
  'method',
  'currency',
  'amount',
  'allocated_amount',
  'credit_amount',
  'status',
  'notes',
  'created_at',
  'updated_at'
];

const ALLOCATION_HEADERS = [
  'allocation_id',
  'payment_id',
  'invoice_id',
  'invoice_item_id',
  'vehicle_id',
  'amount',
  'notes',
  'created_at',
  'updated_at'
];

const WORK_ORDER_HEADERS = [
  'work_order_id',
  'vehicle_id',
  'assigned_to',
  'status',
  'task',
  'notes',
  'created_at',
  'updated_at'
];

const WORKSHOP_COST_HEADERS = [
  'cost_id',
  'work_order_id',
  'vehicle_id',
  'cost_type',
  'amount',
  'status',
  'requested_by',
  'approved_by',
  'notes',
  'created_at',
  'updated_at'
];

const DOCUMENT_HEADERS = [
  'document_id',
  'entity_type',
  'entity_id',
  'file_name',
  'drive_file_id',
  'drive_url',
  'visibility',
  'notes',
  'created_at',
  'updated_at'
];

const AUDIT_LOG_HEADERS = [
  'audit_id',
  'timestamp',
  'user',
  'role',
  'action',
  'entity_type',
  'entity_id',
  'before_summary',
  'after_summary',
  'metadata'
];

const USER_HEADERS = [
  'user_id',
  'email',
  'display_name',
  'role',
  'customer_id',
  'staff_name',
  'status',
  'notes',
  'created_at',
  'updated_at'
];

const APP_MODE = 'PRODUCTION_HARDENING_DEMO';
const AUTH_MODES = {
  demo: 'DEMO_ROLE_SELECTOR',
  google: 'GOOGLE_USER_MAPPING'
};
const ROLE_KEYS = ['admin', 'finance', 'staff', 'customer'];
const FINANCIAL_ACTIONS = ['save_invoice', 'save_payment', 'save_allocation', 'get_statement', 'get_reports'];
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Index');
  template.dashboardData = JSON.stringify(getDashboardData(requestContext_(e && e.parameter ? e.parameter : {})));

  return template
    .evaluate()
    .setTitle(APP_TITLE)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

function getDashboardData(request) {
  setup();
  seedDemoData();

  const context = requestContext_(request || {});
  const now = new Date();
  const customers = customerServiceList_({});
  const customerStats = customerServiceStats_(customers);
  const vehicles = vehicleServiceList_({});
  const vehicleStats = vehicleServiceStats_(vehicles);
  recalculateFinancials_();
  const invoices = invoiceServiceList_({});
  const invoiceItems = invoiceItemRepository_().list();
  const payments = paymentServiceList_({});
  const allocations = allocationServiceList_({});
  const workOrders = workOrderServiceList_({});
  const workshopCosts = workshopCostServiceList_({});
  const documents = documentServiceList_({});
  const invoiceStats = invoiceServiceStats_(invoices);
  const paymentStats = paymentServiceStats_(payments);
  const workshopStats = workshopServiceStats_(workOrders, workshopCosts);
  const documentStats = documentServiceStats_(documents);
  const reportSummary = reportServiceSummary_();
  const productionGate = productionGateSummary_();

  const dashboard = {
    mode: APP_MODE,
    security: {
      role: context.role,
      user: context.user,
      customerId: context.customerId,
      staffName: context.staffName,
      authMode: context.authMode,
      permissions: permissionsForRole_(context.role),
      productionGate
    },
    user: {
      name: 'Tony',
      greeting: 'สวัสดีตอนเช้า',
      role: 'ผู้บริหาร'
    },
    companyStatus: {
      progressLabel: 'สถานะ VIGO4U ERP',
      progress: 100,
      currentMission: 'Mission 011 - QA and Deployment',
      currentTask: 'ERP MVP modules deployed',
      eta: 'พร้อมใช้งานวันนี้'
    },
    aiStatus: {
      activity: 'AI ต่อ ERP MVP ครบชุดแล้ว: invoice, payment, allocation, statement, workshop, documents, reports และ QA status',
      lastUpdate: formatDashboardTime_(now),
      state: 'กำลังทำงาน'
    },
    businessSummary: [
      { label: 'ลูกค้า', value: customerStats.total, trend: `${customerStats.active} active / ${customerStats.prospect} prospect`, tone: 'blue' },
      { label: 'รถทั้งหมด', value: vehicleStats.total, trend: `${vehicleStats.available} available / ${vehicleStats.workshop} workshop`, tone: 'green' },
      { label: 'ใบแจ้งหนี้', value: invoiceStats.total, trend: `${invoiceStats.open} open / ${invoiceStats.paid} paid`, tone: 'amber' },
      { label: 'การชำระเงิน', value: paymentStats.count, trend: `${formatMoney_(paymentStats.allocated)} allocated / ${formatMoney_(paymentStats.credit)} credit`, tone: 'violet' },
      { label: 'เวิร์กช็อป', value: workshopStats.openOrders, trend: `${formatMoney_(workshopStats.approvedCosts)} approved costs`, tone: 'rose' }
    ],
    customerModule: {
      stats: customerStats,
      customers
    },
    vehicleModule: {
      stats: vehicleStats,
      vehicles
    },
    erpModule: {
      invoices,
      invoiceItems,
      payments,
      allocations,
      workOrders,
      workshopCosts,
      documents,
      statements: statementServiceList_(),
      reports: reportSummary,
      productionGate,
      stats: {
        invoices: invoiceStats,
        payments: paymentStats,
        workshop: workshopStats,
        documents: documentStats
      }
    },
    financeSummary: [
      { label: 'เงินสด', value: formatMoney_(paymentStats.total), note: 'ยอดรับเงินทั้งหมด' },
      { label: 'ลูกหนี้', value: formatMoney_(invoiceStats.balance), note: 'ยอดค้างรับจากใบแจ้งหนี้' },
      { label: 'เจ้าหนี้', value: formatMoney_(workshopStats.pendingCosts), note: 'ต้นทุนเวิร์กช็อปรออนุมัติ' },
      { label: 'กำไร', value: formatMoney_(reportSummary.estimatedProfit), note: `Owner ${formatMoney_(reportSummary.ownerShare)} / VIGO ${formatMoney_(reportSummary.vigoShare)}` }
    ],
    notifications: [
      { title: 'ERP MVP ครบตาม mission queue', detail: 'Invoice, Payment, Allocation, Statement, Workshop, Documents, Reports และ QA status พร้อมใช้งาน', priority: 'สำเร็จ' },
      { title: 'ข้อมูลรถเชื่อม Google Sheets แล้ว', detail: 'Vehicle list, detail, create, edit, search, status และ metadata พร้อมใช้งาน', priority: 'ใหม่' },
      { title: 'ข้อมูลลูกค้าเชื่อม Google Sheets แล้ว', detail: 'Customer list, detail, create, edit, search และ status พร้อมใช้งาน', priority: 'ใหม่' }
    ],
    blockers: [
      { title: 'Production hardening ยังเหลือ', detail: 'ต้องทำ auth/role UI จริง, audit log และ data validation ก่อนใช้งานจริง' },
      { title: 'Staff visibility rule', detail: 'Staff UI ต้องไม่แสดง buy price, sale price, profit, statement, payments หรือ profit sharing' }
    ],
    todayTasks: [
      { title: 'ตรวจ ERP MVP บนมือถือ', status: 'วันนี้' },
      { title: 'ทดสอบเพิ่มใบแจ้งหนี้และรับเงิน', status: 'พร้อม' },
      { title: 'เตรียม production security pass', status: 'ถัดไป' }
    ],
    quickActions: [
      { label: 'ลูกค้า', icon: 'people', target: 'customers' },
      { label: 'รถ', icon: 'car', target: 'vehicles' },
      { label: 'ใบแจ้งหนี้', icon: 'invoice', target: 'invoices' },
      { label: 'รับเงิน', icon: 'payment', target: 'payments' },
      { label: 'เวิร์กช็อป', icon: 'tools', target: 'workshop' },
      { label: 'รายงาน', icon: 'chart', target: 'reports' },
      { label: 'ตั้งค่า', icon: 'settings', target: 'settings' }
    ]
  };

  dashboard.companyStatus.currentMission = 'Production Hardening Gate 001';
  dashboard.companyStatus.currentTask = 'Role enforcement, audit log, validation, demo governance';
  dashboard.aiStatus.activity = 'Production Hardening Gate: role filtering, audit logging, data validation, document governance, QA checklist';
  dashboard.blockers = [
    { title: 'Real Google identity mapping', detail: 'Role gates are implemented, but production must map signed-in Google users to approved roles before public use.', status: 'Open' },
    { title: 'Real Drive upload path', detail: 'Document metadata and Drive URL are validated in Sheets; binary upload still requires a Drive picker/upload authorization pass.', status: 'Open' }
  ];
  dashboard.todayTasks = [
    { title: 'Verify role views: Admin, Finance, Staff, Customer', status: 'Gate' },
    { title: 'Verify audit rows after create/update actions', status: 'Gate' },
    { title: 'Verify negative amount and invalid allocation rejection', status: 'Gate' }
  ];

  return sanitizeDashboardForRole_(dashboard, context);
}

function apiGetDashboardData(request) {
  return getDashboardData(request || {});
}

function apiListCustomers(request) {
  const context = requestContext_(request || {});
  const customers = sanitizeCustomersForRole_(customerServiceList_(request || {}), context);
  return {
    ok: true,
    customers,
    stats: customerServiceStats_(customers)
  };
}

function apiGetCustomer(customerId, request) {
  const context = requestContext_(request || {});
  const customer = customerServiceGet_(customerId);
  const safeCustomer = sanitizeCustomersForRole_(customer ? [customer] : [], context)[0] || null;
  return {
    ok: Boolean(safeCustomer),
    customer: safeCustomer,
    message: safeCustomer ? '' : 'ไม่พบลูกค้า'
  };
}

function apiSaveCustomer(payload) {
  assertRoleCan_(requestContext_(payload || {}), 'save_customer');
  return {
    ok: true,
    customer: customerServiceSave_(payload || {}),
    customers: customerServiceList_({}),
    stats: customerServiceStats_(customerServiceList_({}))
  };
}

function apiListVehicles(request) {
  const context = requestContext_(request || {});
  const vehicles = sanitizeVehiclesForRole_(vehicleServiceList_(request || {}), context);
  return {
    ok: true,
    vehicles,
    stats: vehicleServiceStats_(vehicles)
  };
}

function apiGetVehicle(vehicleId, request) {
  const context = requestContext_(request || {});
  const vehicle = vehicleServiceGet_(vehicleId);
  const safeVehicle = sanitizeVehiclesForRole_(vehicle ? [vehicle] : [], context)[0] || null;
  return {
    ok: Boolean(safeVehicle),
    vehicle: safeVehicle,
    message: safeVehicle ? '' : 'ไม่พบรถ'
  };
}

function apiSaveVehicle(payload) {
  assertRoleCan_(requestContext_(payload || {}), 'save_vehicle');
  return {
    ok: true,
    vehicle: vehicleServiceSave_(payload || {}),
    vehicles: vehicleServiceList_({}),
    stats: vehicleServiceStats_(vehicleServiceList_({}))
  };
}

function apiGetERPData(request) {
  const context = requestContext_(request || {});
  const data = {
    ok: true,
    invoices: invoiceServiceList_({}),
    invoiceItems: invoiceItemRepository_().list(),
    payments: paymentServiceList_({}),
    allocations: allocationServiceList_({}),
    statements: statementServiceList_(),
    workOrders: workOrderServiceList_({}),
    workshopCosts: workshopCostServiceList_({}),
    documents: documentServiceList_({}),
    reports: reportServiceSummary_()
  };
  return sanitizeErpDataForRole_(data, context);
}

function apiSaveInvoice(payload) {
  assertRoleCan_(requestContext_(payload || {}), 'save_invoice');
  return {
    ok: true,
    invoice: invoiceServiceSave_(payload || {}),
    data: apiGetERPData(payload || {})
  };
}

function apiSavePayment(payload) {
  assertRoleCan_(requestContext_(payload || {}), 'save_payment');
  return {
    ok: true,
    payment: paymentServiceSave_(payload || {}),
    data: apiGetERPData(payload || {})
  };
}

function apiSaveAllocation(payload) {
  assertRoleCan_(requestContext_(payload || {}), 'save_allocation');
  return {
    ok: true,
    allocation: allocationServiceSave_(payload || {}),
    data: apiGetERPData(payload || {})
  };
}

function apiSaveWorkOrder(payload) {
  assertRoleCan_(requestContext_(payload || {}), 'save_work_order');
  return {
    ok: true,
    workOrder: workOrderServiceSave_(payload || {}),
    data: apiGetERPData(payload || {})
  };
}

function apiSaveWorkshopCost(payload) {
  const context = requestContext_(payload || {});
  assertRoleCan_(context, 'save_workshop_cost');
  if (context.role === 'staff' && String((payload || {}).status || 'pending') === 'approved') {
    throw new Error('Staff role cannot approve workshop costs.');
  }
  return {
    ok: true,
    workshopCost: workshopCostServiceSave_(payload || {}),
    data: apiGetERPData(payload || {})
  };
}

function apiSaveDocument(payload) {
  assertRoleCan_(requestContext_(payload || {}), 'save_document');
  return {
    ok: true,
    document: documentServiceSave_(payload || {}),
    data: apiGetERPData(payload || {})
  };
}

function apiUploadDocument(payload) {
  const context = requestContext_(payload || {});
  assertRoleCan_(context, 'save_document');
  const file = (payload || {}).file || {};
  const driveFile = googleDriveRepositoryCreateFile_(file, payload || {});
  const documentPayload = Object.assign({}, payload || {}, {
    file_name: driveFile.file_name,
    drive_file_id: driveFile.drive_file_id,
    drive_url: driveFile.drive_url,
    notes: String((payload || {}).notes || driveFile.permission_note || '').trim()
  });
  delete documentPayload.file;
  return {
    ok: true,
    document: documentServiceSave_(documentPayload),
    data: apiGetERPData(payload || {}),
    driveFile
  };
}

function apiRunProductionHardeningGate(request) {
  const context = requestContext_(request || {});
  return {
    ok: true,
    context,
    gate: productionGateSummary_(),
    staffView: sanitizeErpDataForRole_(apiGetERPData({ role: 'admin' }), { role: 'staff', user: 'Staff A', staffName: 'Staff A', customerId: '' }),
    customerView: sanitizeErpDataForRole_(apiGetERPData({ role: 'admin' }), { role: 'customer', user: 'customer@example.com', staffName: '', customerId: firstCustomerId_() })
  };
}

function setup() {
  const spreadsheet = ensureSpreadsheet_();
  ensureSheet_(spreadsheet, SHEETS.customers, CUSTOMER_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.vehicles, VEHICLE_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.invoices, INVOICE_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.invoiceItems, INVOICE_ITEM_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.payments, PAYMENT_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.allocations, ALLOCATION_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.workOrders, WORK_ORDER_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.workshopCosts, WORKSHOP_COST_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.documents, DOCUMENT_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.auditLog, AUDIT_LOG_HEADERS);
  ensureSheet_(spreadsheet, SHEETS.users, USER_HEADERS);

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty(SCRIPT_KEYS.authMode)) {
    props.setProperty(SCRIPT_KEYS.authMode, AUTH_MODES.demo);
  }

  props.setProperties({
    APP_TITLE,
    DASHBOARD_MODE: APP_MODE,
    CURRENT_MISSION: 'Production Hardening Gate 001',
    LAST_SETUP_AT: new Date().toISOString()
  });

  return {
    ok: true,
    message: 'ตั้งค่า VIGO4U OS ERP MVP สำเร็จ',
    spreadsheetId: spreadsheet.getId()
  };
}

function seedDemoData() {
  const customerCount = seedDemoCustomers_();
  const vehicleCount = seedDemoVehicles_();
  const invoiceCount = seedDemoInvoices_();
  const paymentCount = seedDemoPayments_();
  const workshopCount = seedDemoWorkshop_();
  const documentCount = seedDemoDocuments_();
  return {
    ok: true,
    message: 'ตรวจข้อมูล demo ERP MVP สำเร็จ',
    customers: customerCount,
    vehicles: vehicleCount,
    invoices: invoiceCount,
    payments: paymentCount,
    workshop: workshopCount,
    documents: documentCount
  };
}

function seedDemoCustomers_() {
  const repo = customerRepository_();
  const existing = repo.list();
  if (existing.length > 0) {
    return existing.length;
  }

  [
    {
      customer_name: 'Somchai Auto Export',
      company_name: 'Somchai Auto Export Co., Ltd.',
      phone: '+66 81 222 4411',
      email: 'somchai@example.com',
      country: 'Thailand',
      status: 'active',
      source: 'CEO referral',
      notes: 'ลูกค้าหลักสำหรับรถส่งออก'
    },
    {
      customer_name: 'Nguyen Motors',
      company_name: 'Nguyen Motors Trading',
      phone: '+84 90 778 1122',
      email: 'nguyen@example.com',
      country: 'Vietnam',
      status: 'prospect',
      source: 'Line',
      notes: 'สนใจรถตู้และ SUV'
    },
    {
      customer_name: 'Khan Imports',
      company_name: 'Khan Imports',
      phone: '+971 55 310 9981',
      email: 'khan@example.com',
      country: 'UAE',
      status: 'active',
      source: 'Website',
      notes: 'ต้องการเอกสารส่งออกครบชุด'
    },
    {
      customer_name: 'Mekong Fleet',
      company_name: 'Mekong Fleet Services',
      phone: '+856 20 5555 0188',
      email: 'mekong@example.com',
      country: 'Laos',
      status: 'inactive',
      source: 'Old customer',
      notes: 'รอติดตามรอบถัดไป'
    }
  ].forEach((customer) => repo.save(customer));

  return repo.list().length;
}

function seedDemoVehicles_() {
  const repo = vehicleRepository_();
  const existing = repo.list();
  if (existing.length > 0) {
    return existing.length;
  }

  [
    {
      stock_no: 'VGO-001',
      vin: 'JTEBU11F700100001',
      make: 'Toyota',
      model: 'Fortuner',
      year: '2019',
      color: 'White',
      status: 'available',
      location: 'Bangkok Yard',
      photo_url: 'https://drive.google.com/example-photo-001',
      document_url: 'https://drive.google.com/example-doc-001',
      notes: 'รถพร้อมเสนอขาย'
    },
    {
      stock_no: 'VGO-002',
      vin: 'MROFR22G100200002',
      make: 'Toyota',
      model: 'Hilux Revo',
      year: '2020',
      color: 'Silver',
      status: 'workshop',
      location: 'VIGO Workshop',
      photo_url: 'https://drive.google.com/example-photo-002',
      document_url: '',
      notes: 'รอเช็กช่วงล่าง'
    },
    {
      stock_no: 'VGO-003',
      vin: 'MR0EX3CD900300003',
      make: 'Toyota',
      model: 'Hiace',
      year: '2018',
      color: 'Black',
      status: 'reserved',
      location: 'Laem Chabang',
      photo_url: '',
      document_url: 'https://drive.google.com/example-doc-003',
      notes: 'ลูกค้าจองไว้ รอเอกสารส่งออก'
    },
    {
      stock_no: 'VGO-004',
      vin: 'JTMHV09J60400004',
      make: 'Toyota',
      model: 'Land Cruiser Prado',
      year: '2017',
      color: 'Pearl',
      status: 'exported',
      location: 'Shipped',
      photo_url: 'https://drive.google.com/example-photo-004',
      document_url: 'https://drive.google.com/example-doc-004',
      notes: 'ส่งออกแล้ว ใช้เป็นข้อมูลตัวอย่าง'
    }
  ].forEach((vehicle) => repo.save(vehicle));

  return repo.list().length;
}

function seedDemoInvoices_() {
  const invoiceRepo = invoiceRepository_();
  if (invoiceRepo.list().length > 0) {
    return invoiceRepo.list().length;
  }

  const customers = customerRepository_().list();
  const vehicles = vehicleRepository_().list();
  const customer = customers[0] || {};
  const firstVehicle = vehicles[0] || {};
  const secondVehicle = vehicles[1] || firstVehicle;

  const invoice = invoiceServiceSave_({
    customer_id: customer.customer_id || '',
    invoice_no: 'INV-2026-0001',
    invoice_date: '2026-06-27',
    due_date: '2026-07-04',
    status: 'issued',
    currency: 'USD',
    notes: 'Demo invoice with multiple vehicles',
    items: [
      {
        vehicle_id: firstVehicle.vehicle_id || '',
        description: `${firstVehicle.year || ''} ${firstVehicle.make || 'Toyota'} ${firstVehicle.model || 'Vehicle'}`.trim(),
        qty: 1,
        unit_price: 28500,
        status: 'open'
      },
      {
        vehicle_id: secondVehicle.vehicle_id || '',
        description: `${secondVehicle.year || ''} ${secondVehicle.make || 'Toyota'} ${secondVehicle.model || 'Vehicle'}`.trim(),
        qty: 1,
        unit_price: 22500,
        status: 'open'
      }
    ]
  });

  invoiceServiceSave_({
    customer_id: (customers[1] || customer).customer_id || '',
    invoice_no: 'INV-2026-0002',
    invoice_date: '2026-06-27',
    due_date: '2026-07-10',
    status: 'draft',
    currency: 'USD',
    notes: 'Draft export invoice',
    items: [
      {
        vehicle_id: (vehicles[2] || firstVehicle).vehicle_id || '',
        description: 'Vehicle reservation',
        qty: 1,
        unit_price: 19000,
        status: 'open'
      }
    ]
  });

  return invoice ? invoiceRepo.list().length : 0;
}

function seedDemoPayments_() {
  const paymentRepo = paymentRepository_();
  if (paymentRepo.list().length > 0) {
    return paymentRepo.list().length;
  }

  const invoices = invoiceRepository_().list();
  const items = invoiceItemRepository_().list();
  const firstInvoice = invoices[0] || {};
  const firstItem = items.find((item) => item.invoice_id === firstInvoice.invoice_id) || items[0] || {};

  const payment = paymentServiceSave_({
    customer_id: firstInvoice.customer_id || '',
    payment_date: '2026-06-27',
    method: 'Bank Transfer',
    currency: 'USD',
    amount: 30000,
    status: 'partial',
    notes: 'Partial payment demo'
  });

  allocationServiceSave_({
    payment_id: payment.payment_id,
    invoice_id: firstInvoice.invoice_id || '',
    invoice_item_id: firstItem.invoice_item_id || '',
    vehicle_id: firstItem.vehicle_id || '',
    amount: 30000,
    notes: 'Allocated to first invoice item'
  });

  paymentServiceSave_({
    customer_id: firstInvoice.customer_id || '',
    payment_date: '2026-06-27',
    method: 'Cash',
    currency: 'USD',
    amount: 5000,
    status: 'credit',
    notes: 'Unallocated customer credit demo'
  });

  recalculateFinancials_();
  return paymentRepo.list().length;
}

function seedDemoWorkshop_() {
  const workOrderRepo = workOrderRepository_();
  if (workOrderRepo.list().length > 0) {
    return workOrderRepo.list().length;
  }

  const vehicles = vehicleRepository_().list();
  const workshopVehicle = vehicles.find((vehicle) => vehicle.status === 'workshop') || vehicles[0] || {};
  const workOrder = workOrderServiceSave_({
    vehicle_id: workshopVehicle.vehicle_id || '',
    assigned_to: 'Staff A',
    status: 'in_progress',
    task: 'ตรวจช่วงล่างและเตรียมส่งออก',
    notes: 'Staff view must hide financial fields'
  });

  workshopCostServiceSave_({
    work_order_id: workOrder.work_order_id,
    vehicle_id: workshopVehicle.vehicle_id || '',
    cost_type: 'Parts',
    amount: 1200,
    status: 'approved',
    requested_by: 'Staff A',
    approved_by: 'Tony',
    notes: 'Approved cost affects totals'
  });

  workshopCostServiceSave_({
    work_order_id: workOrder.work_order_id,
    vehicle_id: workshopVehicle.vehicle_id || '',
    cost_type: 'Paint',
    amount: 700,
    status: 'pending',
    requested_by: 'Staff A',
    approved_by: '',
    notes: 'Pending cost does not affect totals'
  });

  return workOrderRepo.list().length;
}

function seedDemoDocuments_() {
  const documentRepo = documentRepository_();
  if (documentRepo.list().length > 0) {
    return documentRepo.list().length;
  }

  const vehicles = vehicleRepository_().list();
  const invoices = invoiceRepository_().list();
  documentServiceSave_({
    entity_type: 'vehicle',
    entity_id: (vehicles[0] || {}).vehicle_id || '',
    file_name: 'vehicle-photo-demo.jpg',
    drive_file_id: 'demo-photo-file-id',
    drive_url: 'https://drive.google.com/demo-vehicle-photo',
    visibility: 'internal',
    notes: 'Drive-backed document metadata demo'
  });
  documentServiceSave_({
    entity_type: 'invoice',
    entity_id: (invoices[0] || {}).invoice_id || '',
    file_name: 'invoice-demo.pdf',
    drive_file_id: 'demo-invoice-file-id',
    drive_url: 'https://drive.google.com/demo-invoice',
    visibility: 'customer',
    notes: 'Customer-visible invoice document demo'
  });

  return documentRepo.list().length;
}

function customerServiceList_(request) {
  setup();
  const query = normalizeSearch_(request.query || '');
  const status = String(request.status || '').trim();
  const customers = customerRepository_().list();

  return customers.filter((customer) => {
    const matchesQuery = !query || [
      customer.customer_id,
      customer.customer_name,
      customer.company_name,
      customer.phone,
      customer.email,
      customer.country,
      customer.source,
      customer.notes
    ].some((value) => normalizeSearch_(value).indexOf(query) !== -1);
    const matchesStatus = !status || customer.status === status;
    return matchesQuery && matchesStatus;
  });
}

function customerServiceGet_(customerId) {
  setup();
  return customerRepository_().get(customerId);
}

function customerServiceSave_(payload) {
  setup();
  const before = payload.customer_id ? customerRepository_().get(payload.customer_id) : null;
  const customer = {
    customer_id: String(payload.customer_id || '').trim(),
    customer_name: String(payload.customer_name || '').trim(),
    company_name: String(payload.company_name || '').trim(),
    phone: String(payload.phone || '').trim(),
    email: String(payload.email || '').trim(),
    country: String(payload.country || '').trim(),
    status: String(payload.status || 'prospect').trim(),
    source: String(payload.source || '').trim(),
    notes: String(payload.notes || '').trim()
  };

  if (!customer.customer_name) {
    throw new Error('ต้องระบุชื่อลูกค้า');
  }

  if (['active', 'prospect', 'inactive'].indexOf(customer.status) === -1) {
    customer.status = 'prospect';
  }

  const saved = customerRepository_().save(customer);
  auditLogServiceLog_('save_customer', 'customer', saved.customer_id, before, saved, requestContext_(payload));
  return saved;
}

function customerServiceStats_(customers) {
  const now = new Date();
  const monthKey = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM');
  const stats = {
    total: customers.length,
    active: 0,
    prospect: 0,
    inactive: 0,
    newThisMonth: 0
  };

  customers.forEach((customer) => {
    if (customer.status === 'active') stats.active += 1;
    if (customer.status === 'prospect') stats.prospect += 1;
    if (customer.status === 'inactive') stats.inactive += 1;
    if (String(customer.created_at || '').indexOf(monthKey) === 0) stats.newThisMonth += 1;
  });

  return stats;
}

function vehicleServiceList_(request) {
  setup();
  const query = normalizeSearch_(request.query || '');
  const status = String(request.status || '').trim();
  const vehicles = vehicleRepository_().list();

  return vehicles.filter((vehicle) => {
    const matchesQuery = !query || [
      vehicle.vehicle_id,
      vehicle.customer_id,
      vehicle.stock_no,
      vehicle.vin,
      vehicle.make,
      vehicle.model,
      vehicle.year,
      vehicle.color,
      vehicle.status,
      vehicle.location,
      vehicle.photo_url,
      vehicle.document_url,
      vehicle.notes
    ].some((value) => normalizeSearch_(value).indexOf(query) !== -1);
    const matchesStatus = !status || vehicle.status === status;
    return matchesQuery && matchesStatus;
  });
}

function vehicleServiceGet_(vehicleId) {
  setup();
  return vehicleRepository_().get(vehicleId);
}

function vehicleServiceSave_(payload) {
  setup();
  const before = payload.vehicle_id ? vehicleRepository_().get(payload.vehicle_id) : null;
  const vehicle = {
    vehicle_id: String(payload.vehicle_id || '').trim(),
    customer_id: String(payload.customer_id || '').trim(),
    stock_no: String(payload.stock_no || '').trim(),
    vin: String(payload.vin || '').trim(),
    make: String(payload.make || '').trim(),
    model: String(payload.model || '').trim(),
    year: String(payload.year || '').trim(),
    color: String(payload.color || '').trim(),
    status: String(payload.status || 'available').trim(),
    location: String(payload.location || '').trim(),
    photo_url: String(payload.photo_url || '').trim(),
    document_url: String(payload.document_url || '').trim(),
    notes: String(payload.notes || '').trim()
  };

  if (!vehicle.stock_no && !vehicle.vin) {
    throw new Error('ต้องระบุ Stock No หรือ VIN');
  }

  if (['available', 'purchased', 'workshop', 'reserved', 'exported'].indexOf(vehicle.status) === -1) {
    vehicle.status = 'available';
  }

  const saved = vehicleRepository_().save(vehicle);
  auditLogServiceLog_('save_vehicle', 'vehicle', saved.vehicle_id, before, saved, requestContext_(payload));
  return saved;
}

function vehicleServiceStats_(vehicles) {
  const stats = {
    total: vehicles.length,
    available: 0,
    purchased: 0,
    workshop: 0,
    reserved: 0,
    exported: 0,
    withDocuments: 0
  };

  vehicles.forEach((vehicle) => {
    if (vehicle.status === 'available') stats.available += 1;
    if (vehicle.status === 'purchased') stats.purchased += 1;
    if (vehicle.status === 'workshop') stats.workshop += 1;
    if (vehicle.status === 'reserved') stats.reserved += 1;
    if (vehicle.status === 'exported') stats.exported += 1;
    if (vehicle.photo_url || vehicle.document_url) stats.withDocuments += 1;
  });

  return stats;
}

function invoiceServiceList_(request) {
  setup();
  const query = normalizeSearch_(request.query || '');
  const status = String(request.status || '').trim();
  const invoices = invoiceRepository_().list();

  return invoices.filter((invoice) => {
    const matchesQuery = !query || [
      invoice.invoice_id,
      invoice.customer_id,
      invoice.invoice_no,
      invoice.status,
      invoice.notes
    ].some((value) => normalizeSearch_(value).indexOf(query) !== -1);
    const matchesStatus = !status || invoice.status === status;
    return matchesQuery && matchesStatus;
  });
}

function invoiceServiceSave_(payload) {
  setup();
  const repo = invoiceRepository_();
  const items = Array.isArray(payload.items) ? payload.items : parseInvoiceItems_(payload);
  const invoiceInput = {
    invoice_id: String(payload.invoice_id || '').trim(),
    customer_id: String(payload.customer_id || '').trim(),
    invoice_no: String(payload.invoice_no || createInvoiceNo_()).trim(),
    invoice_date: String(payload.invoice_date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd')).trim(),
    due_date: String(payload.due_date || '').trim(),
    status: String(payload.status || 'draft').trim(),
    currency: String(payload.currency || 'USD').trim(),
    subtotal: 0,
    paid_amount: 0,
    balance_amount: 0,
    notes: String(payload.notes || '').trim()
  };

  if (['draft', 'issued', 'partial', 'paid', 'overdue', 'void'].indexOf(invoiceInput.status) === -1) {
    invoiceInput.status = 'draft';
  }

  validateInvoicePayload_(invoiceInput, items);
  const before = invoiceInput.invoice_id ? repo.get(invoiceInput.invoice_id) : null;
  const invoice = repo.save(invoiceInput);

  if (items.length > 0) {
    const itemRepo = invoiceItemRepository_();
    itemRepo.list()
      .filter((item) => item.invoice_id === invoice.invoice_id)
      .forEach((item) => itemRepo.remove(item.invoice_item_id));

    items.forEach((item) => {
      const qty = toNumber_(item.qty || 1);
      const unitPrice = toNumber_(item.unit_price || item.unitPrice || item.line_total || item.amount || 0);
      itemRepo.save({
        invoice_item_id: String(item.invoice_item_id || '').trim(),
        invoice_id: invoice.invoice_id,
        vehicle_id: String(item.vehicle_id || '').trim(),
        description: String(item.description || item.vehicle_id || 'Vehicle item').trim(),
        qty,
        unit_price: unitPrice,
        line_total: qty * unitPrice,
        status: String(item.status || 'open').trim()
      });
    });
  }

  const saved = recalculateFinancials_().invoices.find((item) => item.invoice_id === invoice.invoice_id) || invoice;
  auditLogServiceLog_('save_invoice', 'invoice', saved.invoice_id, before, saved, requestContext_(payload));
  return saved;
}

function parseInvoiceItems_(payload) {
  const vehicleIds = String(payload.vehicle_ids || payload.vehicle_id || '').split(',').map((value) => value.trim()).filter(Boolean);
  if (vehicleIds.length === 0 && !payload.description) return [];
  const total = toNumber_(payload.subtotal || payload.amount || payload.unit_price || 0);
  const unit = vehicleIds.length > 0 && total ? total / vehicleIds.length : total;
  return (vehicleIds.length ? vehicleIds : ['']).map((vehicleId, index) => ({
    vehicle_id: vehicleId,
    description: String(payload.description || vehicleId || `Invoice item ${index + 1}`).trim(),
    qty: 1,
    unit_price: unit,
    status: 'open'
  }));
}

function invoiceServiceStats_(invoices) {
  return invoices.reduce((stats, invoice) => {
    const balance = toNumber_(invoice.balance_amount);
    stats.total += 1;
    stats.subtotal += toNumber_(invoice.subtotal);
    stats.paid += invoice.status === 'paid' ? 1 : 0;
    stats.open += ['issued', 'partial', 'overdue'].indexOf(invoice.status) !== -1 ? 1 : 0;
    stats.balance += balance;
    if (invoice.status === 'overdue') stats.overdue += 1;
    return stats;
  }, { total: 0, open: 0, paid: 0, overdue: 0, subtotal: 0, balance: 0 });
}

function paymentServiceList_(request) {
  setup();
  const query = normalizeSearch_(request.query || '');
  return paymentRepository_().list().filter((payment) => {
    return !query || [
      payment.payment_id,
      payment.customer_id,
      payment.method,
      payment.status,
      payment.notes
    ].some((value) => normalizeSearch_(value).indexOf(query) !== -1);
  });
}

function paymentServiceSave_(payload) {
  setup();
  const paymentInput = {
    payment_id: String(payload.payment_id || '').trim(),
    customer_id: String(payload.customer_id || '').trim(),
    payment_date: String(payload.payment_date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd')).trim(),
    method: String(payload.method || 'Bank Transfer').trim(),
    currency: String(payload.currency || 'USD').trim(),
    amount: toNumber_(payload.amount),
    allocated_amount: toNumber_(payload.allocated_amount),
    credit_amount: toNumber_(payload.credit_amount),
    status: String(payload.status || 'received').trim(),
    notes: String(payload.notes || '').trim()
  };
  validatePaymentPayload_(paymentInput);
  const before = paymentInput.payment_id ? paymentRepository_().get(paymentInput.payment_id) : null;
  const payment = paymentRepository_().save({
    payment_id: paymentInput.payment_id,
    customer_id: paymentInput.customer_id,
    payment_date: paymentInput.payment_date,
    method: paymentInput.method,
    currency: paymentInput.currency,
    amount: paymentInput.amount,
    allocated_amount: paymentInput.allocated_amount,
    credit_amount: paymentInput.credit_amount,
    status: paymentInput.status,
    notes: paymentInput.notes
  });
  const saved = recalculateFinancials_().payments.find((item) => item.payment_id === payment.payment_id) || payment;
  auditLogServiceLog_('save_payment', 'payment', saved.payment_id, before, saved, requestContext_(payload));
  return saved;
}

function paymentServiceStats_(payments) {
  return payments.reduce((stats, payment) => {
    stats.count += 1;
    stats.total += toNumber_(payment.amount);
    stats.allocated += toNumber_(payment.allocated_amount);
    stats.credit += toNumber_(payment.credit_amount);
    return stats;
  }, { count: 0, total: 0, allocated: 0, credit: 0 });
}

function allocationServiceList_() {
  setup();
  return allocationRepository_().list();
}

function allocationServiceSave_(payload) {
  setup();
  const allocationInput = {
    allocation_id: String(payload.allocation_id || '').trim(),
    payment_id: String(payload.payment_id || '').trim(),
    invoice_id: String(payload.invoice_id || '').trim(),
    invoice_item_id: String(payload.invoice_item_id || '').trim(),
    vehicle_id: String(payload.vehicle_id || '').trim(),
    amount: toNumber_(payload.amount),
    notes: String(payload.notes || '').trim()
  };
  validateAllocationPayload_(allocationInput);
  const before = allocationInput.allocation_id ? allocationRepository_().get(allocationInput.allocation_id) : null;
  const allocation = allocationRepository_().save({
    allocation_id: allocationInput.allocation_id,
    payment_id: allocationInput.payment_id,
    invoice_id: allocationInput.invoice_id,
    invoice_item_id: allocationInput.invoice_item_id,
    vehicle_id: allocationInput.vehicle_id,
    amount: allocationInput.amount,
    notes: allocationInput.notes
  });
  recalculateFinancials_();
  auditLogServiceLog_('save_allocation', 'allocation', allocation.allocation_id, before, allocation, requestContext_(payload));
  return allocation;
}

function statementServiceList_() {
  const customers = customerRepository_().list();
  return customers.map((customer) => statementServiceGet_(customer.customer_id));
}

function statementServiceGet_(customerId) {
  const invoices = invoiceRepository_().list().filter((invoice) => invoice.customer_id === customerId);
  const payments = paymentRepository_().list().filter((payment) => payment.customer_id === customerId);
  const invoiceTotal = sum_(invoices, 'subtotal');
  const paidTotal = sum_(payments, 'allocated_amount');
  const creditTotal = sum_(payments, 'credit_amount');
  return {
    customer_id: customerId,
    invoice_count: invoices.length,
    payment_count: payments.length,
    invoice_total: invoiceTotal,
    paid_total: paidTotal,
    credit_total: creditTotal,
    balance: invoiceTotal - paidTotal - creditTotal
  };
}

function workOrderServiceList_() {
  setup();
  return workOrderRepository_().list();
}

function workOrderServiceSave_(payload) {
  setup();
  const workOrder = {
    work_order_id: String(payload.work_order_id || '').trim(),
    vehicle_id: String(payload.vehicle_id || '').trim(),
    assigned_to: String(payload.assigned_to || '').trim(),
    status: String(payload.status || 'open').trim(),
    task: String(payload.task || '').trim(),
    notes: String(payload.notes || '').trim()
  };
  validateWorkOrderPayload_(workOrder);
  const before = workOrder.work_order_id ? workOrderRepository_().get(workOrder.work_order_id) : null;
  const saved = workOrderRepository_().save(workOrder);
  auditLogServiceLog_('save_work_order', 'work_order', saved.work_order_id, before, saved, requestContext_(payload));
  return saved;
}

function workshopCostServiceList_() {
  setup();
  return workshopCostRepository_().list();
}

function workshopCostServiceSave_(payload) {
  setup();
  const cost = {
    cost_id: String(payload.cost_id || '').trim(),
    work_order_id: String(payload.work_order_id || '').trim(),
    vehicle_id: String(payload.vehicle_id || '').trim(),
    cost_type: String(payload.cost_type || '').trim(),
    amount: toNumber_(payload.amount),
    status: String(payload.status || 'pending').trim(),
    requested_by: String(payload.requested_by || '').trim(),
    approved_by: String(payload.approved_by || '').trim(),
    notes: String(payload.notes || '').trim()
  };
  validateWorkshopCostPayload_(cost);
  const before = cost.cost_id ? workshopCostRepository_().get(cost.cost_id) : null;
  const saved = workshopCostRepository_().save(cost);
  auditLogServiceLog_('save_workshop_cost', 'workshop_cost', saved.cost_id, before, saved, requestContext_(payload));
  return saved;
}

function workshopServiceStats_(workOrders, costs) {
  return {
    totalOrders: workOrders.length,
    openOrders: workOrders.filter((order) => ['open', 'in_progress'].indexOf(order.status) !== -1).length,
    approvedCosts: sum_(costs.filter((cost) => cost.status === 'approved'), 'amount'),
    pendingCosts: sum_(costs.filter((cost) => cost.status === 'pending'), 'amount'),
    rejectedCosts: sum_(costs.filter((cost) => cost.status === 'rejected'), 'amount')
  };
}

function documentServiceList_() {
  setup();
  return documentRepository_().list();
}

function documentServiceSave_(payload) {
  setup();
  const context = requestContext_(payload || {});
  const document = {
    document_id: String(payload.document_id || '').trim(),
    entity_type: String(payload.entity_type || '').trim(),
    entity_id: String(payload.entity_id || '').trim(),
    file_name: String(payload.file_name || '').trim(),
    drive_file_id: String(payload.drive_file_id || '').trim(),
    drive_url: String(payload.drive_url || '').trim(),
    visibility: String(payload.visibility || 'internal').trim(),
    notes: String(payload.notes || '').trim()
  };
  validateDocumentPayload_(document);
  validateDocumentRoleScope_(context, document);
  const before = document.document_id ? documentRepository_().get(document.document_id) : null;
  const saved = documentRepository_().save(document);
  auditLogServiceLog_('save_document', 'document', saved.document_id, before, saved, requestContext_(payload));
  return saved;
}

function documentServiceStats_(documents) {
  return documents.reduce((stats, document) => {
    stats.total += 1;
    if (document.visibility === 'customer') stats.customer += 1;
    if (document.visibility === 'internal') stats.internal += 1;
    if (document.visibility === 'staff') stats.staff += 1;
    return stats;
  }, { total: 0, customer: 0, internal: 0, staff: 0 });
}

function userServiceGetByEmail_(email) {
  setup();
  const normalizedEmail = normalizeSearch_(email);
  if (!normalizedEmail) return null;
  return userRepository_().list().find((user) => normalizeSearch_(user.email) === normalizedEmail) || null;
}

function reportServiceSummary_() {
  recalculateFinancials_();
  const invoices = invoiceRepository_().list();
  const payments = paymentRepository_().list();
  const costs = workshopCostRepository_().list();
  const approvedCosts = sum_(costs.filter((cost) => cost.status === 'approved'), 'amount');
  const invoiceSubtotal = sum_(invoices, 'subtotal');
  const received = sum_(payments, 'amount');
  const estimatedProfit = Math.max(0, invoiceSubtotal - approvedCosts);
  return {
    invoiceSubtotal,
    received,
    receivable: sum_(invoices, 'balance_amount'),
    approvedCosts,
    estimatedProfit,
    ownerShare: estimatedProfit * 0.4,
    vigoShare: estimatedProfit * 0.6,
    rule: 'Profit sharing: 40% owner / 60% VIGO. Pending and rejected costs do not affect totals.'
  };
}

function recalculateFinancials_() {
  const invoiceRepo = invoiceRepository_();
  const itemRepo = invoiceItemRepository_();
  const paymentRepo = paymentRepository_();
  const invoices = invoiceRepo.list();
  const items = itemRepo.list();
  const payments = paymentRepo.list();
  const allocations = allocationRepository_().list();

  invoices.forEach((invoice) => {
    const invoiceItems = items.filter((item) => item.invoice_id === invoice.invoice_id);
    const subtotal = sum_(invoiceItems, 'line_total');
    const paid = sum_(allocations.filter((allocation) => allocation.invoice_id === invoice.invoice_id), 'amount');
    const balance = Math.max(0, subtotal - paid);
    let status = invoice.status;
    if (subtotal > 0 && balance === 0) status = 'paid';
    if (subtotal > 0 && paid > 0 && balance > 0) status = 'partial';
    invoiceRepo.save(Object.assign({}, invoice, {
      subtotal,
      paid_amount: paid,
      balance_amount: balance,
      status
    }));
  });

  payments.forEach((payment) => {
    const allocated = sum_(allocations.filter((allocation) => allocation.payment_id === payment.payment_id), 'amount');
    const amount = toNumber_(payment.amount);
    const credit = Math.max(0, amount - allocated);
    paymentRepo.save(Object.assign({}, payment, {
      allocated_amount: allocated,
      credit_amount: credit,
      status: credit > 0 && allocated > 0 ? 'partial_credit' : (credit > 0 ? 'credit' : 'allocated')
    }));
  });

  return {
    invoices: invoiceRepo.list(),
    payments: paymentRepo.list()
  };
}

function customerRepository_() {
  const sheet = ensureSheet_(ensureSpreadsheet_(), SHEETS.customers, CUSTOMER_HEADERS);

  return {
    list() {
      return readSheetObjects_(sheet).sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
    },
    get(customerId) {
      const id = String(customerId || '').trim();
      return this.list().find((customer) => customer.customer_id === id) || null;
    },
    save(input) {
      const lock = LockService.getScriptLock();
      lock.waitLock(10000);
      try {
        const now = new Date().toISOString();
        const rows = readSheetObjects_(sheet);
        const id = input.customer_id || createCustomerId_();
        const existingIndex = rows.findIndex((row) => row.customer_id === id);
        const existing = existingIndex >= 0 ? rows[existingIndex] : {};
        const customer = Object.assign({}, existing, input, {
          customer_id: id,
          created_at: existing.created_at || now,
          updated_at: now
        });
        const rowValues = CUSTOMER_HEADERS.map((header) => customer[header] || '');

        if (existingIndex >= 0) {
          sheet.getRange(existingIndex + 2, 1, 1, CUSTOMER_HEADERS.length).setValues([rowValues]);
        } else {
          sheet.appendRow(rowValues);
        }

        return customer;
      } finally {
        lock.releaseLock();
      }
    }
  };
}

function vehicleRepository_() {
  const sheet = ensureSheet_(ensureSpreadsheet_(), SHEETS.vehicles, VEHICLE_HEADERS);

  return {
    list() {
      return readSheetObjects_(sheet).sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
    },
    get(vehicleId) {
      const id = String(vehicleId || '').trim();
      return this.list().find((vehicle) => vehicle.vehicle_id === id) || null;
    },
    save(input) {
      const lock = LockService.getScriptLock();
      lock.waitLock(10000);
      try {
        const now = new Date().toISOString();
        const rows = readSheetObjects_(sheet);
        const id = input.vehicle_id || createVehicleId_();
        const existingIndex = rows.findIndex((row) => row.vehicle_id === id);
        const existing = existingIndex >= 0 ? rows[existingIndex] : {};
        const vehicle = Object.assign({}, existing, input, {
          vehicle_id: id,
          created_at: existing.created_at || now,
          updated_at: now
        });
        const rowValues = VEHICLE_HEADERS.map((header) => vehicle[header] || '');

        if (existingIndex >= 0) {
          sheet.getRange(existingIndex + 2, 1, 1, VEHICLE_HEADERS.length).setValues([rowValues]);
        } else {
          sheet.appendRow(rowValues);
        }

        return vehicle;
      } finally {
        lock.releaseLock();
      }
    }
  };
}

function invoiceRepository_() {
  return sheetRepository_(SHEETS.invoices, INVOICE_HEADERS, 'invoice_id', 'INV');
}

function invoiceItemRepository_() {
  return sheetRepository_(SHEETS.invoiceItems, INVOICE_ITEM_HEADERS, 'invoice_item_id', 'ITEM');
}

function paymentRepository_() {
  return sheetRepository_(SHEETS.payments, PAYMENT_HEADERS, 'payment_id', 'PAY');
}

function allocationRepository_() {
  return sheetRepository_(SHEETS.allocations, ALLOCATION_HEADERS, 'allocation_id', 'ALLOC');
}

function workOrderRepository_() {
  return sheetRepository_(SHEETS.workOrders, WORK_ORDER_HEADERS, 'work_order_id', 'WO');
}

function workshopCostRepository_() {
  return sheetRepository_(SHEETS.workshopCosts, WORKSHOP_COST_HEADERS, 'cost_id', 'COST');
}

function documentRepository_() {
  return sheetRepository_(SHEETS.documents, DOCUMENT_HEADERS, 'document_id', 'DOC');
}

function auditLogRepository_() {
  return sheetRepository_(SHEETS.auditLog, AUDIT_LOG_HEADERS, 'audit_id', 'AUDIT');
}

function userRepository_() {
  return sheetRepository_(SHEETS.users, USER_HEADERS, 'user_id', 'USR');
}

function googleDriveRepositoryGetFolder_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(SCRIPT_KEYS.driveFolderId);
  if (existingId) {
    try {
      return DriveApp.getFolderById(existingId);
    } catch (error) {
      props.deleteProperty(SCRIPT_KEYS.driveFolderId);
    }
  }

  const folder = DriveApp.createFolder('VIGO4U OS Documents');
  props.setProperty(SCRIPT_KEYS.driveFolderId, folder.getId());
  return folder;
}

function googleDriveRepositoryCreateFile_(file, documentPayload) {
  validateUploadFile_(file);
  const base64 = String(file.base64 || '').replace(/^data:[^,]+,/, '');
  const bytes = Utilities.base64Decode(base64);
  if (bytes.length > MAX_UPLOAD_BYTES) {
    throw new Error('File is larger than the 10 MB upload limit.');
  }

  const safeName = sanitizeFileName_(file.name);
  const mimeType = String(file.mime_type || file.type || 'application/octet-stream').trim();
  const blob = Utilities.newBlob(bytes, mimeType, safeName);
  const driveFile = googleDriveRepositoryGetFolder_().createFile(blob);
  const visibility = String((documentPayload || {}).visibility || 'internal').trim();
  let permissionNote = 'Drive file is private to the script owner.';

  if (visibility === 'customer') {
    driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    permissionNote = 'Customer-visible Drive file shared with anyone who has the link.';
  }

  return {
    file_name: driveFile.getName(),
    drive_file_id: driveFile.getId(),
    drive_url: driveFile.getUrl(),
    permission_note: permissionNote
  };
}

function sheetRepository_(sheetName, headers, idField, prefix) {
  const sheet = ensureSheet_(ensureSpreadsheet_(), sheetName, headers);

  return {
    list() {
      return readSheetObjects_(sheet).sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
    },
    get(id) {
      const normalizedId = String(id || '').trim();
      return this.list().find((row) => row[idField] === normalizedId) || null;
    },
    save(input) {
      const lock = LockService.getScriptLock();
      lock.waitLock(10000);
      try {
        const now = new Date().toISOString();
        const rows = readSheetObjects_(sheet);
        const id = input[idField] || createEntityId_(prefix);
        const existingIndex = rows.findIndex((row) => row[idField] === id);
        const existing = existingIndex >= 0 ? rows[existingIndex] : {};
        const record = Object.assign({}, existing, input, {
          [idField]: id,
          created_at: existing.created_at || now,
          updated_at: now
        });
        const rowValues = headers.map((header) => record[header] || '');

        if (existingIndex >= 0) {
          sheet.getRange(existingIndex + 2, 1, 1, headers.length).setValues([rowValues]);
        } else {
          sheet.appendRow(rowValues);
        }

        return record;
      } finally {
        lock.releaseLock();
      }
    },
    remove(id) {
      const rows = readSheetObjects_(sheet);
      const existingIndex = rows.findIndex((row) => row[idField] === id);
      if (existingIndex >= 0) {
        sheet.deleteRow(existingIndex + 2);
      }
    }
  };
}

function ensureSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(SCRIPT_KEYS.spreadsheetId);
  if (existingId) {
    try {
      return SpreadsheetApp.openById(existingId);
    } catch (error) {
      props.deleteProperty(SCRIPT_KEYS.spreadsheetId);
    }
  }

  const spreadsheet = SpreadsheetApp.create('VIGO4U OS Data');
  props.setProperty(SCRIPT_KEYS.spreadsheetId, spreadsheet.getId());
  return spreadsheet;
}

function ensureSheet_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const existingHeaders = headerRange.getDisplayValues()[0].map((value) => String(value || '').trim());
  const missingHeader = headers.some((header, index) => existingHeaders[index] !== header);

  if (missingHeader) {
    headerRange.setValues([headers]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function readSheetObjects_(sheet) {
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];

  const headers = values[0].map((value) => String(value || '').trim());
  return values.slice(1)
    .filter((row) => row.some((cell) => String(cell || '').trim()))
    .map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = row[index] || '';
      });
      return record;
    });
}

function createCustomerId_() {
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHHmmss');
  const suffix = Utilities.getUuid().slice(0, 8).toUpperCase();
  return `CUS-${stamp}-${suffix}`;
}

function createVehicleId_() {
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHHmmss');
  const suffix = Utilities.getUuid().slice(0, 8).toUpperCase();
  return `VEH-${stamp}-${suffix}`;
}

function createEntityId_(prefix) {
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHHmmss');
  const suffix = Utilities.getUuid().slice(0, 8).toUpperCase();
  return `${prefix}-${stamp}-${suffix}`;
}

function createInvoiceNo_() {
  return `INV-${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy')}-${Utilities.getUuid().slice(0, 6).toUpperCase()}`;
}

function toNumber_(value) {
  const number = Number(String(value || 0).replace(/,/g, ''));
  return Number.isFinite(number) ? number : 0;
}

function sum_(rows, field) {
  return rows.reduce((total, row) => total + toNumber_(row[field]), 0);
}

function formatMoney_(value) {
  return `$${Math.round(toNumber_(value)).toLocaleString('en-US')}`;
}

function normalizeSearch_(value) {
  return String(value || '').trim().toLowerCase();
}

function formatDashboardTime_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'MMM d, yyyy HH:mm');
}

function requestContext_(input) {
  const payload = input || {};
  const email = safeActiveUserEmail_();
  const mode = authMode_();
  if (mode === AUTH_MODES.google) {
    if (!email) {
      throw new Error('Google sign-in is required for production role mapping.');
    }
    const mappedUser = userServiceGetByEmail_(email);
    if (!mappedUser || mappedUser.status !== 'active') {
      throw new Error('This Google account is not mapped to an active VIGO4U OS role.');
    }
    return {
      role: normalizeRole_(mappedUser.role),
      user: mappedUser.email,
      customerId: String(mappedUser.customer_id || '').trim(),
      staffName: String(mappedUser.staff_name || mappedUser.display_name || '').trim(),
      authMode: mode
    };
  }

  const role = normalizeRole_(payload.role || payload.userRole || (payload.security || {}).role || 'admin');
  return {
    role,
    user: String(payload.user || payload.email || email || role).trim(),
    customerId: String(payload.customer_id || payload.customerId || '').trim(),
    staffName: String(payload.staff_name || payload.staffName || payload.assigned_to || '').trim(),
    authMode: mode
  };
}

function authMode_() {
  return PropertiesService.getScriptProperties().getProperty(SCRIPT_KEYS.authMode) || AUTH_MODES.demo;
}

function safeActiveUserEmail_() {
  try {
    return Session.getActiveUser().getEmail() || '';
  } catch (error) {
    return '';
  }
}

function normalizeRole_(role) {
  const normalized = String(role || 'admin').trim().toLowerCase();
  return ROLE_KEYS.indexOf(normalized) === -1 ? 'admin' : normalized;
}

function permissionsForRole_(role) {
  const normalized = normalizeRole_(role);
  return {
    canViewAll: normalized === 'admin',
    canViewFinance: normalized === 'admin' || normalized === 'finance',
    canEditFinance: normalized === 'admin' || normalized === 'finance',
    canViewProfit: normalized === 'admin',
    canViewStatements: normalized === 'admin' || normalized === 'finance' || normalized === 'customer',
    canViewWorkshop: normalized === 'admin' || normalized === 'staff',
    canSubmitWorkshopCost: normalized === 'admin' || normalized === 'staff',
    canApproveWorkshopCost: normalized === 'admin',
    canViewOwnCustomerData: normalized === 'customer',
    canViewDocumentMetadata: normalized !== 'finance'
  };
}

function assertRoleCan_(context, action) {
  const role = normalizeRole_(context.role);
  const permissions = permissionsForRole_(role);
  if (role === 'staff' && FINANCIAL_ACTIONS.indexOf(action) !== -1) {
    throw new Error('Staff role cannot access financial workflows.');
  }
  if (role === 'customer' && action !== 'get_statement') {
    throw new Error('Customer role can only access own customer-facing records.');
  }
  if (['save_invoice', 'save_payment', 'save_allocation'].indexOf(action) !== -1 && !permissions.canEditFinance) {
    throw new Error('This role cannot edit financial records.');
  }
  if (['save_customer', 'save_vehicle'].indexOf(action) !== -1 && role !== 'admin') {
    throw new Error('Only admin can edit customer and vehicle master records.');
  }
  if (action === 'save_workshop_cost' && !permissions.canSubmitWorkshopCost) {
    throw new Error('This role cannot submit workshop costs.');
  }
  if (action === 'save_work_order' && role !== 'admin' && role !== 'staff') {
    throw new Error('This role cannot edit workshop work orders.');
  }
  if (action === 'save_document' && role !== 'admin' && role !== 'staff') {
    throw new Error('This role cannot edit document metadata.');
  }
}

function sanitizeCustomersForRole_(customers, context) {
  const role = normalizeRole_(context.role);
  if (role === 'admin') return customers;
  if (role === 'customer') {
    return customers.filter((customer) => customer.customer_id === context.customerId);
  }
  return [];
}

function sanitizeVehiclesForRole_(vehicles, context) {
  const role = normalizeRole_(context.role);
  if (role === 'finance') return [];
  if (role === 'customer') {
    return vehicles.filter((vehicle) => vehicle.customer_id === context.customerId);
  }
  return vehicles;
}

function sanitizeDashboardForRole_(dashboard, context) {
  const role = normalizeRole_(context.role);
  const safe = JSON.parse(JSON.stringify(dashboard));
  safe.erpModule = sanitizeErpDataForRole_(safe.erpModule || {}, context);

  if (role === 'finance') {
    safe.customerModule.customers = [];
    safe.vehicleModule.vehicles = [];
    safe.quickActions = safe.quickActions.filter((action) => ['invoices', 'payments', 'reports'].indexOf(action.target) !== -1);
  }

  if (role === 'staff') {
    safe.financeSummary = [];
    safe.businessSummary = safe.businessSummary.filter((item) => ['Payments', 'รับเงิน', 'การชำระเงิน', 'ใบแจ้งหนี้'].indexOf(item.label) === -1);
    safe.customerModule.customers = [];
    safe.quickActions = safe.quickActions.filter((action) => ['vehicles', 'workshop', 'settings'].indexOf(action.target) !== -1);
  }

  if (role === 'customer') {
    const customerId = context.customerId;
    safe.customerModule.customers = safe.customerModule.customers.filter((customer) => customer.customer_id === customerId);
    safe.vehicleModule.vehicles = safe.vehicleModule.vehicles.filter((vehicle) => vehicle.customer_id === customerId);
    safe.financeSummary = [{
      label: 'Balance',
      value: formatMoney_(((safe.erpModule.statements || [])[0] || {}).balance || 0),
      note: 'Own customer balance only'
    }];
    safe.quickActions = safe.quickActions.filter((action) => ['vehicles', 'invoices', 'payments'].indexOf(action.target) !== -1);
  }

  return safe;
}

function sanitizeErpDataForRole_(data, context) {
  const role = normalizeRole_(context.role);
  const safe = JSON.parse(JSON.stringify(data || {}));
  const customerId = String(context.customerId || '').trim();
  const staffName = String(context.staffName || '').trim();

  if (role === 'admin') return safe;

  if (role === 'finance') {
    safe.workOrders = [];
    safe.workshopCosts = [];
    safe.documents = [];
    return safe;
  }

  if (role === 'staff') {
    const workOrders = (safe.workOrders || []).filter((order) => !staffName || order.assigned_to === staffName);
    const workOrderIds = workOrders.map((order) => order.work_order_id);
    safe.invoices = [];
    safe.invoiceItems = [];
    safe.payments = [];
    safe.allocations = [];
    safe.statements = [];
    safe.reports = {};
    safe.workOrders = workOrders;
    safe.workshopCosts = (safe.workshopCosts || []).filter((cost) => workOrderIds.indexOf(cost.work_order_id) !== -1);
    safe.documents = (safe.documents || []).filter((doc) => ['internal', 'staff'].indexOf(doc.visibility) !== -1);
    return safe;
  }

  if (role === 'customer') {
    const invoices = (safe.invoices || []).filter((invoice) => invoice.customer_id === customerId);
    const invoiceIds = invoices.map((invoice) => invoice.invoice_id);
    const payments = (safe.payments || []).filter((payment) => payment.customer_id === customerId);
    const paymentIds = payments.map((payment) => payment.payment_id);
    const vehicleIds = (safe.invoiceItems || [])
      .filter((item) => invoiceIds.indexOf(item.invoice_id) !== -1)
      .map((item) => item.vehicle_id);
    safe.invoices = invoices;
    safe.invoiceItems = (safe.invoiceItems || []).filter((item) => invoiceIds.indexOf(item.invoice_id) !== -1);
    safe.payments = payments;
    safe.allocations = (safe.allocations || []).filter((allocation) => invoiceIds.indexOf(allocation.invoice_id) !== -1 || paymentIds.indexOf(allocation.payment_id) !== -1);
    safe.statements = (safe.statements || []).filter((statement) => statement.customer_id === customerId);
    safe.workOrders = [];
    safe.workshopCosts = [];
    safe.documents = (safe.documents || []).filter((doc) => {
      if (doc.visibility !== 'customer') return false;
      if (doc.entity_type === 'customer') return doc.entity_id === customerId;
      if (doc.entity_type === 'invoice') return invoiceIds.indexOf(doc.entity_id) !== -1;
      if (doc.entity_type === 'vehicle') return vehicleIds.indexOf(doc.entity_id) !== -1;
      return false;
    });
    safe.reports = {};
  }

  return safe;
}

function validateInvoicePayload_(invoice, items) {
  if (!invoice.customer_id) throw new Error('Invoice requires customer_id.');
  if (!customerRepository_().get(invoice.customer_id)) throw new Error('Invoice customer_id does not exist.');
  if (!Array.isArray(items) || items.length === 0) throw new Error('Invoice requires at least one item or vehicle.');
  items.forEach((item) => {
    const qty = toNumber_(item.qty || 1);
    const unitPrice = toNumber_(item.unit_price || item.unitPrice || item.line_total || item.amount || 0);
    if (qty <= 0) throw new Error('Invoice item quantity must be greater than zero.');
    if (unitPrice < 0) throw new Error('Invoice item amount cannot be negative.');
  });
}

function validatePaymentPayload_(payment) {
  if (!payment.customer_id) throw new Error('Payment requires customer_id.');
  if (!customerRepository_().get(payment.customer_id)) throw new Error('Payment customer_id does not exist.');
  if (payment.amount <= 0) throw new Error('Payment amount must be greater than zero.');
}

function validateAllocationPayload_(allocation) {
  if (!allocation.payment_id) throw new Error('Allocation requires payment_id.');
  if (!allocation.invoice_id) throw new Error('Allocation requires invoice_id.');
  if (allocation.amount <= 0) throw new Error('Allocation amount must be greater than zero.');

  const payment = paymentRepository_().get(allocation.payment_id);
  const invoice = invoiceRepository_().get(allocation.invoice_id);
  if (!payment) throw new Error('Allocation payment_id does not exist.');
  if (!invoice) throw new Error('Allocation invoice_id does not exist.');
  if (payment.customer_id !== invoice.customer_id) throw new Error('Payment and invoice must belong to the same customer.');

  const existing = allocationRepository_().get(allocation.allocation_id) || {};
  const otherAllocations = allocationRepository_().list().filter((item) => item.allocation_id !== allocation.allocation_id);
  const paymentAllocated = sum_(otherAllocations.filter((item) => item.payment_id === allocation.payment_id), 'amount');
  const invoiceAllocated = sum_(otherAllocations.filter((item) => item.invoice_id === allocation.invoice_id), 'amount');
  const invoiceSubtotal = sum_(invoiceItemRepository_().list().filter((item) => item.invoice_id === allocation.invoice_id), 'line_total');
  const paymentRemaining = toNumber_(payment.amount) - paymentAllocated;
  const invoiceRemaining = invoiceSubtotal - invoiceAllocated;

  if (allocation.amount > paymentRemaining) throw new Error('Allocation exceeds remaining payment amount.');
  if (allocation.amount > invoiceRemaining) throw new Error('Allocation exceeds remaining invoice balance.');
  if (existing.payment_id && existing.payment_id !== allocation.payment_id) throw new Error('Existing allocation payment_id cannot be changed.');
}

function validateWorkOrderPayload_(workOrder) {
  if (!workOrder.vehicle_id) throw new Error('Work order requires vehicle_id.');
  if (!vehicleRepository_().get(workOrder.vehicle_id)) throw new Error('Work order vehicle_id does not exist.');
  if (!workOrder.task) throw new Error('Work order requires task.');
  if (['open', 'in_progress', 'done', 'cancelled'].indexOf(workOrder.status) === -1) {
    throw new Error('Invalid work order status.');
  }
}

function validateWorkshopCostPayload_(cost) {
  if (!cost.work_order_id) throw new Error('Workshop cost requires work_order_id.');
  if (!cost.vehicle_id) throw new Error('Workshop cost requires vehicle_id.');
  if (!workOrderRepository_().get(cost.work_order_id)) throw new Error('Workshop cost work_order_id does not exist.');
  if (cost.amount < 0) throw new Error('Workshop cost amount cannot be negative.');
  if (['pending', 'approved', 'rejected'].indexOf(cost.status) === -1) throw new Error('Invalid workshop cost status.');
  if (cost.status === 'approved' && !cost.approved_by) throw new Error('Approved workshop cost requires approved_by.');
  if (cost.status === 'approved') {
    const duplicate = workshopCostRepository_().list().find((item) => (
      item.cost_id !== cost.cost_id &&
      item.status === 'approved' &&
      item.work_order_id === cost.work_order_id &&
      item.cost_type === cost.cost_type &&
      toNumber_(item.amount) === toNumber_(cost.amount) &&
      item.requested_by === cost.requested_by
    ));
    if (duplicate) throw new Error('Duplicate approved workshop cost detected.');
  }
}

function validateDocumentPayload_(document) {
  if (!document.entity_type) throw new Error('Document requires entity_type.');
  if (!document.entity_id) throw new Error('Document requires entity_id.');
  if (!document.file_name) throw new Error('Document requires file_name.');
  if (!document.drive_url && !document.drive_file_id) throw new Error('Document requires Drive URL or Drive file ID.');
  if (document.drive_url && !/^https:\/\/drive\.google\.com\//.test(document.drive_url)) {
    throw new Error('Document Drive URL must be a Google Drive URL.');
  }
  if (['internal', 'customer', 'staff'].indexOf(document.visibility) === -1) throw new Error('Invalid document visibility.');
}

function validateUploadFile_(file) {
  if (!file || !file.name) throw new Error('Upload requires file name.');
  if (!file.base64) throw new Error('Upload requires base64 file content.');
}

function validateDocumentRoleScope_(context, document) {
  const role = normalizeRole_(context.role);
  if (role === 'staff') {
    if (['internal', 'staff'].indexOf(document.visibility) === -1) {
      throw new Error('Staff can only create internal or staff documents.');
    }
    if (document.entity_type !== 'work_order') {
      throw new Error('Staff can only attach documents to work orders.');
    }
    const workOrder = workOrderRepository_().get(document.entity_id);
    if (!workOrder) throw new Error('Work order not found for staff document.');
    if (context.staffName && workOrder.assigned_to !== context.staffName) {
      throw new Error('Staff can only attach documents to assigned work orders.');
    }
  }
}

function sanitizeFileName_(name) {
  return String(name || 'upload.bin')
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140) || 'upload.bin';
}

function auditLogServiceLog_(action, entityType, entityId, before, after, context) {
  try {
    const requestContext = requestContext_(context || {});
    auditLogRepository_().save({
      timestamp: new Date().toISOString(),
      user: requestContext.user,
      role: requestContext.role,
      action,
      entity_type: entityType,
      entity_id: entityId,
      before_summary: summarizeRecord_(before),
      after_summary: summarizeRecord_(after),
      metadata: APP_MODE
    });
  } catch (error) {
    console.error(`Audit log failed: ${error.message || error}`);
  }
}

function summarizeRecord_(record) {
  if (!record) return '';
  const scrubbed = Object.assign({}, record);
  ['notes'].forEach((key) => {
    if (String(scrubbed[key] || '').length > 160) scrubbed[key] = String(scrubbed[key]).slice(0, 160);
  });
  return JSON.stringify(scrubbed).slice(0, 900);
}

function productionGateSummary_() {
  const spreadsheet = ensureSpreadsheet_();
  const auditSheet = Boolean(spreadsheet.getSheetByName(SHEETS.auditLog));
  return {
    mode: APP_MODE,
    authMode: authMode_(),
    roleGate: 'implemented_api_and_ui_sanitizers',
    userMapping: 'users_sheet_ready_google_user_mapping_requires_ceo_account_list_and_signed_in_deployment',
    auditLog: auditSheet ? 'ready' : 'missing',
    validation: 'invoice_payment_allocation_workshop_document',
    documentHandling: 'metadata_drive_url_and_drive_binary_upload_path_implemented_google_authorization_required_for_first_upload',
    demoFallback: 'seedDemoData_runs_only_when_sheets_are_empty',
    qaChecklist: [
      'Admin sees all modules and profit sharing.',
      'Finance sees invoice/payment/allocation/statement/report data only.',
      'Staff sees assigned workshop data and no payments, statements, or profit sharing.',
      'Customer sees own invoices, payments, documents, and balance only.',
      'Negative payment/cost values are rejected.',
      'Allocation cannot exceed remaining payment or invoice balance.',
      'Approved workshop costs affect totals; pending/rejected costs do not.',
      'Document upload creates a Drive file, stores metadata in Sheets, and keeps internal/staff files private.'
    ]
  };
}

function firstCustomerId_() {
  const customers = customerRepository_().list();
  return (customers[0] || {}).customer_id || '';
}
