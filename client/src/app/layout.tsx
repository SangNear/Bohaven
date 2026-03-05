import QueryProvider from "@/providers/query-provider"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children, }: { children: React.ReactNode }) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <QueryProvider >
                    {children}
                    <Toaster />
                </QueryProvider>
            </body>
        </html>
    )
}