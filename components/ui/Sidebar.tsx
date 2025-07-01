import React, { FC } from 'react'
import { motion } from "motion/react"
import NavLogo from "../NavLogo";
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { headerData } from '@/constant';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface Props {
    isOpen: boolean;
    onClose:() => void;
}
const Sidebar: FC<Props> = ({isOpen, onClose}) => {
    const pathname = usePathname();
    const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-black/50 shadow-xl hoverEffect cursor-auto w-full ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <motion.div 
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        ref={sidebarRef}
        transition={{duration:0.4, delay: 0.3}} 
        className='min-w-72 max-w-96 bg-black text-white/70  h-full p-10 border-r-white flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
            <button onClick={onClose}>
                <NavLogo className='text-white '>Gravex Co.</NavLogo>
            </button>
            <button className='bg-black hover:text-red-300 hover:bg-black' onClick={onClose}>
                <X  className='w-6 h-6'/>
            </button>
        </div>
        <div className=' flex flex-col gap-3.5 text-base font-semibold tracking-wide'>
            {headerData?.map((item) => (
                <Link onClick={onClose} className={`hover:text-white relative group hoverEffect w-24 ${pathname === item?.href && "text-white"}`} key={item?.title} href={item.href}>
                    {item.title}
                </Link>
            )) }
            
        </div>
        <SocialMedia/>
      </motion.div>
    </div>
  )
}

export default Sidebar
