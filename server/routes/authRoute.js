import express from "express"
import { login, logout, me, refreshToken, register } from "../controller/admin/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get("/me", authMiddleware, me)
router.post("/refreshToken", refreshToken)


export default router