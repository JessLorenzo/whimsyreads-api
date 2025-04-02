import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
