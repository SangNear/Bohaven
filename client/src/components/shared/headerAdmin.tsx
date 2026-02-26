"use client"
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '../ui/button'
import { useAuthStore } from '@/store/useAuthStore'


const HeaderAdmin = () => {
    const pathName = usePathname()
    const router = useRouter()

    const { user, logout } = useAuthStore()
    console.log("user", user);
    
    const handleLogout = async () => {
        try {
            await logout()
            router.push('/admin/login')
        } catch (error) {
            console.log(error)
        }
    }
    const lastSegment = pathName.split('/').filter(Boolean).pop()
    return (
        <div className='h-[90px]  w-full p-4 shadow'>
            <div className='flex items-center h-full'>
                <h1 className='font-bold  capitalize'>{lastSegment}</h1>
                <p className='text-sm text-gray-500 '>{user?.username}</p>
                <Button className='bg-red-500 text-white rounded-md px-4 py-2 ml-auto' onClick={handleLogout}>Đăng xuất</Button>
            </div>
        </div>
    )
}

export default HeaderAdmin