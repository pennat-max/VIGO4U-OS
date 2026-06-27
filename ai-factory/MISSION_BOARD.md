# Mission Board

Date: 2026-06-27

| ID | Mission | Status | Owner | Next Action | Blocker |
| --- | --- | --- | --- | --- | --- |
| AF-001 | AI Factory MVP | Done | Codex | Monitor GitHub mission intake | None |
| AF-002 | Production Authorization Package | Blocked | CEO + Codex | Provide approved Google account-role list and deployment approval | CEO decision, Google authorization |
| AF-003 | Production QA Execution | Blocked | Codex + QA | Run `docs/QA_CHECKLIST.md` | Requires AF-002 |
| AF-004 | Security Review | Blocked | Codex + reviewer | Review production auth, Drive sharing, audit logs | Requires AF-002 |
| AF-005 | Production Completion | Blocked | Codex | Mark project completed after QA/security/deploy pass | Requires AF-003 and AF-004 |

## Latest Engineering Update
- Web App deployment is now `@14`.
- `apiSaveWorkOrder` now reloads ERP data with the caller role context after save.
- Live dashboard verification returned `HTTP 200`.

## Active Decision Needed
Provide approved rows for the `Users` sheet:

```text
email, display_name, role, customer_id, staff_name, status
```

Valid roles:
- `admin`
- `finance`
- `staff`
- `customer`
