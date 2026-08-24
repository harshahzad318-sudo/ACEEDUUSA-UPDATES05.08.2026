export class SystemMonitoringService {
  public static logInfo(event: string, metadata?: Record<string, any>) {
    const entry = {
      timestamp: new Date().toISOString(),
      severity: "INFO",
      event,
      metadata: metadata || {},
      environment: process.env.NODE_ENV || "development",
    };
    console.log(JSON.stringify(entry));
  }

  public static logError(error: Error | string, context?: Record<string, any>) {
    const errorMessage = typeof error === "string" ? error : error.message;
    const stack = typeof error === "object" && error.stack ? error.stack : undefined;

    const entry = {
      timestamp: new Date().toISOString(),
      severity: "ERROR",
      message: errorMessage,
      stack,
      context: context || {},
      serviceContext: {
        service: "ace-education-platform",
        version: "1.0.0-prod",
      },
    };
    console.error(JSON.stringify(entry));
  }
}
