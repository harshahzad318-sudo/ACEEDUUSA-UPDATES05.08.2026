import { NextRequest } from "next/server";

interface RateLimitStore {
  [ip: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const ip in store) {
    if (store[ip].resetTime < now) {
      delete store[ip];
    }
  }
}, 300000);

export function checkRateLimit(
  req: NextRequest,
  limit: number = 20,
  windowMs: number = 60000
): { success: boolean; remaining: number; reset: number } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const now = Date.now();
  const record = store[ip];

  if (!record || record.resetTime < now) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, remaining: limit - 1, reset: store[ip].resetTime };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, reset: record.resetTime };
}
