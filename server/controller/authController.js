import User from "../models/User.js"
import { generateToken } from "../utils/generateToken.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: "Email or Password is not valid. Please try again" })
        }
        const isMatchPassword = await user.matchPassword(password)
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Email or Password is not valid. Please try again" })
        }
        const token = await generateToken(user)
        if (token) {
            res.cookie("token", token,
                { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === 'production' })

            res.status(201).json({
                success: true,
                message: "Login successfully",
                token
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json("Error Occur")
    }
}

export const register = async (req, res) => {
    try {
        const { fullName, password, email } = req.body
        if (!fullName || !password || !email) {
            return res.status(400).json({
                message: "All field is require"
            })
        }
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ mesage: "Email is not valid" })
        }

        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ mesage: "User is exists" })
        }

        const newUser = await User.create({
            fullName,
            password,
            email
        })

        if (newUser) {
            const token = await generateToken(newUser)
            if (!token) {
                return res.status(400).json("Token not valid")
            }

            res.cookie("token", token,
                {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV === 'production'
                })
            return res.status(201).json({
                success: true,
                message: "User created successfully!",
                token,
                user: newUser
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Lỗi khi đăng ký người dùng"
        })
    }
}