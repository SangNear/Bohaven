"use client"
import { ThemeProvider } from "@/providers/theme-provider"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function AdminAuthLayout({ children, }: { children: React.ReactNode }) {
    const { refreshToken, getMe, loading, authInitialized } = useAuthStore()
    const router = useRouter()

    const init = async () => {
        try {
            await refreshToken()
            await getMe()
        } catch {
            router.replace("/admin/login")
        }
    }

    useEffect(() => {
        init()
    }, [])

        return <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem = {false}
            disableTransitionOnChange = {false}
        >
            {children}
        </ThemeProvider>

}
