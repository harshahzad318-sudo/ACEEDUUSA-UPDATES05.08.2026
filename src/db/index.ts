import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const hasSqlConfig = !!(
  process.env.SQL_HOST &&
  process.env.SQL_USER &&
  process.env.SQL_PASSWORD &&
  process.env.SQL_DB_NAME
);

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export let pool: Pool | undefined;
export let db: any;

if (hasSqlConfig) {
  pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      connectionTimeoutMillis: 15000,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  pool.on("error", (err) => {
    console.error("Unexpected error on idle SQL pool client:", err);
  });

  db = drizzle(pool, { schema });
} else if (databaseUrl) {
  pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  db = drizzle(pool, { schema });
} else {
  console.warn("[AI Studio] Neither SQL_* config nor DATABASE_URL is set. Fallback mock is active.");
  
  const mockInsert = () => ({
    values: (data: any) => {
      const result = [{ id: Math.floor(Math.random() * 1000) + 1, ...data }];
      const promise = Promise.resolve(result);
      return Object.assign(promise, {
        returning: async () => result,
      });
    }
  });
  
  const mockExecute = async () => {
    return { rows: [{ "?column?": 1 }] };
  };

  db = {
    insert: mockInsert,
    execute: mockExecute,
    select: () => ({
      from: () => []
    })
  } as any;
}

