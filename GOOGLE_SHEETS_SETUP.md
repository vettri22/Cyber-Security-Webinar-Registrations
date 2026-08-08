# Google Sheets Setup Guide

This guide walks you through connecting the registration form to a Google
Sheet using Google Apps Script — no traditional database required.

## Step 1 — Create a new Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet.
2. Rename it something like **Cyber Security Webinar — Registrations**.
3. Rename the first tab (bottom-left) to `Registrations`.
   - If you'd rather use a different tab name, update the `SHEET_NAME`
     constant at the top of `google-apps-script/Code.gs` to match.

## Step 2 — Add the header row

In row 1, add these headers (the script will also auto-create them the first
time it runs if the row is empty, but it's good practice to set them up
yourself):

| Timestamp | Name | Email | Department | Section | Year |
|-----------|------|-------|------------|---------|------|

## Step 3 — Open the Apps Script editor

From the Sheet, go to:

```
Extensions → Apps Script
```

This opens the Apps Script editor bound to your spreadsheet.

## Step 4 — Paste in the provided code

1. Delete any placeholder code in the editor (`Code.gs`).
2. Open `google-apps-script/Code.gs` from this project and copy its entire
   contents.
3. Paste it into the Apps Script editor.
4. Save the project (`Ctrl+S` / `Cmd+S`), giving it a name like
   `Webinar Registration Backend`.

## Step 5 — Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `Webinar registration endpoint`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Google will ask you to authorize the script — review and accept the
   permissions (this is your own script, running on your own sheet).

## Step 6 — Copy the Web App URL

After deployment, Google Apps Script gives you a **Web app URL** that looks
like:

```
https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

Copy that URL.

## Step 7 — Connect it to the website

Open `src/config.ts` and paste the URL into `googleAppsScriptUrl`:

```ts
googleAppsScriptUrl: "https://script.google.com/macros/s/XXXX.../exec",
```

Save the file and restart the dev server (`npm run dev`) if it's running.

## Step 8 — Test the registration flow

1. Run the site locally (`npm run dev`) or open the deployed site.
2. Fill in the registration form and submit it.
3. Check the Google Sheet — a new row should appear within a couple of
   seconds.
4. Try submitting the same email address again — you should see
   "This email address has already been registered."

## Redeploying after changes

If you edit `Code.gs` later, you need to create a **new deployment version**
for the changes to take effect:

```
Deploy → Manage deployments → Edit (pencil icon) → New version → Deploy
```

The Web App URL normally stays the same across versions, so you usually
won't need to update `config.ts` again.

## Troubleshooting

- **"Registration could not be completed"** — double-check the URL in
  `config.ts` is the `/exec` URL (not `/dev`), and that "Who has access" is
  set to **Anyone**.
- **No rows appearing** — confirm the tab name matches `SHEET_NAME` in
  `Code.gs`, or check the Apps Script **Executions** log
  (`View → Executions`) for errors.
- **Duplicate emails still being added** — make sure you deployed the latest
  version of `Code.gs` (see "Redeploying after changes" above).
