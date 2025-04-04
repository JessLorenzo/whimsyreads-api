import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const getUserProfile = async (req, res) => {
  console.log("hi");
  const userId = req.params.id;

  if (!userId) return res.status(400).json({ message: "User ID is required." });

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const [rows] = await connection.execute(
      "SELECT user_id, first_name, last_name, email FROM users WHERE user_id = ?",
      [userId]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log(rows[0]);
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server error fetching profile." });
  }
};
