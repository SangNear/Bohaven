import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
const PORT = process.env.PORT || 5000

const app = express()
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB()
})