import api from "@/lib/axios"
import { User } from "@/types/user"

export interface LoginPayload {
    username: string
    password: string
}

export const authService = {
    login: async (payload: LoginPayload) => {
        try {
            const res = await api.post("/auth/login", payload, { withCredentials: true })
            return res.data
        } catch (error: any) {
            console.log(error)
            throw error.response?.data
        }

    },
    logout: async () => {
        try {
            const res = await api.post("/auth/logout", { withCredentials: true })
            return res.data
        } catch (error: any) {
            console.log(error)
            throw error.response?.data

        }
    },
    refreshToken: async () => {
        try {
            const res = await api.post("/auth/refreshToken", { withCredentials: true })
            return res.data
        } catch (error: any) {
            console.log(error)
            throw error.response?.data
        }
    },
    getMe: async () => {
        try {
            const res = await api.get("/auth/me", { withCredentials: true })
            return res.data.user as User
        } catch (error: any) {
            console.log(error)
            throw error.response?.data
        }
    }
}