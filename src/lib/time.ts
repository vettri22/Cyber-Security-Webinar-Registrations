/**
 * Returns how many minutes the given IANA timezone is BEHIND UTC
 * at the given instant (negative for zones ahead of UTC, e.g. IST => -330).
 */
function getTimezoneOffsetMinutes(timeZone: string, at: Date): number {
  const utcDate = new Date(at.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(at.toLocaleString("en-US", { timeZone }));
  return (utcDate.getTime() - tzDate.getTime()) / 60000;
}

/**
 * Builds an absolute UTC Date from a "YYYY-MM-DD" date, "HH:mm" time and
 * an IANA timezone string (e.g. "Asia/Kolkata").
 */
export function getEventDateTime(
  isoDate: string,
  time: string,
  timezone: string
): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  // First, build the date as if it were UTC, then correct by the
  // target timezone's offset at that approximate moment.
  const naiveUtc = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offsetMinutes = getTimezoneOffsetMinutes(timezone, naiveUtc);
  return new Date(naiveUtc.getTime() + offsetMinutes * 60000);
}

export function formatClock(date: Date, timezone: string): string {
  return date.toLocaleTimeString("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function getTimezoneAbbreviation(timezone: string): string {
  // Small friendly map for common zones; falls back to the raw IANA id.
  const known: Record<string, string> = {
    "Asia/Kolkata": "IST",
    "Asia/Calcutta": "IST",
    UTC: "UTC",
  };
  return known[timezone] ?? timezone.split("/").pop()?.toUpperCase() ?? timezone;
}
