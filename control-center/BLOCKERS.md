# Blockers

## Active Blockers

None blocking the deployed mock CEO Dashboard.

## Known Risks

- Dashboard currently uses mock data.
- Real ERP modules are not connected.
- Staff/Finance/Admin role permissions must be defined before real financial data is exposed.
- `clasp run setup` and `clasp run seedDemoData` require a separate API executable deployment, but the Web App does not depend on those calls to open.

