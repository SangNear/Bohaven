"use client"
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
    if (!authInitialized) {
        return <div>Đang kiểm tra đăng nhập...</div>
    }
    else {
        return <>{children}</>
    }
}
