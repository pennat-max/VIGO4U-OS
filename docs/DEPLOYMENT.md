# DEPLOYMENT

## Live Web App
- URL: `https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec`
- Deployment ID: `AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ`
- Current version: `@13`

## Local Project
Directory:
`VIGO4U-OS-CEO-Dashboard/`

## Deploy Commands
From `VIGO4U-OS-CEO-Dashboard/`:

```powershell
clasp.cmd push --force
clasp.cmd version "Deployment description"
clasp.cmd deploy --deploymentId AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ --versionNumber <VERSION> --description "Deployment description"
```

## Verification
After deploy:

```powershell
$url='https://script.google.com/macros/s/AKfycbwc-oJSxaTqj_gJOAksDXSldNCzdT9ZrUn9oK69ONaVRgp531tnMOqpKEp3-ESifJ4HBQ/exec'
$response=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60
$response.StatusCode
```

Expected: `200`

## Production Launch Requirements
- Populate `Users` sheet.
- Enable `GOOGLE_USER_MAPPING` script property.
- Approve signed-in Google user deployment settings.
- Complete first Drive upload authorization if prompted.
- Run `docs/QA_CHECKLIST.md`.
