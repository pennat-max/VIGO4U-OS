# Blockers

## Active Blockers

None. CEO Dashboard is deployed and opens.

## Known Risks

- `clasp run setup` and `clasp run seedDemoData` require a separate Apps Script API executable deployment, but the Web App does not depend on those calls to load mock data.
- Real ERP modules are not connected yet.
- Permission model must be defined before exposing real finance data to non-CEO roles.
