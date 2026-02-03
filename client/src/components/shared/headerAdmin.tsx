"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Input } from '../ui/input'

const HeaderAdmin = () => {
    const pathName = usePathname()

    const lastSegment = pathName.split('/').filter(Boolean).pop()
    return (
        <div className='h-[90px]  w-full p-4 shadow'>
            <div className='flex items-center h-full'>
                <h1 className='font-bold  capitalize'>{lastSegment}</h1>
            </div>
        </div>
    )
}

export default HeaderAdmin