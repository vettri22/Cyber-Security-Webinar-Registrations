/**
 * ============================================================
 *  Cyber Security Webinar — Registration Backend
 *  Google Apps Script Web App (Code.gs)
 * ------------------------------------------------------------
 *  Receives registration submissions from the website, validates
 *  them, prevents duplicate emails, appends a row to the bound
 *  Google Sheet, and returns a structured JSON response.
 *
 *  Setup instructions: see GOOGLE_SHEETS_SETUP.md in the project
 *  root.
 * ============================================================
 */

var SHEET_NAME = "Registrations"; // Change if your sheet tab has a different name.
var REQUIRED_FIELDS = ["name", "email", "department", "section", "year"];

function doPost(e) {
  try {
    var payload = parseRequestBody(e);
    var validationError = validatePayload(payload);

    if (validationError) {
      return jsonResponse({ success: false, message: validationError });
    }

    var sheet = getSheet();
    var normalizedEmail = payload.email.trim().toLowerCase();

    if (emailAlreadyRegistered(sheet, normalizedEmail)) {
      return jsonResponse({
        success: false,
        duplicate: true,
        message: "Email already registered",
      });
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss"),
      sanitize(payload.name),
      normalizedEmail,
      sanitize(payload.department),
      sanitize(payload.section),
      sanitize(payload.year),
    ]);

    return jsonResponse({ success: true, message: "Registration successful" });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: "Registration failed",
    });
  }
}

/** Allows a simple GET to verify the deployment is reachable. */
function doGet() {
  return jsonResponse({
    success: true,
    message: "Cyber Security Webinar registration endpoint is online.",
  });
}

function parseRequestBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing request body");
  }
  return JSON.parse(e.postData.contents);
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request payload.";
  }

  for (var i = 0; i < REQUIRED_FIELDS.length; i++) {
    var field = REQUIRED_FIELDS[i];
    var value = payload[field];
    if (!value || String(value).trim().length === 0) {
      return "Missing required field: " + field;
    }
  }

  var name = String(payload.name).trim();
  if (name.length < 2) {
    return "Name must be at least 2 characters.";
  }

  var email = String(payload.email).trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return "Invalid email address.";
  }

  return null;
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    // Fall back to the first sheet if the named tab isn't found.
    sheet = ss.getSheets()[0];
  }

  ensureHeaderRow(sheet);
  return sheet;
}

function ensureHeaderRow(sheet) {
  var headers = ["Timestamp", "Name", "Email", "Department", "Section", "Year"];
  var firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  var isEmpty = firstRow.every(function (cell) {
    return cell === "" || cell === null;
  });

  if (isEmpty) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
}

function emailAlreadyRegistered(sheet, normalizedEmail) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  // Email column is column C (index 3).
  var emailValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  for (var i = 0; i < emailValues.length; i++) {
    var existing = String(emailValues[i][0] || "").trim().toLowerCase();
    if (existing === normalizedEmail) {
      return true;
    }
  }
  return false;
}

function sanitize(value) {
  return String(value).trim().replace(/[<>]/g, "");
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
