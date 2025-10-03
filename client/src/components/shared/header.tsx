"use client"
import Image from 'next/image'
import React from 'react'
import bohaven from "../../../public/bohaven.png"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { MenuIcon, Search, ShoppingCart, UserCircle } from 'lucide-react'
import { navLinks } from '@/config'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
const Header = () => {
    return (
        <header className='bg-[#f7f7f9] max-md:py-2'>
            <div className='max-w-[1230px] h-full mx-auto  flex items-center md:justify-around gap-4 py-2 px-4'>
                <div className='lg:hidden'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='[&>button]:hidden' side='left'>
                            <SheetTitle className='hidden'></SheetTitle>
                            <div className='h-20 w-full flex flex-col bg-mainColor justify-center items-center-safe gap-2'>
                                <UserCircle className='text-white' />
                                <div className='flex items-center justify-center gap-4'>
                                    <Link href="/login" className='text-white'>Đăng nhập</Link>
                                    <Link href="/register" className='text-white'>Đăng ký</Link>
                                </div>
                            </div>
                            <nav className='flex flex-col gap-4 '>
                                {navLinks.map((link => (
                                    <Link key={link.label} href={link.link} className=' text-sm font-medium capitalize  border-b text-mainColor px-4 py-2'>
                                        {link.label}
                                    </Link>
                                )))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                <Link href="/" className=' flex items-center '>
                    < Image className='object-contain max-lg:w-[50px] max-md:h-[50px]' width={80}
                        height={80} src={bohaven} alt='logo' />
                </Link>
                <div className="hidden md:flex flex-1 items-center w-[400px] ">
                    <Input className="min-w-[350px] relative rounded-r-none rounded-l-4xl focus:outline-none focus:ring-0 focus:border-transparent" placeholder="Tìm kiếm sách..." />
                    <Button className='bg-mainColor rounded-r-4xl rounded-l-none'>
                        <Search />
                    </Button>
                </div>

                <div className=" flex max-md:flex-1 justify-end gap-4">
                    <div className='flex flex-col items-center justify-center md:mr-5 '>
                        <ShoppingCart className='text-mainColor' />
                        <span className='text-xs font-medium'>0 sản phẩm</span>
                    </div>
                    <Button className="max-md:hidden relative bg-transparent border-none text-[#1b5084] p-0 cursor-pointer before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-[#1b5084] before:transition-all before:duration-300 hover:before:w-full">
                        Đăng nhập
                    </Button>
                    <span className='max-md:hidden'>|</span>
                    <Button className="max-md:hidden relative bg-transparent border-none text-[#1b5084] p-0 cursor-pointer before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-[#1b5084] before:transition-all before:duration-300 hover:before:w-full">
                        Đăng ký
                    </Button>
                </div>
            </div>
            <div className='flex md:hidden  mx-auto px-4'>
                <Input className=" relative rounded-r-none rounded-l-4xl focus:outline-none focus:ring-0 focus:border-transparent" placeholder="Tìm kiếm sách..." />
                <Button className='bg-mainColor rounded-r-4xl rounded-l-none'>
                    <Search />
                </Button>
            </div>
            <nav className='hidden h-12 lg:flex items-center justify-center gap-10 mx-auto bg-white border-b-1 '>
                {navLinks.map((link => (
                    <Link key={link.label} href={link.link} className=' text-md font-medium uppercase hover:text-blue-400 '>
                        {link.label}
                    </Link>
                )))}

            </nav>
        </header >
    )
}

export default Header