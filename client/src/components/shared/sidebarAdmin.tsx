"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from "../../../public/bohaven.png"
import { PanelRightOpen } from 'lucide-react'
import Link from 'next/link'
import { menuAdmin } from '@/config'
import { usePathname } from 'next/navigation'
const SidebarAdmin = () => {
    const [closeMenu, setCloseMenu] = useState(false)
    console.log(closeMenu);

    const pathname = usePathname()

    return (
        <div className={`max-md:hidden  h-full  border-r transition-[width] duration-300 ease-in-out overflow-hidden  ${closeMenu ? "w-0" : "md:w-[200px] lg:w-[260px]"}`}>
            <div className='flex flex-col'>
                <div className='flex items-center justify-between relative p-4  min-h-[90px]'>
                    <Link href='/admin/dashboard'>
                        <Image src={logo} alt='logo' className='w-20 h-14 ' />
                    </Link>

                    <PanelRightOpen strokeWidth={2} className='text-mainColor' onClick={() => setCloseMenu(true)} />
                </div>
                <div className="flex flex-col gap-3 px-2 ">
                    {menuAdmin.map((item) => {
                        const Icon = item.icon;
                         const isActive = pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all mt-2
                                ${
                                    isActive
                                        ? "bg-mainColor text-white font-semi"
                                        : "text-gray-600 hover:bg-gray-100"
                                }
                            `}
                            >
                                <Icon size={20} />
                                <span className="capitalize ">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default SidebarAdmin