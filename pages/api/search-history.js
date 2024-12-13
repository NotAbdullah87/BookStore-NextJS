// pages/api/search-history.js

import { createConnection } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, searchTerm } = req.body;

    try {
      const connection = await createConnection(dbConfig);
      await connection.execute(
        'INSERT INTO search_history (userId, searchTerm) VALUES (?, ?)',
        [userId, searchTerm]
      );
      await connection.end();
      return res.status(200).json({ message: 'Search history saved successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const connection = await createConnection(dbConfig);
      const [rows] = await connection.execute(
        'SELECT searchTerm FROM search_history WHERE userId = ? ORDER BY createdAt DESC LIMIT 5',
        [userId]
      );
      await connection.end();
      return res.status(200).json({ searchHistory: rows });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
