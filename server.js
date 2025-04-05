import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import bookClubRoutes from "./routes/bookclub.js";

dotenv.config();
const PORT = process.env.PORT || 8081;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookclubs", bookClubRoutes);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Whimsy Reads API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
