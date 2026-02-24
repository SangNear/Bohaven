import RefreshToken from "../../models/RefreshToken.js"
import User from "../../models/User.js"
import { generateAccessToken, generateRefreshToken, hashToken } from "../../utils/generateToken.js"

const TTL_REFRESH_TOKEN = 7 * 24 * 60 * 60 * 1000 // 7 days

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(404).json({ message: "Username or Password is not valid. Please try again" })
        }
        const isMatchPassword = await user.matchPassword(password)
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Username or Password is not valid. Please try again" })
        }
        const accessToken = await generateAccessToken(user)
        const refreshToken = await generateRefreshToken()

        await RefreshToken.create({
            user: user._id,
            token: hashToken(refreshToken),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: TTL_REFRESH_TOKEN
        })
        return res.status(201).json({
            success: true,
            message: "Login successfully",
            accessToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json("Error Occur")
    }
}

export const register = async (req, res) => {
    try {
        const { username, password, email, avatar, displayName, phone, role } = req.body
        if (!username || !password || !email || !displayName ) {
            return res.status(400).json({
                message: "All field is require"
            })
        }
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ mesage: "Email is not valid" })
        }

        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ mesage: "User is exists" })
        }

        const newUser = await User.create({
            username,
            password,
            email,
            displayName,
            phone,
            avatar,
            role
        })

        const accessToken = await generateAccessToken(newUser)
        const refreshToken = await generateRefreshToken()

        await RefreshToken.create({
            user: newUser._id,
            token: hashToken(refreshToken),
            expiresAt: new Date(Date.now() + TTL_REFRESH_TOKEN)
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: TTL_REFRESH_TOKEN
        })
        return res.status(201).json({
            success: true,
            message: "Register successfully",
            accessToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Lỗi khi đăng ký người dùng"
        })
    }
}

export const refreshToken = async (req,res) => {
    try {
        //lay token tu cookie
        const tokenFromCookie = req.cookies.refreshToken
        if (!tokenFromCookie) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required"
            })
        } 
        //hash token
        const hashedToken = hashToken(tokenFromCookie)
        //tim token trong database
        const refreshToken = await RefreshToken.findOne({ token: hashedToken }).populate("user")

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is not valid"
            })
        }
        if (refreshToken.expiresAt < new Date()) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is expired"
            })
        }
        

        //xoa token cu
        await RefreshToken.deleteOne({ token: hashedToken })
        //tao token moi
        const newRefreshToken = await generateRefreshToken()
        await RefreshToken.create({
            user: refreshToken.user._id,
            token: hashToken(newRefreshToken),
            expiresAt: new Date(Date.now() + TTL_REFRESH_TOKEN)
        })
        //set token moi vao cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: TTL_REFRESH_TOKEN
        })
        
        //tao access token moi
        const accessToken = await generateAccessToken(refreshToken.user)
        return res.status(200).json({
            success: true,
            accessToken
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error Occur"
        })
    }
}