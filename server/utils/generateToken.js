import { promisify } from "util"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export async function generateAccessToken(user) {
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email
    }
    const signAsync = promisify(jwt.sign)

    try {
        const token = await signAsync(payload, process.env.JWT_SECRET, { expiresIn: "15m" })
        return token
    } catch (error) {
        console.log(error);

    }
}

export async function generateRefreshToken() {
    return crypto.randomBytes(32).toString("hex")
}
export function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex")
}