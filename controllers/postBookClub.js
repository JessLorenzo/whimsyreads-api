import mysql from "mysql2/promise";

const sanitize = (value) => (value === undefined ? null : value);

export const postBookClub = async (req, res) => {
  try {
    const {
      book_club_id,
      user_id,
      name,
      location,
      meeting_type,
      num_chapters,
      meeting_frequency,
      description,
      social_link,
      visibility,
    } = req.body;

    const profilePhoto = req.file ? req.file.filename : null;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const [result] = await connection.execute(
      `UPDATE book_clubs
       SET name = ?, location = ?, meeting_type = ?, num_chapters = ?, meeting_frequency = ?, description = ?, social_link = ?, profile_photo = ?, visibility = ?
       WHERE book_club_id = ? AND user_id = ?`,
      [
        sanitize(name),
        sanitize(location),
        sanitize(meeting_type),
        sanitize(num_chapters),
        sanitize(meeting_frequency),
        sanitize(description),
        sanitize(social_link),
        sanitize(profilePhoto),
        sanitize(visibility),
        sanitize(book_club_id),
        sanitize(user_id),
      ]
    );

    await connection.end();

    res.status(200).json({ message: "Book club profile saved successfully." });
  } catch (error) {
    console.error("Error saving book club profile:", error);
    res.status(500).json({ message: "Server error saving book club profile." });
  }
};
