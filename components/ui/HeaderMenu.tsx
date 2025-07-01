'use client'

import { headerData } from '@/constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const HeaderMenu = () => {
    const pathname = usePathname();
    console.log("path",pathname)
  return (
    <div className='hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold'>
       {headerData?.map((item) => (
        <Link className={`hover:text-black relative group hoverEffect ${pathname === item?.href && "text-black"}`} key={item?.title} href={item.href}>
            {item.title}
            <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === item?.href && "w-1/2"}`}></span>
             <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === item?.href && "w-1/2"}`}></span>
        </Link>
       )) }
     
    </div>
  )
}

export default HeaderMenu
