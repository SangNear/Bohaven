import { User } from "./user"

export interface AuthState {
    accessToken: string | null
    user: User | null
    loading: boolean
    authInitialized: boolean
    setAccessToken: (accessToken: string) => void
    clearState: () => void
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
    getMe: () => Promise<User>
    refreshToken: () => Promise<void>
}