# MISSION

Current mission: Invoice Module MVP

Goal: create invoices for one customer with multiple vehicles.

Priority:
1. Keep the deployed Thai CEO Dashboard working.
2. Build Invoice module after Vehicle module.
3. Connect invoice statistics to the dashboard.
4. Commit and push before stopping.
5. Update control-center status files before stopping.

Required invoice features:
- Invoice list
- Invoice detail
- Create invoice for one customer
- Attach multiple vehicles to one invoice
- Invoice totals
- Invoice status
- Dashboard invoice statistics

Data source:
Google Sheets through repository layer.

Architecture rules:
- UI uses service layer.
- Service layer uses repository layer.
- Repository handles Google Sheets.
- Use stable invoice_id.
- Use header mapping.
- Do not use row number as invoice ID.
- One customer has many invoices.
- One invoice has many vehicles.

Do not start payment/allocation modules yet.
Do not redesign the dashboard unless needed to show real invoice data.
