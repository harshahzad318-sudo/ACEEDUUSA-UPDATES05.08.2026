export type VideoPlatform = "Google Meet" | "Zoom" | "Microsoft Teams";

export interface VideoMeetingParams {
  lessonTitle: string;
  startTime: string;
  durationMinutes: number;
  platform?: VideoPlatform;
  tutorEmail?: string;
  studentEmail?: string;
}

export class VideoPlatformService {
  public static generateMeetingUrl(params: VideoMeetingParams): {
    platform: VideoPlatform;
    meetingUrl: string;
    meetingId: string;
    passcode: string;
  } {
    const platform = params.platform || "Google Meet";
    const meetingCode = Math.random().toString(36).substring(2, 10);
    const passcode = Math.floor(100000 + Math.random() * 900000).toString();

    if (platform === "Google Meet") {
      const code1 = meetingCode.substring(0, 3);
      const code2 = meetingCode.substring(3, 7);
      const code3 = meetingCode.substring(7, 10) || "ace";
      return {
        platform,
        meetingUrl: `https://meet.google.com/${code1}-${code2}-${code3}`,
        meetingId: `${code1}-${code2}-${code3}`,
        passcode: "Not required",
      };
    } else if (platform === "Zoom") {
      const numericId = Math.floor(10000000000 + Math.random() * 90000000000).toString();
      return {
        platform,
        meetingUrl: `https://zoom.us/j/${numericId}?pwd=${passcode}`,
        meetingId: numericId,
        passcode,
      };
    } else {
      return {
        platform: "Microsoft Teams",
        meetingUrl: `https://teams.microsoft.com/l/meetup-join/ACE_Education_${meetingCode}`,
        meetingId: `teams-${meetingCode}`,
        passcode,
      };
    }
  }
}
