
export const metadata = {
    title: 'Đăng nhập hệ thống quản trị',
    description: 'Hệ thống quản lý website bohaven',
}

export default function AdminAuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        
            <>{children}</>
        
    )
}
