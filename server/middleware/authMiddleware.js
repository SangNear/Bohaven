import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error Occur",
        })
    }
}