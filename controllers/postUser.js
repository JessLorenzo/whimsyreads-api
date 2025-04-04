import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

export const postUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const [existing] = await connection.execute(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      await connection.end();
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userResult] = await connection.execute(
      "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, first_name, last_name]
    );

    const newUserId = userResult.insertId;

    const clubName = `${first_name}'s Book Club`;
    const [clubResult] = await connection.execute(
      "INSERT INTO book_clubs (name, user_id, created_at) VALUES (?, ?, NOW())",
      [clubName, newUserId]
    );

    const newBookClubId = clubResult.insertId;

    await connection.end();

    res.status(201).json({
      message: "User and book club created successfully.",
      user_id: newUserId,
      book_club_id: newBookClubId,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
};
