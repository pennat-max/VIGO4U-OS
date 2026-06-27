# MISSION

Current mission: Customer Module MVP

Goal: replace dashboard mock customer data with real customer data from Google Sheets.

Priority:
1. Keep the deployed Thai CEO Dashboard working.
2. Build Customer module first.
3. Connect customer statistics to the dashboard.
4. Commit and push before stopping.
5. Update control-center status files before stopping.

Required customer features:
- Customer list
- Customer detail
- Create customer
- Edit customer
- Search customer
- Customer status
- Dashboard customer statistics

Data source:
Google Sheets through repository layer.

Architecture rules:
- UI uses service layer.
- Service layer uses repository layer.
- Repository handles Google Sheets.
- Use stable customer_id.
- Use header mapping.
- Do not use row number as customer ID.

Do not start invoice/payment modules yet.
Do not redesign the dashboard unless needed to show real customer data.
