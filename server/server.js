
import dotenv from "dotenv";
dotenv.config()
console.log("TEST ENV:", process.env.CLOUDINARY_API_KEY);
import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

import authRoute from "./routes/authRoute.js"
import bookRoute from "./routes/admin-route/bookRoute.js"
import categoryRoute from "./routes/admin-route/categoryRoute.js"


const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


//Routes
app.use("/api/auth", authRoute)
app.use("/api/books", bookRoute)
app.use("/api/categories", categoryRoute)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB()
})