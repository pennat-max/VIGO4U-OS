# MISSION

Current mission: Vehicle Module MVP

Goal: add the Vehicle Module after Customer Module MVP is complete.

Priority:
1. Keep the deployed Thai CEO Dashboard working.
2. Build Vehicle module after Customer module.
3. Connect vehicle statistics to the dashboard.
4. Commit and push before stopping.
5. Update control-center status files before stopping.

Required vehicle features:
- Vehicle list
- Vehicle detail
- Create vehicle
- Edit vehicle
- Search vehicle
- Vehicle status
- Photos/documents metadata
- Dashboard vehicle statistics

Data source:
Google Sheets through repository layer.

Architecture rules:
- UI uses service layer.
- Service layer uses repository layer.
- Repository handles Google Sheets.
- Use stable vehicle_id.
- Use header mapping.
- Do not use row number as vehicle ID.

Do not start invoice/payment modules yet.
Do not redesign the dashboard unless needed to show real vehicle data.
