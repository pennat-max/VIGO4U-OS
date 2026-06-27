const APP_TITLE = 'VIGO4U OS CEO Dashboard';

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
      greeting: 'Good Morning',
      role: 'CEO'
    },
    companyStatus: {
      progressLabel: 'VIGO4U ERP Progress',
      progress: 18,
      currentMission: 'Mission 001 - CEO Dashboard',
      currentTask: 'Build mobile-first ERP home screen',
      eta: 'Today'
    },
    aiStatus: {
      activity: 'Designing the ERP command center with mock data',
      lastUpdate: formatDashboardTime_(now),
      state: 'Active'
    },
    businessSummary: [
      { label: 'Customers', value: 128, trend: '+12 this month', tone: 'blue' },
      { label: 'Vehicles', value: 342, trend: '48 in workshop', tone: 'green' },
      { label: 'Invoices', value: 76, trend: '18 awaiting payment', tone: 'amber' },
      { label: 'Payments', value: 61, trend: '9 need allocation', tone: 'violet' },
      { label: 'Workshop', value: 24, trend: '7 urgent jobs', tone: 'rose' }
    ],
    financeSummary: [
      { label: 'Cash', value: '$284,500', note: 'Available balance' },
      { label: 'Receivable', value: '$96,200', note: 'Open customer balance' },
      { label: 'Payable', value: '$41,800', note: 'Supplier and workshop costs' },
      { label: 'Profit', value: '$67,450', note: 'Projected net profit' }
    ],
    notifications: [
      { title: 'Payment allocation needed', detail: '9 payments are waiting for invoice or vehicle allocation.', priority: 'High' },
      { title: 'Workshop approval queue', detail: '5 vehicle costs are pending approval before totals update.', priority: 'Review' },
      { title: 'Export documents', detail: '3 shipments need document checks before release.', priority: 'Today' }
    ],
    quickActions: [
      { label: 'Customers', icon: 'people' },
      { label: 'Vehicles', icon: 'car' },
      { label: 'Invoice', icon: 'invoice' },
      { label: 'Payment', icon: 'payment' },
      { label: 'Workshop', icon: 'tools' },
      { label: 'Reports', icon: 'chart' },
      { label: 'Settings', icon: 'settings' }
    ]
  };
}

function apiGetDashboardData() {
  return getDashboardData();
}

function formatDashboardTime_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'MMM d, yyyy HH:mm');
}
