import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const getBookClub = async (req, res) => {
  const bookClubId = req.params.id;

  if (!bookClubId) {
    return res.status(400).json({ message: "Book club ID is required." });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const [rows] = await connection.execute(
      `SELECT 
         book_club_id,
         name,
         location,
         meeting_type,
         meeting_frequency,
         description,
         social_link,
         profile_photo,
         visibility,
         member_count,
         created_at
       FROM book_clubs
       WHERE book_club_id = ?`,
      [bookClubId]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book club not found." });
    }

    const club = rows[0];

    return res.status(200).json({
      bookClubId: club.book_club_id,
      name: club.name,
      location: club.location,
      meetingType: club.meeting_type,
      meetingFrequency: club.meeting_frequency,
      description: club.description,
      socialLink: club.social_link,
      profilePhoto: club.profile_photo,
      visibility: club.visibility,
      memberCount: club.member_count,
      createdAt: club.created_at,
    });
  } catch (error) {
    console.error("Error fetching book club:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching book club." });
  }
};
