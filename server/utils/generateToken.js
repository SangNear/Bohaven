import { promisify } from "util"
import jwt from "jsonwebtoken"
export async function generateToken(user) {
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email
    }
    const signAsync = promisify(jwt.sign)

    try {
        const token = await signAsync(payload, process.env.JWT_SECRET, { expiresIn: "40h" })
        return token
    } catch (error) {
        console.log();

    }
}