"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import banner1 from "../../../public/assets/banner/banner1.jpg"
import { listBanners } from '@/config'
const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % listBanners.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])
    return (
        <section className='mt-4 relative '>
            <div className='relative w-full h-[200px] sm:h-[300px] md:h-[500px] lg:h-[700px] '>
                {
                    listBanners.map(((banner, index) => (
                        <Image
                            key={banner.label}
                            src={banner.src}
                            alt='hero'
                            className={`${currentSlide === index ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full transition-opacity duration-1000`}
                        />
                    )))
                }
            </div>
        </section>
    )
}

export default Hero