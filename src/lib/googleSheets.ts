import { EVENT_CONFIG } from "../config";
import type { RegistrationFormData } from "./validation";

export interface RegistrationResponse {
  success: boolean;
  duplicate?: boolean;
  message: string;
}

/**
 * Sends a registration to the configured Google Apps Script Web App,
 * which appends the row to the connected Google Sheet.
 *
 * The frontend never talks to Google Sheets directly and never holds
 * any credentials — the Apps Script Web App URL is the only endpoint
 * it knows about.
 */
export async function submitRegistration(
  data: RegistrationFormData
): Promise<RegistrationResponse> {
  const endpoint = EVENT_CONFIG.googleAppsScriptUrl;

  if (!endpoint || endpoint.includes("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL")) {
    return {
      success: false,
      message:
        "Registration is not yet configured. Please set googleAppsScriptUrl in src/config.ts.",
    };
  }

  try {
    // Apps Script Web Apps do not send CORS headers for JSON bodies read
    // via the Fetch API's "cors" mode with a preflight, so we send the
    // payload as text/plain — Apps Script parses it fine with JSON.parse
    // inside doPost, and this avoids the OPTIONS preflight entirely.
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        department: data.department,
        section: data.section,
        year: data.year,
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = (await response.json()) as RegistrationResponse;
    return result;
  } catch (error) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("Registration submission error:", error);
    }
    return {
      success: false,
      message: "Registration could not be completed. Please try again.",
    };
  }
}
