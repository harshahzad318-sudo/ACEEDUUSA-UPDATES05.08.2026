export interface CalendarEventParams {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees?: string[];
}

export class CalendarIntegrationService {
  public static generateICSFile(params: CalendarEventParams): string {
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, "");

    const start = formatDate(params.startTime);
    const end = formatDate(params.endTime);
    const now = formatDate(new Date());

    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ACE Education USA//NONSGML Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:ace-event-${Date.now()}@aceeducation.us`,
      `DTSTAMP:${now}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${params.title}`,
      `DESCRIPTION:${params.description.replace(/\n/g, "\\n")}`,
      `LOCATION:${params.location || "ACE Education Online Classroom"}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  public static getGoogleCalendarUrl(params: CalendarEventParams): string {
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, "");
    const dates = `${formatDate(params.startTime)}/${formatDate(params.endTime)}`;
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", params.title);
    url.searchParams.set("details", params.description);
    url.searchParams.set("location", params.location || "ACE Education Online Classroom");
    url.searchParams.set("dates", dates);
    return url.toString();
  }
}
