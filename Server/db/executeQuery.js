import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const runQuery = async (text, params = []) => {
  const result = await pool.query(text, params);
  return result.rows || result;
};

export default runQuery;