# VIGO4U OS CEO Dashboard

Mission 001 builds the CEO Dashboard as the mobile-first home screen for VIGO4U OS.

This is a Google Apps Script Web App using mock data only. ERP modules can be connected later.

## Files

- `Code.gs`: Web App entrypoint and mock dashboard data.
- `Index.html`: Dark-mode mobile-first dashboard UI.
- `appsscript.json`: Apps Script manifest.

## Run In Google Apps Script

1. Create a new Apps Script project.
2. Add `Code.gs`.
3. Add `Index.html`.
4. Add `appsscript.json` as the manifest.
5. Deploy as Web App.
6. Open the Web App URL.

## Live Deployment

- Script project: `https://script.google.com/d/1ovvuWV2OaKHMeQvaKKeASUklu519qaEWK5yz1DGp1HA6TGmnKnDolzfj/edit`
- Web App URL: `https://script.google.com/macros/s/AKfycbx-lMnRi0UNsLh26i_u2rJAzqSuUh6PvND0yzN4G93KXkTweTSF0speNivA7DgUN_YBGA/exec`
- Deployment ID: `AKfycbx-lMnRi0UNsLh26i_u2rJAzqSuUh6PvND0yzN4G93KXkTweTSF0speNivA7DgUN_YBGA`

## Current Dashboard Sections

- Welcome Header
- Company Status
- AI Status
- Business Summary
- Finance Summary
- Notifications
- Quick Actions

## Mock Data

All values come from `getDashboardData()` in `Code.gs`.

Future modules should replace mock data through service functions without changing the dashboard layout contract.
