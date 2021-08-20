import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import pg from 'pg';

console.log(process.env.DATABASE_URL);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

pool.on('connect', () => console.log('Postgres connected'));

export default pool;
