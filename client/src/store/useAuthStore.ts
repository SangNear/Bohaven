import { create } from "zustand"
import { authService } from "@/services/auth.service"
import { AuthState } from "@/types/store"
import { toast } from "sonner"
export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,
    authInitialized: false,
    setAccessToken: (accessToken: string) => {
        set({ accessToken })
    },
    clearState: () => {
        set({ accessToken: null, user: null, loading: false })
    },
    refreshToken: async () => {
        const { setAccessToken } = get()
        try {
            const { accessToken } = await authService.refreshToken()
            setAccessToken(accessToken)
            return accessToken
        } catch (error) {
            set({ accessToken: null, user: null, })
            throw error
        }
        finally {
            set({loading: false, authInitialized: true})
        }
    },

    login: async (username: string, password: string) => {
        try {
            // gọi api login
            set({ loading: true })
            const { accessToken } = await authService.login({ username, password })
            get().setAccessToken(accessToken)
            await get().getMe()
            toast.success("Đăng nhập thành công")
        } catch (error) {
            console.log(error)
            toast.error("Lỗi khi đăng nhập")
        } finally {
            set({ loading: false })
        }
    },
    logout: async () => {
        try {
            get().clearState()
            await authService.logout()
            toast.success("Đăng xuất thành công")
        } catch (error) {
            console.log(error)
            toast.error("Lỗi khi đăng xuất")
        }
    },
    getMe: async () => {
        try {
            const user = await authService.getMe()
            set({ user })
            return user
        } catch (error) {
            set({ user: null })
            throw error
        }
    },
}))