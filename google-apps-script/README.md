# Google Apps Script — Registration Backend

This folder contains `Code.gs`, the complete backend for the registration form.

It:
- Receives `POST` requests from the website (`doPost`)
- Validates all required fields
- Normalizes and checks emails for duplicates (case-insensitive)
- Appends a new row (`Timestamp, Name, Email, Department, Section, Year`) to the
  Google Sheet the script is bound to
- Returns a structured JSON response (`success`, `duplicate`, `message`)

For full step-by-step deployment instructions, see
[`GOOGLE_SHEETS_SETUP.md`](../GOOGLE_SHEETS_SETUP.md) in the project root.

## Quick reference

1. Create a Google Sheet with a tab named `Registrations` (or edit
   `SHEET_NAME` in `Code.gs` to match your tab name).
2. Open **Extensions → Apps Script** and paste in `Code.gs`.
3. Deploy as a **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployed Web App URL into `src/config.ts` as `googleAppsScriptUrl`.

The script never exposes any credentials to the frontend — the only thing the
website knows about is the public Web App URL.
