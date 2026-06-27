const APP_TITLE = 'VIGO4U OS - แดชบอร์ดผู้บริหาร';

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
  const now = new Date();

  return {
    user: {
      name: 'Tony',
      greeting: 'สวัสดีตอนเช้า',
      role: 'ผู้บริหาร'
    },
    companyStatus: {
      progressLabel: 'สถานะ VIGO4U ERP',
      progress: 22,
      currentMission: 'MISSION-CEO-DASHBOARD-001',
      currentTask: 'สร้างแดชบอร์ดผู้บริหารสำหรับมือถือ',
      eta: 'พร้อมใช้งานวันนี้'
    },
    aiStatus: {
      activity: 'AI กำลังดูแลแดชบอร์ดผู้บริหารและเตรียมโครง ERP ด้วยข้อมูล mock',
      lastUpdate: formatDashboardTime_(now),
      state: 'กำลังทำงาน'
    },
    businessSummary: [
      { label: 'ลูกค้า', value: 128, trend: '+12 เดือนนี้', tone: 'blue' },
      { label: 'รถทั้งหมด', value: 342, trend: '48 คันอยู่ในงานซ่อม', tone: 'green' },
      { label: 'ใบแจ้งหนี้', value: 76, trend: '18 ใบรอชำระ', tone: 'amber' },
      { label: 'การชำระเงิน', value: 61, trend: '9 รายการรอจัดสรร', tone: 'violet' },
      { label: 'เวิร์กช็อป', value: 24, trend: '7 งานเร่งด่วน', tone: 'rose' }
    ],
    financeSummary: [
      { label: 'เงินสด', value: '$284,500', note: 'ยอดเงินพร้อมใช้' },
      { label: 'ลูกหนี้', value: '$96,200', note: 'ยอดค้างรับจากลูกค้า' },
      { label: 'เจ้าหนี้', value: '$41,800', note: 'ต้นทุนซัพพลายเออร์และเวิร์กช็อป' },
      { label: 'กำไร', value: '$67,450', note: 'กำไรสุทธิคาดการณ์' }
    ],
    notifications: [
      { title: 'จัดสรรเงินชำระ', detail: 'มี 9 รายการที่ยังไม่ได้ผูกกับใบแจ้งหนี้หรือรถ', priority: 'ด่วน' },
      { title: 'อนุมัติต้นทุนรถ', detail: 'มี 5 รายการที่รออนุมัติก่อนอัปเดตยอดรวม', priority: 'ตรวจสอบ' },
      { title: 'เอกสารส่งออก', detail: 'มี 3 shipment ที่ต้องตรวจเอกสารก่อนปล่อยงาน', priority: 'วันนี้' }
    ],
    blockers: [
      { title: 'ยังไม่เชื่อมข้อมูลจริง', detail: 'แดชบอร์ดใช้ mock data จนกว่าจะต่อโมดูล ERP' },
      { title: 'สิทธิ์การมองเห็น Staff', detail: 'ต้องทำ permission matrix ก่อนเปิดข้อมูลการเงินให้ role อื่น' },
      { title: 'จัดสรรเงินและ statement', detail: 'ต้องออกแบบ ledger ก่อนเชื่อม statement ลูกค้า' }
    ],
    todayTasks: [
      { title: 'ตรวจ Dashboard บนมือถือ', status: 'วันนี้' },
      { title: 'ยืนยัน mission ถัดไป', status: 'รอเลือก' },
      { title: 'เตรียม schema ลูกค้าและรถ', status: 'ถัดไป' }
    ],
    quickActions: [
      { label: 'ลูกค้า', icon: 'people' },
      { label: 'รถ', icon: 'car' },
      { label: 'ใบแจ้งหนี้', icon: 'invoice' },
      { label: 'รับเงิน', icon: 'payment' },
      { label: 'เวิร์กช็อป', icon: 'tools' },
      { label: 'รายงาน', icon: 'chart' },
      { label: 'ตั้งค่า', icon: 'settings' }
    ]
  };
}

function apiGetDashboardData() {
  return getDashboardData();
}

function setup() {
  PropertiesService.getScriptProperties().setProperties({
    APP_TITLE,
    DASHBOARD_MODE: 'MOCK',
    CURRENT_MISSION: 'Mission 001 - CEO Dashboard',
    LAST_SETUP_AT: new Date().toISOString()
  });

  return {
    ok: true,
    message: 'ตั้งค่าแดชบอร์ดผู้บริหาร VIGO4U OS สำเร็จ',
    mode: 'MOCK'
  };
}

function seedDemoData() {
  PropertiesService.getScriptProperties().setProperty('MOCK_DATA_READY', 'true');

  return {
    ok: true,
    message: 'ข้อมูล mock สำหรับแดชบอร์ดพร้อมใช้งาน',
    sections: [
      'Welcome Header',
      'Company Status',
      'AI Status',
      'Business Summary',
      'Finance Summary',
      'Notifications',
      'Quick Actions'
    ]
  };
}

function formatDashboardTime_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'MMM d, yyyy HH:mm');
}
