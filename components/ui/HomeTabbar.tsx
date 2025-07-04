import { productType } from '@/constant';
import { Repeat } from 'lucide-react';
import React from 'react'

interface Props {
    selectedTab : string;
    onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({selectedTab,onTabSelect}:Props) => {
  return (
    <div className='flex items-center gap-1.5 text-sm font-semibold'>
     <div className='flex items-center gap-1.5'>
        {productType?.map((item)=>(
            <button key={item?.title} onClick={() => onTabSelect(item?.title)} className={`border border-black px-4 py-1.5 md:px-3 md:py-2 rounded-full hover:bg-black hover:text-white hoverEffect ${selectedTab === item?.title && "bg-black text-white"}`}>
                {item.title}
            </button>
        ))}
     </div>
        <div>
            <button className='border border-black p-2 rounded-full hover:bg-black hover:text-white hoverEffect'>
                <Repeat className='w-5 h-5'/>
            </button>
        </div>
    </div>
  )
}

export default HomeTabbar
