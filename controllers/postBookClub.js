import mysql from "mysql2/promise";

const sanitize = (value) => (value === undefined ? null : value);

export const postBookClub = async (req, res) => {
  console.log("postBookClub");
  try {
    const {
      bookClubId,
      userId,
      clubName,
      location,
      meetingType,
      frequency,
      description,
      website,
      visibility,
    } = req.body;

    console.log("body", req.body);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const [result] = await connection.execute(
      `UPDATE book_clubs
       SET name = ?, location = ?, meeting_type = ?, meeting_frequency = ?, description = ?, social_link = ?, visibility = ?
       WHERE book_club_id = ? AND user_id = ?`,

      [
        sanitize(clubName),
        sanitize(location),
        sanitize(meetingType),
        sanitize(frequency),
        sanitize(description),
        sanitize(website),
        sanitize(visibility),
        sanitize(bookClubId),
        sanitize(userId),
      ]
    );
    console.log("result", result);
    await connection.end();
    console.log("end");
    res.status(200).json({ message: "Book club profile saved successfully." });
  } catch (error) {
    console.error("Error saving book club profile:", error);
    res.status(500).json({ message: "Server error saving book club profile." });
  }
};
