# VIGO4U OS AI Control Center

อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง

## Mission หลักตอนนี้

สร้าง CEO Dashboard ก่อนเป็น home screen ของ VIGO4U OS ERP

Mission file:

- `docs/ai-control-center/MISSION-CEO-DASHBOARD-001.md`

## กติกาการทำงาน

- ใช้ Google Apps Script Web App เป็น MVP
- ใช้ mock data ก่อน
- ทำ UI ภาษาไทย
- Mobile-first
- Dark mode
- Card layout
- Large buttons
- Dashboard ต้องเปิดได้จริง

## Project ที่ใช้ตอนนี้

Apps Script project อยู่ใน:

- `VIGO4U-OS-CEO-Dashboard/`

ไฟล์หลัก:

- `Code.gs`
- `Index.html`
- `appsscript.json`

## ห้ามทำตอนนี้

- ห้ามต่อ ERP modules จริงจนกว่า CEO Dashboard จะเปิดและผ่านการตรวจ
- ห้ามเปลี่ยน business rules โดยไม่มี mission
- ห้ามย้าย project structure โดยไม่จำเป็น

## หลังทำงานเสร็จ

ต้องอัปเดต:

- `docs/ai-control-center/CURRENT_STATUS.md`
- `docs/ai-control-center/DAILY_REPORT.md`
- `docs/ai-control-center/NEXT_ACTION.md`
- `docs/ai-control-center/BLOCKERS.md`

