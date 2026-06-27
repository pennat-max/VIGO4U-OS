# VIGO4U-OS Mission Queue

Codex must work from top to bottom. Do not skip missions unless blocked.

## Operating Rule
Before stopping after any mission, Codex must:
1. Commit completed work.
2. Push to GitHub.
3. Update control-center/CURRENT_STATUS.md.
4. Update control-center/DAILY_REPORT.md.
5. Update control-center/NEXT_ACTION.md.
6. Update control-center/BLOCKERS.md if blocked.

## Mission 001: CEO Dashboard MVP
Status: Done
Goal: Thai mobile-first dashboard with mock data and deployed URL.

## Mission 002: Customer Module MVP
Status: Done
Goal: Customer list, detail, create, edit, search, status, and live dashboard customer statistics.

## Mission 003: Vehicle Module MVP
Status: Done
Goal: Vehicle list, detail, create, edit, search, status, photos/documents metadata, and dashboard vehicle statistics.

## Mission 004: Invoice Module MVP
Status: Done
Goal: Create invoice for one customer with multiple vehicles, invoice detail, invoice totals, and invoice status.

## Mission 005: Payment Module MVP
Status: Done
Goal: Record payments, support partial payments, support overpayment, and show paid/balance summary.

## Mission 006: Allocation Module MVP
Status: Done
Goal: Allocate one payment across invoice items or vehicles. Support unallocated credit.

## Mission 007: Customer Statement MVP
Status: Done
Goal: Customer statement showing invoices, vehicles, payments, allocations, balance, and documents.

## Mission 008: Workshop Module MVP
Status: Done
Goal: Work orders, staff view, cost submission, cost approval, and approved cost updates.

## Mission 009: Documents MVP
Status: Done
Goal: Store file metadata and URLs in Google Sheets. Drive upload flow is a production-hardening item.

## Mission 010: Reports MVP
Status: Done
Goal: CEO, finance, workshop, customer, and profit sharing reports.

## Mission 011: QA and Deployment
Status: Done
Goal: Run syntax checks, deploy Apps Script Web App, verify HTTP 200, and update control-center files.
