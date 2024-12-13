import { createConnection } from "mysql2/promise";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const connection = await createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM genres");
    await connection.end(); // Close the connection
    return res.status(200).json({ genres: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
