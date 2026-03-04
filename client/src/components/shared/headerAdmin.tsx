"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '../ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { Switch } from '../ui/switch'
import { useTheme } from 'next-themes'
import { LogOutIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarImage } from '../ui/avatar'
import { Card, CardAction, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogTitle } from '@radix-ui/react-dialog'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'




const HeaderAdmin = () => {
    const pathName = usePathname()
    const router = useRouter()

    const { user, logout } = useAuthStore()
    const [logoutConfirm, setLogoutConfirm] = useState(false)

    const handleLogout = async () => {
        try {
            await logout()
            router.push('/admin/login')
        } catch (error) {
            console.log(error)
        }
    }
    const { theme, setTheme } = useTheme()

    const handleLogoutConfirm = () => {
        setLogoutConfirm(true)
    }
    const lastSegment = pathName.split('/').filter(Boolean).pop()
    return (
        <div className='h-[90px]  w-full p-4 shadow '>
            <div className='flex items-center h-full'>

                <h1 className='text-2xl capitalize font-semibold '>{lastSegment}</h1>




                <div className='ml-auto flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                        <Switch onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                        {theme === 'dark' ? <MoonIcon className='w-4 h-4' /> : <SunIcon className='w-4 h-4' />}
                    </div>

                    <div className='flex items-center gap-2'>

                        <Avatar>
                            <AvatarImage
                                src={user?.avatar || 'https://github.com/evilrabbit.png'}
                            />
                            <AvatarBadge className='bg-green-600 dark:bg-green-800' />
                        </Avatar>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className=' rounded-md px-4 py-2 cursor-pointer' onClick={handleLogoutConfirm}>
                                <span className='hidden md:block'>Đăng xuất</span>
                                <LogOutIcon className='w-4 h-4' />
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Bạn có muốn đăng xuất</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" className=' rounded-md px-4 py-2 cursor-pointer' onClick={handleLogout}>Có</Button>
                                <DialogClose asChild>
                                    <Button variant="outline" className=' rounded-md px-4 py-2 cursor-pointer' onClick={() => setLogoutConfirm(false)}>Không</Button>
                                </DialogClose>

                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </div>

            </div>
        </div>
    )
}

export default HeaderAdmin