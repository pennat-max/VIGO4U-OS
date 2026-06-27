# VIGO4U OS Design System

## Product Direction
VIGO4U OS uses a premium dark mobile-first interface inspired by Tesla + Apple.

## Core Theme
- Dark mode first
- Mobile first
- Card-based UI
- Large touch targets
- Executive dashboard style
- Thai and English language support
- Fast, clean, premium, not spreadsheet-like

## Language
The system must support two languages:
- Thai (TH)
- English (EN)

Rules:
- Do not hard-code visible UI text directly in templates.
- Use an i18n dictionary such as `i18n.th` and `i18n.en`.
- Code identifiers, data keys, and database fields stay in English.
- User-facing labels must switch between Thai and English.

## Navigation
Mobile uses bottom navigation:
- Dashboard
- Customers
- Vehicles
- Invoice
- Payments
- Menu

Desktop/tablet may use a left sidebar.

## Visual Style
- Background: deep navy / black gradient
- Cards: dark surface with subtle border
- Accent colors: blue, green, orange, red, purple
- Corners: rounded
- Typography: large, clear, business readable
- Buttons: large, thumb friendly

## Required Pages
1. CEO Dashboard
2. Customers
3. Vehicles
4. Invoice
5. Payments
6. Workshop
7. Reports
8. Menu / Settings

## Build Rule
No new module screen should be built without following this design system.

## Production UI Rules
- Keep the role selector only as a demo/testing control until `GOOGLE_USER_MAPPING` is approved.
- Production user-facing text must be available through the TH/EN dictionary.
- Do not add spreadsheet-style tables for primary mobile workflows.
- Do not redesign the dashboard without CEO approval.
- Do not expose hidden financial fields through UI text, debug output, list metadata, or customer/staff cards.

## Accessibility And Mobile
- Controls must remain usable on mobile first.
- Touch targets should be large enough for thumb operation.
- Text must not overlap cards or buttons.
- Critical action buttons must have visible labels in Thai and English.
