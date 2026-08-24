import { db } from "@/db";
import { auditLogs } from "@/db/schema";

export interface AuditLogEntry {
  userId?: string;
  userEmail?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
}

// In-memory fallback if database connection is absent or during tests
const inMemoryLogs: (AuditLogEntry & { createdAt: Date })[] = [];

export async function logAuditEvent(entry: AuditLogEntry) {
  const logItem = {
    ...entry,
    createdAt: new Date(),
  };

  inMemoryLogs.push(logItem);
  if (inMemoryLogs.length > 500) {
    inMemoryLogs.shift();
  }

  try {
    await db.insert(auditLogs).values({
      userId: entry.userId || null,
      userEmail: entry.userEmail || null,
      action: entry.action,
      resource: entry.resource,
      resourceId: entry.resourceId || null,
      details: entry.details || null,
      ipAddress: entry.ipAddress || null,
    });
  } catch (e) {
    console.warn("Audit log DB insert skipped (using in-memory log):", e);
  }
}

export function getInMemoryAuditLogs() {
  return [...inMemoryLogs].reverse();
}
