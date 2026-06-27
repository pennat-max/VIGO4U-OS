const APP_TITLE = 'VIGO4U OS - แดชบอร์ดผู้บริหาร';
const SCRIPT_KEYS = {
  spreadsheetId: 'VIGO4U_OS_SPREADSHEET_ID'
};

const SHEETS = {
  customers: 'Customers'
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

function doGet() {
  const template = HtmlService.createTemplateFromFile('Index');
  template.dashboardData = JSON.stringify(getDashboardData());

  return template
    .evaluate()
    .setTitle(APP_TITLE)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

function getDashboardData() {
  setup();
  seedDemoData();

  const now = new Date();
  const customers = customerServiceList_({});
  const customerStats = customerServiceStats_(customers);

  return {
    user: {
      name: 'Tony',
      greeting: 'สวัสดีตอนเช้า',
      role: 'ผู้บริหาร'
    },
    companyStatus: {
      progressLabel: 'สถานะ VIGO4U ERP',
      progress: 31,
      currentMission: 'Mission 002 - Customer Module MVP',
      currentTask: 'เชื่อมข้อมูลลูกค้าจาก Google Sheets',
      eta: 'พร้อมใช้งานวันนี้'
    },
    aiStatus: {
      activity: 'AI กำลังต่อ Customer Module และอัปเดตสถิติลูกค้าแบบ live จาก Google Sheets',
      lastUpdate: formatDashboardTime_(now),
      state: 'กำลังทำงาน'
    },
    businessSummary: [
      { label: 'ลูกค้า', value: customerStats.total, trend: `${customerStats.active} active / ${customerStats.prospect} prospect`, tone: 'blue' },
      { label: 'รถทั้งหมด', value: 342, trend: '48 คันอยู่ในงานซ่อม', tone: 'green' },
      { label: 'ใบแจ้งหนี้', value: 76, trend: '18 ใบรอชำระ', tone: 'amber' },
      { label: 'การชำระเงิน', value: 61, trend: '9 รายการรอจัดสรร', tone: 'violet' },
      { label: 'เวิร์กช็อป', value: 24, trend: '7 งานเร่งด่วน', tone: 'rose' }
    ],
    customerModule: {
      stats: customerStats,
      customers
    },
    financeSummary: [
      { label: 'เงินสด', value: '$284,500', note: 'ยอดเงินพร้อมใช้' },
      { label: 'ลูกหนี้', value: '$96,200', note: 'ยอดค้างรับจากลูกค้า' },
      { label: 'เจ้าหนี้', value: '$41,800', note: 'ต้นทุนซัพพลายเออร์และเวิร์กช็อป' },
      { label: 'กำไร', value: '$67,450', note: 'กำไรสุทธิคาดการณ์' }
    ],
    notifications: [
      { title: 'ข้อมูลลูกค้าเชื่อม Google Sheets แล้ว', detail: 'Customer list, detail, create, edit, search และ status พร้อมใช้งาน', priority: 'ใหม่' },
      { title: 'จัดสรรเงินชำระ', detail: 'มี 9 รายการที่ยังไม่ได้ผูกกับใบแจ้งหนี้หรือรถ', priority: 'ถัดไป' },
      { title: 'อนุมัติต้นทุนรถ', detail: 'มี 5 รายการที่รออนุมัติก่อนอัปเดตยอดรวม', priority: 'ตรวจสอบ' }
    ],
    blockers: [
      { title: 'ข้อมูลจริงยังจำกัดที่ลูกค้า', detail: 'Mission นี้เชื่อมเฉพาะ Customer Module ตามคิว ยังไม่เริ่ม invoice/payment' },
      { title: 'สิทธิ์การมองเห็น Staff', detail: 'ต้องทำ permission matrix ก่อนเปิดข้อมูลการเงินให้ role อื่น' }
    ],
    todayTasks: [
      { title: 'ตรวจ Customer Module บนมือถือ', status: 'วันนี้' },
      { title: 'เพิ่ม/แก้ไขลูกค้าทดสอบ', status: 'พร้อม' },
      { title: 'เตรียม Vehicle Module MVP', status: 'ถัดไป' }
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
}

function apiGetDashboardData() {
  return getDashboardData();
}

function apiListCustomers(request) {
  return {
    ok: true,
    customers: customerServiceList_(request || {}),
    stats: customerServiceStats_(customerServiceList_({}))
  };
}

function apiGetCustomer(customerId) {
  const customer = customerServiceGet_(customerId);
  return {
    ok: Boolean(customer),
    customer,
    message: customer ? '' : 'ไม่พบลูกค้า'
  };
}

function apiSaveCustomer(payload) {
  return {
    ok: true,
    customer: customerServiceSave_(payload || {}),
    customers: customerServiceList_({}),
    stats: customerServiceStats_(customerServiceList_({}))
  };
}

function setup() {
  const spreadsheet = ensureSpreadsheet_();
  ensureSheet_(spreadsheet, SHEETS.customers, CUSTOMER_HEADERS);

  PropertiesService.getScriptProperties().setProperties({
    APP_TITLE,
    DASHBOARD_MODE: 'SHEETS_CUSTOMER_MVP',
    CURRENT_MISSION: 'Mission 002 - Customer Module MVP',
    LAST_SETUP_AT: new Date().toISOString()
  });

  return {
    ok: true,
    message: 'ตั้งค่า VIGO4U OS Customer Module สำเร็จ',
    spreadsheetId: spreadsheet.getId()
  };
}

function seedDemoData() {
  const repo = customerRepository_();
  const existing = repo.list();
  if (existing.length > 0) {
    return {
      ok: true,
      message: 'มีข้อมูลลูกค้าอยู่แล้ว',
      count: existing.length
    };
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

  return {
    ok: true,
    message: 'สร้างข้อมูลลูกค้า demo สำเร็จ',
    count: repo.list().length
  };
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

  return customerRepository_().save(customer);
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

function normalizeSearch_(value) {
  return String(value || '').trim().toLowerCase();
}

function formatDashboardTime_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'MMM d, yyyy HH:mm');
}
