'use client';
import { AlignLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <>
    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
      <AlignLeft className='hove:text-black hoverEffect md:hidden'/>
    </button>
    <div className='md:hidden'>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
    </div>
    </>
  )
}

export default MobileMenu
