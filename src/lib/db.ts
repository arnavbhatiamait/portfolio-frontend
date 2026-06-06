import { Pool } from "@neondatabase/serverless";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not defined");
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

/**
 * Initializes the database tables.
 * This runs when the API endpoint starts up to ensure the necessary schema exists.
 */
export async function initDb(): Promise<void> {
  const dbPool = getPool();
  const client = await dbPool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database initialized successfully: 'contact_submissions' table is ready.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  } finally {
    client.release();
  }
}
